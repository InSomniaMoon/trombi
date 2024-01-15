import json

import socketio
from aiohttp import web

sio = socketio.AsyncServer(cors_allowed_origins='*')
app = web.Application()
sio.attach(app)

users = []


@sio.on('/login')
async def chat_message(sid, data):
    data = json.loads(data)
    await sio.emit('me', to=sid, data={'id': sid, 'name': data['username']})
    print("login ", sid)
    users.append(
        {'id': sid, 'name': data['username'], 'position': [0, 0]})
    await sio.emit('users', data=users, )

# on any event


@sio.on('/mousemove')
async def chat_message(sid, data):
    data = json.loads(data)
    # print('message from ', sid, data)
    for user in users:
        if user['id'] == sid:
            user['position'] = [data['x'], data['y']]
            await sio.emit('users', data=users)
            break


@sio.on('/leave')
async def disconnect(sid, data):
    print('disconnect ', sid)
    for user in users:
        if user['id'] == sid:
            users.remove(user)
            break
    await sio.emit('users', data=users)

if __name__ == '__main__':
    web.run_app(app)
