export async function saveUserData(username, data) {
  localStorage.setItem(username, JSON.stringify(data));
}
export async function loadUserData(username) {
  const saved = localStorage.getItem(username);
  return saved ? JSON.parse(saved) : null;
}