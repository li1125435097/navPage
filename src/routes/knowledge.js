const express = require('express')
const router = express.Router()
const fileDbHandle = require('../../common/fileDbHandle.js').default
const handle = new fileDbHandle('knowledge',['title','text','url'])




// router.get('/index',(req,res)=>{
// 	res.render('knowledge',{})
// })


router.get('/getdata',async (req,res)=>{
	let result = await handle.getData()
	res.send(result)
})

router.post('/adddata',async (req,res)=>{
	req.body.text ? req.body.url = 'none' : req.body.text = 'none'
	let result = await handle.addData(req.body)
	if(result == '写入成功'){res.redirect('/knowledgelib')}
	else{res.send(result)}
	
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