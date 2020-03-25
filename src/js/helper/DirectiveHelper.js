export class DirectiveHelper{
    static isDirective(attr){
        return attr.indexOf('j-') == 0;
    }
    static isEventDirective(dir){
        return dir.indexOf('on') === 0;
    }
}