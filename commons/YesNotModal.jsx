import React from 'react'
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

export const YesNotModal = ({ txt, show, onYes, onNot }) => {
  return (
    <Modal
      show={ show }
      aria-labelledby="yes-not-modal"
      centered
    >
      <Modal.Header>
        <Modal.Title id="yes-not-modal">
            { txt }
        </Modal.Title>
      </Modal.Header>
      <Modal.Footer className="d-flex justify-content-center">
        <Button onClick={onYes} className="col-2">
            Si
        </Button>
        <Button onClick={onNot} variant="danger" className="col-2">
            No
        </Button>
      </Modal.Footer>
    </Modal>
  );
}