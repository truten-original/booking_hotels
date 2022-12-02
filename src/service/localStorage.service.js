const TOKEN_KEY = 'jwt-token'
const REFRESH_KEY = 'jwt-refresh-token'
const EXPIRES_KEY = 'jwt-expires'
const USERID_KEY = 'user-local-id'
const IS_ADMIN = 'admin-status'
export function setTokens({
  refreshToken,
  idToken,
  localId,
  expiresIn = 3600,
}) {
  const expiresDate = new Date().getTime() + expiresIn * 1000
  localStorage.setItem(USERID_KEY, localId)
  localStorage.setItem(TOKEN_KEY, idToken)
  localStorage.setItem(REFRESH_KEY, refreshToken)
  localStorage.setItem(EXPIRES_KEY, expiresDate)
}
export function getAccessToken() {
  return localStorage.getItem(TOKEN_KEY)
}
export function getRefreshToken() {
  return localStorage.getItem(REFRESH_KEY)
}
export function removeAuthData() {
  localStorage.removeItem(USERID_KEY)
  localStorage.removeItem(TOKEN_KEY)
  localStorage.removeItem(REFRESH_KEY)
  localStorage.removeItem(EXPIRES_KEY)
  localStorage.removeItem(IS_ADMIN)
}
export function setAdminToken() {
  localStorage.setItem(IS_ADMIN, JSON.stringify(true))

}
export function getAdminStatus() {
  const adminStatus = localStorage.getItem(IS_ADMIN)
  if (adminStatus && adminStatus !== 'undefined') {
    return JSON.parse(adminStatus)
  } else return null
}
export function getTokenExpiresDate() {
  return localStorage.getItem(EXPIRES_KEY)
}
export function getUserId() {
  return localStorage.getItem(USERID_KEY)
}

const localStorageService = {
  setTokens,
  getAccessToken,
  getRefreshToken,
  getTokenExpiresDate,
  getUserId,
  removeAuthData,
  getAdminStatus,
  setAdminToken
}
export default localStorageService
