/* global localStorage */

import { actionTypes as types } from '../actions/account'
import jwtDecode from 'jwt-decode'
import {storeLoad, storeSave, storeRemove} from '../utils/common'

const initialAccountState = {
  user_data: {},
  isFetching: false,
  loginError: false,
  emailError: false,
  recoveryEmailNotFound: false,
  recoveryNotify: '',
  recoverySuccess: false,
  recoveryEmail: '',
  email: '',
  password: '',
  isLogin: false,
  groupInfo: { id: 0, name: 'Đang lấy thông tin group' }
}

function account (state = initialAccountState, action) {
  switch (action.type) {
    case types.LOAD_CHECK_LOGIN_REQUEST:
      return {
        ...state,
        isFetching: true
      }
    case types.LOAD_CHECK_LOGIN_SUCCESS: {
      let temp = {
        ...state,
        isFetching: false,
        isLogin: false,
        user_data: action.user_data
      }
      if (action.user_data && action.user_data.Account_Id) {
        temp.isLogin = true
      }
      return temp
    }
    case types.LOAD_CHECK_LOGIN_FAILURE:
      return {
        ...state,
        isLogin: false,
        isFetching: false
      }
    case types.LOAD_LOGIN_REQUEST:
      return {
        ...state,
        isFetching: true
      }
    case types.LOAD_LOGIN_SUCCESS: {
      let decoded = jwtDecode(action.payload.data.token)      
      storeSave('token',action.payload.data.token)      
      return {
        ...state,
        isFetching: false,
        loginError: false,
        isLogin: true,
        user_data: decoded.user_data
      }
    }
    case types.LOAD_LOGIN_FAILURE:
      return {
        ...state,
        loginError: true,
        isFetching: false,
        user_data: {}
      }
    case types.INIT:
      return initialAccountState
    case types.LOGOUT_REQUEST:
      return {
        ...state,
        isFetching: true
      }
    case types.LOGOUT_SUCCESS:
      storeRemove('token')
      return {
        ...state,
        ...initialAccountState
      }
    case types.LOGOUT_FAILURE:
      return {
        ...state,
        isFetching: false
      }
    case types.CHANGE:
      return {
        ...state,
        [action.field]: action.value
      }
    case types.RECOVERY_SUCCESS:
      return {
        ...state,
        recoverySuccess: action.recoverySuccess,
        recoveryNotify: action.recoveryNotify
      }
    case types.GET_GROUP_INFO_ID + '_SUCCESS':
      return {
        ...state,
        groupInfo: action.payload.data
      }
    case types.SET_GROUP_INFO:
      return {
        ...state,
        groupInfo: action.payload.groupInfo
      }
    case types.REGISTER + '_SUCCESS': {
      let decoded = jwtDecode(action.payload.data.token)
      storeSave('token',action.payload.data.token)
      return {
        ...state,
        user_data: decoded.user_data,
        loginError: false,
        isLogin: true
      }
    }
    case types.REGISTER + '_FAILURE':
      return {
        ...state,
        isLogin: false
      }
    default:
      return state
  }
}
export { account }
