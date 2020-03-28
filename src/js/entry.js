//import {Jue} from './core/Jue' // 引入使用发布订阅设计模式的Jue类
import {Jue} from './core2/Jue' // 引入使用观察者设计模式的Jue类
let vm = new Jue({
    el: '#template',
    data: {
        msg: 'template success,Good Job',
        classShow:"if red,class success,Good Job",
        modelShow:"",
        classTest:"class-test",
        eventShow:""
    },
    methods: {
        eventTest: function() {
            this.eventShow = "event success,Good Job";
        }
    }
});
window.vm = vm;