export class Broker{
    constructor(vm){
        this.vm = vm;// 维护vm对象
        this._id = Broker.uid++;
        this._subSet = new Set();
    }
    pubSubConnect() {
        Broker.currentNewSubscriber.addPub(this);
    }
    addSub(sub) {
        this._subSet.add(sub);
    }
    removeSub(sub) {
        this._subSet.delete(sub);
    }
    notify() {
        this._subSet.forEach(function(sub) {
            sub.update();
        });
    }
}

Broker.uid = 0;// 静态属性，用于帮助建立与发布者的唯一标识
Broker.currentNewSubscriber = null;// 静态属性，用于指向新订阅者。