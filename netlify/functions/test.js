const express = require('express');
const serverless = require('serverless-http');

const app = express();

app.get('/test', (req, res) => {
  res.json({
    message: 'Test function is working!',
    timestamp: new Date().toISOString(),
    environment: process.env.NODE_ENV || 'development'
  });
});

module.exports.handler = serverless(app);