import Header from "@/src/components/Header";
import { colors } from "@/src/constants/Colors";
import { Entypo } from '@expo/vector-icons';
import { StatusBar } from "expo-status-bar";
import React, { useEffect, useState } from 'react';
import { Text, TouchableOpacity, View } from "react-native";
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { observer } from 'mobx-react'
import Makeappointment from "./MakeAppointMentInfo";
import MakeAppointMentComfirm from "./MakeAppointMentComfirm";
import { useStore } from "@/src/root-store";
import { Formik } from "formik";
import * as Yup from 'yup'
import Toast from "react-native-toast-message";
import moment from "moment";


export default observer(function MakeappointmentIndex({navigation}: any) {
    
    const {next, setNext, searchObject, getAllWorkhour} = useStore().apointment
    const { patient } = useStore().user
    const { doctor, resetWorkhour } = useStore().home
    const { pagingService, getDoctorService } = useStore().service

    const inittialValues = {
        ...searchObject,
        doctorId: doctor?.id,
        patientId: patient?._id,
    }

    const validateSchema = Yup.object().shape({
        service: Yup.object({
            name: Yup.string().required("Bạn chưa chọn dịch vụ").nullable()
        }).nullable(),
        appointmentTime: Yup.object({
            _id: Yup.string().required("Bạn chưa chọn giờ khám").nullable()
        }),
        date: Yup.date()
        .test(
            "date-maxDate",
            "Không được nhỏ hơn ngày hiện tại",
            function (value) {
                const { path, createError } = this;
                if (moment(value).isBefore(moment(), 'day')) {
                    return createError({ path, message: "Không được nhỏ hơn ngày hiện tại" ?? 'Date cannot be before today' });
                  }
                  return true;
            }
        )
        .nullable()
    })

    useEffect(() => {
        pagingService()
        getDoctorService(doctor?.id)

        return () => resetWorkhour()
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
                validationSchema={validateSchema}
                onSubmit={(values) => {
                    setNext(1)
                }}
            >
                {({values }) => (
                    <View style={{backgroundColor: "#f0f5fa", flex: 1}}>
                    {next === 0 ? <Makeappointment navigation={navigation}/> : <MakeAppointMentComfirm navigation={navigation} />}
                </View>
                )}
            </Formik>
            <Toast position="top" topOffset={50} visibilityTime={2000}/>
            

            {/* </SafeAreaView> */}
        </GestureHandlerRootView>
    );
})