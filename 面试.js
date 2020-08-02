let p = new Promise((resolve,reject)=>{
  console.log(1)
  resolve()
  console.log(2)
})
p.then(()=>{
  console.log(3)
})
console.log(4)


console.log(a)
var a = 2
console.log(a)
function a(){
  console.log(3)
}
console.log(a)

Promise.resolve(1).then(res=>{
  console.log(res)
  throw Error(33)
}).catch((err)=>{
  console.log('22')
  return 3
})
.then(res=>{
  console.log(res)
})

setTimeout(()=>{
  console.log('setTimeout')
})
let p2 = new Promise((resolve,reject)=>{
  console.log('promise1')
  resolve('promise2')
})
p2.then((res)=>{
  console.log(res)
})
console.log(1)


new Promise((resolve)=>{
  resolve()
}).then((resolve)=>{
  return new Promise((resolve,reject)=>{
    reject()
  })
}).then((data)=>{console.log('data')}).catch(()=>{
  console.log('error')
})