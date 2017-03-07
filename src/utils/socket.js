import {actions,actionTypes} from '../actions/message'
import { apiLink } from '../constants/app'
import io from 'socket.io-client'

var socket = null;

export function chatMiddleware(store) {
    return next => action => {
        if (!action) return null
        if (socket && action.type === actionTypes.ADD_MESSAGE) {
            socket.emit('message', action.message);
        }
        if (socket && action.type === actionTypes.SET_USER_CONNECT) {
            socket.emit('set_user', action.userId);
        }
        if (socket && action.type === actionTypes.SET_GROUP_CONNECT) {
            socket.emit('set_group', JSON.stringify(action.connectData));
        }
        return next(action);
    }
}
export function realtimeMessage(store) {
  socket = io.connect(apiLink("/socket.io/"),{
      query: {access_token: ""}
    }
  );
  socket.on('connect', () => {
  	socket.emit("start","ok")
  });
  socket.on('start', data => {
    store.dispatch(actions.setUserId(data.userId));
  });
  socket.on('set_user', data => {
    store.dispatch(actions.addResponse(data));
  });
  socket.on('set_group', data => {
    store.dispatch(actions.addResponse(data));
  });
  socket.on('message', data => {
    store.dispatch(actions.addResponse(data));
  });
  socket.on('disconnect', () => {
    console.log("disconnect")
  });
  socket.on('refresh_token', (data) => {
    console.log("need refresh_token",data)
    store.dispatch(actions.addResponse(data));
  });
}