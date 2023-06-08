import React, { forwardRef } from 'react';
import '../keyboard.css'
const TypingBox = forwardRef(({ input, handleInput }, ref) => {
  return (
    <div className="typing-box">
      <input type="text" value={input} onChange={handleInput} ref={ref} autoFocus />
    </div>
  );
});

export default TypingBox;