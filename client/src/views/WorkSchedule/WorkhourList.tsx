import { View, Text, Modal } from 'react-native'
import React, { useState } from 'react'
import { useStore } from '@/src/root-store'
import { TouchableOpacity } from 'react-native'
import Toast from 'react-native-toast-message'
import { getDate, getGenderFomat, getTime } from '@/src/constants/LocalFunction'
import { colors } from '@/src/constants/Colors'
import { Appointment } from '@/src/models/appointment'
import ModalComponent from '@/src/components/Modal'
import { style } from '@/src/styles'
import CommonButton from '@/src/components/CommonButton'

const WorkhourList = ({ title, type, navigation, style: WorkhourList }: any) => {
    const { workhourResult, workhours, } = useStore().apointment
    const { workhourDoctor, workhourExist, setWorkhourExist } = useStore().home
    const [opneModal, setOpenModal] = useState(false)
    return (
        <View style={{flexDirection: 'column', alignItems: 'center'}}>
            <Text style={{ marginTop: 5, marginBottom: 10, fontWeight: 500, fontSize: 16 }}>{title}</Text>
            <View style={{ flexDirection: "column", justifyContent: "space-around", flexWrap: "wrap", rowGap: 10, ...WorkhourList }}>
                {workhours?.map((i, index) => {
                    const checkTimeExist = workhourDoctor?.some(time => time.workhour._id === i._id)
                    let btninfo = {
                        borderColor: "#ccd3dd",
                        bgColor: "transparent"
                    }
                    let workhourExist: any
                    if (checkTimeExist) {
                        workhourExist = workhourDoctor?.find(j => j.workhour._id === i._id)
                        btninfo = {
                            borderColor: workhourExist?.status === 1 ? colors['green-200'] : workhourExist?.status === 2 ? colors.orange : workhourExist?.status === 3 ? colors.blue : colors.red,
                            bgColor: workhourExist?.status === 1 ? "#E0FBE2" : workhourExist?.status === 2 ? "#F3F6D0" : workhourExist?.status === 3 ? "rgba(222, 235, 246, .7)" : "#fbe9dd",
                        }
                    }
                    if (i.typeShiftWork === type)
                        return <TouchableOpacity
                            activeOpacity={1}
                            key={"workhour doctor" + i._id}
                            onPress={() => {
                                if (!checkTimeExist) {
                                    Toast.show({
                                        type: "success",
                                        text1: "Lịch trống!"
                                    })
                                    return
                                }
                                setWorkhourExist(workhourExist)
                                setOpenModal(true)

                            }}
                            style={{ padding: 9, paddingHorizontal: 11, borderRadius: 12, borderWidth: 1.5, borderColor: btninfo.borderColor, backgroundColor: btninfo.bgColor, }}
                        >
                            <Text style={{}}>
                                {getTime(i.startTime)} - {getTime(i.endTime)}
                            </Text>
                        </TouchableOpacity>
                    return
                })}
            </View>
            <ModalComponent
                open={opneModal}
                setOpen={setOpenModal}
                titleButton="Nhập bệnh án"
                // animationType={"fade"}
                onClickBtn={() => {
                    navigation.navigate('medicalResult')
                    setOpenModal(false)
                }}
                hideButton={workhourExist.status !== 1 ? true : false}
            >
                <View style={{ marginTop: 20 }}>
                    <View style={{ backgroundColor: colors.white, padding: 10, borderRadius: 8, flexDirection: 'column', gap: 8,  paddingVertical: 15 }}>
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
                    </View>
                </View>
            </ModalComponent>
        </View>
    )
}

export default WorkhourList