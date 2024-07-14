import ModalComponent from '@/src/components/Modal'
import { colors } from '@/src/constants/Colors'
import { getDate, getGenderFomat, getTime } from '@/src/constants/LocalFunction'
import { useStore } from '@/src/root-store'
import { style } from '@/src/styles'
import { FontAwesome } from '@expo/vector-icons'
import { observer } from 'mobx-react'
import React, { useState } from 'react'
import { Text, TouchableOpacity, View } from 'react-native'
import Toast from 'react-native-toast-message'

const WorkhourList = ({ title, type, navigation, style: WorkhourList }: any) => {
    const { workhourResult, workhours, } = useStore().apointment
    const { workhourDoctor, workhourExist, resetWorkhourExist, setWorkhourExist } = useStore().home
    const { getMedicalRecord, selectMedicalRecord, hasDisable, setSelectMedicalRecord } = useStore().medicalResultStore
    const [opneModal, setOpenModal] = useState(false)

    return (
        <View style={{ flexDirection: 'column', alignItems: 'center' }}>
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

                                //lấy dữ liệu kq khám
                                if (workhourExist?.status === 3) {
                                    const id = workhourExist?._id
                                    getMedicalRecord(id)
                                }else {
                                    setSelectMedicalRecord()
                                }
                                

                                //set dữ liệu kq khám
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
                titleButton={workhourExist?.status === 3 ? "Sửa bệnh án" : "Nhập bệnh án"}
                // animationType={"fade"}
                onClickBtn={() => {
                    navigation.navigate('medicalResult')
                    setOpenModal(false)
                }}
                hideButton={workhourExist.status !== 1 && workhourExist.status !== 3 ? true : false}
            >
                <View style={{ marginTop: 20 }}>
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

                    {
                        workhourExist?.status === 3 &&
                        <>
                            <Text style={{ marginTop: 20, marginBottom: 8 }}>Thông tin kết quả khám</Text>
                            <View style={{ backgroundColor: colors.white, padding: 10, borderRadius: 8, flexDirection: 'column', gap: 12, paddingVertical: 15 }}>
                                <View style={[{}]}>
                                    <Text>Kết quả khám </Text>
                                    <View style={{ marginTop: 3, paddingHorizontal: 10, gap: 8, backgroundColor: "#f0f5fa", borderRadius: 8, paddingVertical: 5 }}>
                                        {selectMedicalRecord?.results?.map(i => {
                                            return <View key={"kết quả khám" + i._id} style={{ flexDirection: 'row', alignItems: 'center', justifyContent: "space-between" }}>
                                                <View style={{ flexDirection: 'row', alignItems: 'center', gap: 5 }}>
                                                    <FontAwesome name='circle' color={colors.textGray} size={8} />
                                                    <Text style={{ color: "rgba(0, 0, 0, .8)" }}>{i.description}</Text>
                                                </View>
                                            </View>
                                        })}
                                    </View>
                                </View>
                                {selectMedicalRecord?.reExamination &&
                                    <View style={[style.row, {}]}>
                                        <Text>Hẹn tái khám</Text>
                                        <Text style={{ fontWeight: 500 }}>{getDate(selectMedicalRecord?.dateReExam)}</Text>
                                    </View>
                                }

                            </View>
                        </>
                    }
                </View>
            </ModalComponent>
        </View>
    )
}

export default observer( WorkhourList)