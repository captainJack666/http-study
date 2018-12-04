const http = require('http')
const PORT = 8887

http.createServer((request, response) => {
  console.log(request.url, 'request.url')
  // 1- 粗暴的跨域方式，'*'是不安全的，所有浏览器都可以拿到这个数据
  // response.writeHead(200, {
  //   'Access-Control-Allow-Origin': '*'
  // })
  
  // 2- 精确的跨域策略: 利用host来做多个域的白名单判断
  // var originHost = request.headers.origin
  // var whiteUrlList = [ 'http://www.laputa.net.cn', 'http://127.0.0.1:8888' ]
  // if(whiteUrlList.indexOf(originHost) > -1) {
  //   response.writeHead(200, {
  //     'Access-Control-Allow-Origin': originHost // 每次请求只返回一个响应，所以这里不用写数组
  //   })
  // }

  // 3- cors跨域
  response.writeHead(200, {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers': 'X-Test-Cors111', // 针对自定义头信息
    'Access-Control-Allow-Methods': 'PUT, DELETE', // 针对自定义方法
    /**
     * Access-Control-Max-Age：当前请求下面，以上述形式请求允许跨域的，1000s之内不需要发送预请求来验证了，
     * 直接发起正式的请求即可
     */
    'Access-Control-Max-Age': '1000',
  })
  response.end('jack')
}).listen(PORT)
console.log('server is running on ' + PORT)