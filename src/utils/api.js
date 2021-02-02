const NODE_ENV = process.env.NODE_ENV;
const config = {
  production: {
    HOST_API: 'https://way.jd.com/jisuapi/', //接口地址
  },
  development: {
    HOST_API: 'https://way.jd.com/jisuapi/',
  },
}
module.exports = config[NODE_ENV];