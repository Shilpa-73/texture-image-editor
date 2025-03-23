"use client";

import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import { faCamera, faDownload, faExpand, faFileDownload, faFilePdf, faUpload } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import html2canvas from "html2canvas";
import jsPDF from "jspdf";
import AddModal from './addText/AddModal';
import RangerSlider from './slider/RangerSlider';

function captureAndDownloadElement(element, filename = 'download.png', width = 800, height = 600) {
    // Configuration options for html2canvas
    const options = {
        width: width,
        height: height,
        scale: 2, // Higher scale for better quality
        useCORS: true, // Enable if your div contains images from other domains
        allowTaint: true, // Allow tainted canvas if cross-origin images exist
        backgroundColor: null, // null for transparent background
        logging: false // Set to true for debugging
    };

    html2canvas(element, options).then(canvas => {
        // Create a download link
        const link = document.createElement('a');
        link.download = filename;

        // Convert canvas to blob
        canvas.toBlob(blob => {
            link.href = URL.createObjectURL(blob);
            link.click();

            // Clean up
            URL.revokeObjectURL(link.href);
        }, 'image/png');
    }).catch(error => {
        console.error('Error capturing element:', error);
    });
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

const Footer = ({ addText = () => { } }) => {
    const [show, setShow] = useState(false);
    const [preview, setPreview] = useState(false);

    const downloadImage = () => {
        const input = document.querySelector(".image-container");

        captureAndDownloadElement(input, 'my-image.png', 1200, 800);
    }

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

    const saveText = (text) => {
        addText(text)
        setShow(false);
    }

    const setPreviewFn = ()=>{
        document.querySelector('.main-wrap').classList.add('preview');
       document.querySelector('.container').style.transform = 'scale(1)';
        setPreview(true);
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
                    <div class="footer-items">
                        <div class="add-photo-btn">
                            <div class="border-sty">
                                <FontAwesomeIcon icon={faCamera} />
                            </div>
                            <div class="text-format-control-icon-txt">Photo</div>
                        </div>
                        <input type="file" hidden name="photo-image" />
                    </div>
                    <div className='footer-items'>
                        <Button variant="success" className="float-right" onClick={() => downloadImage()}>
                            <FontAwesomeIcon icon={faFileDownload} className="" title="Download Image" />
                        </Button>
                    </div>
                    <div className='footer-items'>
                        <Button variant="success" className="float-right" onClick={() => downloadImageAsPdf()}>
                            <FontAwesomeIcon icon={faFilePdf} className="" title="Download PDF" />
                        </Button>
                    </div>
                    <div className='footer-items'>
                        <Button variant="success" className="float-right" onClick={() => setPreviewFn()}>
                            <FontAwesomeIcon icon={faFilePdf} className="" title="Preview Image" />Preview
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
                        <div className="footer-items">
                            <div class="add_ext_txt_icn">
                                <div>+</div>
                            </div>
                            <div class="text-format-control-icon-txt">Add Text</div>
                        </div>
                        <div className='footer-items'>
                            <Button variant="success" className="float-right" onClick={() => downloadImage()}>
                                <FontAwesomeIcon icon={faFileDownload} />
                                Download
                            </Button>
                        </div>
                    </div></div></div>


            <AddModal show={show}
                setShow={setShow}
                saveText={saveText}
            />

            {
                preview && <RangerSlider min={0.5} max={2.5} value={'1'} rangeDragEnd={rangeDragEnd}/>
            }
        </>
    );
};

export default Footer;
