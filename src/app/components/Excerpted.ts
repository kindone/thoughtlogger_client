import Parchment from 'parchment'
import { Scope } from 'parchment/dist/src/registry';

import {ExcerptUtil} from 'text-versioncontrol'


export class ExcerptedBlot extends Parchment.Embed {
    public static blotName: string = "excerpted";
    public static className: string = "excerpted";
    public static tagName: string = "div";
    public static scope: Scope = Parchment.Scope.INLINE_BLOT;

    // /* Parent blots only */

    // // Whitelist array of Blots that can be direct children.
    // public static allowedChildren: Blot[] = []

    // // Default child blot to be inserted if this blot becomes empty.
    // public static defaultChild: string;

     // Creates corresponding DOM node
    public static create(value?: any): Node {
        const node = super.create(value) as HTMLElement;
        ExcerptedBlot.initNode(node, value)
        return node;
    }


    /* Leaf Blots only */

    // Returns the value represented by domNode if it is this Blot's type
    // No checking that domNode can represent this Blot type is required so
    // applications needing it should check externally before calling.
    public static value(domNode:Node): any {
        const node = domNode as HTMLElement
        return node.getAttribute("_uri")
    }

    /* Formattable blots only */

    // Returns format values represented by domNode if it is this Blot's type
    // No checking that domNode is this Blot's type is required.
    public static formats(domNode: Node):object {
        const node = domNode as HTMLElement
        const targetUri = node.getAttribute("_targetUri")
        const targetRev = node.getAttribute("_targetRev")
        const length = node.getAttribute("_length")
        return {targetUri, targetRev, length}
    }

    private static initNode(domNode:Node, value?: any):void {
        const node = domNode as HTMLElement
        if(typeof value !== 'string' || !ExcerptUtil.isExcerptURI(value))
            throw new Error('unsupported value: ' + value)

        const uriWithRev:string = value
        const [uri,revPart] = uriWithRev.split("?")
        const rev = revPart.split("rev=")[1]

        node.setAttribute("_uri", uri)
        node.setAttribute("_rev", rev)
        node.appendChild(document.createTextNode('!EX!'))
    }



    constructor(domNode: Node, value?: any) {
        super(domNode)
        ExcerptedBlot.initNode(domNode, value)
    }

    public length(): number {
        return 1
    }

    // // Manipulate at given index and length, if applicable.
    // // Will often pass call onto appropriate child.
    // public deleteAt(index: number, length: number) {
    //     //
    // }
    // public formatAt(index: number, length: number, format: string, value: any) {
    //     //
    // }
    // public insertAt(index: number, text: string, value:any = null) {
    //     //
    // }

    // // Returns offset between this blot and an ancestor's
    // public offset(ancestor: Blot = this.parent): number {
    //     return 0
    // }

    // // Called after update cycle completes. Cannot change the value or length
    // // of the document, and any DOM operation must reduce complexity of the DOM
    // // tree. A shared context object is passed through all blots.
    // public optimize(context: {[key: string]: any}): void {
    //     //
    // }

    // // Called when blot changes, with the mutation records of its change.
    // // Internal records of the blot values can be updated, and modifcations of
    // // the blot itself is permitted. Can be trigger from user change or API call.
    // // A shared context object is passed through all blots.
    // public update(mutations: MutationRecord[], context: {[key: string]: any}) {
    //     //
    // }


    // /* Leaf Blots only */

    // // Given location represented by node and offset from DOM Selection Range,
    // // return index to that location.
    // public index(node: Node, offset: number): number {
    //     return 0
    // }

    // // Given index to location within blot, return node and offset representing
    // // that location, consumable by DOM Selection Range
    // public position(index: number, inclusive: boolean): [Node, number] {
    //     return [null, 0]
    // }

    // Return value represented by this blot
    // Should not change without interaction from API or
    // user change detectable by update()
    public value(): any {
        const node = (this.domNode as HTMLElement)
        return node.getAttribute('_uri') + "?rev=" + node.getAttribute("_rev")
    }

    /* Parent blots only
    // Called during construction, should fill its own children LinkedList.
    public build() {
        //
    }
    // Useful search functions for descendant(s), should not modify
    public descendant(type: BlotClass, index: number, inclusive:boolean): Blot {
        //
    }
    public descendents(type: BlotClass, index: number, length: number): Blot[];
    */

    /* Formattable blots only */

    // Apply format to blot. Should not pass onto child or other blot.
    public format(format: string, value: any) {
        const node = this.domNode as HTMLElement
        if(format === 'targetUri')
            node.setAttribute("_targetUri", value)
        else if(format === 'targetRev')
            node.setAttribute("_targetRev", value)
        else if(format === 'length')
            node.setAttribute("_length", value)
    }

    // Return formats represented by blot, including from Attributors.
    public formats(): object {
        return ExcerptedBlot.formats(this.domNode)
    }
  }