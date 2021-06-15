const fs = require('fs')
const path = require('path')
const dbSource = path.resolve(__dirname,'../../jsonData/webPage.json')


module.exports = {getData,addData,delData,updata}


async function getData(){
	return new Promise((resolve,reject)=>{
		fs.readFile(dbSource,(err,data)=>{
			if(err) reject(err)
			resolve(JSON.parse(data))
		})
	})
}

async function addData(newData){
	let oldData = await getData()
	newData.id = oldData.length>0 ? oldData[oldData.length-1].id+1 : 1
	oldData.push(newData)
	return new Promise((resolve,reject)=>{
		if(checkData(newData)) return resolve('数据格式错误')
		fs.writeFile(dbSource,JSON.stringify(oldData),(err)=>{
			if(err) reject(err)
			else resolve('写入成功')
		})
	})	
}

async function delData(id){
	let oldData = await getData()
	let index = getIndex(id,oldData)
	return new Promise((resolve,reject)=>{
		if(!index && index!=0) return resolve('id不正确！！！')
		oldData.splice(index,1)
		fs.writeFile(dbSource,JSON.stringify(oldData),(err)=>{
			if(err) reject(err)
			else resolve('删除成功')
		})
	})	
}

async function updata(id,data){
	console.log(id,data)
	let oldData = await getData()
	let index = getIndex(id,oldData)
	return new Promise((resolve,reject)=>{
		if(!index && index!=0) resolve('id不正确！！！')
		for(v in data){
			oldData[index][v] = data[v]
		}
		fs.writeFile(dbSource,JSON.stringify(oldData),(err)=>{
			if(err) reject(err)
			else resolve('更新成功')
		})
	})	
}

function getIndex(id,data){
	let index
	data.map(function(v,i){
		if(v.id == id) index = i
	})
	return index
}

function checkData(data){
	const {href,img,name,type,doc} = data
	let end = href && img && name && type && doc
	return !end
}

// delData(4).then((data)=>{console.log(data)})			//删除测试
// getData().then((data)=>{	console.log(data)})		//获取数据测试
// testAdd()											//添加测试
// updata(1,{href:123}).then((data)=>{	console.log(data)})		//获取数据测试


function testAdd(){
	addData({
							href: 'https://www.baidu.com',
							img: 'https://img0.baidu.com/it/u=1741767756,261912594&fm=26&fmt=auto&gp=0.jpg',
							name: 'ppt市场',
							type: 'ppt工具',
							doc: '是的付款时间的飞机上家里的饭睡了多久放款'
	}).then((data)=>{	console.log(data)})
}