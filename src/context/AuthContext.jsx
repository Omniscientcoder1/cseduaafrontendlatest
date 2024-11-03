import { CircularProgress, responsiveFontSizes } from '@mui/material';
import React, { createContext, useCallback, useEffect, useState } from 'react';
import { useNavigate } from 'react-router';
import { STORAGE_KEY_ACCESS_TOKEN, STORAGE_KEY_REFRESH_TOKEN } from 'src/constants/localstorage';
import { login, logout } from 'src/services/query/login';
import { getUserDetails, resetPassword, resetPasswordConfirm, getUserDetailByUsername, getUserProfile } from 'src/services/query/user';
import { privateAxios } from 'src/services/request/axiosConfig';
import { setTokenInHeader } from 'src/services/request/axiosHelper';
import { LocalStorage } from 'src/services/storage/localstorage';

export const AuthContext = createContext();

export const AuthContextProvider = ({ children }) => {
  const [isFetchingUserData, setIsFetchingUserData] = useState(false);
  const [userData, setUserData] = useState();
  const navigate = useNavigate();

  const getToken = useCallback(() => {
    return LocalStorage.getData(localStorage, STORAGE_KEY_ACCESS_TOKEN);
  }, []);

  const initialize = useCallback(async () => {
    const initialData = getToken();
    if (!initialData) return;
    setTokenInHeader(privateAxios.defaults);

    setIsFetchingUserData(true);
    try {
      const userData = await getUserDetails();
      const profileData = await getUserProfile();
      const mergedObject = { ...userData, ...profileData };
      setUserData(mergedObject);
    } catch (error) {
    } finally {
      setIsFetchingUserData(false);
    }
  }, [getToken]);

  useEffect(() => {
    initialize();
  }, [initialize]);

  const fetchUser = useCallback(async () => {
    try {
      const userData = await getUserDetails();
      const profileData = await getUserProfile();
      const mergedObject = { ...userData, ...profileData };
      setUserData(mergedObject);
    } catch (error) {
    } finally {
      setIsFetchingUserData(false);
    }
  }, []);

  const handleSuccess = useCallback(
    (data) => {
      LocalStorage.setData(localStorage, STORAGE_KEY_ACCESS_TOKEN, data.token);
      LocalStorage.setData(localStorage, STORAGE_KEY_REFRESH_TOKEN, data.token);
      initialize();
      navigate('/');
    },
    [initialize],
  );

  const logoutUser = useCallback(async () => {
    try {
      const res = await logout();
      // if (!data.success) throw data;
      // if (data.success)
      LocalStorage.removeData(localStorage, STORAGE_KEY_ACCESS_TOKEN);
      LocalStorage.removeData(localStorage, STORAGE_KEY_REFRESH_TOKEN);
      setUserData(undefined);
      return res;
    } catch (error) {
      throw error;
    }
  }, []);

  const loginToAccount = useCallback(
    async (params) => {
      try {
        const res = await login(params);
        // if (!data.success) throw data;
        // if (data.success)
        handleSuccess(res.data);
        return res;
      } catch (error) {
        throw error;
      }
    },
    [handleSuccess],
  );

  async function resetAccountPassword(params) {
    try {
      const res = await resetPassword(params);
      return res;
    } catch (error) {
      throw error;
    }
  }

  async function resetAccountPasswordConfirm(params) {
    try {
      const res = await resetPasswordConfirm(params);
      return res;
    } catch (error) {
      throw error;
    }
  }
  

  // const updateProfile = useCallback(
  //   async (data) => {
  //     try {
  //       const res = await updateUserDetails(data);
  //       if (!res.success) throw res;
  //       if (res.success) setUserData(res.data);
  //       return res;
  //     } catch (error) {
  //       throw error;
  //     }
  //   },
  //   [setUserData]
  // );

  useEffect(() => {}, []);

  return (
    <AuthContext.Provider
      value={{
        isAuthorized: !!userData,
        isFetchingUserData,
        userData,
        setUserData,
        fetchUser,
        getToken,
        loginToAccount,
        resetAccountPassword,
        resetAccountPasswordConfirm,
        // updateProfile,
        logoutUser,
        onLogin: handleSuccess,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};