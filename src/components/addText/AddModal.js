import * as React from "react";
import { useState, useEffect } from 'react';

import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import Row from 'react-bootstrap/Row';
import Modal from 'react-bootstrap/Modal';
import { faEdit, faL } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import 'bootstrap/dist/css/bootstrap.min.css';

const AddModal = ({show=false,setShow=()=>{}, text, isEdit=false,saveText}) => {
	const [userText,setUserText] = useState('');

    useEffect(()=>{
        setUserText(text)
    },[text])

    return (
		<>
		<Modal
        show={show}
        onHide={() => setShow(false)}
        dialogClassName="modal-90w"
        aria-labelledby="example-custom-modal-styling-title">
        <Modal.Body>
          <Row className="mb-3">
              <textarea name="user-text" 
              placeholder="Start typing here..."
              value={userText}
              onChange={e => setUserText(e.target.value)} 
              defaultValue={text}
              required className="custom-textarea"/>
          </Row> 
        </Modal.Body>

        <Modal.Footer>
          <Button variant="secondary" onClick={()=>setShow(false)}>Close</Button>
          <Button variant="primary" onClick={()=>saveText(userText, isEdit)}>
            {isEdit ? 'Update changes' : 'Save changes'}
          </Button>
        </Modal.Footer>
      </Modal>
		</>
	)
};

export default AddModal;
