class Node{
  constructor(element,next){
    this.element = element
    this.next = next
  }
}

class linkedList{
  constructor(){
    this.head = null
    this.size = 0
  }
  add(index,element){
    if(arguments.length == 1){
      element = index
      index = this.size
    }
    if(index > this.size) throw new Error('链表长度超出') 
    if(index == 0){
      this.head = new Node(element,this.head)
    }else{
      let current = this.head
      for(let i = 0 ; i < index - 1; i ++){
        current = current.next
      }
      current.next = new Node(element,current.next)
    }
    ++this.size
  }
  remove(index){
    if(index >= this.size) throw new Error('链表长度超出，不能删除')
    if(index == 0){
      this.head = this.head.next
    }else{
      let current = this.head
      for(let i = 0 ; i < index - 1; i ++){
        current = current.next
      }
      current.next = current.next.next
    }
    --this.size
  }
  get(index){
    if(index >= this.size) throw new Error('链表长度超出，不能读取')
    if(index == 0){
      return this.head
    }else{
      let current = this.head
      for(let i = 0 ; i < index - 1; i ++){
        current = current.next
      }
      return current.next
    }
  }

  reseve3(){
    if(this.head == null || this.head.next == null ) return this.head
    let head = this.head
    let newHead = null
    while(head != null){
      let tem = head.next
      head.next = newHead
      newHead = head
      head = tem
    }
    this.head = newHead
    return newHead
  }
  reseve4(){
    if(this.head == null || this.head.next == null ) return this.head
    let head = this.head
    let resvers = (el)=>{
      if(el.next == null) return el
      let tem = resvers(el.next)
      el.next.next = el
      el.next = null
      return tem
    }
    let newHead = resvers(head)
    this.head = newHead
    return newHead
  }
}

module.exports = linkedList




