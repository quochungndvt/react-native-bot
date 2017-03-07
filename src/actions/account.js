/* global fetch, localStorage */
'use strict';
import jwtDecode from 'jwt-decode';
import { AppCallApi, appFetch } from '../middleware/appCallApi';
import { apiLink, authLink } from '../constants/app';
import { storeLoad } from '../utils/common';

const actionTypes = {
  LOAD_CHECK_LOGIN_REQUEST: 'account.LOAD_CHECK_LOGIN_REQUEST',
  LOAD_CHECK_LOGIN_SUCCESS: 'account.LOAD_CHECK_LOGIN_SUCCESS',
  LOAD_CHECK_LOGIN_FAILURE: 'account.LOAD_CHECK_LOGIN_FAILURE',

  LOAD_LOGIN_REQUEST: 'account.LOAD_LOGIN_REQUEST',
  LOAD_LOGIN_SUCCESS: 'account.LOAD_LOGIN_SUCCESS',
  LOAD_LOGIN_FAILURE: 'account.LOAD_LOGIN_FAILURE',

  LOGOUT_REQUEST: 'account.LOGOUT_REQUEST',
  LOGOUT_SUCCESS: 'account.LOGOUT_SUCCESS',
  LOGOUT_FAILURE: 'account.LOGOUT_FAILURE',

  CHANGE: 'account.CHANGE',
  VALIDATE_EMAIL: 'account.VALIDATE_EMAIL',

  GET_GROUP_INFO_ID: 'account.GET_GROUP_INFO_ID',
  SET_GROUP_INFO: 'account.SET_GROUP_INFO',

  RECOVERY_ACCOUNT: 'account.RECOVERY_ACCOUNT',
  RECOVERY_SUCCESS: 'account.RECOVERY_SUCCESS',
  INIT: 'account.INIT',
  REGISTER: 'account.REGISTER'
};

function checkLogin(callback) {
  let decoded = '';
  return function (dispatch) {
    dispatch({
      type: actionTypes.LOAD_CHECK_LOGIN_REQUEST
    });
    storeLoad('token', (token) => {
      if (token) {
        decoded = jwtDecode(token);
        dispatch({
          type: actionTypes.LOAD_CHECK_LOGIN_SUCCESS,
          user_data: decoded.user_data
        });
        if (typeof callback === 'function') { callback(decoded.user_data); }
      } else {
        dispatch({
          type: actionTypes.LOAD_CHECK_LOGIN_FAILURE
        });
        if (typeof callback === 'function') { callback(null); }
      }
    });
  };
}
function register(email, password, fullname, callback) {
  let emailN = email.toLowerCase();
  return appFetch({
    type: actionTypes.REGISTER,
    [AppCallApi]: {
      method: 'POST',
      endpoint: authLink('/group/auth/register'),
      body: JSON.stringify({
        email: emailN,
        password: password,
        fullname: fullname
      }),
      response_type: 'object',
      headers: {
        'Accept': 'application/json', 'Content-Type': 'application/json'
      },
      resolve: callback,
      reject: callback
    }
  });
}
function logout(callback) {
  return appFetch({
    type: 'account.LOGOUT',
    [AppCallApi]: {
      method: 'POST',
      endpoint: authLink('/group/auth/logout'),
      resolve(res) {
        if (callback) {
          callback(res);
        }
      },
      reject(res) {
        if (callback) {
          callback(res);
        }
      }
    }
  });
}

function login(email, password, callback) {
  var decoded = '';
  var email = email.toLowerCase();
  return appFetch({
    type: 'account.LOAD_LOGIN',
    [AppCallApi]: {
      endpoint: authLink('/group/auth/get-token'),
      response_type: 'object',
      method: 'POST',
      body: JSON.stringify({ email: email, password: password }),
      headers: {
        'Accept': 'application/json', 'Content-Type': 'application/json'
      },
      resolve: (res) => {
        decoded = jwtDecode(res.data.token);
        if (callback) callback(decoded.user_data);
      },
      reject: (res) => {
        callback(res);
      }
    }
  });
}
function refreshToken() {
  // return appFetch({
  //   type : "account.LOAD_LOGIN",
  //   [AppCallApi] : {
  //       endpoint : `/group/auth/refresh-token`,
  //       response_type : "object",
  //       headers: {
  //        'Accept': 'application/json',
  //        'Content-Type': 'application/json'
  //       },
  //       resolve: function(res){
  //           var decoded = jwtDecode(res.data.token)
  //           if(callback) callback(decoded.user_data)
  //       },
  //       reject: callback
  //     }
  // })
}

function recovery(email, callback) {
  return function (dispatch) {
    dispatch({ type: actionTypes.RECOVERY_ACCOUNT });
    fetch(authLink('/group/auth/recovery-password'), {
      method: 'POST',
      headers: {
        'Accept': 'application/json', 'Content-Type': 'application/json'
      },
      body: JSON.stringify({ 'email': email }),
      credentials: 'include'
    })
    .then(response => response.json())
    .then(res => {
      if (callback) callback(res);
    });
  };
}
function getInfoGroupID(groupID) {
  return appFetch({
    type: actionTypes.GET_GROUP_INFO_ID,
    [AppCallApi]: {
      method: 'POST',
      endpoint: apiLink('/group/get_info'),
      response_type: 'object',
      body: JSON.stringify({ 'group_id': groupID }),
      headers: {
        'X-Requested-With': 'xmlhttprequest',
        'Content-Type': 'application/json'
      }
    }
  });
}
function setGroupInfo(groupInfo) {
  return {
    type: actionTypes.SET_GROUP_INFO,
    payload: { groupInfo }
  };
}

function change(field, value) {
  return {
    type: actionTypes.CHANGE,
    field,
    value
  };
}

function init() {
  return {
    type: actionTypes.INIT
  };
}
const actions = {
  checkLogin,
  init,
  login,
  change,
  recovery,
  logout,
  getInfoGroupID,
  setGroupInfo,
  register,
  refreshToken
};

// let loading = function () {
//   document.getElementById('ajax-loading').style.display = 'block'
// };
//
// let loaded = function () {
//   document.getElementById('ajax-loading').style.display = 'none'
// };

export { actions, actionTypes };
