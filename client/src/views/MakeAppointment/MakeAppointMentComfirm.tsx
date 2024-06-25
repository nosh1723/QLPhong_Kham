import { View, Text, TouchableOpacity } from 'react-native'
import React, { useState } from 'react'
import Header from '@/src/components/Header'
import { Entypo, FontAwesome, MaterialCommunityIcons } from '@expo/vector-icons'
import { colors } from '@/src/constants/Colors'
import { ScrollView } from 'react-native'
import CommonButton from '@/src/components/CommonButton'
import { useNavigation } from '@react-navigation/native'
import { isIos } from '@/src/constants/LocalConst'
import { Image } from '@rneui/themed'
import { useStore } from '@/src/root-store'
import { observer } from 'mobx-react'
import { useFormikContext } from 'formik'
import { formatCurrency, getDate, getGenderFomat, getTime } from '@/src/constants/LocalFunction'
import Loading from '@/src/components/Loading'
import Toast from 'react-native-toast-message'

const MakeAppointMentComfirm = () => {
    const navigation = useNavigation()
    const { setSubmitting, submitForm, values } = useFormikContext()
    
    const [extend, setExtend] = useState(true)
    
    const { doctor } = useStore().home
    const { patient } = useStore().user
    const { handleBookAppointment, isLoading, getAppointment, resetStore, setNext } = useStore().apointment
    
    return (
        <>

            <ScrollView showsVerticalScrollIndicator={false} style={{ flex: 1, backgroundColor: "#f0f5fa" }}>
                <View style={{ flexGrow: 1, paddingHorizontal: 10 }}>
                    <Text style={{ fontSize: 18, padding: 10 }}>Thông tin đăng ký</Text>
                    <View style={{ backgroundColor: '#fff', borderRadius: 20, }}>
                        <View style={{ flexDirection: "row", alignItems: "center", padding: 12, paddingVertical: 15, borderBottomWidth: .8, borderColor: colors.gray }}>
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
                        <View style={{ flexDirection: "column", padding: 12, paddingVertical: 20, gap: 15 }}>
                            <View style={{ flex: 1, flexDirection: 'row', gap: 20 }}>
                                <View style={{flex: 1}}>
                                    <Text style={{ paddingBottom: 8, fontSize: 16 }}>Giờ khám</Text>
                                    <Text style={{ fontSize: 18, fontWeight: 500 }}>{getTime(values.appointmentTime.startTime)}-{getTime(values.appointmentTime.endTime)}</Text>
                                    <Text style={{ color: colors.orange }}>Buổi chiều</Text>
                                </View>
                                <View style={{flex: 1}}>
                                    <Text style={{ paddingBottom: 8, fontSize: 16 }}>Ngày khám</Text>
                                    <Text style={{ fontSize: 18, fontWeight: 500 }}>{getDate(values.date)}</Text>
                                </View>
                            </View>
                            <View style={{ flex: 1, flexDirection: 'row', gap: 20 }}>
                                <View style={{flex: 1}}>
                                    <Text style={{ paddingBottom: 8, fontSize: 16 }}>Dịch vụ</Text>
                                    <Text style={{ fontSize: 18, fontWeight: 500 }}>{values.service.name}</Text>
                                </View>
                                <View style={{flex: 1}}>
                                    <Text style={{ paddingBottom: 8, fontSize: 16 }}>Phí dịch vụ</Text>
                                    <Text style={{ fontSize: 18, fontWeight: 500 }}>{formatCurrency(values.service.price)}</Text>
                                </View>
                            </View>
                           
                        </View>
                        <View style={{ flexDirection: "column", padding: 12, }}>
                            <View style={{ flexGrow: 1, flexDirection: "row", justifyContent: "space-between", paddingHorizontal: 5, }}>
                                <Text style={{ fontSize: 16, opacity: .7 }}>Thông tin bệnh nhân</Text>
                                <View style={{ flexGrow: 1, flexDirection: 'column', justifyContent: 'center' }}><View style={{ marginHorizontal: 20, height: .8, backgroundColor: colors.gray }}></View></View>
                                <TouchableOpacity onPress={() => setExtend(!extend)} style={{ flexDirection: 'row', justifyContent: 'center' }}>
                                    {extend ?
                                        <FontAwesome name="angle-up" size={24} color={colors.textGray} />
                                        :
                                        <FontAwesome name="angle-down" size={24} color={colors.textGray} />
                                    }
                                </TouchableOpacity>
                            </View>
                            <View style={{ flexGrow: 1, flexDirection: 'column', gap: 15, paddingVertical: extend ? 10 : 0, height: extend ? 'auto' : 0, overflow: "hidden" }}>
                                <View>
                                    <Text style={{ paddingBottom: 8, fontSize: 16 }}>Họ và tên</Text>
                                    <Text style={{ fontSize: 18, fontWeight: 500 }}>{patient?.name ? patient?.name :  "--"}</Text>
                                </View>
                                <View style={{ flexDirection: 'row', flexGrow: 1 }}>
                                    <View style={{ flex: 1 }}>
                                        <Text style={{ paddingBottom: 8, fontSize: 16 }}>Giới tính</Text>
                                        <Text style={{ fontSize: 18, fontWeight: 500 }}>{patient?.gender ? getGenderFomat(patient?.gender)  :  "--"}</Text>
                                    </View>
                                    <View style={{ flex: 1 }}>
                                        <Text style={{ paddingBottom: 8, fontSize: 16 }}>Ngày sinh</Text>
                                        <Text style={{ fontSize: 18, fontWeight: 500 }}>{patient?.birth_date ? getDate(patient?.birth_date)  :  "--"}</Text>
                                    </View>
                                </View>
                                <View style={{ flexDirection: 'row', flexGrow: 1 }}>
                                    <View style={{ flex: 1 }}>
                                        <Text style={{ paddingBottom: 8, fontSize: 16 }}>Điện thoại liên hệ</Text>
                                        <Text style={{ fontSize: 18, fontWeight: 500 }}>{patient?.phone_number ? patient?.phone_number :  "--"}</Text>
                                    </View>
                                    <View style={{ flex: 1 }}>
                                        <Text style={{ paddingBottom: 8, fontSize: 16 }}>Mã bảo hiểm y tế</Text>
                                        <Text style={{ fontSize: 18, fontWeight: 500 }}>{patient?.health_insurance_code ? patient?.health_insurance_code :  "--"}</Text>
                                    </View>
                                </View>
                                <View>
                                    <Text style={{ paddingBottom: 8, fontSize: 16 }}>Địa chỉ</Text>
                                    <Text style={{ fontSize: 18, fontWeight: 500 }}>{patient?.address ? patient?.address :  "--"}</Text>
                                </View>
                            </View>
                        </View>
                    </View>
                </View>
            </ScrollView>

            <View style={{ padding: 10, borderTopWidth: .8, borderTopColor: colors.gray, backgroundColor: colors.white, paddingVertical: 15, paddingBottom: isIos ? 30 : 15 }}>
                <CommonButton onPress={() => {
                    handleBookAppointment(values).then(data => {
                        getAppointment(data.appointment._id).then(() => {
                            resetStore()
                            setNext(0)
                            if(data.status === 1) navigation.navigate("makeAppointmentDetail")
                        })
                    })
                }} title="Xác nhận đặt lịch" style={{ borderRadius: 8, }}></CommonButton>
            </View>
            <Loading visible={isLoading}/>
        </>
    )
}

export default observer(MakeAppointMentComfirm) 