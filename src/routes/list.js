const express = require('express')
const router = express.Router()
const fileDbHandle = require('../../common/fileDbHandle.js').default
const userHandle = new fileDbHandle('user',['user','pwd','name','tel','status'])
const handle = new fileDbHandle('webPage',['href','img','name','type','doc'])

router.use(async (req,res,next)=>{
	let user = req.signedCookies.user
	let users = await userHandle.getData()
	console.log()
	let manager = users.some(v=>{return (v.user==user && v.status ==100)})
	if(manager || req.url == '/getdata'){next()}
	else{		return res.send('你没有管理权限')		}
})

router.get('/getdata',async (req,res)=>{
	let result = await handle.getData()
	res.send(result)
})

router.post('/adddata',async (req,res)=>{
	let result = await handle.addData(req.body)
	res.redirect('/manage')
})


router.post('/adddatas',async (req,res)=>{
	let result = await handle.addData(req.body)
	res.send(result)
})

router.get('/deldata/:id',async (req,res)=>{
	let id = req.params.id
	let result = await handle.delData(id)
	res.send(result)
})

router.post('/updata',async (req,res)=>{
	console.log(req.body)
	const {id,data} = req.body
	let result = await handle.updata(id,JSON.parse(data))
	res.send(result)
})

module.exports = router