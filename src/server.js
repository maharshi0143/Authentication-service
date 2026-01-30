// Server Setup
require('./config/db');
require('./config/redis');
const app = require('./app');
const { API_PORT } = require('./config/env');

app.listen(API_PORT, () => {
  console.log(`🚀 Server running on port ${API_PORT}`);
});
