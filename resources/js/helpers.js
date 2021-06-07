export const baseUrl = process.env.NODE_ENV !== 'production' ? 'http://expense-manager.test' : 'http://expense-manager.test'
export const apiUrl = process.env.NODE_ENV !== 'production' ? `${baseUrl}/api` : `${baseUrl}/api`

export const set = (key, value) => {
  return localStorage.setItem(key, JSON.stringify(value));
}

export const get = (key) => {
  try {
    return JSON.parse(localStorage.getItem(key));
  } catch (e) {
    return false;
  }
}

export const remove = (key) => {
  return localStorage.removeItem(key);
}

export const can = (permission) => {
  const permissions = get('permissions') ? JSON.parse(get('permissions')) : [];
  return permissions.indexOf(permission) !== -1;
}

export const escapeHtml = (text) => {
  return text
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;')
}

export const unEscapeHtml = (text) => {
  return text
    .replace(/&amp;/g, '&')
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&quot;/g, '"')
    .replace(/&#039;/g, "'")
}
