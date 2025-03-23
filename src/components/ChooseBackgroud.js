'use client';

import { faEdit } from '@fortawesome/free-solid-svg-icons';
import React, { useState, useRef, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Button from 'react-bootstrap/Button';

const ChooseBackground = () => {
  const [image, setImage] = useState(null);
  const [backgroundImage, setBackgroundImage] = useState(null);
  const [backgrounds, setBackgrounds] = useState([
    { id: 1, url: '/image/babyShower.jpeg', name: 'Baby Shower' },
    { id: 2, url: '/image/birthdayParty.jpeg', name: 'Birthday party' },
    { id: 3, url: '/image/BlossomBeauty.webp', name: 'Bloosom Beauty' }
  ]);
  const canvasRef = useRef(null);

  // Handle file upload for the main image
  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        const img = new Image();
        img.onload = () => {
          setImage(img);
        };
        img.src = event.target.result;
      };
      reader.readAsDataURL(file);
    }
  };

  // Handle selecting a background
  const selectBackground = (backgroundUrl) => {
    const img = new Image();
    img.onload = () => {
      setBackgroundImage(img);
    };
    img.src = backgroundUrl;
  };

  // Draw the composite image on canvas whenever image or background changes
  useEffect(() => {
    if (!canvasRef.current) return;
    
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    
    // Clear canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    // Draw background if available
    if (backgroundImage) {
      ctx.drawImage(backgroundImage, 0, 0, canvas.width, canvas.height);
    } else {
      // Default white background
      ctx.fillStyle = '#f0f0f0';
      ctx.fillRect(0, 0, canvas.width, canvas.height);
    }
    
    // Draw main image if available
    if (image) {
      // Center the image on the canvas
      const x = (canvas.width - image.width) / 2;
      const y = (canvas.height - image.height) / 2;
      ctx.drawImage(image, x, y);
    }
  }, [image, backgroundImage]);

  // Save the edited image
  const saveImage = () => {
    if (!canvasRef.current) return;
    
    const canvas = canvasRef.current;
    const dataUrl = canvas.toDataURL('image/png');
    
    // Create a download link
    const link = document.createElement('a');
    link.download = 'edited-image.png';
    link.href = dataUrl;
    link.click();
  };

  return (
    <div className="p-4" style={{overflow:'auto'}}>
      <div className="flex flex-col md:flex-row gap-6">
        {/* Left side - Canvas and controls */}
        <div className="flex-1">
          <h2 className="text-xl font-bold mb-4">Image Editor</h2>
          
          <div className="mb-4">
            <label className="block text-sm font-medium mb-2">Upload Image</label>
            <input 
              type="file" 
              accept="image/*" 
              onChange={handleImageUpload}
              className="block w-full text-sm border border-gray-300 rounded p-2"
            />
          </div>
          
          <div className="mb-4">
            <canvas 
              ref={canvasRef} 
              width={500} 
              height={680}
              className="border border-gray-300 rounded bg-white"
            />
          </div>
          
          <button 
            onClick={saveImage}
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
            disabled={!image}
          >
            Save Image
          </button>
        </div>
        
        {/* Right side - Background options */}
        <div className="w-full md:w-64">
          <h2 className="text-xl font-bold mb-4">Choose Background</h2>
          
          <div className="grid grid-cols-2 gap-2">
            {/* No background option */}
            <div 
              className="cursor-pointer border border-gray-300 rounded p-1 hover:border-blue-500"
              onClick={() => setBackgroundImage(null)}
            >
              <div className="h-24 bg-gray-100 flex items-center justify-center">
                <span className="text-gray-500">None</span>
              </div>
            </div>
            
            {/* Background options */}
            {backgrounds.map((bg) => (
              <div 
                key={bg.id}
                className="cursor-pointer border border-gray-300 rounded p-1 hover:border-blue-500"
                onClick={() => selectBackground(bg.url)}
              >
                <img 
                  src={bg.url} 
                  alt={bg.name} 
                  className="h-24 w-full object-cover"
                />
                <p className="text-xs text-center mt-1">{bg.name}</p>
              </div>
            ))}
          </div>
          
          {/* Custom background upload */}
          <div className="mt-4">
            <label className="block text-sm font-medium mb-2">Custom Background</label>
            <input 
              type="file" 
              accept="image/*" 
              onChange={(e) => {
                const file = e.target.files[0];
                if (file) {
                  const reader = new FileReader();
                  reader.onload = (event) => {
                    selectBackground(event.target.result);
                  };
                  reader.readAsDataURL(file);
                }
              }}
              className="block w-full text-sm border border-gray-300 rounded p-2"
            />
          </div>

          <div className="mt-4">
          <Button variant="success" className="float-right">
                <FontAwesomeIcon icon={faEdit} />Continue to editing
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChooseBackground;