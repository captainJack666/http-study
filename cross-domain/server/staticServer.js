const http = require('http')
const path = require('path')
const fs = require('fs')
const PORT = 8888

http.createServer((request, response) => {
  console.log(request.url, 'request.url')
  const html = fs.readFileSync(path.resolve(__dirname, '../www/cross-domain.html'), 'utf8')
  response.writeHead(200, {
    'Content-type': 'text/html'
  })
  response.end(html)
}).listen(PORT)
console.log('server is running on ' + PORT)