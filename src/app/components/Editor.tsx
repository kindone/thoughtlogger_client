import { AsnycStatus } from 'app/utils/AsyncStatus'
import { QuillContent } from 'app/utils/QuillContent'
import Parchment from 'parchment';
import { BoundsStatic, Delta, DeltaOperation, DeltaStatic, RangeStatic, Sources } from 'quill'
import * as React from 'react'
import ReactQuill, {Quill as Quill} from 'react-quill'
import { Button, Container } from 'semantic-ui-react'
import { Change, Document as DocumentWithHistory, SharedString } from 'text-versioncontrol'
import { ExcerptSource } from 'text-versioncontrol/lib/excerpt';
import * as _ from 'underscore'
// import { ExcerptedBlot } from './Excerpted';
// import { ExcerptedBlot2 } from './Excerpted2';
import { ExcerptedBlot } from './ExcerptedBlot';


// require('react-quill/dist/quill.snow.css')
require('./Editor.scss')

// register
Quill.register("formats/excerpted", ExcerptedBlot)

const TargetUri = new Parchment.Attributor.Attribute('targetUri', 'targetUri')
const TargetRev = new Parchment.Attributor.Attribute("targetRev", "targetRev")
const TargetStart = new Parchment.Attributor.Attribute("targetStart", "targetStart")
const TargetEnd = new Parchment.Attributor.Attribute("targetEnd", "targetEnd")
const Copied = new Parchment.Attributor.Attribute("copied", "copied")

// Parchment.register(TargetUri)
Quill.register("attributors/TargetUri", TargetUri)
Quill.register("attributors/targetRev", TargetRev)
Quill.register("attributors/TargetStart", TargetStart)
Quill.register("attributors/TargetEnd", TargetEnd)
Quill.register("attributors/Copied", Copied)

const formats = ["excerpted", "targetUri", "targetRev", "targetStart", "targetEnd", "copied"]

export interface IEditorProps {
    id: string
    isPersisted: boolean
    loadStatus: AsnycStatus
    docId: string
    uri:string
    document: DocumentWithHistory
    excerpt?: ExcerptSource
    onChange?: (id: string, document: DocumentWithHistory, delta: Delta, source: Sources) => void
    onSave?: (id: string, document: DocumentWithHistory) => void
    onSaveAs?: (id: string, document: DocumentWithHistory) => void
    onReload?: (id: string) => void
    onTakeExcerpt?: (id: string, excerptSource:ExcerptSource) => void
}

interface IEditorStates {
    content: QuillContent
}

export default class Editor extends React.Component<IEditorProps, IEditorStates> {
    // TODO: state
    public selection:{content:DeltaOperation[], from: number, length: number}
    private modules:any
    private quillRef:Quill | null
    private reactQuillRef:ReactQuill | null
    private defaultValue:DeltaStatic

    constructor(props: IEditorProps) {
        super(props)
        console.log('Editor.constructor', props)

        this.state = {content: this.props.document.getContent()}
        this.handleChange = this.handleChange.bind(this)
        this.handleSelectionChange = this.handleSelectionChange.bind(this)
        this.handleSave = this.handleSave.bind(this)

        const bindings = {
            takeExcerpt: {
                key: 'C',
                shortKey: true,
                altKey: true,
                handler: (range:{index:number, length:number}, context:any) => {
                    this.handleTakeExcerpt(range, context)
                }
            },
            pasteExcerpt: {
                key: 'X',
                shortKey: true,
                altKey: true,
                handler: (range:{index:number, length:number}, context:any) => {
                    this.handlePasteExcerpt(range, context)
                }
            }
        }
        this.modules = {
            keyboard: {
              bindings
            }
        }

        this.quillRef = null;      // Quill instance
        this.reactQuillRef = null; // ReactQuill component
    }

    public componentDidMount() {
        console.log('Editor.componentDidMount', this.props)
        if (this.props.isPersisted && this.props.onReload)
             this.props.onReload(this.props.id)

        this.attachQuillRefs()
    }

    public componentDidUpdate() {
        console.log('Editor.componentDidUpdate', this.props)
        if(this.props.loadStatus === AsnycStatus.INITIAL && this.props.isPersisted && this.props.onReload) {
            this.props.onReload(this.props.id)
        }
        this.attachQuillRefs()
    }

    public componentWillReceiveProps(nextProps:IEditorProps) {
        console.log('Editor.componentWillReceiveProps', nextProps)
        if(nextProps.document !== this.props.document) {
            // perform edit according to the document change
            // this.quillRef
            if(!this.quillRef)
                return
        }
    }

    public render() {
        console.log('Editor.render', this.props, this.props.document.getContent())
        // this.setState({content:this.props.content})
        // const value = {"ops":[{"insert":"Actual "},{"insert":{"excerpted":"doc1?rev=6"},"attributes":{"targetUri":"doc2","targetRev":9,"length":20}},{"insert":"prettier beautiful introduction here: Here comes the trouble. HAHAHAHA"}]} as DeltaStatic

        this.defaultValue = QuillContent.fromDelta(this.props.document.getContent()) as DeltaStatic
        // if(this.quillRef && this.reactQuillRef) {
        //     this.quillRef.setContents(QuillContent.fromDelta(this.props.document.getContent()) as DeltaStatic, "api")
        //     this.quillRef.setSelection(0, 0, "api")
        // }

        return (
            <Container>
                <Button type="button" onClick={this.handleSave}>Save</Button>

                <Container>
                    <div className="scrolling-container">
                        <ReactQuill key={this.props.id}
                            ref={(el) => { this.reactQuillRef = el }}
                            className="quill-container"
                            defaultValue={this.defaultValue}
                            bounds="scrolling-container"
                            onChange={this.handleChange}
                            onChangeSelection={this.handleSelectionChange}
                            formats={formats}
                            modules={this.modules}
                        />
                    </div>
                </Container>
            </Container>
        )
    }

    private handleChange(value: string, delta: Delta, source: Sources, editor:any) {
        const content:Change = editor.getContents()
        console.log('Editor.handleChange:', this.props.id, value, delta, source, 'editor:', content, this.props.document)

        const changed = this.checkDelta(this.props.document.getContent(), {ops: delta.ops ? delta.ops : []}, content)
        if(this.props.onChange && changed && delta.ops) {
            const newDocument = this.props.document.clone()
            newDocument.append([{ops:delta.ops}])
            this.props.onChange(this.props.id, newDocument, delta, source)
        }

        this.setState({content})
    }

    private handleSelectionChange(range: RangeStatic,
        source: Sources,
        editor: any/*UnprivilegedEditor*/)
    {
        console.log('handleSelectionChange:', range, source, editor)
        if(!range)
            return
        const contents:DeltaStatic = editor.getContents(range.index, range.length)
        this.selection = {content: contents.ops!, from: range.index, length: range.length}
        console.log('  ', contents, this.selection)

        const bound = editor.getBounds(range.index, range.length) as BoundsStatic
        console.log('selection bound:', bound)
    }

    private handleSave() {
        console.log('Editor.handleSave', this.props.id, this.props)
        if (!this.props.isPersisted) {
            if (this.props.onSaveAs)
                this.props.onSaveAs(this.props.id, this.props.document)
        } else {
            if (this.props.onSave)
                 this.props.onSave(this.props.id, this.props.document)
        }
    }

    private handleTakeExcerpt(range:{index:number, length:number}, context:any) {
        const excerpt = this.props.document.takeExcerpt(range.index, range.index+range.length)
        console.log('handleTakeExcerpt:', range, context, excerpt)
        if(this.props.onTakeExcerpt)
            this.props.onTakeExcerpt(this.props.id, excerpt)
    }

    private handlePasteExcerpt(range:{index:number, length:number}, context:any) {
        if(this.quillRef && this.props.excerpt) {
            const newDocument = this.props.document.clone()
            newDocument.pasteExcerpt(range.index, this.props.excerpt)
            const change = newDocument.getChange(newDocument.getCurrentRev()-1)[0]
            console.log('handlePasteExcerpt:', range, context, this.props.excerpt, change)
            this.quillRef.updateContents(change as DeltaStatic, "api")
        }
    }

    private checkDelta(prev:Change, delta:Change, current:Change):boolean
    {
        if (!QuillContent.isEqual(prev, current)) {
            const ss = SharedString.fromDelta(prev)
            ss.applyChange(delta, "user")
            if(!QuillContent.isEqual(ss.toDelta(), current) && QuillContent.isEqual(prev, this.state.content))
                console.error('props.content:', prev, 'delta:', delta, 'applied:', ss.toDelta(), 'current:', current)
            else if(QuillContent.isEqual(ss.toDelta(), current))
                console.log('delta:', delta)

            return true
        }
        return false
    }


    private attachQuillRefs() {
        if (this.reactQuillRef && typeof this.reactQuillRef.getEditor === 'function')
            this.quillRef = this.reactQuillRef.getEditor();
    }
}
