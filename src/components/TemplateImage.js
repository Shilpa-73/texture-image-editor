
import NextImage from 'next/image'
import React, { useState, useRef, useEffect } from 'react';

const TemplateImage = ({image=null}) => {

      console.log({image:image});

      const canvasRef = useRef(null);

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
              ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
            }          
        }, [image]);

      return (
            
                  <NextImage
                  className="image-container-bg-image"
                  src={image || "/image/BlossomBeauty.webp"}
                  alt="Landscape photograph by Tobias Tullius"
                  />
      
      
                //   {/* <div className="">
                //   <canvas 
                //     ref={canvasRef} 
                //     // width={450} 
                //     id="editorCanvas"
                //     // height={580}
                //     className="border border-gray-300 bg-white"
                //   />
                // </div> */}
      );
}

export default TemplateImage;
