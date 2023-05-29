const express = require('express');
const dgram = require('dgram');

const app = express();
const server = dgram.createSocket('udp4');
const port = 5000; // choose a port number

// Store the received messages
const messages = [];

// Endpoint for receiving messages
app.get('/api/messages', (req, res) => {
  res.json(messages);
});

server.on('message', (message, remoteInfo) => {
  const receivedMessage = message.toString();
  console.log(`Received message: ${receivedMessage} from ${remoteInfo.address}:${remoteInfo.port}`);

  // Add the received message to the messages array
  messages.push(receivedMessage);

  // Send a response back to the Raspberry Pi if needed
  const responseMessage = 'Response from server';
  server.send(responseMessage, remoteInfo.port, remoteInfo.address, (error) => {
    if (error) {
      console.error('Error sending response:', error);
    } else {
      console.log('Response sent successfully');
    }
  });
});

server.bind(port);

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
