"use client";

import React, { useState, useRef } from 'react';

const DraggableTextOnImage = () => {
  const [text, setText] = useState('Drag me around!');
  const [textElements, setTextElements] = useState([
    { 
      id: 1, 
      content: 'Drag me around!', 
      position: { x: 50, y: 50 },
      style: {
        color: '#ffffff',
        fontSize: '24px',
        fontWeight: 'bold',
        textShadow: '2px 2px 4px #000000',
        fontFamily: 'Impact, sans-serif',
      }
    }
  ]);
  const [selectedId, setSelectedId] = useState(null);
  const [isCreating, setIsCreating] = useState(false);
  const [currentStyle, setCurrentStyle] = useState({
    color: '#ffffff',
    fontSize: '24px',
    fontWeight: 'bold',
    textShadow: '2px 2px 4px #000000',
    fontFamily: 'Impact, sans-serif',
  });
  const [imageUrl, setImageUrl] = useState('/api/placeholder/600/400');
  const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 });
  const containerRef = useRef(null);

  // Handle text dragging
  const handleMouseDown = (e, id) => {
    e.preventDefault();
    const element = textElements.find(el => el.id === id);
    if (!element) return;
    
    const rect = e.currentTarget.getBoundingClientRect();
    setDragOffset({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top
    });
    
    setSelectedId(id);
    
    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseup', handleMouseUp);
  };

  const handleMouseMove = (e) => {
    if (!selectedId || !containerRef.current) return;
    
    const containerRect = containerRef.current.getBoundingClientRect();
    const x = e.clientX - containerRect.left - dragOffset.x;
    const y = e.clientY - containerRect.top - dragOffset.y;
    
    setTextElements(prevElements => 
      prevElements.map(el => 
        el.id === selectedId 
          ? { ...el, position: { x, y } } 
          : el
      )
    );
  };

  const handleMouseUp = () => {
    setSelectedId(null);
    document.removeEventListener('mousemove', handleMouseMove);
    document.removeEventListener('mouseup', handleMouseUp);
  };

  // Add new text element
  const addTextElement = () => {
    const newId = Math.max(0, ...textElements.map(el => el.id)) + 1;
    setTextElements([
      ...textElements,
      {
        id: newId,
        content: text,
        position: { x: 100, y: 100 },
        style: { ...currentStyle }
      }
    ]);
    setIsCreating(false);
  };

  // Delete selected text element
  const deleteSelected = () => {
    if (!selectedId) return;
    setTextElements(prevElements => prevElements.filter(el => el.id !== selectedId));
    setSelectedId(null);
  };

  // Handle image upload
  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file && file.type.match('image.*')) {
      const reader = new FileReader();
      reader.onload = (e) => setImageUrl(e.target.result);
      reader.readAsDataURL(file);
    }
  };

  // Update text element content
  const updateTextContent = (id, newContent) => {
    setTextElements(prevElements => 
      prevElements.map(el => 
        el.id === id 
          ? { ...el, content: newContent } 
          : el
      )
    );
  };

  // Update text element style
  const updateTextStyle = (id, styleProperty, value) => {
    setTextElements(prevElements => 
      prevElements.map(el => 
        el.id === id 
          ? { ...el, style: { ...el.style, [styleProperty]: value } } 
          : el
      )
    );
  };

  return (
    <div className="flex flex-col p-4">
      <div className="mb-4 flex flex-wrap gap-2">
        <button 
          className="bg-blue-500 text-white px-3 py-1 rounded"
          onClick={() => setIsCreating(true)}
        >
          Add Text
        </button>
        
        <button 
          className="bg-red-500 text-white px-3 py-1 rounded"
          onClick={deleteSelected}
          disabled={!selectedId}
        >
          Delete Selected
        </button>
        
        <label className="bg-gray-500 text-white px-3 py-1 rounded cursor-pointer">
          Upload Image
          <input 
            type="file" 
            accept="image/*"
            className="hidden"
            onChange={handleImageUpload}
          />
        </label>
      </div>

      {isCreating && (
        <div className="mb-4 p-4 border rounded">
          <div className="mb-2">
            <input
              type="text"
              value={text}
              onChange={(e) => setText(e.target.value)}
              className="border p-2 w-full mb-2"
              placeholder="Enter text"
            />
          </div>
          
          <div className="grid grid-cols-2 gap-2">
            <div>
              <label className="block text-sm">Color</label>
              <input
                type="color"
                value={currentStyle.color}
                onChange={(e) => setCurrentStyle({...currentStyle, color: e.target.value})}
                className="p-1 w-full"
              />
            </div>
            
            <div>
              <label className="block text-sm">Font Size</label>
              <select
                value={currentStyle.fontSize}
                onChange={(e) => setCurrentStyle({...currentStyle, fontSize: e.target.value})}
                className="p-1 border w-full"
              >
                <option value="16px">Small</option>
                <option value="24px">Medium</option>
                <option value="32px">Large</option>
                <option value="48px">X-Large</option>
              </select>
            </div>
            
            <div>
              <label className="block text-sm">Font Weight</label>
              <select
                value={currentStyle.fontWeight}
                onChange={(e) => setCurrentStyle({...currentStyle, fontWeight: e.target.value})}
                className="p-1 border w-full"
              >
                <option value="normal">Normal</option>
                <option value="bold">Bold</option>
              </select>
            </div>
            
            <div>
              <label className="block text-sm">Text Shadow</label>
              <select
                value={currentStyle.textShadow}
                onChange={(e) => setCurrentStyle({...currentStyle, textShadow: e.target.value})}
                className="p-1 border w-full"
              >
                <option value="none">None</option>
                <option value="2px 2px 4px #000000">Dark</option>
                <option value="2px 2px 4px #ffffff">Light</option>
              </select>
            </div>
          </div>
          
          <div className="mt-2 flex justify-end gap-2">
            <button 
              className="bg-gray-300 px-3 py-1 rounded"
              onClick={() => setIsCreating(false)}
            >
              Cancel
            </button>
            <button 
              className="bg-blue-500 text-white px-3 py-1 rounded"
              onClick={addTextElement}
            >
              Add
            </button>
          </div>
        </div>
      )}

      {selectedId && (
        <div className="mb-4 p-4 border rounded">
          <h3 className="font-bold mb-2">Edit Text</h3>
          {textElements.map(el => el.id === selectedId ? (
            <div key={`edit-${el.id}`} className="space-y-2">
              <div>
                <input
                  type="text"
                  value={el.content}
                  onChange={(e) => updateTextContent(el.id, e.target.value)}
                  className="border p-2 w-full"
                />
              </div>
              
              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="block text-sm">Color</label>
                  <input
                    type="color"
                    value={el.style.color}
                    onChange={(e) => updateTextStyle(el.id, 'color', e.target.value)}
                    className="p-1 w-full"
                  />
                </div>
                
                <div>
                  <label className="block text-sm">Font Size</label>
                  <select
                    value={el.style.fontSize}
                    onChange={(e) => updateTextStyle(el.id, 'fontSize', e.target.value)}
                    className="p-1 border w-full"
                  >
                    <option value="16px">Small</option>
                    <option value="24px">Medium</option>
                    <option value="32px">Large</option>
                    <option value="48px">X-Large</option>
                  </select>
                </div>
                
                <div>
                  <label className="block text-sm">Font Weight</label>
                  <select
                    value={el.style.fontWeight}
                    onChange={(e) => updateTextStyle(el.id, 'fontWeight', e.target.value)}
                    className="p-1 border w-full"
                  >
                    <option value="normal">Normal</option>
                    <option value="bold">Bold</option>
                  </select>
                </div>
                
                <div>
                  <label className="block text-sm">Text Shadow</label>
                  <select
                    value={el.style.textShadow}
                    onChange={(e) => updateTextStyle(el.id, 'textShadow', e.target.value)}
                    className="p-1 border w-full"
                  >
                    <option value="none">None</option>
                    <option value="2px 2px 4px #000000">Dark</option>
                    <option value="2px 2px 4px #ffffff">Light</option>
                  </select>
                </div>
              </div>
            </div>
          ) : null)}
        </div>
      )}

      <div 
        ref={containerRef}
        className="relative border overflow-hidden" 
        style={{height:'500px'}}
      >
        <img 
          src={imageUrl} 
          alt="Background" 
          className="w-full h-full object-cover"
        />
        
        {textElements.map(el => (
          <div
            key={el.id}
            className={`absolute cursor-move select-none ${el.id === selectedId ? 'ring-2 ring-blue-500' : ''}`}
            style={{
              left: `${el.position.x}px`,
              top: `${el.position.y}px`,
              ...el.style
            }}
            onMouseDown={(e) => handleMouseDown(e, el.id)}
          >
            {el.content}
          </div>
        ))}
      </div>
    </div>
  );
};

export default DraggableTextOnImage;