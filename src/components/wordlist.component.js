import React from 'react';

function WordList({ wordList, completedWords }) {
  return (
    <div>
      <h3>Word List</h3>
      <ul>
        {wordList.map((word, index) => (
          <li key={index} style={{ textDecoration: completedWords.includes(word) ? 'line-through' : 'none' }}>
            {word}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default WordList;