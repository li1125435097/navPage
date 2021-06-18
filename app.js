const express = require('express')
const ejs = require('ejs')
const path = require('path')
const bodyParser = require('body-parser')
const app = express()

//设置允许跨域访问该服务.
// app.all('*', function (req, res, next) {
// res.header('Access-Control-Allow-Origin', '*');
// //Access-Control-Allow-Headers ,可根据浏览器的F12查看,把对应的粘贴在这里就行
// res.header('Access-Control-Allow-Headers', 'Content-Type');
// res.header('Access-Control-Allow-Methods', '*');
// res.header('Content-Type', 'application/json;charset=utf-8');
// next();
// });

// 服务器配置

app.use('/static',express.static(path.join(__dirname,'src/static')))
app.engine('html',ejs.__express)
app.set('view engine','html')
app.set('views',path.join(__dirname,'src/views'))
app.use(bodyParser.urlencoded({extended : false}))
app.use(bodyParser.json())

// 路由配置
app.use('/',require('./src/routes/main.js'))
app.use('/list',require('./src/routes/list.js'))
app.use('/schedule',require('./src/routes/scheduleList.js'))




// 错误页面处理
app.get('/*',function(req,res){res.send('你访问的页面不存在！！！')})
app.listen(3333,function(){console.log('servering......')})
	