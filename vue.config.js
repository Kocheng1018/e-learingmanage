module.exports = {
	// PublicPath:"/teacher/",
	devServer: {
		proxy: {
			'/api':{
				target: 'http://163.17.135.152:1314',
				changeOrigin: true,
				pathRewrite: {
					'^/api': '' 
				}
			}
		}
	}
}
