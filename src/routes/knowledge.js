const express = require('express')
const router = express.Router()
const fileDbHandle = require('../../common/fileDbHandle.js').default
const userHandle = new fileDbHandle('user',['user','pwd','name','tel','status'])
const dbField = ['title','text','url']
// const handle = new fileDbHandle('knowledge',['title','text','url'])


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
	const handle = fileDbHandle.getInstance('knowledge'+id,dbField)
	return handle
}


router.get('/getdata',async (req,res)=>{
	let handle = await getHandle(req.signedCookies.user)
	let result = await handle.getData()
	res.send(result)
})

router.post('/adddata',async (req,res)=>{
	if(!req.signedCookies.user){
		res.redirect('/user/login')
	}else{
		req.body.text ? req.body.url = 'none' : req.body.text = 'none'
		let handle = await getHandle(req.signedCookies.user)
		let result = await handle.addData(req.body)
		if(result == '写入成功'){res.redirect('/knowledgelib')}
		else{res.send(result)}
	}
	
})

router.get('/deldata/:id',async (req,res)=>{
	let id = req.params.id
	let handle = await getHandle(req.signedCookies.user)
	let result = await handle.delData(id)
	res.send(result)
})

router.post('/updata',async (req,res)=>{
	console.log(req.body)
	const {id,data} = req.body
	let handle = await getHandle(req.signedCookies.user)
	let result = await handle.updata(id,JSON.parse(data))
	res.send(result)
})

module.exports = router