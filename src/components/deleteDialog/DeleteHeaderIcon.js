"use client"

import * as React from "react";
import { useState } from 'react';
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import 'bootstrap/dist/css/bootstrap.min.css';
import DeleteModal from "../addText/DeleteModal";

const DeleteHeaderIcon = () => {
	const [show, setShow] = useState(false);
    const [selectedText, setSelectedText] = useState('');


  const showDeletePopup = ()=>{
    if(document.querySelector('.image-text-outline-highlighter')){
      setSelectedText(document.querySelector('.image-text-outline-highlighter').innerText);
      setShow(true);
    }
    else{
      alert('Please select element to delete!')
      setSelectedText('');
    }
  }

  const deleteText = ()=>{
    document.querySelector('.image-text-outline-highlighter').remove();
    setShow(false);
    setSelectedText('');
  }

	return (
		<>
		<div class="text-format-control-items gentle-shake" onClick={() => showDeletePopup(true)}>
			<FontAwesomeIcon icon={faTrash}  />
			<div class="text-format-control-icon-txt">Delete</div>
			<div class="tool-tip-box"><div class="MuiGrid-root MuiGrid-container container-custom">
				<div class="MuiGrid-root MuiGrid-item container-custom-one">
					<span class="hide-tooltip-btn" aria-label="Delete Text">touch</span>
				</div>
			</div>
			</div>
		</div>

		 <DeleteModal show={show} 
            setShow={setShow} 
            text={selectedText} 
            deleteText={deleteText}
            />
		</>
	)
};

export default DeleteHeaderIcon;
