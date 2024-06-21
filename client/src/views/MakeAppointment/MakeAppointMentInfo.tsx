import Backdrop from "@/src/components/Backdrop";
import CommonButton from '@/src/components/CommonButton';
import Header from "@/src/components/Header";
import { colors } from "@/src/constants/Colors";
import { getDate, getDateFormat, getGenderFomat, getTime } from '@/src/constants/LocalFunction';
import { useStore } from "@/src/root-store";
import { style } from "@/src/styles";
import { AntDesign, Entypo, FontAwesome, MaterialCommunityIcons } from '@expo/vector-icons';
import BottomSheet, { BottomSheetView } from '@gorhom/bottom-sheet';
import DateTimePicker from '@react-native-community/datetimepicker';
import { useNavigation } from "@react-navigation/native";
import { Image } from '@rneui/themed';
import { StatusBar } from "expo-status-bar";
import { useFormikContext } from "formik";
import { observer } from "mobx-react";
import React, { useRef, useState } from 'react';
import { Platform, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";
import { GestureHandlerRootView } from 'react-native-gesture-handler';

export default observer(function Makeappointment() {
    const navigation = useNavigation()
    const isIos = Platform.OS === "ios"

    const { values, setFieldValue } = useFormikContext()

    const bottomSheetCalendarRef = useRef<BottomSheet>(null);
    const bottomSheetMoreInfoRef = useRef<BottomSheet>(null);
    const bottomSheetDetailInfoRef = useRef<BottomSheet>(null);

    const [date, setDate] = useState(new Date());
    const [timeWork, setTimeWork] = useState(1);
    const [activeDayExam, setActiveDayExam] = useState(0);
    const [activeTimeWork, setActiveTimeWork] = useState(-1);
    const [showCalendar, setShowCalendar] = useState(false);
    const [showMoreInfo, setShowMoreInfo] = useState(false);
    const [showDetailInfo, setShowDetailInfo] = useState(false);
    const [selectedDate, setSelectedDate] = useState(new Date());

    const { doctor } = useStore().home
    const { patient } = useStore().user
    const { next, setNext, workhourDoctor } = useStore().apointment

    const onChange = (event: any, selectedDate: any) => {
        if (!isIos) {
            const currentDate = selectedDate;
            setShowCalendar(false);
            setDate(currentDate);
            return
        }

        setSelectedDate(selectedDate)

    };
    
    const handleComfirmCalendar = () => {
        const currentDate = selectedDate;
        setShowCalendar(false);
        setDate(currentDate);
        setFieldValue("date", currentDate)
        bottomSheetCalendarRef.current?.close()
    }

    return (
        <>

            {/* view container */}
            <ScrollView showsVerticalScrollIndicator={false} showsHorizontalScrollIndicator={false} style={{ flex: 1 }}>
                <View style={{ backgroundColor: '#f0f5fa', flexDirection: "column", paddingHorizontal: 10, gap: 15, paddingVertical: 15 }}>

                    {/* title doctor */}
                    <View style={{ flexDirection: "row", padding: 12, backgroundColor: '#fff', marginBottom: 5, borderRadius: 20, alignItems: "center" }}>
                        <Image containerStyle={{ width: 70, height: 70, borderRadius: 1000, marginRight: 15 }} source={{ uri: "https://i.pinimg.com/736x/7d/9d/ed/7d9ded7751b328b1000bcfe4c1dc7727.jpg" }} />
                        <View>
                            <Text style={{ fontSize: 18, fontWeight: 500 }}>
                                {doctor?.name}
                            </Text>
                            <View style={{ flexDirection: 'row', alignItems: "center", paddingVertical: 5 }}>
                                <MaterialCommunityIcons name="check-decagram" size={16} color="#007bfc" style={{ paddingRight: 3 }} />
                                <Text style={{ color: "#007bfc" }}>Bác sĩ</Text>
                            </View>
                        </View>
                    </View>

                    {/* make apointment */}
                    <View style={[{}]}>
                        <View >
                            <Text style={{ fontWeight: '500', fontSize: 16, }}>Đặt lịch khám này cho:</Text>
                        </View>
                        < View style={{ marginTop: 10, backgroundColor: "#e1e8f2", borderRadius: 15, marginBottom: 15, }}>
                            <View style={{ padding: 12, borderRadius: 15, backgroundColor: "#fff" }}>
                                <View style={styles.textrow}>
                                    <Text >Họ và tên</Text>
                                    {patient?.name ? <Text style={styles.textcell}>{patient?.name}</Text>
                                        : <Text style={[styles.textcell, { color: colors.textGray }]}>Chưa cập nhật</Text>
                                    }
                                </View>
                                <View style={styles.textrow}>
                                    <Text>Giới tính</Text>
                                    {patient?.gender ? <Text style={styles.textcell}>{getGenderFomat(patient?.gender)}</Text>
                                        : <Text style={[styles.textcell, { color: colors.textGray }]}>Chưa cập nhật</Text>
                                    }
                                </View>
                                <View style={styles.textrow}>
                                    <Text>Ngày sinh</Text>
                                    {patient?.birth_date ? <Text style={styles.textcell}>{getDate(patient?.birth_date)}</Text>
                                        : <Text style={[styles.textcell, { color: colors.textGray }]}>Chưa cập nhật</Text>
                                    }
                                </View>
                                <View style={styles.textrow}>
                                    <Text>Điện thoại</Text>
                                    {patient?.phone_number ? <Text style={styles.textcell}>{patient?.phone_number}</Text>
                                        : <Text style={[styles.textcell, { color: colors.textGray }]}>Chưa cập nhật</Text>
                                    }
                                </View>
                            </View>
                            <View style={{ flexDirection: 'row', backgroundColor: '#e1e8f2', padding: 15, justifyContent: 'space-between', borderBottomLeftRadius: 15, borderBottomRightRadius: 15 }}>
                                <TouchableOpacity onPress={() => {
                                    bottomSheetDetailInfoRef.current?.expand()
                                    setShowDetailInfo(true)
                                }}>
                                    <Text style={{ textAlign: 'center', fontWeight: '400' }}>Xem chi tiết</Text>
                                </TouchableOpacity>
                                <TouchableOpacity onPress={() => navigation.navigate('userEdit')}>
                                    <Text style={{ color: colors.blue, textAlign: 'center', }}>Sửa hồ sơ</Text>
                                </TouchableOpacity>
                            </View>
                        </View>

                        <Text style={{ fontWeight: '500', fontSize: 16, marginTop: 10, marginBottom: 10 }}>Chọn Ngày khám</Text>
                        <View style={{ backgroundColor: "#fff", borderRadius: 15, }}>
                            <CommonButton onPress={() => {
                                showCalendar ? bottomSheetCalendarRef.current?.close() : bottomSheetCalendarRef.current?.expand()
                                setShowCalendar(!showCalendar)
                            }} style={{ borderWidth: 1, borderColor: "#e7ebed", borderRadius: 8, marginVertical: 15, marginHorizontal: 10 }} color='#transparent'>
                                <View style={{ flexDirection: 'row', alignItems: "center" }}>
                                    <Text style={{ fontWeight: 600 }}>{getDateFormat(date)} </Text>
                                    <FontAwesome name="angle-down" size={20} color="black" style={{ paddingLeft: 3, marginTop: -3 }} />
                                </View>
                            </CommonButton>
                            {!isIos && showCalendar && <DateTimePicker
                                testID="dateTimePicker"
                                value={date}
                                mode={'date'}
                                is24Hour={true}
                                onChange={onChange}
                                display='spinner'
                                style={{ height: 120, }}

                            />}

                        </View>
                        <Text style={{ fontWeight: '500', fontSize: 16, marginTop: 10 }}>Chọn giờ khám</Text>
                        <View style={{ marginTop: 10 }}>
                            <View style={{ flexDirection: 'row', position: "relative" }}>
                                <TouchableOpacity activeOpacity={1} onPress={() => {
                                    setActiveDayExam(0)
                                    setTimeWork(1)
                                }} style={{ backgroundColor: activeDayExam !== 0 ? "#e1e8f2" : "#fff", padding: 10, flex: 1, flexDirection: "row", justifyContent: "center", borderTopRightRadius: 15, borderTopLeftRadius: 15, borderBottomRightRadius: 15 }}><Text>Buổi sáng</Text></TouchableOpacity>
                                <TouchableOpacity activeOpacity={1} onPress={() => {
                                    setActiveDayExam(1)
                                    setTimeWork(2)
                                }} style={{ backgroundColor: activeDayExam !== 1 ? "#e1e8f2" : "#fff", padding: 10, flex: 1, flexDirection: "row", justifyContent: "center", borderTopRightRadius: 15, borderTopLeftRadius: 15, borderBottomLeftRadius: 15 }}><Text>Buổi chiều</Text></TouchableOpacity>
                                <View style={{ position: "absolute", backgroundColor: "#fff", width: "100%", height: 20, bottom: 0, zIndex: -1 }}></View>
                            </View>
                            <View style={[styles.table, { backgroundColor: "#fff", borderBottomRightRadius: 15, borderBottomLeftRadius: 15, padding: 10, paddingVertical: 20, minHeight: 70 }]}>
                                {/* Header */}
                                {/* Rows */}
                                <View style={{ flexDirection: "row", justifyContent: "space-around", flexWrap: "wrap", rowGap: 10 }}>
                                    {workhourDoctor?.map((i, index) => {
                                        if (i.typeShiftWork === timeWork)
                                            return <TouchableOpacity
                                                key={"workhour doctor" + i._id}
                                                onPress={() => {
                                                    setActiveTimeWork(index)
                                                    setFieldValue("startTime", i.startTime)
                                                    setFieldValue("endTime", i.endTime)
                                                }}
                                                style={{padding: 10, paddingHorizontal: 13, borderRadius: 12, borderWidth: 1.5,borderColor: activeTimeWork === index ? colors.blue : "#ccd3dd", backgroundColor: activeTimeWork === index ? "#e7f1fd" : "transparent", }}
                                            >
                                                <Text style={{  }}>
                                                    {getTime(i.startTime)} - {getTime(i.endTime)}
                                                </Text>
                                            </TouchableOpacity>
                                        return
                                    })}
                                </View>
                            </View>
                            <View>
                                <Text style={{ fontWeight: '500', fontSize: 16, marginTop: 30, }}>Thông tin bổ sung (Không bắt buộc)</Text>
                                <Text style={{ marginTop: 8, color: colors.textGray }}>Bạn có thể cung cấp thêm các thông tin như lý do khám, triệu chứng, đơn thuốc sử dụng gần đây</Text>
                                <TouchableOpacity onPress={() => {
                                    bottomSheetMoreInfoRef.current?.expand();
                                    bottomSheetCalendarRef.current?.close()
                                    setShowMoreInfo(true)
                                }} style={{ borderRadius: 10, backgroundColor: '#ffffff', marginTop: 15, paddingVertical: 4, flexDirection: "row", justifyContent: 'center', alignItems: "center", gap: 3 }}>
                                    <Text style={{ color: colors.blue, lineHeight: 40, fontWeight: 500 }}>Tôi muốn gửi thêm thông tin </Text>
                                    <View style={{ padding: 3, backgroundColor: "rgba(131, 180, 255, .3)", borderRadius: 1000 }}><AntDesign name="arrowright" size={16} color={colors.blue} /></View>
                                </TouchableOpacity>
                            </View>
                        </View>
                    </View>
                </View>
            </ScrollView>


            <View style={{ padding: 10, borderTopWidth: .8, borderTopColor: colors.gray, backgroundColor: colors.white, paddingVertical: 15, paddingBottom: isIos ? 30 : 15 }}>
                <CommonButton onPress={() => setNext(1)} title="Tiếp tục" style={{ borderRadius: 8, }}></CommonButton>
            </View>
            {(showCalendar && isIos) || showMoreInfo || showDetailInfo ? <Backdrop /> : <></>}

            {/* start bottom sheet view */}
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
                            <Text style={{ fontWeight: 600, fontSize: 18 }}>Chọn ngày khám</Text>
                        </View>
                        <DateTimePicker
                            testID="dateTimePicker"
                            value={values.date}
                            mode={'date'}
                            is24Hour={true}
                            onChange={onChange}
                            display='spinner'
                            style={{ height: 150 }}
                        />
                        <View style={{ flexDirection: 'row', padding: 10, gap: 10, marginTop: 10, position: "absolute", bottom: 30, borderTopWidth: .8, borderColor: colors.gray }}>
                            <TouchableOpacity style={{ backgroundColor: "#e6e6e6", padding: 15, borderRadius: 10, flex: 1 }} onPress={() => { setShowCalendar(false); bottomSheetCalendarRef.current?.close() }}><Text style={{ color: "#000", fontSize: 16, fontWeight: 600, textAlign: 'center' }}>Cancel</Text></TouchableOpacity>
                            <TouchableOpacity style={{ backgroundColor: "#006778", padding: 15, borderRadius: 10, flex: 1 }} onPress={handleComfirmCalendar}><Text style={{ color: "#fff", fontSize: 16, fontWeight: 600, textAlign: 'center' }}>Comfirm</Text></TouchableOpacity>
                        </View>

                    </BottomSheetView>
                </BottomSheet>
            }

            <BottomSheet
                ref={bottomSheetMoreInfoRef}
                // onChange={handleSheetChanges}
                snapPoints={['45%']}
                enablePanDownToClose
                index={-1}
                onClose={() => { setShowMoreInfo(false) }}
                backgroundStyle={{ backgroundColor: "transparent" }}
            >
                <BottomSheetView style={{ position: "relative", height: "100%", backgroundColor: "#fff", borderTopRightRadius: 20, borderTopLeftRadius: 20 }}>
                    <View style={{ flexDirection: "row", justifyContent: "center", paddingBottom: 16, paddingTop: 10 }}>
                        <Text style={{ fontWeight: 600, fontSize: 18 }}>Lý do thăm khám</Text>
                    </View>
                    <TextInput numberOfLines={2} placeholder="Lý do khám, triệu trứng, trạng thái, tiền sử bệnh..." style={[style.input, { marginHorizontal: 15 }]}></TextInput>
                    <View style={{ flexDirection: 'row', padding: 10, marginTop: 10, position: "absolute", bottom: isIos ? 30 : 10, borderTopWidth: .8, borderColor: colors.gray, justifyContent: "center", width: "100%" }}>
                        <TouchableOpacity style={{ backgroundColor: "#006778", padding: 15, borderRadius: 10, flex: 1 }} onPress={() => { }}><Text style={{ color: "#fff", fontSize: 16, fontWeight: 600, textAlign: 'center' }}>Xác nhận</Text></TouchableOpacity>
                    </View>

                </BottomSheetView>
            </BottomSheet>
            <BottomSheet
                ref={bottomSheetDetailInfoRef}
                snapPoints={['85%']}
                enablePanDownToClose
                index={-1}
                onClose={() => { setShowDetailInfo(false) }}
                backgroundStyle={{ backgroundColor: "transparent" }}
            >
                <BottomSheetView style={{ position: "relative", height: "100%", backgroundColor: "#fff", borderTopRightRadius: 20, borderTopLeftRadius: 20 }}>
                    <View style={{ flexDirection: "row", justifyContent: "center", paddingBottom: 16, paddingTop: 15 }}>
                        <Text style={{ fontWeight: 600, fontSize: 18 }}>Thông tin bệnh nhân</Text>
                    </View>
                    <View style={{ backgroundColor: colors.bgGray, flex: 1 }}>
                        <ScrollView showsVerticalScrollIndicator={false}>
                            <View style={{ margin: 15, backgroundColor: colors.white, paddingHorizontal: 12, paddingVertical: 20, borderRadius: 10, flexDirection: 'column', gap: 15 }}>
                                <View style={{ flexDirection: 'row', justifyContent: "space-between" }}>
                                    <Text style={{ color: "#62718b", fontSize: 16 }}>Mã bệnh nhân</Text>
                                    {patient?.code ? <Text style={{ fontWeight: 600, fontSize: 16 }}>{patient?.code}</Text>
                                        : <Text style={{ fontSize: 16, color: colors.textGray }}>Chưa cập nhật</Text>
                                    }

                                </View>
                                <View style={{ flexDirection: 'row', justifyContent: "space-between" }}>
                                    <Text style={{ color: "#62718b", fontSize: 16 }}>Họ và tên</Text>
                                    {patient?.name ? <Text style={{ fontWeight: 600, fontSize: 16 }}>{patient?.name}</Text>
                                        : <Text style={{ fontSize: 16, color: colors.textGray }}>Chưa cập nhật</Text>
                                    }
                                </View>
                                <View style={{ flexDirection: 'row', justifyContent: "space-between" }}>
                                    <Text style={{ color: "#62718b", fontSize: 16 }}>Điện thoại</Text>
                                    {patient?.phone_number ? <Text style={{ fontWeight: 600, fontSize: 16 }}>{patient?.phone_number}</Text>
                                        : <Text style={{ fontSize: 16, color: colors.textGray }}>Chưa cập nhật</Text>
                                    }
                                </View>
                                <View style={{ flexDirection: 'row', justifyContent: "space-between" }}>
                                    <Text style={{ color: "#62718b", fontSize: 16 }}>Ngày sinh</Text>
                                    {patient?.birth_date ? <Text style={{ fontWeight: 600, fontSize: 16 }}>{getDate(patient?.birth_date)}</Text>
                                        : <Text style={{ fontSize: 16, color: colors.textGray }}>Chưa cập nhật</Text>
                                    }
                                </View>
                                <View style={{ flexDirection: 'row', justifyContent: "space-between" }}>
                                    <Text style={{ color: "#62718b", fontSize: 16 }}>Mã BHYT</Text>
                                    {patient?.health_insurance_code ? <Text style={{ fontWeight: 600, fontSize: 16 }}>{patient?.health_insurance_code}</Text>
                                        : <Text style={{ fontSize: 16, color: colors.textGray }}>Chưa cập nhật</Text>
                                    }
                                </View>
                                <View style={{ flexDirection: 'row', justifyContent: "space-between" }}>
                                    <Text style={{ color: "#62718b", fontSize: 16 }}>Địa chỉ</Text>
                                    {patient?.address ? <Text style={{ fontWeight: 600, fontSize: 16 }}>{patient?.address}</Text>
                                        : <Text style={{ fontSize: 16, color: colors.textGray }}>Chưa cập nhật</Text>
                                    }
                                </View>
                                <View style={{ flexDirection: 'row', justifyContent: "space-between" }}>
                                    <Text style={{ color: "#62718b", fontSize: 16 }}>Dân tộc</Text>
                                    {patient?.ethnic ? <Text style={{ fontWeight: 600, fontSize: 16 }}>{patient?.ethnic}</Text>
                                        : <Text style={{ fontSize: 16, color: colors.textGray }}>Chưa cập nhật</Text>
                                    }
                                </View>
                                <View style={{ flexDirection: 'row', justifyContent: "space-between" }}>
                                    <Text style={{ color: "#62718b", fontSize: 16 }}>Email</Text>
                                    {patient?.email ? <Text style={{ fontWeight: 600, fontSize: 16 }}>{patient?.email}</Text>
                                        : <Text style={{ fontSize: 16, color: colors.textGray }}>Chưa cập nhật</Text>
                                    }
                                </View>
                            </View>
                        </ScrollView>
                    </View>
                    <View style={{ flexDirection: 'row', padding: 10, gap: 10, marginTop: 10, position: "absolute", paddingBottom: isIos ? 40 : 10, bottom: 0, borderTopWidth: .8, borderColor: colors.gray, backgroundColor: colors.white }}>
                        <TouchableOpacity style={{ backgroundColor: "#e6e6e6", padding: 15, borderRadius: 10, flex: 1 }} onPress={() => { setShowCalendar(false); bottomSheetCalendarRef.current?.close() }}><Text style={{ color: "#000", fontSize: 16, fontWeight: 600, textAlign: 'center' }}>Đóng</Text></TouchableOpacity>
                        <TouchableOpacity style={{ backgroundColor: "#006778", padding: 15, borderRadius: 10, flex: 1 }} onPress={() => navigation.navigate("userEdit")}><Text style={{ color: "#fff", fontSize: 16, fontWeight: 600, textAlign: 'center' }}>Sửa thông tin</Text></TouchableOpacity>
                    </View>

                </BottomSheetView>
            </BottomSheet>


            {/* end bottom sheet view */}
        </>
    );
})
const styles = StyleSheet.create({
    container: {
        // paddingHorizontal: 30,
        display: 'flex',
        flex: 1,
        flexDirection: 'column',
    },
    text1: {
        marginTop: 7,
        fontSize: 14,

    },
    text2: {
        fontWeight: '600',
        fontSize: 15,
    },
    table: {
        borderWidth: 0,
        borderColor: '#000',
        backgroundColor: '#F8F8F8',

    },
    row: {
        flexDirection: 'row',
    },
    textrow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        display: 'flex',
        backgroundColor: '#fff',
        padding: 5,
    },
    textcell: {
        fontWeight: '600',
    },
})