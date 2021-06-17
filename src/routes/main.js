const express = require('express')
const router = express.Router()
const fs = require('fs')

// 中间件配置
router.use(function timeLog(req,res,next){
	console.log('Time: ',Date.now())
	next()
})

//主页路由
router.get('/',function(req,res){
	res.render('index',{name:123})
})

// 网站图标路由
router.get('/favicon.ico',function(req,res){
	res.redirect('/static/img/head-xs.ico')
})

//页面模板匹配路由
router.get('/:pagename',function(req,res){
	let pagename = req.params.pagename
	fs.exists(`./src/views/${pagename}.html`,function(exist){
		if(exist){
			res.render(pagename,{name:123})
		}else{
			res.send('你访问的页面不存在！！！')
		}
	})
})


module.exports = router