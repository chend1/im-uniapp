const BASE_URL = 'https://im.pltrue.top/api' //域名或选取所有接口不变的那一部分
export const request = (method, url, data) => { //暴露一个function：myRequest，使用options接收页面传过来的参数
	return new Promise((resolve, reject) => { //异步封装接口，使用Promise处理异步请求
		const userInfo = uni.getStorageSync('userInfo')
		uni.request({ //发送请求
			url: BASE_URL + url, //接收请求的API
			method: method || 'GET', //接收请求的方式,如果不传默认为GET
			data: data || {}, //接收请求的data,不传默认为空
			header: method === 'POST' ? {
				"Content-Type": "application/x-www-form-urlencoded",
				"Authorization": 'Bearer ' + userInfo.token
			} : {"Authorization": 'Bearer ' + userInfo.token},
			success: (res) => { //数据获取成功
				console.log(res)
				if (res.data.code === 401) { //因为200是返回成功的状态码，如果不等于200,则代表获取失败,
					uni.navigateTo({
						url: '/pages/login/login'
					});
					return uni.showToast({
						title: '请重新登录'
					})
				}
				if (res.data.code !== 200) { //因为200是返回成功的状态码，如果不等于200,则代表获取失败,
					return uni.showToast({
						title: res.data.message
					})
				}
				resolve(res.data) //成功,将数据返回
			},
			fail: (err) => { //失败操作
				console.log(err)
				uni.showToast({
					title: "请求接口失败！"
				})
				reject(err)
			}
		})
	})
}
export default {
	get(url, data) {
		return request('GET', url, data);
	},
	post(url, data) {
		return request('POST', url, data);
	},
	delete(url, data){
		return request('DELETE', url, data);
	}
};
