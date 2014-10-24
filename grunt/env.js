module.exports = {
  test: {
    NODE_ENV: 'test'
  },
  prod: {
    NODE_ENV: 'production'
  },
  all: {
    DOMAIN: 'http://localhost:9000',
    SESSION_SECRET: 'doleacpowerrankings-secret',
    DEBUG: ''
  }
};