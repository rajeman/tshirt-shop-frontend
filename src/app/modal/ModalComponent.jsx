import React from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';

export default ({ payload }) => {
  return (
    <div>
      <Modal isOpen={true}>
        <ModalHeader>{payload.title}</ModalHeader>
        <ModalBody>{payload.body}</ModalBody>
        <ModalFooter>
          <Button
            color="secondary"
            className="text-dark"
            onClick={() => {
              payload.cancelFunction();
            }}
          >
            {payload.cancelText}
          </Button>{' '}
          <Button
            color="danger"
            onClick={() => {
              payload.executeFunction();
            }}
          >
            {payload.executeText}
          </Button>
        </ModalFooter>
      </Modal>
    </div>
  );
};
