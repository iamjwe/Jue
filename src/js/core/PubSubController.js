export class PubSubController{
    constructor(vm){
        this.vm = vm;// 维护vm对象
        this._id = PubSubController.uid++;// 【代理发布者业务】与发布者的一一对应关系维护的唯一标识
        this._subSet = new Set();// 【代理发布者业务】替发布者维护其订阅者集合
    }
    /*
     * 【代理订阅者业务】替订阅者建立与发布者的关系
     */
    pubSubConnect() {
        PubSubController.currentNewSubscriber.addPub(this);// 通知订阅者订阅
    }
    /*
     * 【代理发布者业务】替发布者添加订阅者
     */
    addSub(sub) {
        this._subSet.add(sub);
    }
    /*
    * 【代理发布者业务】替发布者移除订阅
    */
    removeSub(sub) {
        this._subSet.delete(sub);
    }
    /*
    * 【代理发布者业务】替发布者发布通知。
    */
    notify() {
        // 通知所有相关的watcher(一个订阅者)
        this._subSet.forEach(function(sub) {
            sub.update();
        });
    }
}

PubSubController.uid = 0;// 静态属性，用于帮助建立与发布者的唯一标识
PubSubController.currentNewSubscriber = null;// 静态属性，用于指向新产生新订阅者。