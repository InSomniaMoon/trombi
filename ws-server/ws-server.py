import json

import socketio
from aiohttp import web

sio = socketio.AsyncServer(cors_allowed_origins='*')
app = web.Application()
sio.attach(app)


question = None

users = []


@sio.event
async def disconnect(sid):
    print('disconnect ', sid)
    global question
    for user in users:
        if user['id'] == sid:
            users.remove(user)
            break
    if question is not None and question['askerId'] == sid:
        question = None
        await sio.emit('closedQuestion')
    await sio.emit('users', data=users)

app.router.add_get('/users', lambda request: web.json_response(users))
app.router.add_get(
    '/question', lambda request: web.json_response(question if question is not None else {}))


@sio.on('/login')
async def login(sid, data):
    global question
    data = json.loads(data)
    await sio.emit('me', to=sid, data={'id': sid, 'name': data['username'], 'question': question})
    print("login ", sid, data['username'])
    users.append(
        {'id': sid, 'name': data['username'], 'position': [0, 0]})
    await sio.emit('users', data=users, )

# on any event


@sio.on('/leave')
async def leave(sid, data):

    print('leave ', sid, data)
    global question
    for user in users:
        if user['id'] == sid:
            users.remove(user)
            break
    if question is not None and question['askerId'] == sid:
        question = None
        await sio.emit('closedQuestion')
    await sio.emit('users', data=users)


@sio.on('/mousemove')
async def chat_message(sid, data):
    data = json.loads(data)
    # print('message from ', sid, data)
    for user in users:
        if user['id'] == sid:
            user['position'] = [data['x'], data['y']]
            await sio.emit('users', data=users)
            break


@sio.on('/askQuestion')
async def chat_message(sid, data):
    """
    un user envoie une question, tout le monde reçoit la notification.
    la question est composée du texte et des réponses.
    """

    global question
    # condition pour n'avoir qu'une question à la fois
    if question is not None:
        return
    data = json.loads(data)
    data['askerId'] = sid
    data['answers'] = list(map(lambda x: {
        'name': x, 'users': []}, data['answers']))
    question = data
    print('askQuestion from ', sid, data)
    await sio.emit('questionAsked', data=data)


@sio.on('/answerQuestion')
async def chat_message(sid, data):
    """
    un user envoie une réponse à la question, tout le monde reçoit la notification.
    """
    print('answerQuestion from ', sid, data)
    global question
    if question is not None:
        data = json.loads(data)
        # on verifie si le sid n'était pas déjà dans une quesiton, sinon on l'enleve des autres quesitons
        for answer in question['answers']:
            answer['users'] = list(
                filter(lambda x: x["id"] != sid, answer['users']))

        # on ajoute le user à la question
        for user in users:
            if user['id'] == sid:
                question['answers'][data['answer']]['users'].append(
                    {'id': sid, 'name': user['name']})
                break

        print('answerQuestion from ', sid, data)
        await sio.emit('peopleAnswered', data=question)


@sio.on("/closeQuestion")
async def close_question(sid, data):
    """
    le questionneur ferme la question
    """
    global question
    if question is not None and question["askerId"] == sid:
        question = None
        await sio.emit("questionClosed")


@sio.on("/info")
async def send_info(sid, data):
    data = json.loads(data)
    print(data)
    await sio.emit("info", data=data)

if __name__ == '__main__':
    web.run_app(app)
