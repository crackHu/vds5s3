import {
    message,
} from 'antd'
import fetch from 'isomorphic-fetch'
import {
    logger,
    getFieldsValueObj,
    parseParam,
} from './util'
import {
    API,
    EntityConfig,
    EditTableConfig,
} from '../plugin_config/config'

const __DEBUG__ = process.env.NODE_ENV === 'development'
const {
    reqCorrectCode,
    reqMessage,
} = API
const {
    defaultSort,
    defaultPage,
    defaultSize,
} = EditTableConfig
const module = API.module
const findByPageUrl = module['findByPage']()
const showByIdUrl = module['showById']()
const addEntityUrl = module['addEntity']()
const editByEntityUrl = module['editByEntity']()
const delByIdUrl = module['delById']()

const reqCorrect = (data) => {

    if (reqCorrectCode && reqCorrectCode.constructor === Array) {
        let code, flag = false
        reqCorrectCode.map(item => {
            if (code) {
                console.log('reqCorrect', item, code, eval(item))
                flag = eval(item)
            } else {
                code = data[item]
            }
        })
        return flag
    } else {
        console.error(`Setting [reqCorrectCode: ${reqCorrectCode}] isn't right`)
    }
}

let init = undefined
async function get(url, failCallback) {
    let message
    try {
        let response = await fetch(url, init)
        let data = await response.json()
        console.log('result', data)
        if (reqCorrect(data)) {
            return data
        } else {
            message = data[reqMessage]
            if (failCallback && failCallback.constructor === Function) {
                failCallback()
            }
            logger({
                request: url,
                response: data
            }, message, 'warn')
            throw Error(message)
        }
    } catch (e) {
        if (!message) {
            message = e.message
            console.error("Oops, error", e)
            logger({
                request: url,
                fetchError: message
            }, message, 'error')
        }
        throw Error(e)
    } finally {
        init = undefined
    }
}

function post(url, data, failCallback) {
    init = {
        method: 'POST',
        credentials: 'include',
        headers: {
            'Accept': 'application/json, text/plain, */*',
            'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
            'cache': "no-store"
        },
        body: parseParam(data)
    }
    return get(url, failCallback)
}

// ------ 表格数据源 ------ //
export async function getDataSource(pageNo = defaultPage, pageSize = defaultSize, sort = defaultSort) {

    pageNo = pageNo < 1 ? 1 : pageNo

    let dataSource,
        url = `${findByPageUrl}?page=${pageNo - 1}&size=${pageSize}&sort=${sort}`

    let data = await get(url)
    return data
}

// ------ Modal表单数据源 ------ //
export async function getModalDataById(id) {

    let data = await get(`${showByIdUrl}?id=${id}`)
    let entity = EntityConfig['showById']
    let entityProperty = entity['property']
    let modalData = getFieldsValueObj(data[entityProperty], entity)
    return modalData
}

// ------ 新增记录 ------ //
export async function addItem(entity) {
    let data = await post(`${addEntityUrl}`, entity)
    message.success(data[reqMessage])
}

// ------ 编辑记录 ------ //
export async function updateItem(entity) {
    let data = await post(`${editByEntityUrl}`, entity)
    message.success(data[reqMessage])
}

// ------ 删除记录 ------ //
export async function deleteItem(id) {
    let data = await get(`${delByIdUrl}?id=${id}`)
    message.success(data[reqMessage])
}