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
import { useNavigation } from "@react-navigation/native";

export default observer(function HomeScreen() {
  const navigation = useNavigation()
  const { pagingDoctor, resetStore } = useStore().home
  const { user, reset} = useStore().auth
  
  useEffect(() => {
    pagingDoctor()
    return () => resetStore()
  },[])

  return (
    <>
      <Header isHeaderBack={false}><HomeHeader></HomeHeader></Header>
      <StatusBar style="light"/>
      <ScrollView showsVerticalScrollIndicator={false} style={{ width: "100%", height: "100%", flexDirection: "column", }}>
        <HomeFuncList />
        <HomeDoctor />
        <HomeService />
      </ScrollView>
      <Toast position="top" bottomOffset={50} visibilityTime={2000}/>
    </>
  );
})
