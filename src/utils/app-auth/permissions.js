import { UserAuthWrapper } from '../auth-wrapper'
import {mergeRootPath} from '../common'

export let requireLogin = UserAuthWrapper({
  authSelector: state => {
    let temp = Object.assign({}, state.account.user_data)
    temp.isLogin = state.account.isLogin
    return temp
  },
  authenticatingSelector: (state, props) => {
    return !state.account.user_data
  },
  wrapperDisplayName: 'requireLogin',
  failureRedirectPath: mergeRootPath(``),
  predicate: user => user.isLogin
})

export let requireAdmin = UserAuthWrapper({
  authSelector: state => {
    let temp = Object.assign({}, state.permissions)
    temp.permissions = state.permissions
    return temp
  },
  authenticatingSelector: (state, props) => {
    if (state.permissions.group === undefined) {
      if (props.params && props.params.groupID) {
        props.getPermissionGroup({
          'group_id': +props.params.groupID
        })
      }

      return true
    } else if (state.permissions.group.role === '' || state.permissions.group === '') {
      return true
    }

    return false
  },
  wrapperDisplayName: 'requireAdmin',
  failureRedirectPath: mergeRootPath(''),
  predicate: data => {
    return data.permissions.group === 'owner' || data.permissions.group === 'user'
  },
  allowRedirectBack: false
})
