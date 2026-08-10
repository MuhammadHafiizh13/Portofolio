const express = require('express');
const serverless = require('serverless-http');
const app = express();

// Panggil file server.js kamu sebagai app utama
const serverApp = require('../../server.js');

module.exports.handler = serverless(serverApp);