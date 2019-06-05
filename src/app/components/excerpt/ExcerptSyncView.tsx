import * as React from 'react'
import { Table, Button, Icon } from 'semantic-ui-react';

interface ExcerptSyncViewProps
{
    // document: Document
    // rev: number
    // start: number
    // end: number
}

interface ExcerptSyncViewState
{

}

export default class ExcerptSyncView extends React.Component<ExcerptSyncViewProps, ExcerptSyncViewState> {
    constructor(props: ExcerptSyncViewProps) {
        super(props)
        this.state = {}
    }

    public render() {
        console.log(React.Children.map(this.props.children, (child) => <Table.Cell>{child}</Table.Cell>))

        return (
          <Table celled compact fixed>
            <Table.Header>
              <Table.Row>
                <Table.HeaderCell textAlign="center">Original</Table.HeaderCell>
                <Table.HeaderCell textAlign="center">Copy</Table.HeaderCell>
              </Table.Row>
            </Table.Header>

            <Table.Body>
              <Table.Row>
                {React.Children.map(this.props.children, (child) => <Table.Cell>{child}</Table.Cell>)}
              </Table.Row>
              <Table.Row>
                <Table.Cell>
                  <input type='range' min={0} max={5}/>
                </Table.Cell>
                <Table.Cell>
                  <input type='range' min={0} max={5}/>
                </Table.Cell>
              </Table.Row>
            </Table.Body>

            <Table.Footer fullWidth>
              <Table.Row>
                <Table.HeaderCell>
                  <Button size='small'>Original to Copy<Icon name='angle double right'></Icon></Button>
                </Table.HeaderCell>
                <Table.HeaderCell>
                  <Button disabled size='small'><Icon name='angle double left'></Icon>Copy to Original</Button>
                </Table.HeaderCell>
              </Table.Row>
              <Table.Row>
                <Table.HeaderCell collapsing colSpan="2" textAlign="center">
                  <Button icon labelPosition='left' primary size='small'>
                    <Icon name='check circle' /> Confirm
                  </Button>
                </Table.HeaderCell>
              </Table.Row>
            </Table.Footer>
          </Table>
        )
    }
}


