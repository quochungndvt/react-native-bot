'use strict'
import { combineReducers } from 'redux'
import { account } from './account'
import { login } from './login'

const rootReducer = combineReducers({
  account,
  login
})

export default rootReducer
