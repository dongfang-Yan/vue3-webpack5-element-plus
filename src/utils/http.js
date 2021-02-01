function getToken() {
  const token = localStorage.getItem('token') !== undefined ? localStorage.getItem('token') : ''
  return token
}

window.$tm = (url = '', data = {}) => {
  return new Promise((resolve,reject) => {
    let xmlHttp = new XMLHttpRequest;
    if(window.XMLHttpRequest) {
      xmlHttp = new XMLHttpRequest;
    }else{
      // 兼容IE6,6
      xmlHttp == new ActiveXObject("Microsoft.XMLHTTP");
    }
    try{
      if (xmlHttp == null) return '浏览器不支持XMLHttpRequest请求'
    } catch(err) {
      console.log(err);
    }

    let requestData = '';
    for(let key in data) {
      requestData += key + '=' + data[key] + '&';
    }
    if(requestData !== '') {
      requestData = requestData.substring(0,requestData.length - 1)
    }
    const httpUrl = '/api/'+ url
    xmlHttp.open("POST", httpUrl,true)
    xmlHttp.setRequestHeader('Content-Type','application/x-www-form-urlencoded')
    xmlHttp.setRequestHeader('Authorization', getToken())
    xmlHttp.send(requestData)

    xmlHttp.onreadystatechange = () => {
      if (xmlHttp.readyState === 4 && xmlHttp.status === 200) {
        let res = JSON.parse(xmlHttp.responseText);
        if(res && res.code === '10000') {
          resolve(res.result)
        }else{
          reject(res.msg)
        }
      } 
    }
  })
}