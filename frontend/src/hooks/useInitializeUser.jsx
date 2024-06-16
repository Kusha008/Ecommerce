import { useEffect } from 'react';
import useRefreshUser from '../utils/refreshUser.jsx';

const useInitializeUser = () => {
  const { refreshUserData } = useRefreshUser();

  useEffect(() => {
    refreshUserData();
  }, [refreshUserData]);
};

export default useInitializeUser;
