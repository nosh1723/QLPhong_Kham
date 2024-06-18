import CommonButton from '@/src/components/CommonButton';
import { IconCalendar } from '@/src/components/Icon/Icon';
import ViewComponent from '@/src/components/ViewComponent';
import { CheckBox } from '@rneui/themed';
import { Form, Formik } from 'formik';
import React, { useRef, useState } from 'react';
import { Platform, ScrollView } from 'react-native';
import { StyleSheet, Text, TextInput, View } from 'react-native';
import { TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { style } from '@/src/styles';
import Header from '@/src/components/Header';
import { observer } from 'mobx-react';
import { useStore } from '@/src/root-store';
import { getDate } from '@/src/constants/LocalFunction';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import BottomSheet, { BottomSheetView } from '@gorhom/bottom-sheet';
import DateTimePicker from '@react-native-community/datetimepicker';
import { colors } from '@/src/constants/Colors';
import Backdrop from '@/src/components/Backdrop';
import Loading from '@/src/components/Loading';

const UserEdit = () => {
    const { patient, searchObject, createOrUpdatePatient, isLoading } = useStore().user

    const bottomSheetCalendarRef = useRef<BottomSheet>(null);

    const isIos = Platform.OS === "ios"

    const [date, setDate] = useState(new Date());
    const [selectedIndex, setIndex] = useState<number>();
    const [showCalendar, setShowCalendar] = useState(false);
    const [selectedDate, setSelectedDate] = useState(new Date());

    const onChange = (event: any, selectedDate: any) => {
        if (!isIos) {
            const currentDate = selectedDate;
            setShowCalendar(false);
            setDate(currentDate);
            return
        }

        setSelectedDate(selectedDate)

    };

    const handleComfirmCalendar = (setFieldValue: Function) => {
        const currentDate = selectedDate;
        setShowCalendar(false);
        setDate(currentDate);
        setFieldValue("birth_date", currentDate)
        bottomSheetCalendarRef.current?.close()
    }

    return (
        <GestureHandlerRootView >
            <Header textHeaderBack='Chỉnh sửa thông tin' />
            <Formik
                initialValues={patient}
                onSubmit={createOrUpdatePatient}
            >
                {({ values, setFieldValue, handleChange, handleSubmit }) => (
                    <ViewComponent style={{ backgroundColor: "#fff", flex: 1 }}>
                        <ScrollView showsVerticalScrollIndicator={false} style={{ flexGrow: 1 }}>
                            <View style={{ padding: 10 }}>
                                <View style={{ paddingVertical: 10 }}>
                                    <View style={{ flexDirection: 'row', }}><Text style={{ fontWeight: 500, fontSize: 16 }}>Họ và tên</Text><Text style={{ color: "#dd524b", fontSize: 18, marginTop: -2, marginLeft: 3 }}>*</Text></View>
                                    <TextInput style={style.input} placeholder='Họ và tên của bạn' value={values.name} onChangeText={handleChange('name')} />
                                </View>
                                <View style={{ paddingVertical: 10 }}>
                                    <View style={{ flexDirection: 'row', }}><Text style={{ fontWeight: 500, fontSize: 16 }}>Số điện thoại</Text><Text style={{ color: "#dd524b", fontSize: 18, marginTop: -2, marginLeft: 3 }}>*</Text></View>
                                    <TextInput style={style.input} placeholder='Nhập số điện thoại' value={values.phone_number} onChangeText={handleChange('phone_number')} />
                                </View>
                                <View style={{ paddingVertical: 10 }}>
                                    <View style={{ flexDirection: 'row', }}><Text style={{ fontWeight: 500, fontSize: 16 }}>Ngày sinh</Text><Text style={{ color: "#dd524b", fontSize: 18, marginTop: -2, marginLeft: 3 }}>*</Text></View>
                                    <TouchableOpacity onPress={() => {
                                        bottomSheetCalendarRef.current?.expand()
                                        setShowCalendar(true)
                                    }} style={[style.input, { flexDirection: 'row', justifyContent: "space-between", alignItems: 'center' }]} >
                                        <Text style={{ fontSize: 16, color: values?.birth_date ? "" : "#bbbbbd" }}>{values?.birth_date ? getDate(values?.birth_date) : "Ngày tháng năm sinh"}</Text>
                                        <IconCalendar size={20} color='#bbbbbd' />
                                    </TouchableOpacity>
                                </View>
                                {/* checkbox */}
                                <View style={{ paddingVertical: 10 }}>
                                    <View style={{ flexDirection: 'row', }}><Text style={{ fontWeight: 500, fontSize: 16 }}>Giới tính</Text><Text style={{ color: "#dd524b", fontSize: 18, marginTop: -2, marginLeft: 3 }}>*</Text></View>
                                    <View style={[{ flexDirection: 'row', justifyContent: "space-between", alignItems: 'center', gap: 15, marginTop: 8 }]} >
                                        {/* male */}
                                        <TouchableOpacity onPress={() => {
                                            setFieldValue("gender", "M")
                                            setIndex(0)
                                        }} style={{ flexDirection: 'row', alignItems: 'center', backgroundColor: values?.gender === "F" || selectedIndex === 1 ? "#fff" : "#e7f1fd", padding: 10, paddingRight: 15, justifyContent: "space-between", flex: 1, borderRadius: 8, borderWidth:  values?.gender === "M" || selectedIndex === 0 ? 2 : 1, borderColor: values?.gender === "M" ||  selectedIndex === 0 ? "#007bfc" : "#ccc" }}>
                                            <CheckBox
                                                checked={values?.gender === "M" || selectedIndex === 0}
                                                // onPress={() => {

                                                // }}
                                                checkedIcon="dot-circle-o"
                                                uncheckedIcon="circle-o"
                                                containerStyle={{ backgroundColor: "transparent", padding: 0 }}
                                                textStyle={{ marginLeft: 3, color: values?.gender === "F" || selectedIndex === 1 ? "#000" : "#007bfc" }}
                                                title={"Nam"}
                                            />
                                            <Ionicons name="male" size={20} color="#007bfc" />
                                        </TouchableOpacity>
                                        {/* fm */}
                                        <TouchableOpacity onPress={() => {
                                            setFieldValue("gender", "F")
                                            setIndex(1)
                                        }} style={{ flexDirection: 'row', alignItems: 'center', backgroundColor: values?.gender === "F" || selectedIndex === 1 ? "#e7f1fd" : "#fff", padding: 10, paddingRight: 15, justifyContent: "space-between", flex: 1, borderRadius: 8, borderWidth: values?.gender === "F" || selectedIndex === 1 ? 2 : 1, borderColor: values?.gender === "F" || selectedIndex === 1 ? "#007bfc" : "#ccc" }}>
                                            <CheckBox
                                                checked={values?.gender === "F" || selectedIndex === 1}
                                                // onPress={() => {

                                                // }}
                                                checkedIcon="dot-circle-o"
                                                uncheckedIcon="circle-o"
                                                containerStyle={{ backgroundColor: "transparent", padding: 0 }}
                                                textStyle={{ marginLeft: 3, color: values?.gender === "M" || selectedIndex === 0 ? "#000" : "#007bfc" }}
                                                title={"Nữ"}
                                            />
                                            <Ionicons name="female" size={20} color="#df5296" />
                                        </TouchableOpacity>
                                    </View>
                                </View>
                                {/* end checkbox */}

                                <View style={{ paddingVertical: 10 }}>
                                    <View style={{ flexDirection: 'row', }}><Text style={{ fontWeight: 500, fontSize: 16 }}>Địa chỉ email</Text></View>
                                    <TextInput style={style.input} placeholder='Địa chỉ email của bạn' value={values.email} onChangeText={handleChange('email')} />
                                </View>
                                <View style={{ paddingVertical: 10 }}>
                                    <View style={{ flexDirection: 'row', }}><Text style={{ fontWeight: 500, fontSize: 16 }}>Địa chỉ </Text></View>
                                    <TextInput style={style.input} placeholder='Nhập Địa chỉ ' value={values.address} onChangeText={handleChange('address')} />
                                </View>
                                <View style={{ paddingVertical: 10 }}>
                                    <View style={{ flexDirection: 'row', }}><Text style={{ fontWeight: 500, fontSize: 16 }}>Dân tộc</Text></View>
                                    <TextInput style={style.input} placeholder='Nhập Dân tộc' value={values.ethnic} onChangeText={handleChange('ethnic')} />
                                </View>
                                <CommonButton onPress={handleSubmit} style={{ marginTop: 10, borderRadius: 8 }}>Lưu</CommonButton>
                            </View>
                            {showCalendar ? <Backdrop /> : <></>}

                        </ScrollView>
                            <BottomSheet
                                ref={bottomSheetCalendarRef}
                                snapPoints={['45%']}
                                enablePanDownToClose
                                index={-1}
                                onClose={() => { setShowCalendar(false) }}
                            >
                                <BottomSheetView style={{ position: "relative", height: "100%" }}>
                                    <View style={{ flexDirection: "row", justifyContent: "center", paddingBottom: 30, paddingTop: 10 }}>
                                        <Text style={{ fontWeight: 600, fontSize: 18 }}>Chọn ngày khám</Text>
                                    </View>
                                    <DateTimePicker
                                        testID="dateTimePicker"
                                        value={date}
                                        mode={'date'}
                                        is24Hour={true}
                                        onChange={onChange}
                                        display='spinner'
                                        style={{ height: 150 }}
                                    />
                                    <View style={{ flexDirection: 'row', padding: 10, gap: 10, marginTop: 10, position: "absolute", bottom: 30, borderTopWidth: .8, borderColor: colors.gray }}>
                                        <TouchableOpacity style={{ backgroundColor: "#e6e6e6", padding: 15, borderRadius: 10, flex: 1 }} onPress={() => { 
                                            setShowCalendar(false); 
                                            bottomSheetCalendarRef.current?.close()
                                         }}><Text style={{ color: "#000", fontSize: 16, fontWeight: 600, textAlign: 'center' }}>Hủy</Text></TouchableOpacity>
                                        <TouchableOpacity style={{ backgroundColor: "#006778", padding: 15, borderRadius: 10, flex: 1 }} onPress={() => {
                                            handleComfirmCalendar(setFieldValue)
                                        }}><Text style={{ color: "#fff", fontSize: 16, fontWeight: 600, textAlign: 'center' }}>Xác nhận</Text></TouchableOpacity>
                                    </View>

                                </BottomSheetView>
                            </BottomSheet>
                            <Loading visible={isLoading}/>
                    </ViewComponent>

                )}
            </Formik>
        </GestureHandlerRootView>
    );
};

export default observer(UserEdit);

