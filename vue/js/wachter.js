class Wachter {
    constructor(vm,key,cb) {
        this.vm=vm
        //data中的属性名称
        this.key=key
        //回调函数负责更新视图
        this.cb=cb
        //把watcher对象记录在Dep类的静态属性的target上
        Dep.target=this
        //触发get方法,在get方法中调用addSub
        this.oldValue=vm[key]
        Dep.target=null
    }

    //当数据发生变化的时候更新视图
    update(){
        console.log('数据发生了变价')
        let newValue=this.vm[this.key]
        if (this.oldValue===newValue){
            return
        }
        this.cb(newValue)
    }

}
