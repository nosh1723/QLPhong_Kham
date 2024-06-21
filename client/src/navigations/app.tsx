import { useAsyncStorage } from '@react-native-async-storage/async-storage';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import SplashScreen from '../components/SplashScreen';
import { addAuth, authSelector } from '../redux/reducers/authReducer';
import AuthRoute from './auth';
import MainRoute from './main';
import Toast from 'react-native-toast-message';
import { useStore } from '../root-store';
import { observer } from 'mobx-react';

const RootRoute = () => {
  const [isShowSplash, setIsShowSplash] = useState(true);
  const auth = useSelector(authSelector)
  const dispatch = useDispatch()
  
  const { getItem } = useAsyncStorage("auth")

  useEffect(() => {
    checkLogin()

    const timeout = setTimeout(() => {
      setIsShowSplash(false);
    }, 1500);

    return () => clearTimeout(timeout);
  }, [])
  const checkLogin = async () => {
    const res = await getItem()
    
    res && dispatch(
      addAuth(JSON.parse(res))
    )
  }
  return (
    <>
      {isShowSplash ? <SplashScreen /> : auth?.token ? <MainRoute /> : <AuthRoute />}
      <Toast/>
    </>

  )
}

export default observer(RootRoute) 