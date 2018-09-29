import * as React from 'react'
import { Input, Modal } from 'semantic-ui-react'

interface INewFileModalProps {
    open: boolean
}

export default class NewFileModal extends React.Component<INewFileModalProps, INewFileModalProps> {
    constructor(props: INewFileModalProps) {
        super(props)
    }

    public render() {
        return (
            <Modal open={this.props.open}>
                <Modal.Header>Create a new file</Modal.Header>
                <Modal.Content>
                    <Modal.Description>
                        <Input focus placeholder="New file name..." />
                    </Modal.Description>
                </Modal.Content>
            </Modal>
        )
    }
}
