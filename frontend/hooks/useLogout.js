export default function useLogout() {
  const logout = () => {
    localStorage.removeItem('token');
    window.location.href = '/login'; // atau ganti sesuai route login kamu
  };

  return logout;
}
