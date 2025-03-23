"use client"

import * as React from "react";
import { useState, useEffect } from 'react';
import { faEdit } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import 'bootstrap/dist/css/bootstrap.min.css';
import AddModal from "../addText/AddModal";

const EditHeaderIcon = () => {
	const [show, setShow] = useState(false);
  const [editText, setEditText] = useState('');


  const checkEditText = ()=>{
    if(document.querySelector('.image-text-outline-highlighter')){
      setShow(true);
      setEditText(document.querySelector('.image-text-outline-highlighter').innerText);
    }
    else{
      alert('Please select element to edit!')
    }
  }

  const saveText = (updatedText)=>{
    document.querySelector('.image-text-outline-highlighter').innerHTML = updatedText;
  }

  useEffect(()=>{
    if(show===false){
      setEditText('');
    }
  },[show])

	return (
		<>
		<div class="text-format-control-items gentle-shake" onClick={() => checkEditText(true)}>
			<FontAwesomeIcon icon={faEdit}  />
			<div class="text-format-control-icon-txt">Edit</div>
			<div class="tool-tip-box"><div class="MuiGrid-root MuiGrid-container container-custom">
				<div class="MuiGrid-root MuiGrid-item container-custom-one">
					<span class="hide-tooltip-btn" aria-label="Edit Text">touch</span>
				</div>
			</div>
			</div>
		</div>

		 <AddModal show={show} 
     setShow={setShow} 
     text={editText} 
     isEdit={true} 
     saveText={saveText}
     />
		</>
	)
};

export default EditHeaderIcon;
