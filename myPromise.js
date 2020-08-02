let PADDING = 'PADDING'
let REJECTED = 'REJECTED'
let RESOLVED = 'RESOLVED'

const resolvePromise = (promise2,x,resolve,reject)=>{
  if(promise2 === x){
    return reject(new TypeError('TypeError'))
  }
  if(typeof x == 'function' || (typeof x == 'object' && x!=null)){
    try{
      let then = x.then
      if(typeof then == 'function'){
        then.call(x,y=>{
          // resolve(y)
          console.log('promise',y)
          resolvePromise(promise2,y,resolve,reject)
        },r=>{reject(r)})
      }else{
        resolve(x)
      }
    }catch(err){
      reject(err)
    }
    

  }else{
    resolve(x)
  }
}

class MyPromise{
  constructor(execution){
    this.status = PADDING
    this.value = undefined
    this.reason = undefined
    this.resovleCallback = []
    this.rejectCallback = []
    let resolve = (res)=>{
      if(this.status == PADDING){
        this.value = res
        this.status = RESOLVED
        this.resovleCallback.forEach(fn=>fn())

      }
      
    }
    let reject = (err)=>{
      if(this.status == PADDING){
        this.reason = err
        this.status = REJECTED
        this.rejectCallback.forEach(fn=>fn())
      }
      
    }
    try{
      execution(resolve,reject)
    }catch(e){
      reject(e)
    }
  }
  then(onFulfilled,onRejected){
    let promise2 = new MyPromise((resolve,reject)=>{
      if(this.status == RESOLVED){
        setTimeout(()=>{
          let x =  onFulfilled(this.value)
          // resolve(x)
          resolvePromise(promise2,x,resolve,reject)
        },0)
        
      }
      if(this.status == REJECTED){
        setTimeout(()=>{
          let x = onRejected(this.reason)
          resolvePromise(promise2,x,resolve,reject)
        },0)
        
      }
      if(this.status == PADDING){
        this.resovleCallback.push(()=>{
          let x =  onFulfilled(this.value)
          resolvePromise(promise2,x,resolve,reject)
        })
        this.rejectCallback.push(()=>{
          let x =  onRejected(this.reason)
          resolvePromise(promise2,x,resolve,reject)
        })
      }
    })
    return promise2
  }
  catch(errerCallback){
    return this.then(null,errerCallback)
  }
}

let p1 = new MyPromise((resolve,reject)=>{
  // setTimeout(()=>{
  //   resolve('8')
  // })
  setTimeout(()=>{
    resolve('111')
  })

})
let p2 = p1.then((res)=>{
  console.log(res)
  
  return '999'
})
// console.log(p2)
p2.then((res)=>{
  console.log(res)
})