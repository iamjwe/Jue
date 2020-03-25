export class DomHelper{
    static node2Fragment(el){
        let fragment = document.createDocumentFragment(),
            child;
        while (child = el.firstChild) {// 将原生节点拷贝到fragment
            fragment.appendChild(child);
        }
        return fragment;
    }
    static isElementNode(node){
        return node.nodeType == 1;
    }
    static isTextNode(node){
        return node.nodeType == 3;
    }
    static textUpdater(node,value){
        node.textContent = typeof value == 'undefined' ? '' : value;
    }
    static htmlUpdater(node, value) {
        node.innerHTML = typeof value == 'undefined' ? '' : value;
    }
    static classUpdater (node, value, oldValue) {
        let className = node.className;
        className = className.replace(oldValue, '').replace(/\s$/, '');
        let space = className && String(value) ? ' ' : '';
        node.className = className + space + value;
    }
    static modelUpdater(node, value) {
        node.value = typeof value == 'undefined' ? '' : value;
    }
}