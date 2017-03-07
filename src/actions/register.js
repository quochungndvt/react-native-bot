/* global fetch */
'use strict';

import { AppCallApi, appFetch } from '../middleware/appCallApi';

const actionTypes = {
	REGISTER: 'register.REGISTER',
	CHANGE: 'register.CHANGE',
};
function register(email, password, fullname, callback) {
	return appFetch({
    type: actionTypes.REGISTER,
    [AppCallApi]: {
      method: 'POST',
      endpoint: '/register',
      body: `email=${email}&pass=${password}&name=${fullname}`,
      resolve: callback,
      reject: callback
    }
	});
}
function change(field, value) {
  return {
    type: actionTypes.CHANGE,
    field,
    value
  };
}

const actions = {
	change, register,
};

export {
  actions,
  actionTypes
};
