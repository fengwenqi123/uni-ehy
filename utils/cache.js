// 获取 localStorage 中的 token
const Token = 'Token'
export function getToken() {
	return uni.getStorageSync(Token);
}

// 保存 token 到 localStorage
export function saveToken(token) {
	uni.setStorageSync(Token, token);
}