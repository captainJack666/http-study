
### 本文详见
- github: https://github.com/captainJack666/http-study/tree/master/cross-domain
- segmentfault: https://segmentfault.com/a/1190000017249063

## server文件夹
### server.js 提供主server api服务
npm run server/server.js 开启服务

### staticServer.js 提供一个静态html容器
npm run server/staticServer.js 开启服务

## www文件夹
### cross-domain.html 客户端页面，发送XHR或者fetch


## 浏览器跨域相关

跨域是为了保证服务端的安全，不允许随便的请求，这是浏览器的安全行为

tips

> localhost和127.0.0.1不同域，浏览器并不知道localhost映射到的是127.0.0.1，所以认为他们不同域

### 普通跨域之Access-Control-Allow-Origin

当浏览器出现跨域报错时，**==其实服务器的响应已经到达浏览器了==**，只不过浏览器会对比请求的头信息，对比当前域是否是被Access-Control-Allow-Origin头信息允许的，如果不允许，则提示报错

### JSONP

对于link,script,image等标签src或ref是可以拿到非同域的资源，js动态创建script标签则可获取到数据，**这个不需要后端支持**

### CORS预请求&&跨域

敲黑板：Access-Control-Allow-Origin并不能完全支持跨域，还有其他限制，比如使用fetch，有些自定义头信息，超出允许范围的方法等，在跨域的时候，都是不被允许的

#### **预请求**

在以下允许范围之外的，都需要通过预请求的验证&&一些限制

- 允许方法
  - GET
  - POST
  - HEAD
- 允许Content-Type
  - text/plain
  - multipart/form-data
  - application/x-www-form-urlencoded
- 请求头限制，查看官方文档吧
- XMLHttpRequestUpload对象均没有注册任何时间监听器
- 请求中没有使用ReadableStream对象

预请求根据什么来判断这个请求是否是被允许的呢 - Response Headers信息，浏览器读取Response Headers信息来知道当前请求是不是被允许的

对于CORS跨域，限制条件有很多，如下，这些在限制条件之内才可以允许

- 自定义的方法
- Content-Type
- 头信息
- … 详见官方文档

#### 以自定义头信息举例

前端

```javascript
fetch('http://127.0.0.1:8887', {
  method: 'POST',
  // 此处添加一条自定义头信息
  headers: {
    'X-Test-Cors111': 'test'
  }
})
```

后端

```javascript
response.writeHead(200, {
  'Access-Control-Allow-Origin': '*',
})
```

## 此时浏览器提示准确的相应的报错

![cors自定义头信息报错](http://images.laputa.net.cn/articles/http-study/cors%E8%87%AA%E5%AE%9A%E4%B9%89%E5%A4%B4%E4%BF%A1%E6%81%AF%E6%8A%A5%E9%94%99.png)

此时后端需要如下，允许这种自定义头信息，才可以可以正常返回

```javascript
response.writeHead(200, {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'X-Test-Cors111'
})
```

同理，还有以下其他的限制

-  'Access-Control-Allow-Headers':  'X-Test-Cors111'  //针对自定义头信息
- 'Access-Control-Allow-Methods': 'PUT, DELETE', // 针对自定义方法
- 'Access-Control-Max-Age': '1000',  // Access-Control-Max-Age：当前请求下面，以上述形式请求允许跨域的，1000s之内不需要发送预请求来验证了，直接发起正式的请求即可

tips:

> chrome devTools有时候会不提示options预请求的XHR？发送options预请求的不好验证
>
> 查看详细的http请求和响应的内容:  curl -v www.baidu.com

