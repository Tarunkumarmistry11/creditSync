// Services/auth.js
export const getAuthToken = () => {
    return localStorage.getItem('authToken');
  };
  
  export const removeAuthToken = () => {
    localStorage.removeItem('authToken');
  };