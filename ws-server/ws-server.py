import json

import socketio
from aiohttp import web

sio = socketio.AsyncServer(cors_allowed_origins='*')
app = web.Application()
sio.attach(app)

users = []
# contient une question, ses réponses et l'id du questionneur
question = None


@sio.on('/login')
async def login(sid, data):
    data = json.loads(data)
    await sio.emit('me', to=sid, data={'id': sid, 'name': data['username']})
    print("login ", sid)
    users.append(
        {'id': sid, 'name': data['username'], 'position': [0, 0]})
    await sio.emit('users', data=users, )

# on any event


@sio.on('/leave')
async def disconnect(sid, data):
    print('disconnect ', sid)
    for user in users:
        if user['id'] == sid:
            users.remove(user)
            break
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
    # condition pour n'avoir qu'une question à la fois
    if question is not None:
        return
    data = json.loads(data)

    print('askQuestion from ', sid, data)
    await sio.emit('askQuestion', data=data)


@sio.on("/closeQuestion")
async def close_question(sid):
    if question["askerId"] == sid:
        question = None
        sio.emit("closedQuestion")


@sio.on("/info")
async def send_info(sid, data):
    data = json.loads(data)
    print(data)
    await sio.emit("info", data=data)

if __name__ == '__main__':
    web.run_app(app)