import React, {Component, PropTypes} from 'react'
import {connect} from 'react-redux'
import { withRouter } from 'react-router'
import { bindActionCreators } from 'redux'
import Sidebar from '../../components/common/Sidebar'
import { actions as accountActions } from '../../actions/account'
import { actions as groupActions } from '../../actions/group'
import { actions as commonActions } from '../../actions/common'
import { actions as settingActions } from '../../actions/setting'
import {mergeRootPath} from '../../utils/common'

function toggleClass (t, c) {
  t.classList.contains(c) ? t.classList.remove(c) : t.classList.add(c)
}
class SidebarContainer extends Component {
  constructor (params) {
    super(params)
    this.onLogout = this.onLogout.bind(this)
    this.handleSidebar = this.handleSidebar.bind(this)
  }
  componentDidUpdate (prevProps, prevState) {
    const { groupID } = this.props
    if (groupID !== prevProps.groupID) {
      this.props.settingActions.getSetting(groupID)
      this.props.groupActions.getAllAppProject(groupID)
    }
  }
  componentDidMount () {
    const {groupActions: {getAllAppProject}, groupID, settingActions: {getSetting}} = this.props
    getSetting(groupID)
    getAllAppProject(groupID)
  }
  onLogout () {
    var self = this
    const {actions: {logout}} = this.props
    logout(function (res) {
      if (!res.err) {
        self.routePage(mergeRootPath(``))
        location.reload()
      }
    })
  }
  routePage (path) {
    if (!path) {
      return
    }
    const { router } = this.props
    router.replace(path)
  }
  handleSidebar (e) {
    const {commonActions: {handleEffect}} = this.props
    var target = e.target.getAttribute('data-toggle')
    if (target === 'open-only') {
      toggleClass(e.currentTarget, 'open')
      return
    }
    target = e.currentTarget
    if (target.hasAttribute('data-sublink')) {
      e.preventDefault()
      e.stopPropagation()
      handleEffect('close-sidebar')
    } else if (target.hasAttribute('data-link')) {
      const { router } = this.props
      router.replace(target.getAttribute('data-link'))
      handleEffect('close-sidebar')
    } else if (target.hasAttribute('data-toggle')) {
      var toggle = target.getAttribute('data-toggle')
      if (toggle === 'open') {
        toggleClass(target, toggle)
      } else {
        handleEffect(toggle)
      }
    }
  }
  render () {
    return (
      <Sidebar {...this.props}
        onLogout={this.onLogout}
        handleSidebar={this.handleSidebar}
      />
    )
  }
}
SidebarContainer.propTypes = {
  children: PropTypes.node
}
const mapStateToProps = (state, ownProps) => ({
  id: ownProps.params.id,
  filter: ownProps.location.query.filter,
  account: state.account,
  group: state.group,
  common: state.common,
  setting: state.setting,
  groupID: parseInt(ownProps.params.groupID) || 0
})
const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators(accountActions, dispatch),
  groupActions: bindActionCreators(groupActions, dispatch),
  commonActions: bindActionCreators(commonActions, dispatch),
  settingActions: bindActionCreators(settingActions, dispatch)
})
export default withRouter(connect(mapStateToProps, mapDispatchToProps)(SidebarContainer))
