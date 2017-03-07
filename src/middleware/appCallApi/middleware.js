/* global fetch */
/* eslint-disable camelcase */
'use strict'

import { AppCallApi } from './index'
import { apiLink, authLink } from '../../constants/app'
import {mergeRootPath, storeLoad, storeSave, storeRemove} from '../../utils/common'
import jwtDecode from 'jwt-decode'
let currentLoading = 0
const token_key = 'token'
function addLoading() {
    ++currentLoading
    if (currentLoading === 1) {
        //document.getElementById('ajax-loading').style.display = 'block'
    }
}

function removeLoading() {
    --currentLoading
    if (currentLoading <= 0) {
        //document.getElementById('ajax-loading').style.display = 'none'
    }
}

function appCallApiMiddleware({dispatch, getState}) {
    return next => action => {
        if (!action.hasOwnProperty(AppCallApi) || !action.type) {
            return next(action)
        }
        const callAPI = action[AppCallApi]
        var {endpoint, headers} = callAPI
        endpoint = apiLink(endpoint)
        var {method, body, credentials, response_type, resolve, reject, beforeDispatch, args = {}, disableIndicator} = callAPI
        //TODO fix callback so stupid
        storeLoad(token_key, function(token){
            var config = {
                method,
                headers,
                body,
                credentials
            }

            if (!headers) {
                config['headers'] = {
                    'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
                    'X-Requested-With': 'xmlhttprequest',
                }
            }
            config['headers']['Authorization'] = 'Bearer ' + token

            var tTime = 1
            if (token) {
                var decoded = jwtDecode(token)
                var exp = decoded.exp
                tTime = new Date(exp * 1000) - new Date()

            }


            if (!method) {
                config['method'] = 'GET'
            }

            if (!credentials) {
                config['credentials'] = 'include'
            }

            var request = action.type + '_REQUEST'
            var success = action.type + '_SUCCESS'
            var fail = action.type + '_FAILURE'
            var defaultPayload = {
                message: '',
                data: []
            }

            if (response_type === 'object') {
                defaultPayload['data'] = {}
            }

            next({
                type: request,
                payload: defaultPayload,
                ...args
            })

            if (!disableIndicator) addLoading()

            var fetchData = (conf) => fetch(endpoint, conf)
                .then(response => {
                    if (!response.ok) {
                        if (!disableIndicator) removeLoading()
                        throw new Error(response.statusText)
                    }
                    else return response.json()
                })
                .catch(err => err)
                .then(json => {
                    if (json instanceof Error) {
                        next({
                            type: fail,
                            error: json,
                            ...args
                        })
                        if (reject) {
                            reject({err: json, message: json.message})
                        }
                        if (!disableIndicator) removeLoading()
                        return
                    }
                    if (json.id == "unauthorized") {
                        storeRemove(token_key)
                    }
                    if (response_type === 'object') {
                        if (json.data &&
                                json.data.constructor === Array &&
                                json.data.length === 1) {
                            json.data = json.data[0]
                        }
                    }
                    if (beforeDispatch) {
                        json = beforeDispatch(json)
                    }
                    if (!json.err) {
                        next({
                            type: success,
                            payload: json,
                            ...args
                        })
                        if (resolve) {
                            resolve(json)
                        }
                    } else {
                        next({
                            type: fail,
                            payload: json,
                            ...args
                        })
                        if (reject) {
                            reject(json)
                        }
                    }
                    if (!disableIndicator) removeLoading()
                })
            if (tTime < 0) {
                var temp_config = Object.assign({}, config)
                temp_config["method"] = "POST"
                fetch(authLink("/group/auth/refresh-token"), temp_config)
                    .then(response => response.json())
                    .then(json => {
                        json.data = json.data[0]
                        storeLoad(token_key, function(token){
                            if (token != json.data.token) {
                                storeSave(token_key,json.data.token)
                                config['headers']['Authorization'] = 'Bearer ' + json.data.token
                                fetchData(config)
                            }
                        })
                    })
                    .catch(error => {
                        dispatch({
                            type: fail,
                            payload: defaultPayload,
                            ...args
                        })
                        if (reject) {
                            reject({
                                message: error,
                                err: true
                            })
                        }
                        if (!disableIndicator) removeLoading()
                    })
            } else {
                fetchData(config)
            }
        })
    }
}

export default appCallApiMiddleware
