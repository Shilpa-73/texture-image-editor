import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import {  faClose, faFileDownload, faFilePdf } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';

function captureAndDownloadElement() {
    let htmlElement = document.getElementById('invitation-card-main');
    html2canvas(htmlElement).then(canvas=>{
        const image = canvas.toDataURL("image/png");
   
        let link = document.createElement('a');
        link.download = 'my-image-name.png';
        link.href = image;
        link.click();
    })
}

/**
 * Captures a parent div containing images and converts it to PDF
 * @param {HTMLElement} parentElement - The parent div to capture
 * @param {string} filename - Name for the downloaded PDF file
 * @param {string} format - PDF page format (e.g., 'a4', 'letter')
 * @param {string} orientation - PDF orientation ('portrait' or 'landscape')
 * @param {number} margin - Margin in mm to add around the content
 */
function captureParentDivWithImagesToPDF(
    parentElement,
    filename = 'download.pdf',
    format = 'a4',
    orientation = 'portrait',
    margin = 10
) {
    // Make sure all images are loaded before capturing
    const images = parentElement.querySelectorAll('img');
    const imagePromises = Array.from(images).map(img => {
        if (img.complete) {
            return Promise.resolve();
        } else {
            return new Promise(resolve => {
                img.onload = resolve;
                img.onerror = resolve; // Continue even if image fails to load
            });
        }
    });

    // Wait for all images to load
    Promise.all(imagePromises)
        .then(() => {
            // Configuration options for html2canvas
            const options = {
                scale: 2, // Higher scale for better quality
                useCORS: true, // Enable for cross-origin images
                allowTaint: true, // Allow capturing cross-origin images
                logging: false, // Set to true for debugging
                scrollX: 0, // Prevent horizontal scrolling issues
                scrollY: -window.scrollY // Prevent vertical scrolling issues
            };

            return html2canvas(parentElement, options);
        })
        .then(canvas => {
            const imgData = canvas.toDataURL('image/png');

            // Initialize jsPDF with proper format and orientation
            const pdf = new jsPDF({
                orientation: orientation,
                unit: 'mm',
                format: format
            });

            // Calculate dimensions
            const pdfWidth = pdf.internal.pageSize.getWidth();
            const pdfHeight = pdf.internal.pageSize.getHeight();

            // Calculate available space accounting for margins
            const availableWidth = pdfWidth - (margin * 2);
            const availableHeight = pdfHeight - (margin * 2);

            // Calculate ratio to fit the image within available space
            const imgWidth = canvas.width;
            const imgHeight = canvas.height;
            const ratio = Math.min(availableWidth / imgWidth, availableHeight / imgHeight);

            // Calculate final dimensions and position (centered)
            const finalWidth = imgWidth * ratio;
            const finalHeight = imgHeight * ratio;
            const x = (pdfWidth - finalWidth) / 2;
            const y = (pdfHeight - finalHeight) / 2;

            // Add image to PDF
            pdf.addImage(imgData, 'PNG', x, y, finalWidth, finalHeight);

            // // Save the PDF
            pdf.save(filename);
        })
        .catch(error => {
            console.error('Error capturing parent div to PDF:', error);
        });
}


const PreviewImageOption = ({image=null, setParentPreview=()=>{}}) => {
      const [scale,setScale] = useState(1);

          const zoomIn = ()=>{
                setScale(scale+0.1);
                document.querySelector('.image-container').style.transform = `scale(${scale})`;
            }
        
        
            const zoomOut = ()=>{
                setScale(scale-0.1);
                document.querySelector('.image-container').style.transform = `scale(${scale})`;
            }
        
        
            const resetScale = ()=>{
                setScale(1);
                document.querySelector('.image-container').style.transform = `scale(${scale})`;
            }


            const downloadImage = () => captureAndDownloadElement();
        
            const downloadImageAsPdf = () => {
                const input = document.querySelector(".image-container");
                //captureDivToPDF(input, 'div-content.pdf', 'a4', 'portrait');
        
                captureParentDivWithImagesToPDF(
                    input,
                    'parent-div-with-images.pdf',
                    'a4',
                    'portrait',
                    10 // 10mm margin
                );
            }
        
      return (
        <>
             <div class="preview-options">
                    <a className="btn zoom" onClick={()=>zoomIn()}><i className="fas fa-search-plus"></i></a>
                    <a className="btn zoom-out" onClick={()=>zoomOut()}><i className="fas fa-search-minus"></i></a>
                    <a className="btn zoom-init" onClick={()=>resetScale()}><i class="fas fa-recycle"></i></a>
                    <Button className="btn" onClick={() => downloadImage()}>
                            <FontAwesomeIcon icon={faFileDownload} className="" title="Download Png Image" />
                    </Button>
                    <Button  className="btn" onClick={() => downloadImageAsPdf()}>
                            <FontAwesomeIcon icon={faFilePdf} className="" title="Download PDF" />
                    </Button>
                    <Button  className="btn" onClick={() => setParentPreview(false)}>
                            <FontAwesomeIcon icon={faClose} className="" title="Close preview" />
                    </Button>
            </div>    
        </>
      );
}

export default PreviewImageOption;
