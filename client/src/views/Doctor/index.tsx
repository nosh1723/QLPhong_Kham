import ViewComponent from '@/src/components/ViewComponent';
import { Button, Image } from '@rneui/themed';
import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { Platform, ScrollView, Text, TouchableOpacity } from 'react-native';
import { View } from 'react-native';
import { FontAwesome, MaterialCommunityIcons } from '@expo/vector-icons';
import CommonButton from '@/src/components/CommonButton';
import DateTimePicker from '@react-native-community/datetimepicker';
import { getDateFormat, getDateTimeFormat } from '@/src/constants/LocalFunction';
import { Entypo } from '@expo/vector-icons';
import BottomSheet, { BottomSheetView } from '@gorhom/bottom-sheet';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { useStore } from '@/src/root-store';
import { useNavigation } from '@react-navigation/native';
import Header from '@/src/components/Header';
import { useSelector } from 'react-redux';
import { authSelector } from '@/src/redux/reducers/authReducer';

const DoctorIndex = () => {
    const auth = useSelector(authSelector)
    const navigation = useNavigation()
    const [date, setDate] = useState(new Date());
    const [mode, setMode] = useState('date');
    const [show, setShow] = useState(false);
    const [extendIntroduce, setExtendIntroduce] = useState(true)
    const [extendWorkPace, setExtendWorkPace] = useState(true)
    const isIos = Platform.OS === "ios"

    const { doctor } = useStore().home
    const { getPatient } = useStore().user

    useEffect(() => {
        getPatient(auth?.user?.email)
    }, [])


    const onChange = (event: any, selectedDate: any) => {
        if (!isIos) {
            const currentDate = selectedDate;
            setShow(false);
            setDate(currentDate);
        }
    };
    // ref
    const bottomSheetRef = useRef<BottomSheet>(null);

    // callbacks
    const handleSheetChanges = useCallback((index: number) => {
        console.log('handleSheetChanges', index);
    }, []);

    const bg = "#fff"


    return (
        <GestureHandlerRootView >
            <Header textHeaderBack='Bác sĩ' />
            <View style={{ flex: 1 }}>
                <ScrollView showsVerticalScrollIndicator={false} style={{ flex: 1 }}>
                    <View style={{ flexDirection: "row", padding: 12, backgroundColor: bg, marginBottom: 5, alignItems: 'center' }}>
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
                    <View style={{ backgroundColor: bg, padding: 12, marginBottom: 5 }}>
                        <Text style={{ fontWeight: 600, padding: 10, textAlign: 'center', fontSize: 18 }}>Lịch khám</Text>
                        <CommonButton onPress={() => {
                            show ? bottomSheetRef.current?.close() : bottomSheetRef.current?.expand()
                            setShow(!show)
                        }} style={{ borderWidth: 1, borderColor: "#e7ebed", borderRadius: 8 }} color='transparent'>
                            <View style={{ flexDirection: 'row', alignItems: "center" }}>
                                <Text style={{ fontWeight: 600 }}>{getDateFormat(date)} </Text>
                                <FontAwesome name="angle-down" size={20} color="black" style={{ paddingLeft: 3, marginTop: -3 }} />
                            </View>
                        </CommonButton>
                        {!isIos && show && <DateTimePicker
                            testID="dateTimePicker"
                            value={date}
                            mode={"date"}
                            is24Hour={true}
                            onChange={onChange}
                            display='spinner'
                            style={{ height: 120 }}
                        />}
                        <Text style={{ marginTop: 15, marginBottom: 10, fontWeight: 600, fontSize: 16 }}>Buổi chiều</Text>
                        <ScrollView showsHorizontalScrollIndicator={false} horizontal>
                            <CommonButton style={{ borderWidth: 1, borderColor: "#ccc", borderRadius: 8, marginRight: 10 }} color='transparent'>
                                <Text style={{}}>17:00-17:05</Text>
                            </CommonButton>
                            <CommonButton style={{ borderWidth: 1, borderColor: "#ccc", borderRadius: 8, marginRight: 10 }} color='transparent'>
                                <Text style={{}}>17:00-17:05</Text>
                            </CommonButton>
                            <CommonButton style={{ borderWidth: 1, borderColor: "#ccc", borderRadius: 8, marginRight: 10 }} color='transparent'>
                                <Text style={{}}>17:00-17:05</Text>
                            </CommonButton>
                        </ScrollView>
                        <View style={{ flexDirection: "row", marginTop: 10, alignItems: 'center', marginBottom: 10 }}>
                            <MaterialCommunityIcons name="hand-pointing-up" size={20} color="#485565" />
                            <Text style={{ color: "#485565" }}>Chọn một khung giờ để đặt</Text>
                        </View>
                    </View>
                    <View style={{ padding: 12, backgroundColor: bg, marginBottom: 5 }}>
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
                    <View style={{ padding: 12, backgroundColor: bg, marginBottom: 5 }}>
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
                                <Entypo name="dot-single" size={24} color="#ccc" />
                                <Text>Khám và điều trị bla bla</Text>
                            </View>
                        }
                    </View>
                    <View style={{ padding: 12, backgroundColor: bg, marginBottom: 100 }}>
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
                    </View>
                </ScrollView>

            </View>
            <View style={{ position: 'absolute', bottom: 0, padding: 12, backgroundColor: "#fff", paddingBottom: isIos ? 40 : 15, borderTopWidth: .5, borderTopColor: "#e7ebed", flexDirection: 'row', gap: 10 }}>
                <TouchableOpacity onPress={() => navigation.navigate("(tabs)/message")} style={{ backgroundColor: "#007bfc", padding: 15, borderRadius: 10, flex: 1 }}><Text style={{ color: "#fff", fontSize: 16, fontWeight: 600, textAlign: 'center' }}>Chat với bác sĩ</Text></TouchableOpacity>
                <TouchableOpacity onPress={() => {
                    navigation.navigate("makeAppointmentIndex")
                }} style={{ backgroundColor: "#006778", padding: 15, borderRadius: 10, flex: 1 }}><Text style={{ color: "#fff", fontSize: 16, fontWeight: 600, textAlign: 'center' }}>Đặt khám</Text></TouchableOpacity>
            </View>
            {show && isIos && <View style={{ height: "100%", width: "100%", backgroundColor: "#ddd", opacity: .5, position: "absolute" }}></View>}
            {isIos &&
                <BottomSheet
                    ref={bottomSheetRef}
                    onChange={handleSheetChanges}
                    snapPoints={['35%']}
                    enablePanDownToClose
                    index={-1}
                    onClose={() => { setShow(false) }}
                >
                    <BottomSheetView >
                        <DateTimePicker
                            testID="dateTimePicker"
                            value={date}
                            mode={"date"}
                            is24Hour={true}
                            onChange={onChange}
                            display='spinner'
                            style={{ height: 120 }}
                        />
                        <View style={{ flexDirection: 'row', padding: 10, gap: 10, marginTop: 10 }}>
                            <TouchableOpacity style={{ backgroundColor: "#e6e6e6", padding: 15, borderRadius: 10, flex: 1 }} onPress={() => setShow(false)}><Text style={{ color: "#000", fontSize: 16, fontWeight: 600, textAlign: 'center' }}>Cancel</Text></TouchableOpacity>
                            <TouchableOpacity style={{ backgroundColor: "#006778", padding: 15, borderRadius: 10, flex: 1 }} onPress={() => console.log(new Date(3373616131000).getDate())}><Text style={{ color: "#fff", fontSize: 16, fontWeight: 600, textAlign: 'center' }}>Comfirm</Text></TouchableOpacity>
                        </View>

                    </BottomSheetView>
                </BottomSheet>
            }
        </GestureHandlerRootView>
    );
};

export default DoctorIndex;