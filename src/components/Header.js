

"use client";
import React,{useEffect, useState} from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faB, faEdit, faFill, faFont, faExpand, faBorderNone, faZ, faF, faTrash, faMaximize } from '@fortawesome/free-solid-svg-icons';

import EditHeaderIcon from './editDialog/EditHeaderIcon';
import DeleteHeaderIcon from './deleteDialog/DeleteHeaderIcon';
import { HexColorPicker } from "react-colorful";
import RangerSlider from './slider/RangerSlider';
import FormatDropdown from './Dropdown/FormatDropdown';
import FontStyle from './fontSize/FontStyle';

const Header = ({changeFontFamily=()=>{},setItalic=()=>{}, preview, selectedElement}) => {
    const [selectedText,setSelectedText] = useState('');
    const [showColor, setShowColor] = useState(false);
    const [color, setColor] = useState("#aabbcc");

    const [showFontSlider, setShowFontSlider] = useState(false);
    const [fontSize, setFontSize] = useState(1);

    const [showFontStyle, setShowFontStyle] = useState(false);
    const [fontStyle, setFontStyle] = useState(1);
    const [boldValue, setBoldValue] = useState(false);
    const [italicValue, setItalicValue] = useState(false);
    const [capitalValue, setCapitalValue] = useState(false);


    useEffect(()=>{
        setShowColor(false);
        setShowFontStyle(false);
        setShowFontSlider(false);
    },[preview])

    useEffect(()=>{
        if(!selectedElement)
            return;
        const domElement = document.getElementById(selectedElement);
        
        if(domElement){
            const text = domElement.innerText;
        const isBold = domElement.innerHTML.includes('<b>') ? true : false;

        let stle = window.getComputedStyle(domElement);
           
        let fontStyle = stle.getPropertyValue('font-style');
        let textTransform = stle.getPropertyValue('text-transform');

        if(fontStyle==='italic'){
            setItalicValue(true);
        }
        else{
            setItalicValue(false);
        }

        if(isBold){
            setBoldValue(true);
        }
        else{
            setBoldValue(false);
        }

        if(textTransform==='uppercase'){
            setCapitalValue(true);
        }
        else{
            setCapitalValue(false);
        }
        }
    },[selectedElement])

    const setBold = () => {
        if (document.querySelector('.image-text-outline-highlighter')) {
            const text = document.querySelector('.image-text-outline-highlighter').innerText;
            const isBold = document.querySelector('.image-text-outline-highlighter').innerHTML.includes('<b>') ? true : false;

            if (isBold) {
                document.querySelector('.image-text-outline-highlighter').innerHTML = text;
            }
            else {
                document.querySelector('.image-text-outline-highlighter').innerHTML = `<b>${text}</b>`
            }
        }
        else {
            alert('Please select element to delete!')
        }
    }

    const setTextColor = (visible)=>{
        if (document.querySelector('.image-text-outline-highlighter')) {
            setShowColor(visible);
            setShowFontSlider(false);
            setShowFontStyle(false);
        }
        else {
            alert('Please select element')
        }
    }

    const setCapital = ()=>{
        const selectedElement = document.querySelector('.image-text-outline-highlighter');
        if (selectedElement) {
            let stle = window.getComputedStyle(selectedElement);
           
            let textTransform = stle.getPropertyValue('text-transform');
            console.log({existingStyle : stle,textTransform});

            if(textTransform && textTransform!=='none'){
                document.querySelector('.image-text-outline-highlighter').style.removeProperty('text-transform');
            }
            else{
                document.querySelector('.image-text-outline-highlighter').style.removeProperty('text-transform');
                document.querySelector('.image-text-outline-highlighter').style.textTransform = 'uppercase';
            }
        }
        else {
            alert('Please select element')
        }
    }


    const rangeDragEnd = (size)=>{
        console.log({newSize: size});
        document.querySelector('.image-text-outline-highlighter').style.fontSize = size[1] + 'rem';
    }

    const checkFontChange = (visible)=>{
        if (document.querySelector('.image-text-outline-highlighter')) {
            setSelectedText(document.querySelector('.image-text-outline-highlighter').innerText);
            setShowFontStyle(visible);
            setShowColor(false);
            setShowFontSlider(false);
        }
        else {
            alert('Please select element')
        }
    }

    const checkFontSlider = (visible)=>{
        if (document.querySelector('.image-text-outline-highlighter')) {
            setSelectedText(document.querySelector('.image-text-outline-highlighter').innerText);
            setShowFontStyle(false);
            setShowColor(false);
            setShowFontSlider(visible);
        }
        else {
            alert('Please select element')
        }
    }


    const changeFontStyle = (cls)=>{
        // document.querySelector('.image-text-outline-highlighter').classList.add(cls);
        changeFontFamily(cls);
    }


    const showSlider = (case1)=>{
        console.log({showSlider : case1});
    }

    useEffect(()=>{
        if(color && document.querySelector('.image-text-outline-highlighter')){
            document.querySelector('.image-text-outline-highlighter').style.color = color;
        }
    },[color])

    return (
        <>
        <div id="text-format-controls" class="text-format-controller-main">
            <div class="text-format-control-box">

                <EditHeaderIcon />

                <div class="text-format-control-items gentle-shake" onClick={()=>checkFontChange(!showFontStyle)}><div class="text-format-control-icon-txt only-center dropdown"><div>Font</div>
                    <FontAwesomeIcon icon={faFont} /></div><div class="tool-tip-box">
                        <div class="MuiGrid-root MuiGrid-container container-custom">
                            <div class="MuiGrid-root MuiGrid-item container-custom-one"><span class="hide-tooltip-btn" aria-label="Change Text Style">touch</span></div></div></div></div>
                            
                <div class="text-format-control-items gentle-shake" onClick={()=>checkFontSlider(!showFontSlider)}>
                    <FontAwesomeIcon icon={faExpand} />
                    <div class="text-format-control-icon-txt">Size</div>
                    <div class="tool-tip-box">
                        <div class="MuiGrid-root MuiGrid-container container-custom">
                            <div class="MuiGrid-root MuiGrid-item container-custom-one"><span class="hide-tooltip-btn" aria-label="Increase or Decrease Text Size">touch</span></div></div></div></div>
                    
                <DeleteHeaderIcon />

                <div class="text-format-control-items gentle-shake selected-menu-icon" onClick={()=>setTextColor(!showColor)}>
                    <FontAwesomeIcon icon={faFill} />
                    <div class="text-format-control-icon-txt only-center dropdown"><div>Color</div>
                    </div><div class="tool-tip-box">
                        <div class="MuiGrid-root MuiGrid-container container-custom">
                            <div class="MuiGrid-root MuiGrid-item container-custom-one">
                                <span class="hide-tooltip-btn" aria-label="Change Text Color or Text Background Color">touch</span>
                        </div>
                    </div>
                    </div>
                </div>

                <div className={`text-format-control-items gentle-shake active-selected-icon ${boldValue? 'active' : ''}`} onClick={() => setBold()}>
                    <FontAwesomeIcon icon={faB} />
                    <div class="text-format-control-icon-txt">Bold</div><div class="tool-tip-box">
                        <div class="MuiGrid-root MuiGrid-container container-custom"><div class="MuiGrid-root MuiGrid-item container-custom-one"><span class="hide-tooltip-btn" aria-label="Make Text BOLD">touch</span></div></div></div></div>
                        
                        <FormatDropdown showSlider={showSlider} setItalic={setItalic} italicValue={italicValue}/>
                
                            
                    <div className={`text-format-control-items gentle-shake ${capitalValue? 'active' : ''}`} onClick={()=>setCapital()}>
                        <FontAwesomeIcon icon={faFont} />
                        <div class="text-format-control-icon-txt" style={{ fontSize: '10px', letterSpacing: '0.5px' }}>CAPITAL</div>
                        <div class="tool-tip-box">
                            <div class="MuiGrid-root MuiGrid-container container-custom">
                                <div class="MuiGrid-root MuiGrid-item container-custom-one">
                                    <span class="hide-tooltip-btn" aria-label="Capital Letters">touch</span>
                                    </div>
                                    </div>
                                </div>
                            </div>
                    </div>
        </div>

         {
            showColor && <HexColorPicker color={color} onChange={setColor} />
         } 

         {
            showFontSlider && <RangerSlider min={0.5} max={2.5} value={'1'} rangeDragEnd={rangeDragEnd}/>
         }

         {
            showFontStyle && <FontStyle text={selectedText} changeFontStyle={changeFontStyle}/>
         }
        </>
    );
};

export default Header;
