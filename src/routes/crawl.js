const express = require('express')
const router = express.Router()
const crawl = require('../../common/crawler.js').default.craw


router.post('/crawlurl',async function(req,res){
	let result = ''
	if(req.body.url){result = await crawl([req.body])}
	else{result = await crawl(JSON.parse(req.body.data))}
	res.send(result)
})


module.exports = router