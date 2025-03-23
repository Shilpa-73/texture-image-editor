import Slider from 'rc-slider';
import 'rc-slider/assets/index.css';
import Tooltip from "rc-tooltip"; // 5.1.1
import "rc-tooltip/assets/bootstrap_white.css";

export default ({min=1,max=50,step=0.1,rangeDragEnd=()=>{}}) => (
  <>
    <Slider 
    handleRender={(node, handleProps) => {
        return (
          <Tooltip
            overlayInnerStyle={{ minHeight: "auto" }}
            overlay={handleProps.value}
            placement="bottom"
          >
            {node}
          </Tooltip>
        );
      }}
    vertical 
    range min={min} max={max} onChangeComplete={rangeDragEnd} step={step} className='range-slider'/>
  </>
);