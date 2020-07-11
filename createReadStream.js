const fs = require("fs");
const event = require('./event.js')

class  createReadStream extends event {
  constructor(url,option){
    super()
    this.path = url
    this.flags = option.flags
    this.encoding = option.encoding
    this.fd = option.fd
    this.mode = option.mode
    this.autoClose = option.autoClose
    this.emitClose = option.emitClose
    this.start = option.start
    this.end = option.end
    this.highWaterMark = option.highWaterMark
    this.fs = option.fs
    this.open(url)
    this.post = option.start
    
    this.on('newListener',(event)=>{
      if(event == 'data'){
        console.log(event,'event')
        this.read()
      }
    })
  }
  open(path){
    fs.open(path,this.flags,this.mode,(err,fd)=>{
      if(err){
        this.emit('err',err)
        return
      }
      
      this.fd = fd
      // console.log(fd,'fd',this)
      this.emit('open',this.fd)
    })
  }
  read(){
    // console.log(this,'read')
    if(typeof this.fd != 'number' ){
      this.once('open',this.read.bind(this))
      // this.once('open',this.read)
      return 
    }
    let buffer =  Buffer.alloc(this.highWaterMark)
    fs.read(this.fd,buffer,0,this.highWaterMark,this.post,(err,bytesRead)=>{
      if(err){
        this.emit('err',err)
        return
      }else{
        if(bytesRead){
          this.post +=bytesRead
          
          this.emit('data',buffer.slice(0,bytesRead))
          // console.log(this.buffer.slice(0,bytesRead).toString())
          this.checkLastData()
          this.read()
        }else{
          this.last()
          
        }
        
      }
      
    })
    
  }
  checkLastData(){
    let tem = this.end -  this.post
    if(parseInt(tem/this.highWaterMark) == 0 && tem != this.highWaterMark){
      // 最后一次调用
      this.highWaterMark = tem
    }
    
  }
  last(){
    this.emit('end')
    if(this.autoClose){
      fs.close(this.fd,(err)=>{
        if(err){
          this.emit('error',err)
        }else{
          this.emit('close')
        }
      })
    }
  }
}
module.exports = createReadStream