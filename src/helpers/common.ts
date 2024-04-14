export const getUserDetail = () => {
  let userData = localStorage.getItem('UserDetail') != null ? JSON.parse(localStorage.getItem('UserDetail') || '') : null;
  if (userData) {
    if (new Date() > new Date(userData.sessionExpiryTime)) {
      localStorage.removeItem('UserDetail');
      return null;
    } else {
      return userData;
    }
  } else {
    return '';
  }
};
