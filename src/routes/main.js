const express = require('express')
const router = express.Router()
const fs = require('fs')

// 中间件配置
router.use(function timeLog(req,res,next){
	console.log('Time: ',Date.now())
	next()
})



router.get('/',function(req,res){
	res.render('index',{name:123})
	
})
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