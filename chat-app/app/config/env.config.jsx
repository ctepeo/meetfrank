const environments = {
  production: {
    mode: 'production',
    host: 'chat.meetfrank.com',
    port: null,
    api: 'https://chat.meetfrank.com',
  },
  development: {
    mode: 'development',
    host: '0.0.0.0',
    port: 8080,
    api: 'http://0.0.0.0:8888',
  },
  test: {
    mode: 'test',
  },
};

module.exports = environments[process.env.NODE_ENV];
