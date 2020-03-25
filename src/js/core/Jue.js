import {Compile} from './Compile'
import {Publisher} from './Publisher'
import {Subscriber} from './Subscriber'

export class Jue{
    constructor(options){
        this.$options = options;
        this._data = options.data;
        this._init();
    }
    _init(){
        // 数据代理
        Object.keys(this._data).forEach(function (key) {
            this._proxy(key);
        },this);
        // 数据绑定
        Publisher.publish(this,this._data);
        // 模板解析
        this.$compile = new Compile(this.$options.el || document.body, this)
    }
    /*
    * 数据代理
    * */
    _proxy(key) {
        Object.defineProperty(this, key, {
            configurable: false,
            enumerable: true,
            get: function proxyGetter() {
                return this._data[key];
            },
            set: function proxySetter(newVal) {
                this._data[key] = newVal;
            }
        });
    }
    /*
     * 封装的用于根据表达式获取model数据
     * */
    getDataValueByExp(exp){
        let keys = exp.split('.');
        let val = this._data;
        keys.forEach(function(k) {
            val = val[k];
        });
        return val;
    }
    /*
    * 封装的用于根据表达式设置model数据
    * */
    setDataValueByExp(exp,newVal){
        let keys = exp.split('.');
        let val = this._data;
        keys.forEach(function(k, i) {
            if (i < keys.length - 1) {
                val = val[k];
            } else {
                val[k] = newVal;
            }
        });
    }
}