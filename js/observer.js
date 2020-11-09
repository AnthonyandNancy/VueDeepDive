class Observer {
    constructor(data) {
        // console.log(data,'>>>>Observer')
        this.walk(data)
    }
    walk(data){
       //1`判断是否是对象
        if ( !data ||typeof data !=='object'){return}
       //2`遍历对象
        Object.keys(data).forEach(key=>{
            this.defineReactive(data,key,data[key])
        })
    }
    defineReactive(obj,key,val){
        var that=this
        //当data里面的数据是对象的时候,并没有getter和setter
        this.walk(val)
        Object.defineProperty(obj,key,{
            enumerable:true,
            configurable:true,
            get() {
                return val
            },
            set(newValue) {
                if (newValue ===val){return}
                val=newValue
                //当用户重新设置值的时候,并没有getter和setter
                that.walk(newValue)
                //发送通知
            }
        })
    }
}
