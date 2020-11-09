class Compiler {
    constructor(vm) {
        this.el=vm.$el
        this.vm=vm
        this.compile(this.el)
    }
    //编译模板,处理文本节点和元素节点
    compile(el){
        let childNodes=el.childNodes
        Array.from(childNodes).forEach(node=>{
            //处理文本节点
            if (this.isTextNode(node)){
                // console.log('isTextNode')
                this.compileText(node)
            }else if (this.isElementNode(node)){
                // console.log('isElementNode')
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
        Array.from(node.attributes).forEach(attr=>{
            //判断是否有指令
            let attrName=attr.name
            if (this.isDirective(attrName)){
                attrName=attrName.substr(2)
                let key =attr.value
                this.update(node,key,attrName)
            }
        })

    }

    update(node,key,attrName){
        let updateFn=this[attrName+'Updater']
        console.log(attrName)
        updateFn &&updateFn(node,this.vm[key])
    }

    //处理v-text指令
    textUpdater(node,value){
        node.textContent=value
    }
    modelUpdater(node,value){
        node.value=value
    }




    //编译文本节点,处理差值表达式
    compileText(node){

        let reg=/\{\{(.+?)\}\}/
        let value=node.textContent

        if (reg.test(value)){
            let key=RegExp.$1.trim()
            node.textContent=value.replace(reg,this.vm[key])
        }
    }
    //判断元素属性是否都是指令
    isDirective(attrName){
        return attrName.startsWith('v-')
    }
    //判断节点是否是文本节点
    isTextNode(node){
        // console.log(node)
        return node.nodeType === 3
    }
    //判断节点是否是元素节点
    isElementNode(node){
        // console.log(node)
        return node.nodeType ===1
    }
}
