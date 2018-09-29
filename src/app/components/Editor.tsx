import { AsnycStatus } from 'app/utils/AsyncStatus'
import { Delta, Sources } from 'quill'
import * as React from 'react'
import ReactQuill from 'react-quill'
import { Button, Container } from 'semantic-ui-react'


// require('react-quill/dist/quill.snow.css')
require('./Editor.scss')

export interface IEditorProps {
    id: string
    isPersisted: boolean
    loadStatus: AsnycStatus
    docId: string
    uri:string
    content: string
    onChange?: (id: string, content: string, delta: Delta, source: Sources) => void
    onSave?: (id: string, content: string) => void
    onSaveAs?: (id: string, content: string) => void
    onReload?: (id: string) => void
}

interface IEditorStates {
    content: string
}

export default class Editor extends React.Component<IEditorProps, IEditorStates> {
    constructor(props: IEditorProps) {
        super(props)
        console.log('Editor.constructor', props)

        // this.state = { text: props.content } // You can also pass a Quill Delta here
        this.handleChange = this.handleChange.bind(this)
        this.handleSave = this.handleSave.bind(this)
    }

    public componentDidMount() {
        console.log('Editor.componentDidMount', this.props)
        if (this.props.isPersisted && this.props.onReload) this.props.onReload(this.props.id)
    }

    public componentDidUpdate() {
        console.log('Editor.componentDidUpdate', this.props)
        if(this.props.loadStatus === AsnycStatus.INITIAL && this.props.onReload) {
            this.props.onReload(this.props.id)
        }
    }

    public render() {
        console.log('Editor.render', this.props)


        return (
            <Container>
                <Button type="button" onClick={this.handleSave}>
                    Save
                </Button>

                <Container>
                    <div className="scrolling-container">
                        <ReactQuill
                            className="quill-container"
                            value={this.props.content}
                            bounds="scrolling-container"
                            onChange={this.handleChange}
                        />
                    </div>
                </Container>
            </Container>
        )
    }

    private handleChange(value: string, delta: Delta, source: Sources) {
        console.log('Editor.handleChange:', this.props.id, value, delta, source)

        if (value !== this.props.content && this.props.onChange) {
            this.props.onChange(this.props.id, value, delta, source)
        }
    }

    private handleSave() {
        console.log('Editor.handleSave', this.props.id, this.props)
        if (!this.props.isPersisted) {
            if (this.props.onSaveAs) this.props.onSaveAs(this.props.id, this.props.content)
        } else {
            if (this.props.onSave) this.props.onSave(this.props.id, this.props.content)
        }
    }
}
