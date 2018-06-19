export function getIdToken() {
	return localStorage.getItem('id_token') || null;
}