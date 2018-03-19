import fetch from 'dva/fetch';
import React, { Component } from 'react'

// function parseJSON(response) {
//   return response.json();
// }

function checkStatus(response) {
  if (response.status >= 200 && response.status < 300) {
    return response;
  }

  const error = new Error(response.statusText);
  error.response = response;
  throw error;
}
//后端服务需要统一返回格式
/*
{
status：'error'/'success'
message:message
}

 */
function checkData({data}){
    let {status,message} = data;
    if("error" === status){
      //抛出错误，被hook抓取，在onError中统一处理
      throw new Error(message);
    }
}

/**
 * Requests a URL, returning a promise.
 *
 * @param  {string} url       The URL we want to request
 * @param  {object} [options] The options we want to pass to "fetch"
 * @return {object}           An object containing either "data" or "err"
 */
// export default function request(url, options) {
//   return fetch(url, options)
//     .then(checkStatus)
//     .then(parseJSON)
//     .then(data => ({ data }))
//     .catch(err => ({ err }));
// }
async function request(url, options) {
  console.log(url);
  console.log(options);
  const response = await fetch(url, options)
  checkStatus(response)
  const data = await response.json()
  const ret = {
    data,
    headers: {}
  }

  if (response.headers.get('x-total-count')) {
    ret.headers['x-total-count'] = response.headers.get('x-total-count')
  }
  // checkData(data);
  return ret
}

export default request
