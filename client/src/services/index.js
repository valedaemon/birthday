import io from 'socket.io-client';
import feathers from 'feathers/client';
import hooks from 'feathers-hooks';
import socketio from 'feathers-socketio/client';
import authentication from 'feathers-authentication/client';
let site;

if (process.env.NODE_ENV && process.env.NODE_ENV === 'development') {
  site = 'http://localhost:4040';
} else {
  site = 'http://localhost';
}

const socket = io(site);

export const app = feathers()
  .configure(socketio(socket))
  .configure(hooks())
  .configure(authentication({storage: window.localStorage}));

socket.on('reconnect', () => { app.authenticate(); });

export const userService = app.service('users');
