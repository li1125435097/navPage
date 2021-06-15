const express = require('express')
const router = express.Router()
const handle = require('../dbHandle/jsonDataHandle.js')

router.get('/getdata',async (req,res)=>{
	let result = await handle.getData()
	res.send(result)
})

router.post('/adddata',async (req,res)=>{
	let result = await handle.addData(req.body)
	res.redirect('/manage')
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