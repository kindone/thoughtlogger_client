// import Parchment from 'parchment'
// import { Scope } from 'parchment/dist/src/registry';
import { OpenExcerptDialog } from 'app/actions/EditorActions';
import { EditingState } from 'app/store/EditingState';
import { store } from 'app/store/theStore';
import Quill from 'quill'
import {ExcerptUtil} from 'text-versioncontrol'



export interface ExcerptData {
    sourceUri:string
    sourceRev:number
    sourceStart:number
    sourceEnd:number

    targetUri:string
    targetRev:number
    targetStart:number
    targetEnd:number
}

const Embed = Quill.import('blots/embed')

export class ExcerptedBlot extends Embed {
    public static blotName: string = "excerpted";
    public static className: string = "excerpted";
    public static tagName: string = "i";

    public static ATTRIBUTES = ["targetRev", "targetUri", "targetStart", "targetEnd"]

     // Creates corresponding DOM node
    public static create(value?: any): Node {
        const node = super.create(value) as HTMLElement;
        this.initNode(node, value)
        return node;
    }

    // Returns the value represented by domNode if it is this Blot's type
    // No checking that domNode can represent this Blot type is required so
    // applications needing it should check externally before calling.
    public static value(domNode:Node): any {
        const node = domNode as HTMLElement
        // console.log('ExcerptedBlot::value:', domNode, super.value(domNode))
        if(this.isValid(node))
            return this.composeSource(node)
        return false
    }

    // Returns format values represented by domNode if it is this Blot's type
    // No checking that domNode is this Blot's type is required.
    public static formats(domNode: Node):object {
        const node = domNode as HTMLElement
        if(this.isValid(node)) {
            const targetUri = node.getAttribute("targetUri")
            const targetRev = node.getAttribute("targetRev")
            const targetStart = node.getAttribute("targetStart")
            const targetEnd = node.getAttribute("targetEnd")
            // console.log('ExcerptedBlot::formats:', node, targetUri, targetRev, targetStart, targetEnd)
            return {targetUri, targetRev, targetStart, targetEnd}
        }
        else
            return {}
    }

    private static initNode(domNode:Node, value?: any):void {
        // console.log('ExcerptedBlot::initNode:', domNode, value)
        const node = domNode as HTMLElement
        const {sourceUri, sourceRev, sourceStart, sourceEnd} = this.decomposeSource(value)

        node.setAttribute("sourceUri", sourceUri)
        node.setAttribute("sourceRev", sourceRev.toString())
        node.setAttribute("sourceStart", sourceStart.toString())
        node.setAttribute("sourceEnd", sourceEnd.toString())
        if(value.copied)
            node.setAttribute("copied", "true")
        // add icon
        if(!value.copied)
            node.className = "fitted copy outline small blue icon"
    }

    private static isValid(domNode:Node) {
        const node = domNode as HTMLElement
        return (node.hasAttribute('sourceUri')
             && node.hasAttribute('sourceRev')
             && node.hasAttribute('sourceStart')
             && node.hasAttribute('sourceEnd')
             && !node.hasAttribute('copied'))
    }

    private static decomposeSource(source:any) {
        return ExcerptUtil.splitSource(source)
    }

    private static composeSource(domNode:Node) {
        const node = domNode as HTMLElement
        return (node.getAttribute('sourceUri') +
         "?rev=" + node.getAttribute("sourceRev") +
         "&start=" + node.getAttribute("sourceStart") +
         "&end=" + node.getAttribute("sourceEnd"))
    }

    constructor(domNode: Node, value?: any) {
        super(domNode)
        const node = domNode as HTMLElement
        node.addEventListener('click', (event) => {
            const data = this.data()
            const sourceDoc = EditingState.findByURI(store.getState().thoughtLoggerApp.editing, data.sourceUri)
            const targetDoc = EditingState.findByURI(store.getState().thoughtLoggerApp.editing, data.targetUri)

            if(sourceDoc && targetDoc) {
                event.stopImmediatePropagation()
                store.dispatch(OpenExcerptDialog(targetDoc.id, data))
            }
        })
    }

    public length(): number {
        return 1
    }

    public formatAt(index: number, length: number, format: string, value: any) {
        // console.log('ExcerptedBlot.formatAt:', index, length, format, value)
        const node = (this.domNode as HTMLElement)

        for(const attr of ExcerptedBlot.ATTRIBUTES) {
            if(format === attr)
                node.setAttribute(format, value)
        }
    }

    // // Manipulate at given index and length, if applicable.
    // // Will often pass call onto appropriate child.
    // public deleteAt(index: number, length: number) {
    //     //
    // }

    // public insertAt(index: number, text: string, value:any = null) {
    //     //
    // }

    // // Returns offset between this blot and an ancestor's
    // public offset(ancestor: Blot = this.parent): number {
    //     return 0
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

    public value(): any {
        const node = (this.domNode as HTMLElement)
        // console.log('ExcerptedBlot.value', node, super.value())
        return {excerpted: ExcerptedBlot.composeSource(node)}
    }

    // Apply format to blot. Should not pass onto child or other blot.
    public format(format: string, value: any) {
        const node = this.domNode as HTMLElement
        // console.log('ExcerptedBlot.format:', format, value)
        for(const attr of ExcerptedBlot.ATTRIBUTES) {
            if(format === attr)
                node.setAttribute(format, value)
        }
    }

    // Return formats represented by blot, including from Attributors.
    public formats(): object {
        // console.log('ExcerptedBlot.formats', this.domNode, super.formats())
        return ExcerptedBlot.formats(this.domNode)
    }

    private data():ExcerptData {
        // const {targetUri, targetRev, targetStart, targetEnd} = this.formats()
        const node = this.domNode
        const sourceUri = node.getAttribute("sourceUri")
        const sourceRev = Number.parseInt(node.getAttribute("sourceRev"), 10)
        const sourceStart = Number.parseInt(node.getAttribute("sourceStart"), 10)
        const sourceEnd = Number.parseInt(node.getAttribute("sourceEnd"), 10)

        const targetUri = node.getAttribute("targetUri")
        const targetRev = Number.parseInt(node.getAttribute("targetRev"), 10)
        const targetStart = Number.parseInt(node.getAttribute("targetStart"), 10)
        const targetEnd = Number.parseInt(node.getAttribute("targetEnd"), 10)

        return {sourceUri, sourceRev, sourceStart, sourceEnd, targetUri, targetRev, targetStart, targetEnd}
    }
  }