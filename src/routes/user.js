const express = require('express')
const router = express.Router()
const fileDbHandle = require('../../common/fileDbHandle.js').default
const handle = new fileDbHandle('user',['user','pwd','name','tel','status'])




router.get('/login',(req,res)=>{
	res.render('login',{})
})

router.get('/register',(req,res)=>{
	res.render('register',{})
})


router.post('/login',async (req,res)=>{
	let {user,pwd} = req.body
	let users = await handle.getData()
	let result = users.some(v=>{return v.user == user && v.pwd == pwd })
	// result = result ? {user:user,status:true} : {status:false}
	if(result){
		res.cookie('user',user,{signed: true})
		res.redirect('/')
	}else{
		res.redirect('/user/login')
	}
	
})

router.post('/register',async (req,res)=>{
	let users = await handle.getData()
	let isHave = users.some(v=>{return v.user == req.body.user})
	if(isHave){
		res.redirect('/user/register')
	}else{
		let result = await handle.addData(Object.assign(req.body,{status:1}))
		if(result == '写入成功'){
			res.cookie('user',req.body.user,{signed: true})
			res.redirect('/')
		} 
		else{res.render('register',{})}
	}
})

router.get('/getCookie',async (req,res)=>{
	res.send(req.signedCookies.user)
})

router.get('/logout',async (req,res)=>{
	res.cookie('user','',{maxAge:0})
	res.send('success')
})

router.post('/updata',async (req,res)=>{
	console.log(req.body)
	const {id,data} = req.body
	let result = await handle.updata(id,JSON.parse(data))
	res.send(result)
})

module.exports = router