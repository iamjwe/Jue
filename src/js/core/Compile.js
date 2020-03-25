import {DomHelper} from '../helper/DomHelper'
import {DirectiveHelper} from '../helper/DirectiveHelper'
import {DirectiveHandler} from '../handler/DirectiveHandler'
import {DoubleBraceHandler} from '../handler/DoubleBraceHandler'
export class Compile{
    constructor(el,vm){
        this.$vm = vm;// 维护vm
        this.$el = DomHelper.isElementNode(el) ? el : document.querySelector(el);// 编译的模板对象
        this._init(this.$el)
    }
    _init(template){
        if (template) {
            this.$fragment = DomHelper.node2Fragment(this.$el);
            this._compileElementNode(this.$fragment);
            this.$el.appendChild(this.$fragment);
        }
    }
    /*
    * 解析元素节点
    * */
    _compileElementNode(el){
        let childNodes = el.childNodes;
            //me = this;
        [].slice.call(childNodes).forEach(function(node) {
            let text = node.textContent;
            let reg = /\{\{(.*)\}\}/;
            if (DomHelper.isElementNode(node)) {
                this._compileAttrNode(node);
            } else if (DomHelper.isTextNode(node) && reg.test(text)) {
                this._compileTextNode(node, RegExp.$1);
            }
            if (node.childNodes && node.childNodes.length) {
                this._compileElementNode(node);
            }
        },this);
    }
    /*
     * 解析属性节点
     * */
    _compileAttrNode(node){
        let nodeAttrs = node.attributes;
        [].slice.call(nodeAttrs).forEach(function(attr) {
            let attrName = attr.name;
            if (DirectiveHelper.isDirective(attrName)) {
                let exp = attr.value;
                let dir = attrName.substring(2);// 去掉指令前缀
                if (DirectiveHelper.isEventDirective(dir)) {
                    DirectiveHandler.event(node,dir,exp,this.$vm);
                } else {
                    DirectiveHandler[dir] && DirectiveHandler[dir](node, exp,this.$vm);
                }
                node.removeAttribute(attrName);
            }
        },this);
    }
    /*
     * 解析文本节点
     * */
    _compileTextNode(node,exp){
        DoubleBraceHandler.doubleBrace(node,exp,this.$vm)
    }
}