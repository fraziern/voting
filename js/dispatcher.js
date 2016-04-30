var lil = require ('lil-uuid');

var listeners = {};

function dispatch(payload) {
  for (var id in listeners) {
    listeners[id](payload);
  }
}

function register(cb) {
  var id = lil.uuid();
  listeners[id] = cb;
}

module.exports = {
  register: register,
  dispatch: dispatch
};
