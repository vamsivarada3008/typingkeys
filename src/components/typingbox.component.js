import React from 'react';

function TypingBox({ input, nextKeys }) {
  return (
    <div>
      <p>{input}</p>
      <p>{nextKeys}</p>
    </div>
  );
}

export default TypingBox;