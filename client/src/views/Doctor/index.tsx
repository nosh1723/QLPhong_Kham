import ViewComponent from '@/src/components/ViewComponent';
import { Button, Image } from '@rneui/themed';
import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { Platform, ScrollView, Text, TouchableOpacity } from 'react-native';
import { View } from 'react-native';
import { FontAwesome, MaterialCommunityIcons } from '@expo/vector-icons';
import CommonButton from '@/src/components/CommonButton';
import DateTimePicker from '@react-native-community/datetimepicker';
import { getDateFormat, getDateTimeFormat, getTime } from '@/src/constants/LocalFunction';
import { Entypo } from '@expo/vector-icons';
import BottomSheet, { BottomSheetView } from '@gorhom/bottom-sheet';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { useStore } from '@/src/root-store';
import { useNavigation } from '@react-navigation/native';
import Header from '@/src/components/Header';
import { useSelector } from 'react-redux';
import { authSelector } from '@/src/redux/reducers/authReducer';
import Loading from '@/src/components/Loading';
import { observer } from 'mobx-react';
import { colors } from '@/src/constants/Colors';
import Toast from 'react-native-toast-message';

const DoctorIndex = ({navigation}: any) => {
    const auth = useSelector(authSelector)
    const [date, setDate] = useState(new Date());
    const [showCalendar, setShowCalendar] = useState(false);
    const [timeWork, setTimeWork] = useState(1);
    const [activeTimeWork, setActiveTimeWork] = useState("");
    const [extendIntroduce, setExtendIntroduce] = useState(true)
    const [extendWorkPace, setExtendWorkPace] = useState(true)
    const [selectedDate, setSelectedDate] = useState(new Date());
    const isIos = Platform.OS === "ios"

    const { doctor, isLoading } = useStore().home
    const { checkDateTime, workhourResult, workhourDoctor, getAllWorkhour, workhours } = useStore().apointment

    const bottomSheetCalendarRef = useRef<BottomSheet>(null);

    useEffect(() => {
        checkDateTime(new Date())
    }, [])

    const handleComfirmCalendar = () => {
        const currentDate = selectedDate;
        setShowCalendar(false);
        setDate(currentDate);
        checkDateTime(currentDate)
        bottomSheetCalendarRef.current?.close()
    }

    const onChange = (event: any, selectedDate: any) => {
        if (!isIos) {
            const currentDate = selectedDate;
            setShowCalendar(false);
            setDate(currentDate);
            checkDateTime(currentDate)
            return
        }
        setSelectedDate(selectedDate)
    };

    return (
        <GestureHandlerRootView >
            <Header textHeaderBack='Bác sĩ' />
            <View style={{ flex: 1 }}>
                <ScrollView showsVerticalScrollIndicator={false} style={{ flex: 1 }}>
                    <View style={{ flexDirection: "row", padding: 12, backgroundColor: colors.white, marginBottom: 5, alignItems: 'center' }}>
                        <Image containerStyle={{ width: 100, height: 100, borderRadius: 1000, marginBottom: 10, marginRight: 15 }} source={{ uri: "https://i.pinimg.com/736x/7d/9d/ed/7d9ded7751b328b1000bcfe4c1dc7727.jpg" }} />
                        <View>
                            {/* <Text style={{fontSize: 18}}>BS. CK2</Text> */}
                            <Text style={{ fontSize: 20, fontWeight: 500 }}>
                                {doctor?.name}
                            </Text>
                            <View style={{ flexDirection: 'row', alignItems: "center", paddingVertical: 5 }}>
                                <MaterialCommunityIcons name="check-decagram" size={16} color="#007bfc" style={{ paddingRight: 3 }} />
                                <Text style={{ color: "#007bfc" }}>Bác sĩ</Text>
                            </View>
                            <Text><Text style={{ fontWeight: 500 }}>{doctor?.yearOfExperience}</Text> năm kinh nghiệm</Text>
                            <Text numberOfLines={1}>{doctor?.branch?.name}</Text>
                        </View>
                    </View>
                    <View style={{ backgroundColor: colors.white, padding: 12, marginBottom: 5 }}>
                        <Text style={{ fontWeight: 600, padding: 10, textAlign: 'center', fontSize: 18 }}>Lịch khám</Text>
                        <CommonButton onPress={() => {
                            showCalendar ? bottomSheetCalendarRef.current?.close() : bottomSheetCalendarRef.current?.expand()
                            setShowCalendar(!showCalendar)
                        }} style={{ borderWidth: 1, borderColor: "#e7ebed", borderRadius: 8 }} color='transparent'>
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
                        <Text style={{ marginTop: 15, marginBottom: 10, fontWeight: 600, fontSize: 16 }}>Buổi chiều</Text>
                        <ScrollView showsHorizontalScrollIndicator={false} horizontal>
                            <View style={{ flexDirection: "row", justifyContent: "space-around", flexWrap: "wrap", gap: 10 }}>
                                {workhours?.map((i, index) => {
                                    const checkTimeExist = workhourResult.workhour?.some(time => time.workHourId === i._id)
                                    if (i.typeShiftWork === 2)
                                        return <TouchableOpacity
                                            activeOpacity={1}
                                            key={"workhour doctor" + i._id}
                                            onPress={() => {
                                                if (!checkTimeExist) {
                                                    setActiveTimeWork(i._id)
                                                }
                                                if (checkTimeExist) {
                                                    Toast.show({
                                                        type: "info",
                                                        text1: "Giờ khám đã có người đặt, vui lòng chọn giờ khám khác!"
                                                    })
                                                }
                                            }}
                                            style={{ padding: 10, paddingHorizontal: 13, borderRadius: 12, borderWidth: 1.5, borderColor: activeTimeWork === i._id ? colors.blue : "#ccd3dd", backgroundColor: checkTimeExist ? colors.bgGray : (activeTimeWork === i._id ? "#e7f1fd" : "transparent"), }}
                                        >
                                            <Text style={{}}>
                                                {getTime(i.startTime)} - {getTime(i.endTime)}
                                            </Text>
                                        </TouchableOpacity>
                                    return
                                })}
                            </View>
                        </ScrollView>
                        <View style={{ flexDirection: "row", marginTop: 10, alignItems: 'center', marginBottom: 10 }}>
                            <MaterialCommunityIcons name="hand-pointing-up" size={20} color="#485565" />
                            <Text style={{ color: "#485565" }}>Chọn một khung giờ để đặt</Text>
                        </View>
                    </View>
                    <View style={{ padding: 12, backgroundColor: colors.white, marginBottom: 5 }}>
                        <View style={{ flexDirection: 'row', justifyContent: "space-between", alignItems: 'center', paddingBottom: 20 }}>
                            <Text style={{ fontSize: 16, fontWeight: 600 }}>Giới thiệu</Text>
                            <TouchableOpacity onPress={() => setExtendIntroduce(!extendIntroduce)}>
                                {extendIntroduce ?
                                    <FontAwesome name="angle-up" size={24} color="#ccc" />
                                    :
                                    <FontAwesome name="angle-down" size={24} color="#ccc" />
                                }
                            </TouchableOpacity>
                        </View>
                        {extendIntroduce &&
                            <View style={{ paddingBottom: 20 }}>
                                <Text>
                                    {doctor?.description}
                                </Text>
                                <Text style={{ paddingVertical: 10 }}>
                                    Các dịch vụ của bác sĩ:
                                </Text>
                                <View style={{}}>
                                    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                        <Entypo name="dot-single" size={24} color="black" />
                                        <Text>Khám và điều trị bla bla</Text>
                                    </View>
                                </View>
                            </View>
                        }
                    </View>
                    <View style={{ padding: 12, backgroundColor: colors.white, marginBottom: 5 }}>
                        <View style={{ flexDirection: 'row', justifyContent: "space-between", alignItems: 'center', paddingBottom: 20 }}>
                            <Text style={{ fontSize: 16, fontWeight: 600 }}>Nơi công tác</Text>
                            <TouchableOpacity onPress={() => setExtendWorkPace(!extendWorkPace)}>
                                {extendWorkPace ?
                                    <FontAwesome name="angle-up" size={24} color="#ccc" />
                                    :
                                    <FontAwesome name="angle-down" size={24} color="#ccc" />
                                }
                            </TouchableOpacity>
                        </View>
                        {extendWorkPace &&
                            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                <Text>{ doctor?.branch?.address}</Text>
                            </View>
                        }
                    </View>
                    {/* <View style={{ padding: 12, backgroundColor: colors.white, marginBottom: 100 }}>
                        <View style={{ flexDirection: 'row', justifyContent: "space-between", alignItems: 'center', paddingBottom: 20 }}>
                            <Text style={{ fontSize: 16, fontWeight: 600 }}>Kinh nghiệm</Text>
                            <TouchableOpacity onPress={() => setExtendWorkPace(!extendWorkPace)}>
                                {extendWorkPace ?
                                    <FontAwesome name="angle-up" size={24} color="#ccc" />
                                    :
                                    <FontAwesome name="angle-down" size={24} color="#ccc" />
                                }
                            </TouchableOpacity>
                        </View>
                        {extendWorkPace &&
                            <Text>Khám và điều trị bla bla</Text>
                        }
                    </View> */}
                </ScrollView>

            </View>
            <View style={{ position: 'absolute', bottom: 0, padding: 12, backgroundColor: "#fff", paddingBottom: isIos ? 40 : 15, borderTopWidth: .5, borderTopColor: "#e7ebed", flexDirection: 'row', gap: 10 }}>
                <TouchableOpacity onPress={() => navigation.navigate("Message")} style={{ backgroundColor: "#007bfc", padding: 15, borderRadius: 10, flex: 1 }}><Text style={{ color: "#fff", fontSize: 16, fontWeight: 600, textAlign: 'center' }}>Chat với bác sĩ</Text></TouchableOpacity>
                <TouchableOpacity onPress={() => {
                    navigation.navigate("makeAppointmentIndex")
                }} style={{ backgroundColor: "#006778", padding: 15, borderRadius: 10, flex: 1 }}><Text style={{ color: "#fff", fontSize: 16, fontWeight: 600, textAlign: 'center' }}>Đặt khám</Text></TouchableOpacity>
            </View>
            {showCalendar && isIos && <View style={{ height: "100%", width: "100%", backgroundColor: "#ddd", opacity: .5, position: "absolute" }}></View>}
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
                            value={date}
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
            <Loading visible={isLoading} />
            <Toast position="top" topOffset={70} visibilityTime={2000} />
        </GestureHandlerRootView>
    );
};

export default observer(DoctorIndex);