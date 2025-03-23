"use client"

import React, { useState, useRef } from 'react';

const TemplateEditor = () => {
  const [template, setTemplate] = useState('wedding1');
  const [occasion, setOccasion] = useState('wedding');
  const [textElements, setTextElements] = useState([
    { id: 1, content: 'Sarah & Michael', x: 200, y: 100, fontSize: 32, color: '#000000', dragging: false },
    { id: 2, content: 'June 15, 2025', x: 200, y: 170, fontSize: 22, color: '#000000', dragging: false },
    { id: 3, content: 'Rosewood Gardens', x: 200, y: 230, fontSize: 18, color: '#3a3a3a', dragging: false },
  ]);
  const [selectedElement, setSelectedElement] = useState(null);
  const editorRef = useRef(null);
  const [nextId, setNextId] = useState(4);

  // Template backgrounds with built-in images
  const templates = {
    wedding1: { bg: 'bg-pink-50', label: 'Floral Elegance' },
    wedding2: { bg: 'bg-amber-50', label: 'Rustic Gold' },
    wedding3: { bg: 'bg-blue-50', label: 'Classic Blue' },
    birthday1: { bg: 'bg-purple-50', label: 'Celebration Purple' },
    birthday2: { bg: 'bg-yellow-50', label: 'Festive Yellow' },
    birthday3: { bg: 'bg-green-50', label: 'Party Green' },
  };

  // Built-in decorative images
  const decorativeImages = {
    wedding: [
      { id: 'w1', src: '/api/placeholder/100/100', alt: 'Wedding Rings', label: 'Rings' },
      { id: 'w2', src: '/api/placeholder/120/80', alt: 'Wedding Flowers', label: 'Flowers' },
      { id: 'w3', src: '/api/placeholder/80/120', alt: 'Wedding Cake', label: 'Cake' },
    ],
    birthday: [
      { id: 'b1', src: '/api/placeholder/100/100', alt: 'Birthday Cake', label: 'Cake' },
      { id: 'b2', src: '/api/placeholder/100/100', alt: 'Balloons', label: 'Balloons' },
      { id: 'b3', src: '/api/placeholder/100/100', alt: 'Gift', label: 'Gift' },
    ],
  };
  
  // Handle mouse down on a text element
  const handleMouseDown = (e, id) => {
    // Update the state to indicate which element is being dragged
    setTextElements(elements => 
      elements.map(el => 
        el.id === id 
          ? { ...el, dragging: true } 
          : el
      )
    );
    setSelectedElement(id);
    
    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseup', handleMouseUp);
  };

  // Handle mouse move when dragging
  const handleMouseMove = (e) => {
    if (editorRef.current) {
      const editorRect = editorRef.current.getBoundingClientRect();
      
      setTextElements(elements => 
        elements.map(el => {
          if (el.dragging) {
            // Calculate new position relative to the editor
            const x = e.clientX - editorRect.left;
            const y = e.clientY - editorRect.top;
            
            return { ...el, x, y };
          }
          return el;
        })
      );
    }
  };

  // Handle mouse up (end of drag)
  const handleMouseUp = () => {
    setTextElements(elements => 
      elements.map(el => 
        el.dragging ? { ...el, dragging: false } : el
      )
    );
    
    document.removeEventListener('mousemove', handleMouseMove);
    document.removeEventListener('mouseup', handleMouseUp);
  };

  // Add a new text element
  const addTextElement = () => {
    const newElement = {
      id: nextId,
      content: 'New Text',
      x: 200,
      y: 300,
      fontSize: 18,
      color: '#000000',
      dragging: false
    };
    
    setTextElements([...textElements, newElement]);
    setSelectedElement(nextId);
    setNextId(nextId + 1);
  };

  // Remove a text element
  const removeTextElement = (id) => {
    setTextElements(elements => elements.filter(el => el.id !== id));
    if (selectedElement === id) {
      setSelectedElement(null);
    }
  };

  // Update text content
  const updateTextContent = (id, content) => {
    setTextElements(elements => 
      elements.map(el => 
        el.id === id ? { ...el, content } : el
      )
    );
  };

  // Update text color
  const updateTextColor = (id, color) => {
    setTextElements(elements => 
      elements.map(el => 
        el.id === id ? { ...el, color } : el
      )
    );
  };

  // Update font size
  const updateFontSize = (id, fontSize) => {
    setTextElements(elements => 
      elements.map(el => 
        el.id === id ? { ...el, fontSize: parseInt(fontSize) } : el
      )
    );
  };

  // Handle occasion change
  const handleOccasionChange = (e) => {
    const newOccasion = e.target.value;
    setOccasion(newOccasion);
    
    // Set default template based on occasion
    if (newOccasion === 'wedding') {
      setTemplate('wedding1');
      setTextElements([
        { id: 1, content: 'Sarah & Michael', x: 200, y: 100, fontSize: 32, color: '#000000', dragging: false },
        { id: 2, content: 'June 15, 2025', x: 200, y: 170, fontSize: 22, color: '#000000', dragging: false },
        { id: 3, content: 'Rosewood Gardens', x: 200, y: 230, fontSize: 18, color: '#3a3a3a', dragging: false },
      ]);
    } else {
      setTemplate('birthday1');
      setTextElements([
        { id: 1, content: 'Happy Birthday!', x: 200, y: 100, fontSize: 32, color: '#000000', dragging: false },
        { id: 2, content: 'John turns 30', x: 200, y: 170, fontSize: 22, color: '#000000', dragging: false },
        { id: 3, content: 'Saturday, April 12th at 7PM', x: 200, y: 230, fontSize: 18, color: '#3a3a3a', dragging: false },
      ]);
    }
    setNextId(4);
  };

  return (
    <div className="flex flex-col lg:flex-row w-full gap-6 p-4">
      {/* Editor Controls */}
      <div className="w-full lg:w-1/3 bg-white p-4 rounded shadow-md">
        <h2 className="text-xl font-bold mb-4">Template Editor</h2>
        
        <div className="mb-4">
          <label className="block text-sm font-medium mb-1">Occasion:</label>
          <select 
            className="w-full p-2 border rounded"
            value={occasion}
            onChange={handleOccasionChange}
          >
            <option value="wedding">Wedding</option>
            <option value="birthday">Birthday</option>
          </select>
        </div>
        
        <div className="mb-4">
          <label className="block text-sm font-medium mb-1">Template Style:</label>
          <select 
            className="w-full p-2 border rounded"
            value={template}
            onChange={(e) => setTemplate(e.target.value)}
          >
            {occasion === 'wedding' ? (
              <>
                <option value="wedding1">{templates.wedding1.label}</option>
                <option value="wedding2">{templates.wedding2.label}</option>
                <option value="wedding3">{templates.wedding3.label}</option>
              </>
            ) : (
              <>
                <option value="birthday1">{templates.birthday1.label}</option>
                <option value="birthday2">{templates.birthday2.label}</option>
                <option value="birthday3">{templates.birthday3.label}</option>
              </>
            )}
          </select>
        </div>
        
        <div className="mb-4">
          <div className="flex justify-between items-center mb-2">
            <label className="block text-sm font-medium">Text Elements:</label>
            <button 
              onClick={addTextElement}
              className="text-blue-500 hover:text-blue-700 flex items-center"
            >
              <Plus size={16} className="mr-1" /> Add Text
            </button>
          </div>
          
          <div className="space-y-2 max-h-32 overflow-y-auto border rounded p-2">
            {textElements.map(el => (
              <div 
                key={el.id} 
                className={`flex justify-between items-center p-2 rounded cursor-pointer ${selectedElement === el.id ? 'bg-blue-100' : 'hover:bg-gray-100'}`}
                onClick={() => setSelectedElement(el.id)}
              >
                <div className="truncate flex-1">{el.content}</div>
                <button 
                  onClick={() => removeTextElement(el.id)}
                  className="text-red-500 hover:text-red-700"
                >
                  { <X size={16} />}                </button>
              </div>
            ))}
          </div>
        </div>
        
        {selectedElement && (
          <div className="border rounded p-3 mb-4">
            <h3 className="font-medium mb-2">Edit Text</h3>
            
            <div className="mb-3">
              <label className="block text-sm mb-1">Content:</label>
              <input 
                type="text" 
                className="w-full p-2 border rounded"
                value={textElements.find(el => el.id === selectedElement)?.content || ''}
                onChange={(e) => updateTextContent(selectedElement, e.target.value)}
              />
            </div>
            
            <div className="mb-3">
              <label className="block text-sm mb-1">Font Size:</label>
              <input 
                type="number" 
                min="8"
                max="72"
                className="w-full p-2 border rounded"
                value={textElements.find(el => el.id === selectedElement)?.fontSize || 18}
                onChange={(e) => updateFontSize(selectedElement, e.target.value)}
              />
            </div>
            
            <div className="mb-3">
              <label className="block text-sm mb-1">Color:</label>
              <input 
                type="color" 
                className="w-full p-1 border rounded h-10"
                value={textElements.find(el => el.id === selectedElement)?.color || '#000000'}
                onChange={(e) => updateTextColor(selectedElement, e.target.value)}
              />
            </div>
          </div>
        )}
        
        <div className="mb-4">
          <h3 className="font-medium mb-2">Built-in Images</h3>
          <div className="grid grid-cols-3 gap-2">
            {decorativeImages[occasion].map(img => (
              <div key={img.id} className="text-center">
                <img 
                  src={img.src} 
                  alt={img.alt} 
                  className="mx-auto border rounded cursor-pointer hover:border-blue-500"
                />
                <div className="text-xs mt-1">{img.label}</div>
              </div>
            ))}
          </div>
        </div>
        
        {/* <button className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 w-full flex items-center justify-center">
          {<Download size={18} className="mr-2" />}
           Download Design
        </button> */}
      </div>
      
      {/* Preview Area */}
      <div className="w-full lg:w-2/3">
        <div 
          ref={editorRef}
          className={`aspect-[5/7] relative border rounded-lg shadow-lg ${templates[template].bg}`}
          style={{minHeight: '500px'}}
        >
          {textElements.map(el => (
            <div
              key={el.id}
              style={{
                position: 'absolute',
                left: `${el.x}px`,
                top: `${el.y}px`,
                fontSize: `${el.fontSize}px`,
                color: el.color,
                cursor: 'move',
              }}
              className={`${el.dragging ? 'opacity-70' : ''} ${selectedElement === el.id ? 'outline-highlighter ring-blue-500 p-1' : ''}`}
              onMouseDown={(e) => handleMouseDown(e, el.id)}
            >
              {el.content}
            </div>
          ))}
        </div>
        
        <div className="mt-4 text-center text-sm text-gray-500">
          Click and drag text elements to reposition them. Select an element to edit its properties.
        </div>
      </div>
    </div>
  );
};

export default TemplateEditor;