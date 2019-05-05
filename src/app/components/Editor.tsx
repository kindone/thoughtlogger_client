import { AsnycStatus } from 'app/utils/AsyncStatus'
import { QuillContent } from 'app/utils/QuillContent'
import { BoundsStatic, Delta, DeltaOperation, DeltaStatic, RangeStatic, Sources } from 'quill'
import * as React from 'react'
import ReactQuill, {Quill as Quill} from 'react-quill'
import { Button, Container } from 'semantic-ui-react'
import { Document as DocumentWithHistory, IDelta, SharedString } from 'text-versioncontrol'
import * as _ from 'underscore'
import { ExcerptedBlot } from './Excerpted';


// require('react-quill/dist/quill.snow.css')
require('./Editor.scss')

// register
Quill.register("formats/excerpted", ExcerptedBlot)

export interface IEditorProps {
    id: string
    isPersisted: boolean
    loadStatus: AsnycStatus
    docId: string
    uri:string
    document: DocumentWithHistory
    onChange?: (id: string, document: DocumentWithHistory, delta: Delta, source: Sources) => void
    onSave?: (id: string, document: DocumentWithHistory) => void
    onSaveAs?: (id: string, document: DocumentWithHistory) => void
    onReload?: (id: string) => void
}

interface IEditorStates {
    content: QuillContent
}

export default class Editor extends React.Component<IEditorProps, IEditorStates> {
    public selection:{content:DeltaOperation[], from: number, length: number}

    constructor(props: IEditorProps) {
        super(props)
        console.log('Editor.constructor', props)

        this.state = {content: this.props.document.getContent()}
        this.handleChange = this.handleChange.bind(this)
        this.handleSelectionChange = this.handleSelectionChange.bind(this)
        this.handleSave = this.handleSave.bind(this)
    }

    public componentDidMount() {
        console.log('Editor.componentDidMount', this.props)
        if (this.props.isPersisted && this.props.onReload)
             this.props.onReload(this.props.id)
    }

    public componentDidUpdate() {
        console.log('Editor.componentDidUpdate', this.props)
        if(this.props.loadStatus === AsnycStatus.INITIAL && this.props.isPersisted && this.props.onReload) {
            this.props.onReload(this.props.id)
        }
    }

    public render() {
        console.log('Editor.render', this.props, this.props.document.getContent())
        // this.setState({content:this.props.content})

        // const value = {"ops":[{"insert":"Actual "},{"insert":{"excerpted":"doc1?rev=6"},"attributes":{"targetUri":"doc2","targetRev":9,"length":20}},{"insert":"prettier beautiful introduction here: Here comes the trouble. HAHAHAHA"}]} as DeltaStatic
        const value = QuillContent.fromDelta(this.props.document.getContent()) as DeltaStatic

        return (
            <Container>
                <Button type="button" onClick={this.handleSave}>Save</Button>

                <Container>
                    <div className="scrolling-container">
                        <ReactQuill
                            className="quill-container"
                            // value={dummyExcerptOps as DeltaStatic}
                            value={value}
                            bounds="scrolling-container"
                            onChange={this.handleChange}
                            onChangeSelection={this.handleSelectionChange}
                            formats={["excerpted"]}
                        />
                    </div>
                </Container>
            </Container>
        )
    }

    private handleChange(value: string, delta: Delta, source: Sources, editor:any) {
        const content:IDelta = editor.getContents()
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

        const bound = editor.getBounds(range.index, range.length) as BoundsStatic
        console.log('selection bound:', bound)
    }

    private checkDelta(prev:IDelta, delta:IDelta, current:IDelta):boolean
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
}
