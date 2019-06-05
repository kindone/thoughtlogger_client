import { EditingState } from 'app/store/EditingState';
import { store } from 'app/store/theStore';
import * as React from 'react'
import { Portal, Segment, Header, Grid } from 'semantic-ui-react'
import DocumentWithHistoryView from './excerpt/DocumentWithHistoryView';
import ExcerptSyncView from './excerpt/ExcerptSyncView';

export interface IExcerptDialogProps {
    isOpen: boolean
    sourceUri: string
    sourceRev: number
    sourceStart: number
    sourceEnd: number
    targetUri: string
    targetRev: number
    targetStart: number
    targetEnd: number
    onClose?: () => void
}


export default class ExcerptDialog extends React.Component<IExcerptDialogProps, {}> {
    constructor(props: IExcerptDialogProps) {
        super(props)

        this.onClose = this.onClose.bind(this)
        this.state = {isOpen:this.props.isOpen}
    }

    public onClose() {
        console.log('ExcerptDialog.onClose')
        if(this.props.onClose)
          this.props.onClose()
    }

    public render() {
        const sourceDocState = EditingState.findByURI(store.getState().thoughtLoggerApp.editing, this.props.sourceUri)
        const targetDocState = EditingState.findByURI(store.getState().thoughtLoggerApp.editing, this.props.targetUri)
        let content:JSX.Element[] | string
        if(!sourceDocState || !targetDocState)
            content = ""
        else {
            content = [
                <DocumentWithHistoryView
                    document={sourceDocState.document}
                    rev={this.props.sourceRev}
                    start={this.props.sourceStart}
                    end={this.props.sourceEnd}/>
                ,
                // <DocumentView
                //     document={sourceDocState.document}
                //     rev={this.props.sourceRev}
                //     start={this.props.sourceStart}
                //     end={this.props.sourceEnd}></DocumentView>,
                <DocumentWithHistoryView
                    document={targetDocState.document}
                    rev={this.props.targetRev}
                    start={this.props.targetStart}
                    end={this.props.targetEnd}/>
            ]
        }

        return (
            <Portal open={this.props.isOpen} onClose={this.onClose}>
                <Segment style={{ left: '20%', position: 'fixed', top: '10%', zIndex: 1000 }}>
                    <Header>Copied Content</Header>
                    <Grid columns={1}>
                        <Grid.Column>
                            <ExcerptSyncView>
                                {content}
                            </ExcerptSyncView>
                        </Grid.Column>
                    </Grid>

                </Segment>
          </Portal>
        )
    }
}
