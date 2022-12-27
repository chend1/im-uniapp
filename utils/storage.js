export function getStorage(key) {
	return uni.getStorageSync(key)
}

export function setStorage(key, value) {
	uni.setStorageSync(key, value)
}

export function removeStorage(key) {
	uni.removeStorageSync(key);
}
