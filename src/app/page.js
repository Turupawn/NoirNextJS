"use client";
import React, { useState } from 'react';

export default function Home() {
  const [x, setX] = useState('');
  const [y, setY] = useState('');

  const handleClick = () => {
    alert(`X: ${x}, Y: ${y}`);
  };

  return (
    <div>
      <input 
        type="text" 
        placeholder="Enter X" 
        value={x} 
        onChange={(e) => setX(e.target.value)} 
      />
      <input 
        type="text" 
        placeholder="Enter Y" 
        value={y} 
        onChange={(e) => setY(e.target.value)} 
      />
      <button onClick={handleClick}>Show Alert</button>
    </div>
  );
}
