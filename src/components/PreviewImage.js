
import NextImage from 'next/image'
import React, { useState, useRef, useEffect } from 'react';

const PreviewImage = ({image=null}) => {
      console.log({image:image});
      const canvasRef = useRef(null);
      const [scale,setScale] = useState(1);

      useEffect(() => {
            if (!canvasRef.current) return;

            const img = new Image();
            img.src = image;
            
            const canvas = canvasRef.current;
            const ctx = canvas.getContext('2d');
            
            // Clear canvas
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            
            // Draw background if available
            if (img) {
              ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
            } else {
              // Default white background
              ctx.fillStyle = '#f0f0f0';
              ctx.fillRect(0, 0, canvas.width, canvas.height);
            }
  
            img.onload = ()=>{
              console.log({onImageLoad:true});
              canvas.width = img.width;
                canvas.height = img.height;
                ctx.imageSmoothingEnabled = false;
              ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
            }          
        }, [image]);

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
             <canvas 
                ref={canvasRef} 
                // width={450} 
                id="previewCanvas"
                // height={580}
                className="border border-gray-300 bg-white"
            />  
        </>
      );
}

export default PreviewImage;
