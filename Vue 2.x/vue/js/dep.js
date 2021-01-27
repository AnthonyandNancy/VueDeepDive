class Dep {
    constructor() {
        //记录所有的订阅者
        this.subs = []
    }

    //添加订阅者
    addSub(sub) {
        if (sub && sub.update) {
            this.subs.push(sub)
        }
    }

    //发布通知
    notify() {
        this.subs.forEach(sub => {
            sub.update()
        })
    }
}
