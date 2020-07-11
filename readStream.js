const fs = require("fs");
const createReadStream = require('./createReadStream.js')

const stream = new createReadStream('./self.js',{
  flags:'r',
  encoding:null,
  fd:null,
  mode:0o666,
  autoClose:true,
  emitClose:false,
  start:0,
  end:15,
  highWaterMark:3,
  fs:null
})

let arr = []
stream.on('data',(data)=>{
  arr.push(data)

  // console.log(data.toString())
})
stream.on('end',()=>{
  // console.log(arr)
  console.log(Buffer.concat(arr).toString())
  // console.log(arr,'end')
  
})
stream.on('open',(fd)=>{
  console.log(fd,'open')
})
stream.on('error',(error)=>{
  console.log(error,'error')
})
stream.on('close',()=>{
  console.log('close')
})