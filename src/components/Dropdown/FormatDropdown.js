import { faF, faI } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Dropdown from 'react-bootstrap/Dropdown';
import DropdownButton from 'react-bootstrap/DropdownButton';

export default ({ showSlider=()=>{}, setItalic=()=>{} , italicValue=false}) => {

    return (
        <>
            <div className={`text-format-control-items gentle-shake ${italicValue ? 'active' : ''}`}  onClick={()=>setItalic()}>
                <FontAwesomeIcon icon={faI} />
    
                <div class="text-format-control-icon-txt only-center dropdown">
                    <div>Italic</div>
                    {/* <button type="button" class="btn btn-secondary dropdown-toggle dropdown-toggle-split" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                        <span class="sr-only">Toggle Dropdown</span>
                    </button>
                    <div class="dropdown-menu">
                            <button class="dropdown-item" type="button" onClick={()=>setItalic()}>Italic</button>
                            <button class="dropdown-item" type="button"onClick={()=>showSlider('rotate')}>Rotate</button>
                            <button class="dropdown-item" type="button" onClick={()=>showSlider('text_space')}>Text Space</button>
                            <button class="dropdown-item" type="button" onClick={()=>showSlider('line_height')}>Line Height</button>
                            <button class="dropdown-item" type="button" onClick={()=>showSlider('transparency')}>Transparency</button>
                    </div> */}
                </div>
                <div class="tool-tip-box">
                    <div class="MuiGrid-root MuiGrid-container container-custom">
                        <div class="MuiGrid-root MuiGrid-item container-custom-one">
                            <span class="hide-tooltip-btn" aria-label="Bold, Italic, Transparency ... etc ">touch</span></div>
                    </div>
                </div>
            </div>
        </>
    );
}