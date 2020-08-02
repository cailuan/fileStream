Promise.resolve().then(()=>{
  return Promise.resolve().then(()=>{
    console.log('promise1')
  }).then(()=>{
    console.log('promise2')
  })
}).then((ki)=>{
  console.log('then promise1',ki)
})