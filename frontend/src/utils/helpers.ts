export function getCommonHeaders() {
    return {
        'Content-Type': 'application/json',
        'Authorization': sessionStorage.getItem('token')
    }
};