const express = require('express');
const serverless = require('serverless-http');
const app = require('../../server'); // Mengambil aplikasi express dari server.js

module.exports.handler = serverless(app);