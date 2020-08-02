class Node{
  constructor(element,parent){
    this.element = element
    this.left =null
    this.right = null
    this.parent = parent
  }
}

class Tree{
  constructor(fn){
    this.root = null
    this.size = 0
    this.compare = fn || this.compare
  }
  compare(c1,c2){
    return c1 - c2
  }
  add(element){
    this.size ++
    if(this.root == null) {
      this.root = new Node(element,null)
      return
    }
    let current = this.root
    let parent = null
    let compare = null
    while(current){
      compare = this.compare(element , current.element)
      parent = current
      if(compare > 0) {
        current = current.right
      }else if(compare < 0){
        current = current.left
      }else{
        return
      }
    }
    let node = new Node(element,parent)
    if(compare>0) {
      parent.right = node
    }else if(compare<0){
      parent.left = node
    }else{
      return
    }
  }
  preorderTraversal(fn){
    let traver = (node)=>{
      if(node == null){
        return 
      }
      console.log(node.element)
      traver(node.left)
      traver(node.right)
    }
    traver(this.root)
  }
  inorderTraversal(fn){
    if(fn == null) return
    let traver = (node)=>{
      if(node == null){
        return 
      }
      
      traver(node.left)
      fn(node.element)
      traver(node.right)
    }
    traver(this.root)
  }
  postorderTraversal(fn){
    let traver = (node)=>{
      if(node == null){
        return 
      }
      traver(node.left)
      traver(node.right)
      console.log(node.element)
    }
    traver(this.root)
  }
  levelOrderTraversal(fn){
    
   let stack = [this.root]
   let i = 0
    while(stack[i]){
      if(stack[i] == null){
        return
      }
      if(fn instanceof Function){
        fn(stack[i].element)
      }
      if(stack[i].left != null){
        stack.push(stack[i].left)
      }

      if(stack[i].right != null){
        stack.push(stack[i].right)
      }

      i++

    }
  }
  invertTree(){
    let stack = [this.root]
    let index = 0
    let current = null
    while(current = stack[index]){
      console.log(current.element)
      let tem = current.right
      current.right = current.left
      current.left = tem
      if(current.left != null ){
        stack.push(current.left)
      }
      if(current.right != null ){
        stack.push(current.right)
      }
      index ++ ;
    }
    return this.root
  }
}

let t = new Tree((c1,c2)=>{
  return c1.age - c2.age
})

let arr = [{ age: 10 }, { age: 8 }, { age: 19 }, { age: 6 }, { age: 15 }, { age: 22 },{age:20}];
console.dir(t,{depth:20})

arr.forEach(item=>{
  t.add(item)
})
let temList = []
let newT = t.inorderTraversal((el)=>{
  temList.push(el)
})

console.dir(temList)