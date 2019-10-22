// 获取 localStorage 中的 token
const Token = 'Token'
export function getToken() {
	return uni.getStorageSync(Token);
}

export function saveToken(token) {
	uni.setStorageSync(Token, token);
}

export function removeToken() {
	uni.removeStorageSync(Token);
}

const userInfo = 'userInfo'
export function getUserInfo() {
	return uni.getStorageSync(userInfo);
}

export function saveUserInfo(user) {
	uni.setStorageSync(userInfo, user);
}

export function removeUserInfo() {
	uni.removeStorageSync(userInfo);
}

const userName = 'userName'
export function saveUserName(name) {
	uni.setStorageSync(userName, name);
}
export function getUserName() {
	return uni.getStorageSync(userName);
}