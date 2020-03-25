import {DomHelper} from '../helper/DomHelper'
import {Subscriber} from '../core/Subscriber'
export class DirectiveHandler{
    static bind(node, dir,exp,vm) {
        let updaterFn = DomHelper[dir + 'Updater'];
        updaterFn && updaterFn(node, vm.getDataValueByExp(exp));//_getVMVal获取表达式的值
        new Subscriber(vm, exp, function(value) {
            updaterFn && updaterFn(node, value);
        });
    }
    static text(node,exp,vm) {
        DirectiveHandler.bind(node, 'text', exp, vm);
    }
    static html(node, exp, vm) {
        DirectiveHandler.bind(node,'html', exp,vm );
    }
    static 'class'(node,exp,vm) {
        DirectiveHandler.bind(node,'class', exp, vm );
    }
    static model(node, exp, vm) {
        DirectiveHandler.bind(node,  'model', exp,vm);
        let val = vm.getDataValueByExp(exp);
        node.addEventListener('input', function(e) {
            let newValue = e.target.value;
            if (val === newValue) {
                return;
            }
            vm.setDataValueByExp(exp,newValue);
        });
    }
    static event(node,dir, exp,vm) {
        let eventType = dir.split(':')[1],// 事件名
            fn = vm.$options.methods && vm.$options.methods[exp];// 事件回调方法
        if (eventType && fn) {
            // 绑定事件
            node.addEventListener(eventType, fn.bind(vm), false);
        }
    }
}
