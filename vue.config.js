var webpack = require('webpack');
module.exports = {
    devServer: {
        proxy: {
          '/public': {
            target: 'http://arcfun.0lz.net/',
            bypass: function(req, res, proxyOptions) {

                console.log(req.url);
            }
          }
        }
      },
    css: {
        sourceMap: false,
      },
    parallel: require('os').cpus().length > 1,
    // configureWebpack: {
    //     plugins: [
    //         new webpack.ProvidePlugin({
    //             $: 'jquery',
    //             jQuery: 'jquery'
    //           })
    //     ]
    //   },
  };