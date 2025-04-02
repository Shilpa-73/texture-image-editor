import ListGroup from 'react-bootstrap/ListGroup';

const fonts = [
    'serif',
    'sansserif',
    'monospace',
    'cursive',
    'fantasy',
    'emoji',
    'math',
    'fangsong'
]

const fontStyles = [{
  'font-family': 'Times, "Times New Roman", Georgia, serif'
}]

const FontStyle = ({text, changeFontStyle=()=>{}}) => {

  return (  
    <>
     <ListGroup as="ol" numbered>
        {
            fonts.map((fontClass,index)=>(<ListGroup.Item variant="light" 
                as="li" 
                onClick={()=>changeFontStyle(fontClass)}
                className={`d-flex justify-content-between align-items-start ${fontClass}`}>{text}</ListGroup.Item>))
        }
    </ListGroup>    
    </>
  )
};

export default FontStyle;