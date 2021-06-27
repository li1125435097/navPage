const express = require('express')
const router = express.Router()
const crawl = require('../../common/crawler.js').default


router.post('/crawlurl',async function(req,res){
	let result = ''
	if(req.body.url){result = await crawl.craw([req.body],1)}
	else{result = await crawl.craw(JSON.parse(req.body.data),1)}
	res.send(result)
})


router.post('/crawldata',async function(req,res){
	let result = await crawl.crawl(req.body.url)
	res.send(result)
})

module.exports = router