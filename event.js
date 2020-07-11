function event(){
  this._event = {}
}

event.prototype.on = function(eventName,callback){
  if(!this._event){
    this._event = {}
  }
  
  if(eventName != 'newListener' && this._event['newListener'] ){
    // console.log('newListener',eventName,callback.el? callback.el : callback)
    this.emit('newListener',eventName,callback)
  }
  let callbacks = this._event[eventName] || []
  callbacks.push(callback)
  this._event[eventName] = callbacks
}

event.prototype.emit = function(eventName,...args){
  // console.log(this._event[eventName],eventName,'emit')
  if(this._event && this._event[eventName]){
    this._event[eventName].forEach(callback => {
      callback(...args)
    });
  }
}

event.prototype.off = function(eventName,callback){
  if(this._event && this._event[eventName]){
    
    this._event[eventName] = this._event[eventName].filter(call=>{
      // console.log(call != callback)
      return !(call == callback  || call.el == callback)
    })
  }
}

event.prototype.once = function(eventName,callback){
  let callbacks =  (...args)=>{
    callback(...args)
    this.off(eventName,callbacks)
  }
  callbacks.el = callback
  this.on(eventName,callbacks)
}

module.exports = event;

// {name:[function1,function2]}