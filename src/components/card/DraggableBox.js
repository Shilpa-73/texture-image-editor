import {  FC } from 'react'
import { memo, useEffect } from 'react'
import { DragSourceMonitor } from 'react-dnd'
import { useMultiDrag } from 'react-dnd-multi-backend'
import { getEmptyImage } from 'react-dnd-html5-backend'

import { Box } from './Box'
import { ItemTypes } from './ItemTypes'

const  getStyles = (
  left,
  top,
  isDragging,style, color='black',italic=false,textTransform='')=>
 {
  const transform = `translate3d(${left}px, ${top}px, 0)`

  const newStylesToAdd = {};

  if(italic){
    newStylesToAdd['fontStyle'] = 'italic';
  }

  if(textTransform){
    newStylesToAdd['textTransform'] = textTransform;
  }

  console.log({newStylesToAdd});
  
  return {
    position: 'absolute',
    transform,
    WebkitTransform: transform,
    // left,
    // top,
    // IE fallback: hide the real node using CSS when dragging
    // because IE will ignore our custom "empty image" drag preview.
    opacity: isDragging ? 0 : 1,
    height: isDragging ? 0 : '',
    // background:isDragging ? '#aba8a81f' :'none',
    // outline: isDragging ? '1px dashed #585858 !important' : 0,
    // outlineOffset: isDragging ? '4px' : '0px',
    // transform: isDragging ? 'scale(1)' : '',
    // transition: isDragging ? 'all .1s' : '',
    color,
    ...newStylesToAdd
  }
}

const  getTouchStyles = (
  left,
  top,
  isDragging,style, color='black',italic=false,textTransform='')=>
 {
  // const transform = `translate3d(${left}px, ${top}px, 0)`
  const newStylesToAdd = {};

  if(italic){
    newStylesToAdd['fontStyle'] = 'italic';
  }

  
  if(textTransform){
    newStylesToAdd['textTransform'] = textTransform;
  }

  console.log({newStylesToAdd});
  
  return {
    position: 'absolute',
    //transform,
    //WebkitTransform: transform,
    left,
    top,
    // IE fallback: hide the real node using CSS when dragging
    // because IE will ignore our custom "empty image" drag preview.
    opacity: isDragging ? 0 : 1,
    height: isDragging ? 0 : '',
    // background:isDragging ? '#aba8a81f' :'none',
    // outline: isDragging ? '1px dashed #585858 !important' : 0,
    // outlineOffset: isDragging ? '4px' : '0px',
    // transform: isDragging ? 'scale(1)' : '',
    // transition: isDragging ? 'all .1s' : '',
    color,
    ...newStylesToAdd
  }
}


export const DraggableBox= memo(function DraggableBox(
  props,
) {
  const { id, title, left, top, className, style,onClick, color, italic,textTransform } = props
  const [{ isDragging }, {html5: [html5Props, html5Drag], touch: [touchProps, touchDrag]}, preview] = useMultiDrag(
    () => ({
      type: ItemTypes.BOX,
      item: { id, left, top, title },
      collect: (monitor) => ({
        isDragging: monitor.isDragging(),
      }),
    }),
    [id, left, top, title, color],
  )

  useEffect(() => {
    // preview(getEmptyImage(), { captureDraggingState: true })
  }, [])



  return (
    <>
       <div
      ref={html5Drag}
      id={id}
      style={getStyles(left, top, isDragging, style, color,italic,textTransform)}
      class={className + ' full-view'}
      onClick={()=>onClick(id)}
      role="DraggableBox"
    >
      <Box title={title} />
    </div>

    <div
      ref={touchDrag}
      id={id}
      style={getTouchStyles(left, top, isDragging, style, color,italic,textTransform)}
      class={className  + ' mobile-view'}
      onClick={()=>onClick(id)}
      role="DraggableBox"
    >
      <Box title={title} />
    </div>
    </>
  )
})
