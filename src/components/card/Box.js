import {  FC } from 'react'
import { memo } from 'react'

const styles = {
  border: '1px dashed gray',
  padding: '0.5rem 1rem',
  cursor: 'move',
}

export const Box = memo(function Box({ title, yellow, preview }) {
  const backgroundColor = yellow ? 'yellow' : 'white'
  return (
    <div
      dangerouslySetInnerHTML={{ __html: title }}
      style={{ ...styles, backgroundColor }}
      role={preview ? 'BoxPreview' : 'Box'}
    >
    </div>
  )
})
