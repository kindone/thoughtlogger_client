import { AsnycStatus } from 'app/utils/AsyncStatus'
import { QuillContent } from 'app/utils/QuillContent'
import { DeltaOperation, DeltaStatic, RangeStatic, Sources } from 'quill'
import * as Quill from 'quill'
import * as React from 'react'
import ReactQuill from 'react-quill'
import { Button, Container } from 'semantic-ui-react'
import {IDelta, StringWithState} from 'text-versioncontrol'
import * as _ from 'underscore'


// require('react-quill/dist/quill.snow.css')
require('./Editor.scss')

export interface IEditorProps {
    id: string
    isPersisted: boolean
    loadStatus: AsnycStatus
    docId: string
    uri:string
    content: QuillContent
    onChange?: (id: string, content: QuillContent, delta: Quill.Delta, source: Sources) => void
    onSave?: (id: string, content: QuillContent) => void
    onSaveAs?: (id: string, content: QuillContent) => void
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

        this.state = {content: this.props.content}
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
        console.log('Editor.render', this.props)
        // this.setState({content:this.props.content})

        return (
            <Container>
                <Button type="button" onClick={this.handleSave}>
                    Save
                </Button>

                <Container>
                    <div className="scrolling-container">
                        <ReactQuill
                            className="quill-container"
                            value={{ops:this.props.content.ops} as DeltaStatic}
                            bounds="scrolling-container"
                            onChange={this.handleChange}
                            onChangeSelection={this.handleSelectionChange}
                        />
                    </div>
                </Container>
            </Container>
        )
    }

    private handleChange(value: string, delta: Quill.Delta, source: Sources, editor:any) {
        const content:IDelta = editor.getContents()
        console.log('Editor.handleChange:', this.props.id, value, delta, source, 'editor:', content, this.props.content)

        const changed = this.checkDelta(this.props.content, {ops:delta.ops ? delta.ops : []}, content)
        if(this.props.onChange && changed)
            this.props.onChange(this.props.id, content, delta, source)

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
    }

    private checkDelta(prev:IDelta, delta:IDelta, current:IDelta):boolean
    {
        if (!QuillContent.isEqual(prev, current)) {
            const ss = StringWithState.fromDelta(prev)
            ss.apply(delta, "user")
            if(!QuillContent.isEqual(ss.toDelta(), current) && QuillContent.isEqual(prev, this.state.content))
                console.error('props.content:', prev, 'delta:', delta, 'applied:', ss.toDelta(), 'current:', current)

            return true
        }
        return false
    }

    private handleSave() {
        console.log('Editor.handleSave', this.props.id, this.props)
        if (!this.props.isPersisted) {
            if (this.props.onSaveAs)
                this.props.onSaveAs(this.props.id, this.props.content)
        } else {
            if (this.props.onSave)
                 this.props.onSave(this.props.id, this.props.content)
        }
    }
}
