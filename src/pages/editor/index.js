"use client"

import React, { useState, useRef, useEffect } from 'react';
import TemplateImage from '../../components/TemplateImage';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import jsonData from '../../data/album.json';
// import 'bootstrap/dist/css/bootstrap.min.css';


const TemplateEditor = ({image,fontFamily, router={query:{type:"Wedding"}}}) => {

  const occasion =  router.query.type;
  console.log({image, occasion});

  const [template, setTemplate] = useState('wedding1');
  // const [occasion, setOccasion] = useState('wedding');
  const selectedOccasion = jsonData.find(d=>d.type===occasion);
  const [textElements, setTextElements] = useState(selectedOccasion.dummyText || [
    { id: 1, content: 'Sarah & Michael', x: 200, y: 100, fontSize: 32, color: '#000000', dragging: false },
    { id: 2, content: 'June 15, 2025', x: 200, y: 170, fontSize: 22, color: '#000000', dragging: false },
    { id: 3, content: 'Rosewood Gardens', x: 200, y: 230, fontSize: 18, color: '#3a3a3a', dragging: false },
  ]);
  const [selectedElement, setSelectedElement] = useState(null);
  const editorRef = useRef(null);
  const [nextId, setNextId] = useState(selectedOccasion.dummyText.length+1);

  // Template backgrounds with built-in images
  const templates = {
    wedding1: { bg: 'bg-pink-50', label: 'Floral Elegance' },
    wedding2: { bg: 'bg-amber-50', label: 'Rustic Gold' },
    wedding3: { bg: 'bg-blue-50', label: 'Classic Blue' },
    birthday1: { bg: 'bg-purple-50', label: 'Celebration Purple' },
    birthday2: { bg: 'bg-yellow-50', label: 'Festive Yellow' },
    birthday3: { bg: 'bg-green-50', label: 'Party Green' },
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
  const addTextElement = (text) => {

    if(document.querySelector('.image-text-outline-highlighter')){
      document.querySelector('.image-text-outline-highlighter').classList.add('text-content')
      document.querySelector('.image-text-outline-highlighter').classList.remove('.image-text-outline-highlighter');
    }

    const {newTextPosition} = jsonData.find(d=>d.type===occasion);
    const newElement = {
      id: nextId,
      content: text,
      x: newTextPosition.x,
      y: newTextPosition.y,
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
    // setOccasion(newOccasion);
    
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


  const changeFontFamily = (fontFamily)=>{
      const id = document.querySelector('.image-text-outline-highlighter')?.getAttribute('id');
      setTextElements(elements => 
        elements.map(el => 
          {
              if(el.id === id){
                el.class = fontFamily;
              }
              return el;
          }
        )
      );
  }
  
  return (
    <>
    <div class="main-wrap" id="main-page">
    {/* <div class="flex-container"></div> */}
    <Header changeFontFamily={changeFontFamily}/>
    <div className="flex flex-col lg:flex-row w-full gap-6 p-4 pt-0  max-93 justify-center">
      <div className="image-editor-shell">
        <div 
          id='invitation-card-main'
          ref={editorRef}
          className="relative overflow-hidden image-container" >
           

          <TemplateImage image={image}/>

          {textElements.map(el => (
            <div
              key={el.id}
              id={el.id}
              style={{
                position: 'absolute',
                left: `${el.x}px`,
                top: `${el.y}px`,
                fontSize: `${el.fontSize}`,
                color: el.color,
                cursor: 'move',
              }}
              className={`${el.class} ${el.dragging ? 'opacity-70' : ''} ${selectedElement === el.id ? 'image-text-outline-highlighter ring-blue-500 p-1' : ''} text-content`}
              onMouseDown={(e) => handleMouseDown(e, el.id)}>
              {el.content}
            </div>
          ))}
        </div>
      </div>
    </div>
    <Footer addText={addTextElement}/>
    </div>
    </>
  );
};

export default TemplateEditor;