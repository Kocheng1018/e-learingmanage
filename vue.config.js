module.exports = {
	devServer: {
		disableHostCheck: true,
		https: true,
		proxy: {
			'/api':{
				target: 'https://6bdb5c30fa17.ngrok.io',
				changeOrigin: true,
				pathRewrite: {
					'^/api': '/' 
				}
			}
		}
	}
}
