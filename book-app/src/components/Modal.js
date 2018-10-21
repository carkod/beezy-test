import React from 'react'
import { Button, Header, Modal } from 'semantic-ui-react'

const ModalForm = ({title, content}) => (
  <Modal trigger={<Button>Show Modal</Button>}>
    <Modal.Header>Select a Photo</Modal.Header>
    <Modal.Content>
      <Modal.Description>
        <Header>{title}</Header>
        <div>{content}</div>
      </Modal.Description>
    </Modal.Content>
  </Modal>
)

export default ModalForm