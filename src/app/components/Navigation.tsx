import {IDocumentInfo} from 'app/store/Document'
import * as React from 'react'
import { Button, Table } from 'semantic-ui-react'


export interface INavigationProps {
    documents: IDocumentInfo[]
    onRefresh?: () => void
    onOpenOnNewTab?: (docId: string, uri:string) => void
    openDocumentOnCurrentTab?: (docId: string, uri:string) => void
}

export interface INavigationStates {
    documents: IDocumentInfo[]
}

export default class Navigation extends React.Component<INavigationProps, INavigationStates> {
    constructor(props: INavigationProps) {
        super(props)
        this.onRefresh = this.onRefresh.bind(this)
    }

    public componentDidMount() {
        if (this.props.onRefresh) this.props.onRefresh()
    }

    public render() {
        // console.log('render', this.props)
        const { documents } = this.props
        return (
            <div>
                <p>
                    Docs <Button onClick={this.onRefresh}>Refresh</Button>
                </p>
                <Table celled selectable>
                    <Table.Body>
                        {documents ? (
                            documents.map((document) => {
                                return (
                                    <Table.Row key={document.id} onClick={(event:any) => this.openDocument(event.ctrlKey, document.id, document.uri)}>
                                        <Table.Cell>{document.uri}</Table.Cell>
                                    </Table.Row>
                                )
                            })
                        ) : (
                            <Table.Row>
                                <Table.Cell>(none)</Table.Cell>
                            </Table.Row>
                        )}
                    </Table.Body>
                </Table>
            </div>
        )
    }

    private onRefresh() {
        if (this.props.onRefresh) this.props.onRefresh()
    }

    private openDocument(ctrlKey:boolean, docId: string, uri:string) {
        if(ctrlKey)
            this.openDocumentOnNewTab(docId, uri)
        else
            this.openDocumentOnCurrentTab(docId, uri)
    }

    private openDocumentOnNewTab(docId: string, uri:string) {
        console.log('Navigation.openDocumentOnNewTab', docId)
        if (this.props.onOpenOnNewTab) this.props.onOpenOnNewTab(docId, uri)
    }

    private openDocumentOnCurrentTab(docId: string, uri:string) {
        console.log('Navigation.openDocumentOnCurrentTab', docId)
        if (this.props.openDocumentOnCurrentTab)
            this.props.openDocumentOnCurrentTab(docId, uri)
    }
}
