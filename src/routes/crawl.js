const express = require('express')
const router = express.Router()
const crawl = require('../../common/crawler.js').default.craw


router.post('/crawlurl',async function(req,res){
	let result = ''
	if(req.body.url){result = await crawl([req.body],1)}
	else{result = await crawl(JSON.parse(req.body.data),1)}
	res.send(result)
})


module.exports = router