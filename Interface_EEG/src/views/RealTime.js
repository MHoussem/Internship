import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Chart from 'chart.js/auto';
 
function Stream() {
  const socket = new WebSocket('ws://192.168.137.34:5000');

  socket.onopen = () => {
    console.log('WebSocket connection opened');
    // Send initial message or perform any necessary setup
  };
  
  socket.onmessage = (event) => {
    const message = event.data;
    console.log('Received message:', message);
    // Handle incoming messages
  };
  
  socket.onerror = (error) => {
    console.error('WebSocket error:', error);
  };
  
  socket.onclose = () => {
    console.log('WebSocket connection closed');
  };
  
  useEffect(() => {
    // Perform any necessary setup or data fetching
    
    // Clean up the WebSocket connection when the component unmounts
    return () => {
      socket.close();
    };
  }, []);
      
  return (
    <div className="content">
      <header>
        <h1>Here will streaming Data</h1>
        {/* Calling a data from setdata for showing */}
        <p className="content"> </p>
        <p className="content"></p>
        <p className="content"> </p>
        <p className="content"></p>
      </header>
    </div>
  );
}

export default Stream;
