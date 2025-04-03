"use client"

import React, { useState, useRef, useEffect, useCallback } from 'react';
import TemplateImage from '../../components/TemplateImage';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import jsonData from '../../data/album.json';
// import 'bootstrap/dist/css/bootstrap.min.css';
import { useSearchParams } from 'next/navigation'
import PreviewImage from '@/components/PreviewImage';
import PreviewImageOption from '@/components/PreviewImageOption';

import { DraggableBox } from '@/components/card/DraggableBox';
import { ItemTypes } from  '../../components/card/ItemTypes';
import { snapToGrid as doSnapToGrid } from '../../components/card/snapToGrid';
import { useMultiDrop } from 'react-dnd-multi-backend';
import { CustomDragLayer } from '@/components/card/CustomDragLayer';

const TemplateEditor = ({snapToGrid=false}) => {

  const params = useSearchParams();
  const ref = useRef(null);
  const occasion =   params.get('type') || 'Wedding';

  const [template, setTemplate] = useState('wedding1');
  const [preview, setPreview] = useState(false);

  // const [occasion, setOccasion] = useState('wedding');
  const selectedOccasion = jsonData.find(d=>d.type===occasion);
  const image = selectedOccasion.images[0].url;

  
  console.log({image, occasion,params});
  const [textElements, setTextElements] = useState(selectedOccasion.dummyText || [
    { id: 1, content: 'Sarah & Michael', x: 200, y: 100, fontSize: 32, color: '#000000', dragging: false, class:'' },
    { id: 2, content: 'June 15, 2025', x: 200, y: 170, fontSize: 22, color: '#000000', dragging: false, class:'' },
    { id: 3, content: 'Rosewood Gardens', x: 200, y: 230, fontSize: 18, color: '#3a3a3a', dragging: false, class:'' },
  ]);
  const [selectedElement, setSelectedElement] = useState(null);
  const editorRef = useRef(null);
  const [nextId, setNextId] = useState(selectedOccasion.dummyText.length+1);

  useEffect(() => {
    if (editorRef.current) {
      console.log({editorRef: editorRef})
      // Access and manipulate myRef.current here
      console.log("Ref is available:", editorRef.current);
      const element = editorRef.current;

      element.addEventListener("touchstart", handleTouchStart);
      element.addEventListener("touchmove", handleTouchMove);
      element.addEventListener("touchend", handleTouchEnd);
      
      return () => {
        element.removeEventListener("touchstart", handleTouchStart);
        element.removeEventListener("touchmove", handleTouchMove);
        element.removeEventListener("touchend", handleTouchEnd);
      };
    }
  }, []);

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


  const handleTouchStart = (e, id) => {
    // Update the state to indicate which element is being dragged
    setTextElements(elements => 
      elements.map(el => 
        el.id === id 
          ? { ...el, dragging: true } 
          : el
      )
    );
    setSelectedElement(id);
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


  const handleTouchMove = (e) => {
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


   // Handle mouse up (end of drag)
   const handleTouchEnd = () => {
    setTextElements(elements => 
      elements.map(el => 
        el.dragging ? { ...el, dragging: false } : el
      )
    );
    
    const element = editorRef.current;
    element.removeEventListener("touchmove", handleTouchMove);
    element.removeEventListener("touchend", handleTouchEnd);
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

      console.log({fontFamily});

      setTextElements(elements => 
        elements.map(el => 
          {
              if(Number(el.id) === Number(id)){
                el.class = fontFamily;
                console.log({fontFamilyUpdated: true});
              }
              return el;
          }
        )
      );
  }

  // useEffect(()=>{},[textElements]);

  const setItalic = ()=>{
    const selectedElement = document.querySelector('.image-text-outline-highlighter');
        if (selectedElement) {
            let stle = window.getComputedStyle(selectedElement);
           
            let fontStyle = stle.getPropertyValue('font-style');
            console.log({existingStyle : stle, fontStyle});

            if(fontStyle && fontStyle!=='normal'){
                document.querySelector('.image-text-outline-highlighter').style.removeProperty('font-style');
            }
            else{
                document.querySelector('.image-text-outline-highlighter').style.fontStyle = 'italic';
            }
        }
        else {
            alert('Please select element')
        }
  }

  const disablePreviewFn = ()=>{
    document.querySelector('.main-wrap').classList.remove('preview');
    setPreview(false);
  }

  useEffect(()=>{
    console.log({parentPreviewChanged : preview});
  },[preview])

  const moveBox = useCallback(
    (id, left, top) => {

      console.log({id, left, top});

      setTextElements(elements => 
        elements.map(el => {
          if (el.id===id) {
            // Calculate new position relative to the editor
            const x = left //e.clientX - editorRect.left;
            const y = top //e.clientY - editorRect.top;
            
            return { ...el, x, y };
          }
          return el;
        })
      );
    },
    [textElements],
  )

  const [, {html5: [html5DropStyle, html5Drop], touch: [touchDropStyle, touchDrop]}] = useMultiDrop(
    () => ({
      accept: ItemTypes.BOX,
      drop(item, monitor) {
        const delta = monitor.getDifferenceFromInitialOffset();

        let left = Math.round(item.left + delta.x)
        let top = Math.round(item.top + delta.y)
        if (snapToGrid) {
          ;[left, top] = doSnapToGrid(left, top)
        }

        moveBox(item.id, left, top)
        return undefined
      },
    }),
    [moveBox],
  )

  const selectElement = (id)=>{

    console.log({selectElementCalled: id});

    setTextElements(elements => 
      elements.map(el => {
        if (el.id===id) {
          let className = 'image-text-outline-highlighter';
          return { ...el, class: `${el.class} ${className}` };
        }
        else{
          let newClass = el.class && el.class.includes('image-text-outline-highlighter') ? (el.class.replace('image-text-outline-highlighter','')) : el.class;
          console.log({newClass})
          return {...el, class: newClass}
        }
       
      })
    );
  }

  const renderCard = (el,index)=>{
    return (
      <DraggableBox
          key={el.id}
          id={el.id}
          top={el.y}
          left={el.x}
          onClick={selectElement}
          className={el.class}
          style={el.style}
          title={el.content}
        />
    )
  }

  return (
    <>
    <div class="main-wrap" id="main-page">
    <div class="flex-container"></div>
    <Header changeFontFamily={changeFontFamily} setItalic={setItalic} preview={preview} selectedElement={selectedElement}/>
    <div className="invite-main-wrap">
      <div className="image-editor-shell">
     
        <div 
          id='invitation-card-main'
          ref={html5Drop}
          className="relative overflow-hidden image-container" >
          
          {
            !preview && <TemplateImage image={image}/>
          }
                    
          {
            preview && <PreviewImage image={image}/>
          }
          {textElements.map((el,i) => (
           renderCard(el,i)
          ))}
        </div>

        {
          <CustomDragLayer snapToGrid={false} />
        }
        {
          preview && <PreviewImageOption setParentPreview={disablePreviewFn}/>
        }
      </div>
    </div>
    <Footer addText={addTextElement} setParentPreview={setPreview}/>
    </div>
    </>
  );
};

export default TemplateEditor;