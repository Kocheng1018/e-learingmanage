module.exports = {
	devServer: {
		proxy: {
			'/api':{
				target: 'https://f664068fc91e.ngrok.io',
				changeOrigin: true,
				pathRewrite: {
					'^/api': '' 
				}
			}
		}
	}
}
