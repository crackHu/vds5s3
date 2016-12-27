import fetch from 'isomorphic-fetch'
import {
    logger
} from './util'
import {
    api,
} from '../config'

const {
    reqCorrectCode,
    reqMessage,
} = api

const reqCorrect = (data) => {

    if (reqCorrectCode && reqCorrectCode.constructor == Array) {
        let code, flag = false
        reqCorrectCode.map(item => {
            if (code) {
                flag = eval(item)
            } else {
                code = data[item]
            }
        })
        return flag
    } else {
        console.error("Setting [reqCorrectCode] isn't right")
    }
}

export function get(url, successCallback = null, errorCallback = null) {

    fetch(url)
        .then(response => response.json())
        .then(data => {
            if (reqCorrect(data)) {
                if (typeof successCallback == 'function') {
                    successCallback(data)
                }
            } else {
                if (typeof errorCallback == 'function') {
                    errorCallback(data)
                }
                logger({
                    request: url,
                    response: data
                }, data[reqMessage], 'warn')
            }
        })
        .catch(e => {
            console.error("Oops, error", e)
            logger({
                request: url,
                fetchError: e
            }, false, 'error')
        })

}