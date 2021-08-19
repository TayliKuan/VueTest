module.exports = {
  lintOnSave: false,

 /*  devServer: {
    proxy: {
      '/': {
        target: 'http://localhost:7998/',
      },
    },
  },
  //改用spring boot 做跨域
 */
  transpileDependencies: [
    'vuetify',
  ],
};
