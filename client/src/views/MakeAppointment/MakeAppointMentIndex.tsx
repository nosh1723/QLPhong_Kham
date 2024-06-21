import Header from "@/src/components/Header";
import { colors } from "@/src/constants/Colors";
import { Entypo } from '@expo/vector-icons';
import { useNavigation } from "@react-navigation/native";
import { StatusBar } from "expo-status-bar";
import React, { useEffect, useState } from 'react';
import { Text, TouchableOpacity, View } from "react-native";
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { observer } from 'mobx-react'
import Makeappointment from "./MakeAppointMentInfo";
import MakeAppointMentComfirm from "./MakeAppointMentComfirm";
import { useStore } from "@/src/root-store";
import { Formik } from "formik";


export default observer(function MakeappointmentIndex() {
    const navigation = useNavigation()
    
    const {next, setNext, getWorkhours, searchObject} = useStore().apointment
    const { patient } = useStore().user
    const { doctor } = useStore().home

    const inittialValues = {
        ...searchObject,
        doctorId: doctor?.id,
        patientId: patient?._id,
    }

    useEffect(() => {
        getWorkhours(doctor.id)
    }, [])

    return (
        <GestureHandlerRootView >
            {/* <SafeAreaView style={{flex: 1}}> */}
            <StatusBar style="light" />
            <Header handleBack={() => {
                next === 1 ? setNext(0) : navigation.goBack()
            }} textHeaderBack={next === 0 ? "Đặt lịch khám" : "Xác nhận thông tin"}></Header>
            {/* navigate header */}
            <View style={{ flexDirection: 'row', alignItems: 'center', padding: 10, backgroundColor: '#fff' }}>
                <TouchableOpacity onPress={() => setNext(0)} style={{ flexDirection: 'row', alignItems: 'center' }}>
                    <View style={{ borderRadius: 20, width: 24, height: 24, justifyContent: "center", alignItems: "center", backgroundColor: next === 0 ? colors.blue : colors.green, }}><Text style={{ textAlign: 'center', color: "#fff" }}>1</Text></View>
                    <Text style={{ marginLeft: 5, fontSize: 13, color: next === 0 ? colors.blue : colors.green, fontWeight: 500 }}>Chọn lịch khám</Text>
                    <Entypo name="chevron-right" size={18} color="#ccc" style={{ marginHorizontal: 8 }} />
                </TouchableOpacity>
                <TouchableOpacity onPress={() => setNext(1)} style={{ flexDirection: 'row', alignItems: 'center' }}>
                    <View style={{ borderRadius: 20, width: 24, height: 24, justifyContent: "center", alignItems: "center", backgroundColor: next === 1 ? colors.blue : '#696969', }}><Text style={{ textAlign: 'center', color: "#fff" }}>2</Text></View>
                    <Text style={{ marginLeft: 5, fontSize: 13, color:  next === 1 ? colors.blue : '#696969' }}>Xác nhận</Text>
                    <Entypo name="chevron-right" size={18} color="#ccc" style={{ marginHorizontal: 8 }} />
                </TouchableOpacity>
                <TouchableOpacity style={{ flexDirection: 'row', alignItems: 'center' }}>
                    <View style={{ borderRadius: 20, width: 24, height: 24, justifyContent: "center", alignItems: "center", backgroundColor: '#696969', }}><Text style={{ textAlign: 'center', color: "#fff" }}>3</Text></View>
                    <Text style={{ marginLeft: 5, fontSize: 13 }}>Nhận lịch hẹn</Text>
                </TouchableOpacity>
            </View>

            <Formik
                initialValues={inittialValues}
                onSubmit={(values) => {
                    console.log(values);
                    
                }}
            >
                {({values}) => (
                    <View style={{backgroundColor: "#f0f5fa", flex: 1}}>
                    {next === 0 ? <Makeappointment /> : <MakeAppointMentComfirm />}
                </View>
                )}
            </Formik>
            

            {/* </SafeAreaView> */}
        </GestureHandlerRootView>
    );
})