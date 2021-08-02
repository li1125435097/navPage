const fs = require('fs')
const path = require('path')


// 文件数据库驱动,提供基本增删改查操作
class FileHandle{
	
	//mypath是数据库文件的名字，format是数据库字段名数组（id是默认字段，不用写）
	//new FileHandle('webPage1',['name','sex'])
	constructor(mypath,format) {
	    this.mypath = mypath
	    this.format = format
		
		//数据库绝对路径
		this.dbPath = path.resolve(__dirname,`../jsonData/${mypath}.json`)
		
		//判断数据库是否存在，不存在新建一个
		this.testDbSource()
	}
	
	static getInstance(mypath,format){
		if(!this.Instance || this.mypath != mypath){
			this.Instance = new FileHandle(mypath,format);
		}
		return this.Instance;
	}
	
	// 获取数据
	async getData(){
		return new Promise((resolve,reject)=>{
			fs.readFile(this.dbPath,(err,data)=>{
				if(err) reject(err)
				resolve(JSON.parse(data))
			})
		})
	}
	
	// 增加数据
	async addData(newData){
		let oldData = await this.getData()
		newData.id = oldData.length>0 ? oldData[oldData.length-1].id+1 : 1
		oldData.push(newData)
		return new Promise((resolve,reject)=>{
			if(this.checkData(newData)) return resolve('数据格式错误')
			fs.writeFile(this.dbPath,JSON.stringify(oldData),(err)=>{
				if(err) reject(err)
				else resolve('写入成功')
			})
		})	
	}
	
	// 删除数据
	async delData(id){
		let oldData = await this.getData()
		let index = this.getIndex(id,oldData)
		return new Promise((resolve,reject)=>{
			if(!index && index!=0) return resolve('id不正确！！！')
			oldData.splice(index,1)
			fs.writeFile(this.dbPath,JSON.stringify(oldData),(err)=>{
				if(err) reject(err)
				else resolve('删除成功')
			})
		})	
	}
	
	// 更新数据
	async updata(id,data){
		console.log(id,data)
		let oldData = await this.getData()
		let index = this.getIndex(id,oldData)
		return new Promise((resolve,reject)=>{
			if(!index && index!=0) resolve('id不正确！！！')
			for(let v in data){
				oldData[index][v] = data[v]
			}
			fs.writeFile(this.dbPath,JSON.stringify(oldData),(err)=>{
				if(err) reject(err)
				else resolve('更新成功')
			})
		})	
	}
	
	// 获取数组中数据下标
	getIndex(id,data){
		let index
		data.map(function(v,i){
			if(v.id == id) index = i
		})
		return index
	}
	
	// 校验输入数据是否符合数据库模板
	checkData(data){
		
		//如果数据长度与模板长度不一样，返回true
		const isLength = Object.keys(data).length-1 == this.format.length
		if(!isLength) return true
		
		//如果数据键与模板不一样，返回true
		let end = this.format.every((v)=>{return data[v]})
		return !end
	}
	
	//判断文件数据库是否存在，不存在新建一个
	testDbSource(){
		let exist = fs.existsSync(this.dbPath)
		if(!exist) fs.writeFileSync(this.dbPath,'[]')
	}
}

exports.default = FileHandle

async function test(){
	let handle = new FileHandle('webPage1',['name','sex'])
	// let end = await handle.addData({name:'jinke',sex:'nan'})
	// let end = await handle.delData(2)
	// let end = await handle.updata(1,{name:'sb'})
	let end = await handle.getData()
	console.log(end)
}
// test()