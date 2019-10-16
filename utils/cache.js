// 获取 localStorage 中的 token
const Token = 'Token'
export function getToken() {
	return uni.getStorageSync(Token);
}

// 保存 token 到 localStorage
export function saveToken(token) {
	uni.setStorageSync(Token, token);
}

const userInfo = 'userInfo'
export function getUserInfo() {
	return uni.getStorageSync(userInfo);
}

// 保存 token 到 localStorage
export function saveUserInfo(user) {
	uni.setStorageSync(userInfo, user);
}