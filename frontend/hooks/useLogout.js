export default function useLogout() {
  const logout = () => {
    localStorage.removeItem('token');
    window.location.href = '/dashboard'; 
  };

  return logout;
}
