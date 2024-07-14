import Header from "@/src/components/Header";
import { authSelector } from "@/src/redux/reducers/authReducer";
import { useStore } from "@/src/root-store";
import { useIsFocused, useNavigation } from "@react-navigation/native";
import { StatusBar } from "expo-status-bar";
import { observer } from "mobx-react";
import React, { useEffect, useState } from "react";
import { ScrollView } from "react-native";
import Toast from "react-native-toast-message";
import { useSelector } from "react-redux";
import HomeDoctor from "./HomeDoctor";
import HomeFuncList from "./HomeFuncList";
import HomeHeader from "./HomeHeader";
import HomeService from "./HomeService";
import Backdrop from "@/src/components/Backdrop";

export default observer(function HomeScreen({navigation}: any) {
  const auth = useSelector(authSelector)

  const [open, setOpen] = useState(false)

  const isFocused = useIsFocused();
  const { pagingDoctor, resetStore, getDoctor } = useStore().home
  const { getPatient} = useStore().user
  const { pagingServiceByCate } = useStore().service
  const { pagingAppointment, getAllWorkhour } = useStore().apointment
  
  
  useEffect(() => {
    pagingDoctor()
    pagingServiceByCate()
    pagingAppointment()
    getAllWorkhour()
    
    if(auth?.user?.role === "user"){
      getPatient(auth.user._id)
    }else if(auth?.user?.role === "doctor") {
      getDoctor(auth.user._id)
    }

    // return () => resetStore()
  },[isFocused])
  
  return (
    <>
      <StatusBar style="light"/>
      <Header isHeaderBack={false}><HomeHeader></HomeHeader></Header>
      <ScrollView showsVerticalScrollIndicator={false} style={{ width: "100%", height: "100%", flexDirection: "column", }}>
        <HomeFuncList open={open} setOpen={setOpen} navigation={navigation} />
        {auth?.user?.role === "user" && 
        <>
            <HomeDoctor />
            <HomeService navigation={navigation}/>
        </>
        }
      </ScrollView>
      
      {open && <Backdrop />}
      <Toast position="top" bottomOffset={50} visibilityTime={2000}/>
    </>
  );
})
