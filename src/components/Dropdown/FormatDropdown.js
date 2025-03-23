import { faF } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Dropdown from 'react-bootstrap/Dropdown';
import DropdownButton from 'react-bootstrap/DropdownButton';

export default ({ min = 1, max = 50, step = 1, rangeDragEnd = () => { } }) => (
    <>
        <div class="text-format-control-items gentle-shake">
            <FontAwesomeIcon icon={faF} />

            <div class="text-format-control-icon-txt only-center dropdown">
                <div>Format</div>
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