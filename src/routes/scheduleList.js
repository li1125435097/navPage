const express = require('express')
const router = express.Router()
const fileDbHandle = require('../../common/fileDbHandle.js').default
// const handle = new fileDbHandle('schedule',['content','changeTime','top','done'])
const userHandle = new fileDbHandle('user',['user','pwd','name','tel','status'])
const dbField = ['content','changeTime','top','done']


async function getHandle(user){
	let users = await userHandle.getData()
	let id = -1
	for(let i = 0;i<users.length;i++){
		if(users[i].user == user){
			id = users[i].id
			break
		}
	}
	if(user == 'jinke') id = ''
	// console.log(users,id,user)
	const handle = fileDbHandle.getInstance('schedule'+id,dbField)
	return handle
}


router.get('/index',(req,res)=>{
	res.render('schedule',{})
})


router.get('/getdata',async (req,res)=>{
	if(!req.signedCookies.user) res.send([])
	let handle = await getHandle(req.signedCookies.user)
	let result = await handle.getData()
	res.send(result)
})

router.post('/adddata',async (req,res)=>{
	if(!req.signedCookies.user){
		res.redirect('/user/login')
	}else{
		let handle = await getHandle(req.signedCookies.user)
		let result = await handle.addData(req.body)
		res.send(result)
	}
	
})

router.get('/deldata/:id',async (req,res)=>{
	let handle = await getHandle(req.signedCookies.user)
	let id = req.params.id
	let result = await handle.delData(id)
	res.send(result)
})

router.post('/updata',async (req,res)=>{
	let handle = await getHandle(req.signedCookies.user)
	console.log(req.body)
	const {id,data} = req.body
	let result = await handle.updata(id,JSON.parse(data))
	res.send(result)
})


module.exports = router