import EditorContainer from 'app/containers/EditorContainer'
import { EditorStateDictionary } from 'app/store/EditingState'
import * as React from 'react'
import { Container, Tab, TabProps } from 'semantic-ui-react'
import { ExcerptSource } from 'text-versioncontrol/lib/excerpt';

export interface IEditingProps {
    editors: EditorStateDictionary
    focusedEditorId: string
    excerpt?:ExcerptSource
    onTabChange?: (id: string) => void
    onCreateNewEditor?: () => void
}

interface IPane {
    menuItem: any
    render: () => React.ReactNode
}

export default class EditingView extends React.Component<IEditingProps> {
    constructor(props: IEditingProps) {
        super(props)
        this.onTabChange = this.onTabChange.bind(this)
        this.onCreateNewEditor = this.onCreateNewEditor.bind(this)
    }

    public render() {

        const { panes, activeIndex } = this.createTabPaneProperties(this.props.editors)
        console.log('EditingView.render', this.props, activeIndex)

        return (
            <Container>
                <Tab panes={panes} activeIndex={activeIndex} onTabChange={this.onTabChange} />
            </Container>
        )
    }

    private onCreateNewEditor() {
        if (this.props.onCreateNewEditor) this.props.onCreateNewEditor()
    }

    private onTabChange(event: React.MouseEvent<HTMLDivElement>, data: TabProps) {
        console.log('onTabChange', data.activeIndex, this.props.editors)
        if (this.props.onTabChange) {
            let i = 0
            let foundId = ''
            Object.keys(this.props.editors).forEach((key) => {
                if (data.activeIndex === i) {
                    foundId = key
                }
                i++
            })
            if (foundId !== '') this.props.onTabChange(foundId)
        }
    }

    private createTabPaneProperties(editors: EditorStateDictionary) {
        let i = 0 // key control
        let activeIndex = 0

        const panes: IPane[] = Object.keys(editors).map((key) => {
            const editor = editors[key]
            if (this.props.focusedEditorId === key) activeIndex = i
            return {
                menuItem: {
                    key: 'editor' + i++,
                    content: editor.isPersisted ? editor.uri : 'Untitled'
                },
                render: () => (
                    <Tab.Pane>
                        <EditorContainer key={'editor'+ i} {...editor} />
                    </Tab.Pane>
                )
            }
        })

        panes.push({
            menuItem: {
                key: 'new',
                icon: 'plus square outline',
                content: '',
                onClick: this.onCreateNewEditor
            },
            render: () => <Tab.Pane>Create new tab</Tab.Pane>
        })
        return { panes, activeIndex }
    }
}
