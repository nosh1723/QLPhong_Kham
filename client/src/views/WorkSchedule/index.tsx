import Backdrop from '@/src/components/Backdrop'
import CommonButton from '@/src/components/CommonButton'
import Header from '@/src/components/Header'
import { colors } from '@/src/constants/Colors'
import { isIos } from '@/src/constants/LocalConst'
import { getDateFormat } from '@/src/constants/LocalFunction'
import { useStore } from '@/src/root-store'
import { FontAwesome } from '@expo/vector-icons'
import BottomSheet, { BottomSheetView } from '@gorhom/bottom-sheet'
import DateTimePicker from '@react-native-community/datetimepicker'
import { observer } from 'mobx-react'
import React, { useEffect, useRef, useState } from 'react'
import { ScrollView, Text, TouchableOpacity, View } from 'react-native'
import { GestureHandlerRootView } from 'react-native-gesture-handler'
import Toast from 'react-native-toast-message'
import WorkhourList from './WorkhourList'
import Loading from '@/src/components/Loading'

const WorkScheduleIndex = ({ navigation }: any) => {

    const bottomSheetCalendarRef = useRef<BottomSheet>(null);

    const { getWorkhourDoctor, isLoading } = useStore().home

    const [date, setDate] = useState(new Date());
    const [showCalendar, setShowCalendar] = useState(false);
    const [selectedDate, setSelectedDate] = useState(new Date());

    useEffect(() => {
        getWorkhourDoctor(new Date())
    }, [])

    const onChange = (event: any, selectedDate: any) => {
        if (!isIos) {
            const currentDate = selectedDate;
            setShowCalendar(false);
            setDate(currentDate);
            getWorkhourDoctor(currentDate)
            return
        }

        setSelectedDate(selectedDate)

    };
    const handleComfirmCalendar = () => {
        const currentDate = selectedDate;
        setShowCalendar(false);
        setDate(currentDate);
        getWorkhourDoctor(currentDate)
        bottomSheetCalendarRef.current?.close()
    }
    return (
        <>
            <GestureHandlerRootView >
                <Loading visible={isLoading}/>
                <Header textHeaderBack='Lịch làm việc' />
                <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-around', paddingVertical: 8, backgroundColor: colors.white }}>
                    <View style={{ flexDirection: 'row', alignItems: 'center', gap: 3, borderRadius: 12, padding: 3, paddingHorizontal: 6, backgroundColor: "#E0FBE2" }}>
                        <FontAwesome name='circle' color={colors['green-200']} size={10} />
                        <Text style={{ color: colors['green-200'], fontSize: 12 }}>Đã đặt lịch</Text>
                    </View>
                    <View style={{ flexDirection: 'row', alignItems: 'center', gap: 3, borderRadius: 12, padding: 3, paddingHorizontal: 6, backgroundColor: "rgba(222, 235, 246, .7)" }}>
                        <FontAwesome name='circle' color={colors.blue} size={10} />
                        <Text style={{ color: colors.blue, fontSize: 12 }}>Đã hoàn thành</Text>
                    </View>
                    <View style={{ flexDirection: 'row', alignItems: 'center', gap: 3, borderRadius: 12, padding: 3, paddingHorizontal: 6, backgroundColor: "#fbe9dd" }}>
                        <FontAwesome name='circle' color={colors.red} size={10} />
                        <Text style={{ color: colors.red, fontSize: 12 }}>Lịch bị hủy</Text>
                    </View>
                    <View style={{ flexDirection: 'row', alignItems: 'center', gap: 3, borderRadius: 12, padding: 3, paddingHorizontal: 6, backgroundColor: "#F3F6D0" }}>
                        <FontAwesome name='circle' color={colors.orange} size={10} />
                        <Text style={{ color: colors.orange, fontSize: 12 }}>Lịch hết hạn</Text>
                    </View>
                </View>
                <ScrollView style={{ paddingHorizontal: 15, paddingVertical: 15 }}>
                    <View style={{ backgroundColor: "#fff", borderRadius: 15, padding: 10, paddingVertical: 15 }}>
                        <Text style={{ fontWeight: '500', fontSize: 16, marginBottom: 10 }}>Chọn ngày</Text>
                        <CommonButton onPress={() => {
                            showCalendar ? bottomSheetCalendarRef.current?.close() : bottomSheetCalendarRef.current?.expand()
                            setShowCalendar(!showCalendar)
                        }} style={{ borderWidth: 1, borderColor: "#e7ebed", borderRadius: 8, marginBottom: 10 }} color='#transparent'>
                            <View style={{ flexDirection: 'row', alignItems: "center" }}>
                                <Text style={{ fontWeight: 600 }}>{getDateFormat(date)} </Text>
                                <FontAwesome name="angle-down" size={20} color="black" style={{ paddingLeft: 3, marginTop: -3 }} />
                            </View>
                        </CommonButton>

                        <View style={{ flexDirection: 'row', justifyContent: 'space-around', marginVertical: 10 }}>
                            <WorkhourList navigation={navigation} title='Buổi sáng' type={1} style={{ marginBottom: 15 }} />
                            <WorkhourList navigation={navigation} title='Buổi chiều' type={2} />
                        </View>


                    </View>
                </ScrollView>

                {(showCalendar && isIos) ? <Backdrop /> : <></>}

                {!isIos && showCalendar &&
                    <DateTimePicker
                        testID="dateTimePicker"
                        value={date}
                        mode={'date'}
                        is24Hour={true}
                        onChange={onChange}
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
                                value={date}
                                mode={'date'}
                                is24Hour={true}
                                onChange={onChange}
                                display='spinner'
                                style={{ height: 150 }}
                                locale='vi-VN'
                            />
                            <View style={{ flexDirection: 'row', padding: 10, gap: 10, marginTop: 10, position: "absolute", bottom: 30, borderTopWidth: .8, borderColor: colors.gray }}>
                                <TouchableOpacity style={{ backgroundColor: "#e6e6e6", padding: 15, borderRadius: 10, flex: 1 }} onPress={() => { setShowCalendar(false); bottomSheetCalendarRef.current?.close() }}><Text style={{ color: "#000", fontSize: 16, fontWeight: 600, textAlign: 'center' }}>Cancel</Text></TouchableOpacity>
                                <TouchableOpacity style={{ backgroundColor: "#006778", padding: 15, borderRadius: 10, flex: 1 }} onPress={handleComfirmCalendar}><Text style={{ color: "#fff", fontSize: 16, fontWeight: 600, textAlign: 'center' }}>Comfirm</Text></TouchableOpacity>
                            </View>

                        </BottomSheetView>
                    </BottomSheet>
                }
                <Toast position="top" topOffset={50} visibilityTime={2000} />
            </GestureHandlerRootView>
        </>
    )
}

export default observer(WorkScheduleIndex)