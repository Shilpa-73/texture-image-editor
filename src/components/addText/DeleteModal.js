import * as React from "react";
import { useState, useEffect } from 'react';

import Button from 'react-bootstrap/Button';
import Row from 'react-bootstrap/Row';
import Modal from 'react-bootstrap/Modal';
import 'bootstrap/dist/css/bootstrap.min.css';

const DeleteModal = ({show=false,setShow=()=>{}, text ,deleteText}) => {
	
    return (
		<>
		<Modal
        show={show}
        onHide={() => setShow(false)}
        dialogClassName="modal-90w"
        aria-labelledby="example-custom-modal-styling-title">
        <Modal.Body>
             Are you sure you want to delete this text <b>{text}</b><br/>
             Once deleted it can't be restored.
        </Modal.Body>

        <Modal.Footer>
          <Button variant="secondary" onClick={()=>setShow(false)}>Close</Button>
          <Button variant="primary" onClick={()=>deleteText()}>
             Ok
          </Button>
        </Modal.Footer>
      </Modal>
		</>
	)
};

export default DeleteModal;
