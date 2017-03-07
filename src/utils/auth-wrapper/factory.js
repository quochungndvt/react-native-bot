import { connect } from 'react-redux'
import hoistStatics from 'hoist-non-react-statics'
import isEmpty from 'lodash.isempty'
// import { actions as permissionsActions } from '../../actions/permissions'
import {mergeRootPath} from '../common'
import { bindActionCreators } from 'redux'



const defaults = {
    LoadingComponent: 'span',
    failureRedirectPath: mergeRootPath(``),
    wrapperDisplayName: 'AuthWrapper',
    predicate: x => !isEmpty(x),
    authenticatingSelector: () => false,
    allowRedirectBack: true
}

export default function factory(React, empty) {

    const {Component, PropTypes} = React

    return (args) => {
        const {authSelector, authenticatingSelector, LoadingComponent, failureRedirectPath, wrapperDisplayName, predicate, allowRedirectBack, redirectAction} = {
            ...defaults,
            ...args
        }

        //authData not null
        const isAuthorized = (authData) => predicate(authData)

        const createRedirect = (location, redirect) => {
            let query
            if (allowRedirectBack) {
                query = {
                    redirect: `${location.pathname}${location.search}`
                }
            } else {
                query = {}
            }

            redirect({
                pathname: failureRedirectPath,
                query
            })
        }

        // Wraps the component that needs the auth enforcement
        function wrapComponent(DecoratedComponent) {
            const displayName = DecoratedComponent.displayName || DecoratedComponent.name || 'Component'

            const mapDispatchToProps = (dispatch) => {
                if (redirectAction !== undefined) {
                    return {
                        redirect: (args) => dispatch(redirectAction(args))
                    // getPermissionGroup: bindActionCreators(permissionsActions.getPermissionGroup, dispatch)
                    }
                } else {
                    return {}
                }
            }

            @connect(
                (state, ownProps) => {
                var {authData} = ownProps
                var auth_selector = authSelector(state, ownProps, false)
                if (authData) {
                    authData = Object.assign(authData, auth_selector)
                } else {
                    authData = auth_selector
                }

                return {
                    authData: authData,
                    isAuthenticating: authenticatingSelector(state, ownProps)
                }
                },
                mapDispatchToProps,
            )
            class UserAuthWrapper extends Component {

                        static displayName = `${wrapperDisplayName}(${displayName})`;

                        static propTypes = {
                            location: PropTypes.shape({
                                    pathname: PropTypes.string.isRequired,
                                    search: PropTypes.string.isRequired
                                }).isRequired,
                                redirect: PropTypes.func,
                                authData: PropTypes.object
                            };

                            static contextTypes = {
                                router: React.PropTypes.object
                            };

                            componentWillMount() {
                                if (!this.props.isAuthenticating && !isAuthorized(this.props.authData)) {
                                    createRedirect(this.props.location, this.getRedirectFunc(this.props))
                                }
                            }

                            componentWillReceiveProps(nextProps) {
                                //console.log("component will receive props", nextProps, this)
                                const willBeAuthorized = isAuthorized(nextProps.authData)
                                const willbeAuthenticating = nextProps.isAuthenticating
                                const wasAuthorized = isAuthorized(this.props.authData)
                                const wasAuthenticating = this.props.isAuthenticating

                                if ( // Redirect if:
                                        // 1. Was authorized, but no longer and not currently authenticating
                                        (wasAuthorized && !willBeAuthorized && !willbeAuthenticating) ||
                                        // 2. Was not authorized and authenticating but no longer authenticating
                                        (wasAuthenticating && !willbeAuthenticating && !willBeAuthorized)
                                ) {
                                    createRedirect(nextProps.location, this.getRedirectFunc(nextProps))
                                }
                            }

                            getRedirectFunc = ({redirect}) => {
                                if (redirect) {
                                    return redirect
                                } else {
                                    if (!this.context.router.replace) {
                                        /* istanbul ignore next sanity */
                                        throw new Error(`You must provide a router context (or use React-Router 2.x) if not passing a redirectAction to ${wrapperDisplayName}`)
                                    } else {
                                        return this.context.router.replace
                                    }
                                }
                            }

                            render() {
                                const {redirect, authData, isAuthenticating, ...otherProps} = this.props // eslint-disable-line no-unused-vars
                                if (isAuthorized(authData)) {
                                    return <DecoratedComponent authData={authData} {...otherProps} />
                                } else if (isAuthenticating) {
                                    return <LoadingComponent {...otherProps} />
                                } else {
                                    // Don't need to display anything because the user will be redirected
                                    return React.createElement(empty)
                                }
                            }
                        }

                        return hoistStatics(UserAuthWrapper, DecoratedComponent)
                    }

                    wrapComponent.onEnter = (store, nextState, replace) => {
                        //console.log("on enter: ", store, nextState)
                        const authData = authSelector(store.getState(), null, true)
                        if (!isAuthorized(authData)) {
                            alert("redirect")
                            createRedirect(nextState.location, replace)
                        }
                    }
                    return wrapComponent
                }
            }
