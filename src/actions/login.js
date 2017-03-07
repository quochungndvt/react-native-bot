
const actionTypes = {
  SIGN_IN: 'login.SIGN_IN'
}

function login (username, password) {
  return {
    type: actionTypes.SIGN_IN,
    username,
    password
  }
}

const actions = {
  login
}

export {
  actionTypes,
  actions
}
