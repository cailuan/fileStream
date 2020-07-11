const event = require('events')
// const event = require('./event.js')


// let girl = new event()
let Gril = function(){}
// Gril.prototype = new event()

Object.setPrototypeOf(Gril.prototype,event.prototype)

let girl = new Gril()
let eat = function(){
  console.log('eat')
}
let cry = function(){
  console.log('cry')
}
girl.on('newListener',(event, listener)=>{
  // console.log(event,listener)
  process.nextTick(()=>{
    console.log('newListener')
    girl.emit('cli')
  })
  
})

girl.off('newListener',eat)
// console.log(girl.on)
// girl.once('cli',eat)
// girl.on('cli',cry)
girl.once('event',cry)
setTimeout(()=>{
  girl.once('cli',eat)
})



// girl.emit('cli',1)
// girl.emit('event',1)

