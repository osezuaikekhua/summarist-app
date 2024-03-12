import React from 'react'

function Skeleton({ width, height, borderRadius, marginBottom, maxWidth }) {
  return (
    <div
    className="skeleton-box"
    style={{
      width,
      height,
      borderRadius,
      marginBottom,
      maxWidth,
    }}
  ></div>
  )
}

export default Skeleton