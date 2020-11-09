class Compiler {
    constructor(vm) {
        this.el=vm.$el
        this.vm=vm
        this.compile=(this.el)
    }
    //编译模板,处理文本节点和元素节点
    compile(el){
        console.log(1111)
        let childNodes=el.childNodes
        Array.from(childNodes).forEach(node=>{
            //处理文本节点
            if (this.isTextNode(node)){
                this.compileText(node)
            }else if (this.isElementNode(node)){
                //处理元素节点
                this.compileElement(node)
            }
            //判断node节点是否还有子节点,如果有,需要递归处理子节点
            if (node.childNodes&&node.childNodes.length){
                this.compile(node)
            }
        })


    }
    //编译元素节点,处理指令
    compileElement(node){

    }
    //编译文本节点,处理差值表达式
    compileText(node){
        console.log(node)
    }
    //判断元素属性是否都是指令
    isDirective(attrName){
        return attrName.startsWith('v-')
    }
    //判断节点是否是文本节点
    isTextNode(node){
        return node.nodeType === 3
    }
    //判断节点是否是元素节点
    isElementNode(node){
        return node.nodeType ===1
    }
}
