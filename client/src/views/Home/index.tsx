import { ScrollView, Text, View } from "react-native";
import React, { useEffect } from "react";
import HomeFuncList from "./HomeFuncList";
import HomeDoctor from "./HomeDoctor";
import HomeService from "./HomeService";
import { observer } from "mobx-react";
import Toast from "react-native-toast-message";
import { useStore } from "@/src/root-store";
import Header from "@/src/components/Header";
import HomeHeader from "./HomeHeader";
import { StatusBar } from "expo-status-bar";
import CommonButton from "@/src/components/CommonButton";
import { useIsFocused, useNavigation } from "@react-navigation/native";
import { useSelector } from "react-redux";
import { authSelector } from "@/src/redux/reducers/authReducer";

export default observer(function HomeScreen() {
  const navigation = useNavigation()
  const auth = useSelector(authSelector)

  const isFocused = useIsFocused();
  const { pagingDoctor, resetStore } = useStore().home
  const { user, reset} = useStore().auth
  const { getPatient} = useStore().user
  const { pagingServiceByCate } = useStore().service
  const { pagingAppointment } = useStore().apointment
  
  
  useEffect(() => {
    pagingDoctor()
    pagingServiceByCate()
    pagingAppointment()
    
    getPatient(auth.user._id)

    // return () => resetStore()
  },[isFocused])
  
  return (
    <>
      <StatusBar style="light"/>
      <Header isHeaderBack={false}><HomeHeader></HomeHeader></Header>
      <ScrollView showsVerticalScrollIndicator={false} style={{ width: "100%", height: "100%", flexDirection: "column", }}>
        <HomeFuncList />
        <HomeDoctor />
        <HomeService />
      </ScrollView>
      <Toast position="top" bottomOffset={50} visibilityTime={2000}/>
    </>
  );
})
