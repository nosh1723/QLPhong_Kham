import Backdrop from '@/src/components/Backdrop'
import CommonButton from '@/src/components/CommonButton'
import Header from '@/src/components/Header'
import ModalConfirm from '@/src/components/ModalConfirm'
import { colors } from '@/src/constants/Colors'
import { isIos, SCHEDULE_EXAM_STATUS } from '@/src/constants/LocalConst'
import { formatCurrency, getDate, getTime } from '@/src/constants/LocalFunction'
import { useStore } from '@/src/root-store'
import { style } from '@/src/styles'
import { Ionicons } from '@expo/vector-icons'
import BottomSheet, { BottomSheetView } from '@gorhom/bottom-sheet'
import { useFocusEffect } from '@react-navigation/native'
import { Image } from '@rneui/themed'
import { observer } from 'mobx-react'
import React, { useCallback, useEffect, useRef, useState } from 'react'
import { BackHandler, Modal, ScrollView, Text, TouchableOpacity, View } from 'react-native'
import DashedLine from 'react-native-dashed-line'
import { GestureHandlerRootView } from 'react-native-gesture-handler'

const ScheduleExamDetailIndex = ({ navigation }: any) => {
    const bottomSheetDetailInfoRef = useRef<BottomSheet>(null);

    const [status, setStatus] = useState<any>({})
    const [showModal, setShowModal] = useState(false)
    const [showDetailInfo, setShowDetailInfo] = useState(false);
    const [open, setOpen] = useState(false)

    const { selectAppointment, handleCancelAppointment, pagingAppointment } = useStore().apointment

    useEffect(() => {
        const res = SCHEDULE_EXAM_STATUS.find(i => i.status === selectAppointment?.appointment?.status)
        setStatus(res)
    }, [])

    useFocusEffect(() => {
        const onBackPress: any = () => {
            setOpen(true)
        };

        const subscription = BackHandler.addEventListener(
            'hardwareBackPress',
            onBackPress
        );

        return () => subscription.remove();
    })

    return (
        <GestureHandlerRootView>
            <Header handleBack={() => navigation.navigate("tabs")} textHeaderBack='Phiếu khám' />
            <View style={{ flex: 1 }}>
                <ScrollView showsVerticalScrollIndicator={false} style={{ flex: 1 }}>
                    <View style={{ paddingVertical: 16 }}>
                        {/* thông tin phiếu khám */}
                        <View style={{ marginBottom: 10 }}>
                            {/* <Text style={{ padding: 10, fontWeight: 500, fontSize: 16 }}>Thông tin phiếu khám</Text> */}

                            <View style={{ marginHorizontal: 12, flexDirection: 'column' }}>
                                <View>
                                    <View style={{ padding: 18, borderRadius: 10, flexDirection: 'row', backgroundColor: colors.white }}>
                                        <Text style={{ fontSize: 24, fontWeight: 500 }}>STT: </Text>
                                        <Text style={{ fontSize: 24, fontWeight: 900, color: colors['green-200'] }}>{selectAppointment?.appointment?.serialNumber}</Text>
                                    </View>
                                    <View style={{ marginHorizontal: 10, backgroundColor: colors.white }}><DashedLine dashLength={6} dashGap={4} dashThickness={1} dashColor={colors.gray} /></View>
                                </View>
                                <View style={{ backgroundColor: colors.white, padding: 14, borderRadius: 10, flexDirection: "column", gap: 10 }}>
                                    <View style={[style.row]}>
                                        <Text style={{ opacity: .7 }}>Mã phiếu khám</Text>
                                        <View style={style.row}>
                                            <Text style={{ fontWeight: 500, paddingRight: 4 }}>{selectAppointment?.appointment?.code}</Text>
                                            <TouchableOpacity ><Ionicons name="copy-outline" size={18} color={colors.black} style={{ opacity: .6 }} /></TouchableOpacity>
                                        </View>
                                    </View>
                                    <View style={[style.row]}>
                                        <Text style={{ opacity: .7 }}>Ngày khám</Text>
                                        <View style={style.row}>
                                            <Text style={{ fontWeight: 500, paddingRight: 4 }}>{getDate(selectAppointment?.appointment?.date)}</Text>
                                        </View>
                                    </View>
                                    <View style={[style.row]}>
                                        <Text style={{ opacity: .7 }}>Giờ khám</Text>
                                        <View style={style.row}>
                                            <Text style={{ fontWeight: 500, paddingRight: 4 }}>{getTime(selectAppointment?.appointment?.workhour?.startTime)} - {getTime(selectAppointment?.appointment?.workhour?.endTime)}</Text>
                                        </View>
                                    </View>
                                </View>
                            </View>
                        </View>

                        {/* thông tin bệnh nhân */}
                        <View>
                            <Text style={{ padding: 10, fontWeight: 500, fontSize: 16 }}>Thông tin bệnh nhân</Text>
                            <View style={{ marginHorizontal: 12, flexDirection: 'column' }}>
                                <View style={{ backgroundColor: colors.white, padding: 14, paddingVertical: 20, borderRadius: 10, flexDirection: "column", gap: 10 }}>
                                    <View style={[style.row]}>
                                        <Text style={{ opacity: .7 }}>Mã bệnh nhân</Text>
                                        <View style={style.row}>
                                            <Text style={{ fontWeight: 500, paddingRight: 4 }}>{selectAppointment?.appointment?.patient?.code}</Text>
                                            <TouchableOpacity ><Ionicons name="copy-outline" size={18} color={colors.black} style={{ opacity: .6 }} /></TouchableOpacity>
                                        </View>
                                    </View>
                                    <View style={[style.row]}>
                                        <Text style={{ opacity: .7 }}>Họ và tên</Text>
                                        <View style={style.row}>
                                            <Text style={{ fontWeight: 500, paddingRight: 4 }}>{selectAppointment?.appointment?.patient?.name}</Text>
                                        </View>
                                    </View>
                                    <View style={[style.row]}>
                                        <Text style={{ opacity: .7 }}>Số điện thoại</Text>
                                        <View style={style.row}>
                                            <Text style={{ fontWeight: 500, paddingRight: 4 }}>{selectAppointment?.appointment?.patient?.phone_number}</Text>
                                        </View>
                                    </View>
                                </View>
                                <View>
                                    <View style={{ marginHorizontal: 10, backgroundColor: colors.white }}><DashedLine dashLength={6} dashGap={4} dashThickness={1} dashColor={colors.gray} /></View>
                                    <TouchableOpacity onPress={() => {
                                        bottomSheetDetailInfoRef.current?.expand()
                                        setShowDetailInfo(true)
                                    }} style={{ padding: 12, borderRadius: 10, flexDirection: 'row', justifyContent: 'center', backgroundColor: colors.white }}>
                                        <Text style={{ color: colors.blue, fontWeight: 500 }}>Chi tiết </Text>
                                    </TouchableOpacity>

                                </View>
                            </View>
                        </View>

                        <View>
                            <Text style={{ padding: 10, fontWeight: 500, fontSize: 16 }}>Thông tin bác sĩ</Text>
                            <View style={{ marginHorizontal: 12, flexDirection: 'column' }}>
                                <View style={{ backgroundColor: colors.white, padding: 14, paddingVertical: 16, borderRadius: 10, flexDirection: "column", gap: 10 }}>
                                    <TouchableOpacity style={[style.row]}>
                                        <Text style={{ fontWeight: 500 }}>{selectAppointment.appointment.doctor.name}</Text>
                                        <View style={style.row}>
                                            <Image containerStyle={{ width: 50, height: 50, }} source={{ uri: "https://i.pinimg.com/736x/7d/9d/ed/7d9ded7751b328b1000bcfe4c1dc7727.jpg" }} />
                                        </View>
                                    </TouchableOpacity>

                                </View>
                                <View>
                                    <View style={{ marginHorizontal: 10, backgroundColor: colors.white }}><DashedLine dashLength={6} dashGap={4} dashThickness={1} dashColor={colors.gray} /></View>
                                    <View style={[{ padding: 12, borderRadius: 10, flexDirection: 'row', backgroundColor: colors.white, }, style.row]}>
                                        <Text style={{ opacity: .7 }}>Dịch vụ </Text>
                                        <Text style={{ fontWeight: 500 }}>{selectAppointment.appointment.service.name}</Text>
                                    </View>

                                </View>
                            </View>
                        </View>

                        <View>
                            <Text style={{ padding: 10, fontWeight: 500, fontSize: 16 }}>Thông tin thanh toán</Text>
                            <View style={{ marginHorizontal: 12, flexDirection: 'column' }}>
                                <View style={{ backgroundColor: colors.white, padding: 14, paddingVertical: 16, borderRadius: 10, flexDirection: "column", gap: 10 }}>
                                    {/* <View style={[style.row]}>
                                        <Text style={{ opacity: .7 }}>Mã thanh toán</Text>
                                        <View style={style.row}>
                                            <Text style={{ fontWeight: 500, paddingRight: 4 }}>bnabanbnab</Text>
                                            <TouchableOpacity ><Ionicons name="copy-outline" size={18} color={colors.black} style={{ opacity: .6 }} /></TouchableOpacity>
                                        </View>
                                    </View> */}
                                    <View style={[style.row]}>
                                        <Text style={{ opacity: .7 }}>Trạng thái</Text>
                                        <View style={style.row}>
                                            <Text style={{ fontWeight: 500, paddingRight: 4 }}>
                                                <Text style={{ color: status?.color }}>{status?.name}</Text>
                                            </Text>
                                        </View>
                                    </View>
                                    <View style={[style.row]}>
                                        <Text style={{ opacity: .7 }}>Phí khám</Text>
                                        <View style={style.row}>
                                            <Text style={{ fontWeight: 500, paddingRight: 4 }}>{formatCurrency(selectAppointment?.appointment?.service?.price)}</Text>
                                        </View>
                                    </View>
                                    <View style={[style.row]}>
                                        <Text style={{ opacity: .7 }}>Cổng thanh toán</Text>
                                        <View style={style.row}>
                                            <Text style={{ fontWeight: 500, paddingRight: 4 }}>Thanh toán tại nơi khám</Text>
                                        </View>
                                    </View>
                                </View>
                            </View>
                        </View>

                        {/* btn hủy */}
                        {selectAppointment.appointment.status === 1 &&
                            <TouchableOpacity onPress={() => {
                                setShowModal(true)
                            }} activeOpacity={1} style={{ borderWidth: .7, borderColor: colors.red, borderRadius: 12, padding: 10, marginHorizontal: 12, marginVertical: 16, flexDirection: 'row', justifyContent: 'center' }}>
                                <Text style={{ color: colors.red, fontWeight: 500 }}>Hủy lịch</Text>
                            </TouchableOpacity>
                        }
                    </View>
                </ScrollView>

            </View>


            {selectAppointment?.appointment?.status === 0 && <View style={{ padding: 10, borderTopWidth: .8, borderTopColor: colors.gray, backgroundColor: colors.white, paddingVertical: 15, paddingBottom: isIos ? 30 : 15 }}>
                <CommonButton onPress={() => {
                }} title="Đặt lịch khám khác" style={{ borderRadius: 8, }}></CommonButton>
            </View>}

            {showDetailInfo || showModal ? <Backdrop /> : <></>}

            <BottomSheet
                ref={bottomSheetDetailInfoRef}
                snapPoints={['55%']}
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
                                    {selectAppointment?.appointment?.patient?.code ? <Text style={{ fontWeight: 600, fontSize: 16 }}>{selectAppointment?.appointment?.patient?.code}</Text>
                                        : <Text style={{ fontSize: 16, color: colors.textGray }}>Chưa cập nhật</Text>
                                    }

                                </View>
                                <View style={{ flexDirection: 'row', justifyContent: "space-between" }}>
                                    <Text style={{ color: "#62718b", fontSize: 16 }}>Họ và tên</Text>
                                    {selectAppointment?.appointment?.patient?.name ? <Text style={{ fontWeight: 600, fontSize: 16 }}>{selectAppointment?.appointment?.patient?.name}</Text>
                                        : <Text style={{ fontSize: 16, color: colors.textGray }}>Chưa cập nhật</Text>
                                    }
                                </View>
                                <View style={{ flexDirection: 'row', justifyContent: "space-between" }}>
                                    <Text style={{ color: "#62718b", fontSize: 16 }}>Điện thoại</Text>
                                    {selectAppointment?.appointment?.patient?.phone_number ? <Text style={{ fontWeight: 600, fontSize: 16 }}>{selectAppointment?.appointment?.patient?.phone_number}</Text>
                                        : <Text style={{ fontSize: 16, color: colors.textGray }}>Chưa cập nhật</Text>
                                    }
                                </View>
                                <View style={{ flexDirection: 'row', justifyContent: "space-between" }}>
                                    <Text style={{ color: "#62718b", fontSize: 16 }}>Ngày sinh</Text>
                                    {selectAppointment?.appointment?.patient?.birth_date ? <Text style={{ fontWeight: 600, fontSize: 16 }}>{getDate(selectAppointment?.appointment?.patient?.birth_date)}</Text>
                                        : <Text style={{ fontSize: 16, color: colors.textGray }}>Chưa cập nhật</Text>
                                    }
                                </View>
                                <View style={{ flexDirection: 'row', justifyContent: "space-between" }}>
                                    <Text style={{ color: "#62718b", fontSize: 16 }}>Mã BHYT</Text>
                                    {selectAppointment?.appointment?.patient?.health_insurance_code ? <Text style={{ fontWeight: 600, fontSize: 16 }}>{selectAppointment?.appointment?.patient?.health_insurance_code}</Text>
                                        : <Text style={{ fontSize: 16, color: colors.textGray }}>Chưa cập nhật</Text>
                                    }
                                </View>
                                <View style={{ flexDirection: 'row', justifyContent: "space-between" }}>
                                    <Text style={{ color: "#62718b", fontSize: 16 }}>Địa chỉ</Text>
                                    {selectAppointment?.appointment?.patient?.address ? <Text style={{ fontWeight: 600, fontSize: 16 }}>{selectAppointment?.appointment?.patient?.address}</Text>
                                        : <Text style={{ fontSize: 16, color: colors.textGray }}>Chưa cập nhật</Text>
                                    }
                                </View>
                                <View style={{ flexDirection: 'row', justifyContent: "space-between" }}>
                                    <Text style={{ color: "#62718b", fontSize: 16 }}>Dân tộc</Text>
                                    {selectAppointment?.appointment?.patient?.ethnic ? <Text style={{ fontWeight: 600, fontSize: 16 }}>{selectAppointment?.appointment?.patient?.ethnic}</Text>
                                        : <Text style={{ fontSize: 16, color: colors.textGray }}>Chưa cập nhật</Text>
                                    }
                                </View>
                                <View style={{ flexDirection: 'row', justifyContent: "space-between" }}>
                                    <Text style={{ color: "#62718b", fontSize: 16 }}>Email</Text>
                                    {selectAppointment?.appointment?.patient?.email ? <Text style={{ fontWeight: 600, fontSize: 16 }}>{selectAppointment?.appointment?.patient?.email}</Text>
                                        : <Text style={{ fontSize: 16, color: colors.textGray }}>Chưa cập nhật</Text>
                                    }
                                </View>
                            </View>
                        </ScrollView>
                    </View>


                </BottomSheetView>
            </BottomSheet>

            <Modal
                animationType='slide'
                transparent={true}
                visible={showModal}
            >
                <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', marginTop: -30 }}>
                    <View style={{
                        backgroundColor: colors.white,
                        shadowColor: "#000000",
                        shadowOffset: {
                            width: 0,
                            height: 2,
                        },
                        shadowOpacity: 0.17,
                        shadowRadius: 2.54,
                        elevation: 3,
                        borderRadius: 8
                    }}>
                        <View style={{ padding: 12, paddingHorizontal: 20 }}>
                            <Text style={{ fontSize: 18, fontWeight: 500 }}>Bạn có chắc muốn hủy lịch </Text>
                        </View>
                        <View style={{ borderTopWidth: .8, borderColor: colors.gray, padding: 10, flexDirection: 'row', gap: 10, }}>
                            <TouchableOpacity activeOpacity={1} onPress={() => setShowModal(false)} style={{ borderWidth: 1, borderColor: colors.gray, padding: 10, borderRadius: 8, flexDirection: 'row', justifyContent: 'center', flex: 1 }}>
                                <Text style={{ color: colors.black, fontWeight: 500 }}>Đóng</Text>
                            </TouchableOpacity>
                            <TouchableOpacity onPress={() => {
                                handleCancelAppointment(selectAppointment?.appointment?._id)
                                navigation.goBack()
                            }} activeOpacity={1} style={{ backgroundColor: colors.blue, padding: 10, borderRadius: 8, flexDirection: 'row', justifyContent: 'center', flex: 1 }}>
                                <Text style={{ color: colors.white, fontWeight: 500 }}>Xác nhận hủy</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            </Modal>

            <ModalConfirm 
                open={open}
                onClose={setOpen}
            />
        </GestureHandlerRootView>
    )
}

export default observer(ScheduleExamDetailIndex) 