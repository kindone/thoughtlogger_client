import { AsnycStatus } from 'app/utils/AsyncStatus'
import * as React from 'react'
import { Button, Form, Icon, Input, Modal } from 'semantic-ui-react'

export interface ISaveAsModalProps {
    editorId: string
    open: boolean
    status: AsnycStatus
    onClose?: () => void
    onSubmit?: (editorId: string, uri:string) => void
  }

export interface ISaveAsModalState {
    uri:string
}

export class SaveAsModal extends React.Component<ISaveAsModalProps, ISaveAsModalState> {
    constructor(props: ISaveAsModalProps) {
        super(props)
        this.onClose = this.onClose.bind(this)
        this.onChange = this.onChange.bind(this)
        this.onSubmit = this.onSubmit.bind(this)
    }

    public onClose() {
      console.log('SaveAsModal.onClose')
      if(this.props.onClose)
        this.props.onClose()
    }

    public onChange(e:any, pair:{ name:any, value:any }) {
      const name = pair.name
      const value = pair.value
      console.log('SaveAsModal.onChange:', this.props.editorId, name, value)
      if(name === 'uri')
        this.setState({uri: value })
    }

    public onSubmit() {
      console.log('SaveAsModal.onSubmit:', this.props.editorId, this.state.uri)
      if(this.props.onSubmit)
        this.props.onSubmit(this.props.editorId, this.state.uri)
    }

    public render() {
        console.log('SaveAsModal.render', this.props.open)
        return (
          <Modal open={this.props.open} onClose={this.onClose}>
            <Modal.Header>Save As...</Modal.Header>
            <Modal.Content image>
              <Modal.Description>
                <Form onSubmit={this.onSubmit}>
                  <Input name='uri' fluid focus type='text' placeholder='URI...' action onChange={this.onChange}>
                    <input />
                    <Button type='submit' loading={this.props.status === AsnycStatus.INPROGRESS}>{this.submitButtonContent()}</Button>
                  </Input>
                </Form>
              </Modal.Description>
            </Modal.Content>
          </Modal>
        )
    }

    private submitButtonContent() {
        switch(this.props.status)
        {
            case AsnycStatus.COMPLETE:
                return <Icon name="check circle"/>
            case AsnycStatus.FAILED:
                return <Icon name="times circle"/>
            default:
                return 'OK'
        }
    }
}
