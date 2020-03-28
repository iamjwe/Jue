import {Broker} from './Broker'
export class Subscriber{
    constructor(vm, exp, cb) {
        this._pubSet = new Set();//【订阅者（view）的核心组成之订阅的发布者集合】
        this.vm = vm;// 维护vm对象，方便引用
        this.exp = exp;// 【订阅者（view）的核心组成之表达式】
        this.cb = cb;  // 【订阅者（view）的核心组成之回调函数（内部包含node等）】
        this.value = this.getValAndBecomeSubscriber();//【订阅者（view）的核心组成之订阅的当前的值】
    }
    // 调用被劫持的属性get方法，获取值（订阅者第一次调用会建立与发布者的关系）。
    getValAndBecomeSubscriber() {
        Broker.currentNewSubscriber = this;
        let value = this.vm.getDataValueByExp(this.exp);
        Broker.currentNewSubscriber = null;
        return value;
    }
     // 订阅者添加发布者的方法（同时防止更新操作取值触发的重复订阅），添加成功时通知发布者订阅成功（发布者添加订阅者）。
    addPub(psc) {
        if (!this._pubSet.has(psc._id)) {
            this._pubSet.add(psc._id);// 订阅者订阅
            psc.addSub(this);// 通知发布者
        }
    }
     // 订阅者的核心方法（发布者发布时会触发调用更新操作）。
    update() {
        let newVal = this.getValAndBecomeSubscriber();
        if (this.value!==newVal) {
            this.value = newVal;
            this.cb.call(this.vm, newVal);
        }
    }
}
