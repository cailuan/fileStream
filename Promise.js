const ENUM = {
  PENDING: 'PENDING',
  FULFILLED: 'FULFILLED',
  REJECTED: 'REJECTED'
}
// 需要兼容其他人的promise
const resolvePromise = (x, promise2, resolve, reject) => {
  // 根据x 的值来解析promise2 是成功还是失败
  if (x === promise2) {
      reject(new TypeError(`TypeError: Chaining cycle detected for promise #<Promise>`))
  }
  // 如果x 是一个promise 那么就采用他的状态
  // 如何判断一个值是否是promise  （看有没有then方法 ，有then方法说明是promise）
  if ((typeof x === 'object' && x !== null) || typeof x === 'function') {
      // x 是一个对象或者 是一个函数 
      // 在进行一个判断

      //  这里解析的x 如果是一个promise的话 可能是别人家的promise
      let called;
      try {
          let then = x.then; // 取出then方法
          if (typeof then == 'function') {
              // 就是promise, 复用上次取出来的then方法  x.then
              then.call(x, y => { // x:{then:()=>{}}
                  // 这里的y 可能也是一个promoise
                  // 递归解析y的值,直到这个结果是一个普通值为止 ，将结果作为promise2的成功或者失败
                  if (called) return;
                  called = true;
                  resolvePromise(y, promise2, resolve, reject);
              }, r => {
                  // 一旦失败就直接失败即可
                  if (called) return;
                  called = true;
                  reject(r);
              })
          } else {
              // 普通对象不是promise
              resolve(x); // {a:1}
          }
      } catch (e) {
          if (called) return;
          called = true;
          reject(e);
      }
  } else {
      // 普通值 
      resolve(x); // 直接成功即可  123
  }
}
class Promiset {
  constructor(executor) {
      this.status = ENUM.PENDING;
      this.value = undefined; // 实例上的属性 每次new 都会创建一个新的
      this.reason = undefined;
      // 需要创建成功的队列 失败的队列，分别存放
      this.onResolvedCallbacks = [];
      this.onRejectedCallbacks = [];
      const resolve = (value) => {
          if (this.status === ENUM.PENDING) {
              this.status = ENUM.FULFILLED;
              this.value = value; // 先赋予的值 再循环
              this.onResolvedCallbacks.forEach(fn => fn())
          }
      }
      const reject = (reason) => {
          if (this.status === ENUM.PENDING) {
              this.status = ENUM.REJECTED;
              this.reason = reason;
              this.onRejectedCallbacks.forEach(fn => fn())
          }
      }
      try {
          executor(resolve, reject);
      } catch (e) {
          reject(e)
      }
  }
  then(onFulfilled, onRejected) {
      onFulfilled = typeof onFulfilled == 'function' ? onFulfilled : v => v;
      onRejected = typeof onRejected === 'function' ? onRejected : err => { throw err };
      // 调用then 方法 创建一个新的promise
      let promise2 = new Promise((resolve, reject) => {
          // 我需要根据 x 的状况来判断是调用resolve还是reject
          if (this.status == ENUM.FULFILLED) {
              // todo...
              setTimeout(() => {
                  try {
                      let x = onFulfilled(this.value);
                      // 解析promise
                      // resolvePromise(x, promise2, resolve, reject)
                      resolve(x)
                  } catch (e) {
                      reject(e);
                  }
              }, 0);
          }
          if (this.status == ENUM.REJECTED) {
              // todo...
              setTimeout(() => {
                  try {
                      let x = onRejected(this.reason);
                      reject(x)
                      // resolvePromise(x, promise2, resolve, reject)
                  } catch (e) {
                      reject(e);
                  }
              }, 0);
          }
          if (this.status == ENUM.PENDING) {
              // 用户还没有调用resolve或者reject方法
              this.onResolvedCallbacks.push(() => {
                  // todo...
                  setTimeout(() => {
                      try {
                          let x = onFulfilled(this.value);
                          // resolvePromise(x, promise2, resolve, reject)
                      } catch (e) {
                          reject(e);
                      }
                  }, 0);
              });
              this.onRejectedCallbacks.push(() => {
                  // todo...
                  setTimeout(() => {
                      try {
                          let x = onRejected(this.reason);
                          // resolvePromise(x, promise2, resolve, reject)
                      } catch (e) {
                          reject(e);
                      }
                  }, 0);

              })
          }
      });
      return promise2;
  }
}

new Promiset((resolve)=>{
  setTimeout(()=>{
    resolve('111')
  })
}).then(res=>{
  console.log(res)
}).then(()=>{
  console.log('33')
})