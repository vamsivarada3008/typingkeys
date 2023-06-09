import React, { forwardRef } from 'react';
import '../keyboard.css'
const TypingBox = forwardRef(({ input, handleInput }, ref) => {
  return (
    <div className="typing-box">
      {/* <input type="text" value={input} onChange={handleInput} ref={ref} autoFocus /> */}
      
      <textarea

        value={input}
        onChange={handleInput}
        ref={ref}
        autoFocus
        spellCheck="false"
        id="message"
        rows="3"
        class="block p-2.5 w-full
        text-lg text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
        placeholder="Type Here..."
        style={{
          position: "center",
          width: "90%",
          margin: "auto",
        }}
      ></textarea>
      
    </div>
  );
});

export default TypingBox;