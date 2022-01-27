const express = require('express');

const app = express();

// Built in middleware
app.use(express.json());

// App routes
app.use('/api/v1/artists', require('./controllers/artists'));
app.use('/api/v1/dididoit', require('./controllers/dididoits'));
app.use('/api/v1/didyoudoit', require('./controllers/didyoudoits'));
app.use('/api/v1/foods', require('./controllers/foods'));
// Error handling & 404 middleware for when
// a request doesn't match any app routes
app.use(require('./middleware/not-found'));
app.use(require('./middleware/error'));

module.exports = app;
