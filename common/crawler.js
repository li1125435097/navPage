const fs = require('fs')
const url = require('url')
const path = require('path')
const os = require('os')
const cheerio = require('cheerio')
const { exec } = require('child_process')

const prefix = {HSW:'https://www.', HS:'https://', HW:'http://www.', H:'http://'}
const suffix = {C:'.com', O:'.org'}


//根据网址生成脚本函数
function _generateSheel(urls){
	let result = []
	urls.map((v)=>{
		let host = url.parse(v.url).host
		host = host.replace(/www\.|\.com/g,'')
		result.push({url:v.url,script:`curl ${v.url} && echo ${host} success >>log.txt`,title:v.title})
	})
	return result
}

//创建文件夹并执行脚本
function _runScript(v,isDefault){
	return new Promise((resolve,reject)=>{
		exec(v.script, (error, stdout, stderr) => {
		if (error) {reject(`exec error: ${error}`) }
		const $ = cheerio.load(stdout)
		let data = getData($,v.title,v.url)
		isDefault ? resolve(data) : resolve($)
		})	
	})
}

function getData($,title,href){
	let myhref = href
	let img = href + '/favicon.ico'
	let name = title
	let type = 'undefine'
	let doc = $('title').text()
	return {href:myhref,img:img,name:name,type:type,doc:doc}
}

function _craw(urls,isDefault){
	return new Promise((resolve,reject)=>{
		const scripts = _generateSheel(urls)
		let l = scripts.length
		let flag = (l+1)/2*l
		let addi = 0
		let result = []
		scripts.map(async (v,i)=>{
			let data = await _runScript(v,isDefault)
			console.log(123,data,i,)
			result.push(JSON.parse(JSON.stringify(data)))
			addi += i+1
			if(flag == addi) resolve(result)
		})
	})
}

async function test1(){
	let data = await _craw([{url:'https://codepen.io/',title:'codeopen'},{url:'https://www.baidu.com',title:'baidu'}],1)
	console.log(data,2222)
}
// test1()


exports.default = {
	prefix,
	suffix,
	craw:_craw,
}
