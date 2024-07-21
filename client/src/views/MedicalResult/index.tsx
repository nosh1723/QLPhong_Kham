import { View, Text, ScrollView, TextInput, TouchableOpacity, Modal } from 'react-native'
import React, { useEffect, useRef, useState } from 'react'
import Header from '@/src/components/Header'
import { style } from '@/src/styles'
import { colors } from '@/src/constants/Colors'
import { useStore } from '@/src/root-store'
import { getDate, getDateFormat, getGenderFomat, getTime } from '@/src/constants/LocalFunction'
import CommonButton from '@/src/components/CommonButton'
import { Formik } from 'formik'
import { FontAwesome, FontAwesome6, MaterialCommunityIcons } from '@expo/vector-icons'
import * as Yup from 'yup'
import Toast from 'react-native-toast-message'
import { CheckBox } from '@rneui/themed'
import { GestureHandlerRootView } from 'react-native-gesture-handler'
import BottomSheet, { BottomSheetView } from '@gorhom/bottom-sheet'
import DateTimePicker from '@react-native-community/datetimepicker'
import { isIos } from '@/src/constants/LocalConst'
import Backdrop from '@/src/components/Backdrop'
import { observer } from 'mobx-react'
import Loading from '@/src/components/Loading'
import ModalConfirm from '@/src/components/ModalConfirm'

const MedicalResultIndex = ({navigation}: any) => {

    const bottomSheetCalendarRef = useRef<BottomSheet>(null);

    const { isLoading, saveOrEdit, hasDisable, selectMedicalRecord } = useStore().medicalResultStore

    const { workhourExist, resetWorkhourExist, getWorkhourDoctor } = useStore().home
    const [showModal, setShowModal] = useState(false)
    const [indexResult, setIndexResult] = useState(0)
    const [date, setDate] = useState(new Date());
    const [showCalendar, setShowCalendar] = useState(false);
    const [selectedDate, setSelectedDate] = useState(new Date());

    const handleComfirmCalendar = () => {
        const currentDate = selectedDate;
        setShowCalendar(false);
        setDate(currentDate);
        bottomSheetCalendarRef.current?.close()
    }

    useEffect(() => {
        return () => resetWorkhourExist()
    }, [])
    
    return (
        <GestureHandlerRootView>
            <Loading visible={isLoading}/>
            <Formik
                initialValues={{
                    _id: selectMedicalRecord?._id,
                    result: '',
                    listResult: selectMedicalRecord?.results,
                    reExamination: selectMedicalRecord?.reExamination,
                    dateReExam: selectMedicalRecord?.dateReExam
                }}
                validationSchema={
                    Yup.object({
                        listResult: Yup.array().required("Kết quả khám không để trống!").nullable()
                    })
                }
                onSubmit={(values) => {
                    const newValues = {
                        ...values,
                        appointmentId: workhourExist._id
                    }
                    saveOrEdit(newValues).then(data => getWorkhourDoctor(new Date()))
                    navigation.goBack()
                    
                }}
            >
                {({ values, setFieldValue, handleChange, handleSubmit, errors, touched }: any) => {
                    return (
                        <>
                            <Header textHeaderBack={'Nhập bệnh án'} />
                            {/* <View style={{ flex: 1,}}> */}
                                <ScrollView style={{flex: 1, }}>
                                    <View style={{paddingHorizontal: 15, paddingVertical: 15}}>
                                        <View style={{ backgroundColor: colors.white, padding: 10, borderRadius: 8, flexDirection: 'column', gap: 8, paddingVertical: 15 }}>
                                            <Text style={{ fontWeight: 500, fontSize: 16, marginBottom: -4 }}>{workhourExist.patient.name}</Text>
                                            <Text>STT: {workhourExist.serialNumber}</Text>
                                            <View style={[style.row, {}]}>
                                                <Text>Mã BN</Text>
                                                <Text style={{ fontWeight: 500 }}>{workhourExist.patient.code}</Text>
                                            </View>
                                            <View style={[style.row, {}]}>
                                                <Text>Ngày sinh</Text>
                                                <Text style={{ fontWeight: 500 }}>{getDate(workhourExist.patient.birth_date)}</Text>
                                            </View>
                                            <View style={[style.row, {}]}>
                                                <Text>Giới tính</Text>
                                                <Text style={{ fontWeight: 500 }}>{getGenderFomat(workhourExist.patient.gender)}</Text>
                                            </View>
                                        </View>
    
                                        <Text style={{ marginTop: 20, marginBottom: 8 }}>Thông tin phiếu khám</Text>
                                        <View style={{ backgroundColor: colors.white, padding: 10, borderRadius: 8, flexDirection: 'column', gap: 8, paddingVertical: 15 }}>
                                            <View style={[style.row, {}]}>
                                                <Text>Mã phiếu khám</Text>
                                                <Text style={{ fontWeight: 500 }}>{workhourExist.code}</Text>
                                            </View>
                                            <View style={[style.row, {}]}>
                                                <Text>Ngày khám</Text>
                                                <Text style={{ fontWeight: 500 }}>{getDate(workhourExist.date)}</Text>
                                            </View>
                                            <View style={[style.row, {}]}>
                                                <Text>Giờ khám</Text>
                                                <Text style={{ fontWeight: 500 }}>{getTime(workhourExist.workhour.startTime)}</Text>
                                            </View>
                                            <View style={[style.row, {}]}>
                                                <Text>Bác sĩ</Text>
                                                <Text style={{ fontWeight: 500 }}>{workhourExist.doctor.name}</Text>
                                            </View>
                                            <View style={[style.row, {}]}>
                                                <Text>Dịch vụ</Text>
                                                <Text style={{ fontWeight: 500 }}>{workhourExist.service.name}</Text>
                                            </View>
                                            {workhourExist.note && 
                                                <View style={[style.row, {}]}>
                                                    <Text>Lý do khám</Text>
                                                    <Text style={{ fontWeight: 500 }}>{workhourExist.note}</Text>
                                                </View>
                                            }
                                        </View>
    
                                        <Text style={{ marginTop: 20, marginBottom: 8 }}>Nhập kết quả</Text>
                                        <View style={{ backgroundColor: colors.white, padding: 10, borderRadius: 8, flexDirection: 'column', gap: 8, paddingVertical: 15 }}>
                                            <View style={{ paddingVertical: 5, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', borderWidth: 1, borderColor: colors.gray, padding: 12, borderRadius: 8 }}>
                                                <TextInput style={{ fontSize: 16, width: '85%', paddingVertical: 5 }} placeholder='Nhập kết quả' value={values.result} onChangeText={handleChange('result')} />
                                                <TouchableOpacity onPress={() => {
                                                    if (values?.result === '') {
                                                        Toast.show({
                                                            type: 'error',
                                                            text1: 'Chưa nhập kết quả!'
                                                        })
                                                        return
                                                    }
                                                    setFieldValue('listResult', [...values.listResult, {
                                                        description: values.result
                                                    }])
                                                    setFieldValue('result', '')
                                                }} style={{ backgroundColor: colors.orange, padding: 3, paddingHorizontal: 5, borderRadius: 6 }}><FontAwesome6 name="plus" size={18} color={colors.white} /></TouchableOpacity>
                                            </View>
    
                                            <View style={{ marginVertical: 5, marginTop: 10, padding: 10, gap: 8, backgroundColor: "#f0f5fa", borderRadius: 8 }}>
                                                {values?.listResult?.length === 0 &&
                                                    <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: 5 }}>
                                                        <Text style={{ color: colors.textGray }}>Chưa có kết quả nào</Text>
                                                    </View>
                                                }
    
                                                {values?.listResult?.length > 0  && values?.listResult?.map((i: any, index: number) => {
                                                    return (
                                                        <View key={"kết quả khám" + index} style={{ flexDirection: 'row', alignItems: 'center', justifyContent: "space-between" }}>
                                                            <View style={{ flexDirection: 'row', alignItems: 'center', gap: 5 }}>
                                                                <FontAwesome name='circle' color={colors.textGray} size={8} />
                                                                <Text style={{ color: "rgba(0, 0, 0, .8)" }}>{i?.description}</Text>
                                                            </View>
                                                            <TouchableOpacity onPress={() => {
                                                                setShowModal(true)
                                                                setIndexResult(index)
                                                            }}>
                                                                <MaterialCommunityIcons name="close-circle" size={20} color={colors.textGray} />
                                                            </TouchableOpacity>
                                                        </View>
                                                    )
                                                })
                                                }
                                            </View>
                                            {touched.listResult && errors.listResult &&
                                                <Text style={{ color: "red" }}>{errors.listResult}</Text>
                                            }
    
                                        </View>
    
                                        {/* hẹn tái khám */}
                                        <Text style={{ marginTop: 20, marginBottom: 8 }}>Hẹn tái khám</Text>
                                        <View style={{ backgroundColor: colors.white, padding: 10, borderRadius: 8, flexDirection: 'row', paddingVertical: 15 }}>
                                            <CheckBox
                                                checked={values?.reExamination}
                                                onPress={() => {
                                                    setFieldValue('reExamination', !values?.reExamination)
                                                }}
                                                checkedIcon="dot-circle-o"
                                                uncheckedIcon="circle-o"
                                                containerStyle={{ backgroundColor: "transparent", padding: 0, marginLeft: 0 }}
                                                textStyle={{ marginLeft: 3, color: "#000", fontWeight: 500 }}
                                                title={""}
                                            />
    
    
                                            <CommonButton onPress={() => {
                                                showCalendar ? bottomSheetCalendarRef.current?.close() : bottomSheetCalendarRef.current?.expand()
                                                setShowCalendar(!showCalendar)
                                            }} style={{ borderWidth: 1, borderColor: "#e7ebed", borderRadius: 8, width: '100%', }} color={colors.white}
                                                disabled={!values?.reExamination}
                                            >
                                                <View style={{ flexDirection: 'row', alignItems: "center" }}>
                                                    <Text style={{ fontWeight: 600 }}>{values?.dateReExam ? getDateFormat(values?.dateReExam) : getDateFormat(date)} </Text>
                                                    <FontAwesome name="angle-down" size={20} color="black" style={{ paddingLeft: 3, marginTop: -3 }} />
                                                </View>
                                            </CommonButton>
                                        </View>
                                    </View>

                                </ScrollView>
                            {/* </View> */}
                            <View style={{padding: 15, paddingVertical: 20, backgroundColor: colors.white}}>
                                <CommonButton title={!values?._id ? 'Kết thúc' : "Lưu"} onPress={handleSubmit} />
                            </View>
                            <Toast position="top" topOffset={50} visibilityTime={2000} />

                            {/* bottom sheet */}
                            {(showCalendar && isIos) ? <Backdrop /> : <></>}

                            {!isIos && showCalendar &&
                                <DateTimePicker
                                    testID="dateTimePicker"
                                    value={new Date(values?.dateReExam)}
                                    mode={'date'}
                                    is24Hour={true}
                                    onChange={(event: any, selectedDate: any) => {
                                        if (!isIos) {
                                            const currentDate = selectedDate;
                                            setShowCalendar(false);
                                            setDate(currentDate);
                                            return
                                        }
                                        setSelectedDate(selectedDate)
                                        setFieldValue('dateReExam', selectedDate)
                                    }}
                                    display='spinner'
                                    style={{ height: 120, }}
                                    locale='vi-VN'
                                />
                            }
                            {isIos &&
                                <BottomSheet
                                    ref={bottomSheetCalendarRef}
                                    snapPoints={['45%']}
                                    enablePanDownToClose
                                    index={-1}
                                    onClose={() => { setShowCalendar(false) }}
                                >
                                    <BottomSheetView style={{ position: "relative", height: "100%" }}>
                                        <View style={{ flexDirection: "row", justifyContent: "center", paddingBottom: 16, paddingTop: 10 }}>
                                            <Text style={{ fontWeight: 600, fontSize: 18 }}>Chọn ngày </Text>
                                        </View>
                                        <DateTimePicker
                                            testID="dateTimePicker"
                                            value={new Date(values?.dateReExam)}
                                            mode={'date'}
                                            is24Hour={true}
                                            onChange={(event: any, selectedDate: any) => {

                                                setSelectedDate(selectedDate)
                                            }}
                                            display='spinner'
                                            style={{ height: 150 }}
                                            locale='vi-VN'
                                        />
                                        <View style={{ flexDirection: 'row', padding: 10, gap: 10, marginTop: 10, position: "absolute", bottom: 30, borderTopWidth: .8, borderColor: colors.gray }}>
                                            <TouchableOpacity style={{ backgroundColor: "#e6e6e6", padding: 15, borderRadius: 10, flex: 1 }} onPress={() => { setShowCalendar(false); bottomSheetCalendarRef.current?.close() }}><Text style={{ color: "#000", fontSize: 16, fontWeight: 600, textAlign: 'center' }}>Cancel</Text></TouchableOpacity>
                                            <TouchableOpacity style={{ backgroundColor: "#006778", padding: 15, borderRadius: 10, flex: 1 }} onPress={() => {
                                                const currentDate = selectedDate;
                                                setShowCalendar(false);
                                                setDate(currentDate);
                                                setFieldValue('dateReExam', selectedDate)
                                                bottomSheetCalendarRef.current?.close()
                                            }}><Text style={{ color: "#fff", fontSize: 16, fontWeight: 600, textAlign: 'center' }}>Comfirm</Text></TouchableOpacity>
                                        </View>

                                    </BottomSheetView>
                                </BottomSheet>
                            }

                            <ModalConfirm 
                                open={showModal}
                                onClose={setShowModal}
                                title={`Bạn có chắc chắn muốn xóa "${values?.listResult[indexResult]?.description}"`}
                                onPress={() => {
                                    const res = values?.listResult?.filter((item: any, index2: number) => {
                                        return index2 !== indexResult
                                    })

                                    setFieldValue('listResult', res)
                                    setShowModal(false)
                                }}
                            />

                        </>
                    )
                }}

            </Formik>
        </GestureHandlerRootView>
    )
}

export default observer(MedicalResultIndex) 