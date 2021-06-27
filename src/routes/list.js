const express = require('express')
const router = express.Router()
const fileDbHandle = require('../../common/fileDbHandle.js').default
const handle = new fileDbHandle('webPage',['href','img','name','type','doc'])

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