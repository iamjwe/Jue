import {PubSubController} from './PubSubController'
export class Publisher{
    constructor(vm,data){
        this.vm = vm;// 维护的vm
        this._data = data;// 所有的发布者【数据对象】。
        this._init();
    }
    _init(){
        this.dataIntercept(this._data);
    }
    /*
    * 数据劫持
    */
    dataIntercept(data) {
        Object.keys(data).forEach(function(key) {
            let val = data[key];
            console.log('数据劫持：'+key);
            this.dataAttr2GetSetAttr(data,key,val);// 对当层对象进行数据劫持
            Publisher.publish(this.vm,val);// 间接递归对下一层对象进行数据劫持
        },this);
    }
    /*
     * 为数据劫持方法服务，用于将数据属性转换为存取器属性。
     */
    dataAttr2GetSetAttr(data, key, val) {
        console.log("属性劫持："+key);
        let psc = new PubSubController(this.vm);// 以key为发布者，创建一对一的的调度中心对象pbc
        Object.defineProperty(data, key, {
            configurable: false,
            enumerable: true,
            get: function() {
                // 数据劫持读操作：建立发布订阅者之间的关系
                if (PubSubController.currentNewSubscriber) {// 有新的观察者
                    psc.pubSubConnect(PubSubController.currentNewSubscriber);
                }
                return val;
            },
            set: function(newVal) {
                if (newVal === val) {
                    return;
                }
                val = newVal;
                // 数据劫持写操作：发布者通知订阅者更新
                Publisher.publish(this.vm,newVal);
                console.log(key+'改变，通知订阅者');
                psc.notify();
            }
        });
    }
    /*
    * 将某一data成为发布者
    */
    static publish(vm,value) {
        if (!value || typeof value !== 'object') {
            return;
        }
        return new Publisher(vm,value);
    }
}
