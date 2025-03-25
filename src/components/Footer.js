"use client";

import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import { faCamera, faClose, faDownload, faExpand, faFileDownload, faFilePdf, faUpload } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import html2canvas from "html2canvas";
import jsPDF from "jspdf";
import AddModal from './addText/AddModal';
import RangerSlider from './slider/RangerSlider';
/* ES6 */
import * as htmlToImage from 'html-to-image';
import { toPng, toJpeg, toBlob, toPixelData, toSvg } from 'html-to-image';
import download from 'downloadjs';

const Footer = ({ addText = () => { }, setParentPreview = ()=>{} }) => {
    const [show, setShow] = useState(false);
    const [preview, setPreview] = useState(false);
   

   
    const saveText = (text) => {
        addText(text)
        setShow(false);
    }

    const setPreviewFn = (preview)=>{
       if(preview){
            document.querySelector('.main-wrap').classList.add('preview');
           // document.querySelector('.Container').style.transform = 'scale(1)';
       }
       else{
            document.querySelector('.main-wrap').classList.remove('preview');
           // document.querySelector('.Container').style.removeProperty('transform');
       }
        setPreview(preview);
        setParentPreview(preview);
    }


    const rangeDragEnd = (scale)=>{
        document.querySelector('.container').style.transform = `scale(${scale})`;
    }
    
  

    return (
        <>
            <div class="next-btn-wrap download_section_dsk">
                <div class="extra-menu-box">
                    <div class="footer-items" onClick={() => setShow(true)}>
                        <div class="add_ext_txt_icn"><div>+</div></div>
                        <div class="text-format-control-icon-txt">Add Text</div>
                    </div>
                    {/* <div class="footer-items">
                        <div class="add-photo-btn">
                            <div class="border-sty">
                                <FontAwesomeIcon icon={faCamera} />
                            </div>
                            <div class="text-format-control-icon-txt">Photo</div>
                        </div>
                        <input type="file" hidden name="photo-image" />
                    </div> */}
                    

                    <div className='footer-items'>
                        <Button variant="success" className="float-right" onClick={() => setPreviewFn(true)}>
                            <FontAwesomeIcon icon={faExpand} className="" title="Preview Image" /> Preview
                        </Button>
                    </div>
                    
                </div>
            </div>
            

            <div class="download_footer">
                <div class="download_section">
                    <div class="footer-items">
                        <div class="add-photo-btn">
                            <div class="border-sty">
                                <FontAwesomeIcon icon={faExpand} />
                                <div class="text-format-control-icon-txt">Photo</div></div></div>
                        {/* <div className="footer-items">
                            <div class="add_ext_txt_icn">
                                <div>+</div>
                            </div>
                            <div class="text-format-control-icon-txt">Add Text</div>
                        </div> */}
                        <div className='footer-items'>
                            <Button variant="success" className="float-right" onClick={() => setPreviewFn(true)}>
                                <FontAwesomeIcon icon={faExpand} className="" title="Preview Image" /> Preview
                            </Button>
                        </div>
                    </div></div></div>


            <AddModal show={show}
                setShow={setShow}
                saveText={saveText}
            />
        </>
    );
};

export default Footer;
