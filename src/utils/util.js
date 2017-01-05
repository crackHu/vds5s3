import moment from 'moment'
import {
  DATE_FORMAT_STRING,
} from '../plugin_config/config'

Date.prototype.format = function(format) {
  var o = {
    "M+": this.getMonth() + 1, //month 
    "D+": this.getDate(), //day 
    "H+": this.getHours(), //hour 
    "m+": this.getMinutes(), //minute 
    "s+": this.getSeconds(), //second 
    "q+": Math.floor((this.getMonth() + 3) / 3), //quarter 
    "S": this.getMilliseconds() //millisecond 
  }

  if (/(Y+)/.test(format)) {
    format = format.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));
  }

  for (var k in o) {
    if (new RegExp("(" + k + ")").test(format)) {
      format = format.replace(RegExp.$1, RegExp.$1.length === 1 ? o[k] : ("00" + o[k]).substr(("" + o[k]).length));
    }
  }
  return format;
}

//对象转url参数字符串
export function parseParam(param, key = null) {
  var paramStr = "";
  let type = typeof param
  if (type === 'string' || type === 'number' || type === 'boolean') {
    paramStr += "&" + key + "=" + encodeURIComponent(param);
  } else if (type === 'object' && param.constructor === Object) {
    Object.keys(param).forEach(key => {
      paramStr += parseParam(param[key], key);
    })
  } else {
    throw Error(`parseParam => [param] type error`)
  }
  return paramStr
}

// ------ 日志 ------ //
export function logger(object, alerted = false, type = 'debug') {
  if (alerted) {
    alert(alerted)
  }
  let obj = JSON.stringify(object)
  console[type]('logger =>', obj)
  let notice = `${new Date().format(DATE_FORMAT_STRING)} [${alerted}]`
  localStorage.setItem(notice, obj)
}

// ------ 根据服务端返回来的数据转成控件所需要的格式 ------ //
export function getFieldsValueObj(dout, fields) {
  let obj = {}

  let dateFields = fields.dateFields || ''
  let cascadeFields = fields.cascadeFields || ''
  let multiFields = fields.multiFields || ''

  /*init cascade array*/
  for (let cascades in cascadeFields) {
    obj[cascades] = {
      value: []
    }
  }
  for (let field in dout) {
    // 接口数据
    let servdata = dout[field]
      /*时间字段转换*/
    if (dateFields.indexOf(field) > -1) {
      let date = new Date(parseInt(servdata))
      obj[field] = {
        value: !!servdata ? moment(date, DATE_FORMAT_STRING) : null
      }
    } else if (multiFields.indexOf(field) > -1) {
      /*多选字段转换*/
      obj[field] = {
        value: servdata === '' ? [] : servdata.split(',')
      }
    } else {
      /*地区级联字段转换*/
      for (let cascades in cascadeFields) {
        cascadeFields[cascades].forEach((cascade, index) => {
          if (cascade.indexOf(field) > -1) {
            obj[cascades].value[index] = servdata
          }
        })
      }
      /*正常字段处理*/
      obj[field] = {
        value: servdata
      }
    }
  }

  console.debug('getFieldsValueObj', '=>', obj)
  return obj
}