import {DirectiveHandler} from './DirectiveHandler'
export class DoubleBraceHandler{
    static doubleBrace(node,exp,vm){
        DirectiveHandler.text(node,exp,vm);
    }
}
