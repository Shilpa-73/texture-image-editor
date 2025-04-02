import {  FC } from 'react'
import { memo, useEffect } from 'react'
import { DragSourceMonitor } from 'react-dnd'
import { useDrag } from 'react-dnd'
import { getEmptyImage } from 'react-dnd-html5-backend'

import { Box } from './Box'
import { ItemTypes } from './ItemTypes'

const  getStyles = (
  left,
  top,
  isDragging)=>
 {
  const transform = `translate3d(${left}px, ${top}px, 0)`
  return {
    position: 'absolute',
    transform,
    WebkitTransform: transform,
    // IE fallback: hide the real node using CSS when dragging
    // because IE will ignore our custom "empty image" drag preview.
    opacity: isDragging ? 0 : 1,
    height: isDragging ? 0 : '',
    // background:isDragging ? '#aba8a81f' :'none',
    // outline: isDragging ? '1px dashed #585858 !important' : 0,
    // outlineOffset: isDragging ? '4px' : '0px',
    // transform: isDragging ? 'scale(1)' : '',
    // transition: isDragging ? 'all .1s' : ''
  }
}


export const DraggableBox= memo(function DraggableBox(
  props,
) {
  const { id, title, left, top, className, style,onClick } = props
  const [{ isDragging }, drag, preview] = useDrag(
    () => ({
      type: ItemTypes.BOX,
      item: { id, left, top, title },
      collect: (monitor) => ({
        isDragging: monitor.isDragging(),
      }),
    }),
    [id, left, top, title],
  )

  useEffect(() => {
    preview(getEmptyImage(), { captureDraggingState: true })
  }, [])



  return (
    <div
      ref={drag}
      id={id}
      style={getStyles(left, top, isDragging)}
      class={className}
      onClick={()=>onClick(id)}
      role="DraggableBox"
    >
      <Box title={title} />
    </div>
  )
})
