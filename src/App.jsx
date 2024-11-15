import React, { useState } from 'react'

import './sizer/SV.sizer.wc.js'

export const App = () => {
  const [size, setSize] = useState(null)

  function handleSizeChange(event) {
    setSize(event.target.value)
    console.log('handleSizeChange:', size)
  }

  return (
    <div>
      <sv-sizer-wc rowsPerPage='10, 25, 50, 100' onChange={handleSizeChange}></sv-sizer-wc>
      <div id='result'>{size}</div>
    </div>
  )
}
