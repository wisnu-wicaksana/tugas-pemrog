import useAuth from './useAuth';

export default function useIsMember() {
  const user = useAuth();
  return user?.isMember === true;
}
