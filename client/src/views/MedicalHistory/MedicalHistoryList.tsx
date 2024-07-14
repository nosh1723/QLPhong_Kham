import { View, Text, ScrollView, Touchable, TouchableOpacity } from 'react-native'
import React, { useEffect, useState } from 'react'
import { colors } from '@/src/constants/Colors'
import { style } from '@/src/styles'
import { FontAwesome, FontAwesome6, Foundation, MaterialIcons } from '@expo/vector-icons'
import MedicalHistoryPopup from './MedicalHistoryPopup'
import { useStore } from '@/src/root-store'
import { observer } from 'mobx-react'
import { getDate, getTime } from '@/src/constants/LocalFunction'

const MedicalHistoryList = ({navigation}: any) => {
    const [open, setOpen] = useState(false)
    const {getAllMedicalReport, listMedicalReport, getMedicalRecord} = useStore().medicalResultStore

    useEffect(() => {
        getAllMedicalReport()
    }, [])
    
    return (
        <>
            {listMedicalReport?.length === 0 ?
                <View style={{ width: '100%', flex: 1, flexDirection: "row", alignItems: 'center', justifyContent: 'center' }}>
                    <Text style={{ fontSize: 20, color: "#9eabb9" }}>Bạn chưa có kết quả khám nào!</Text>
                </View>
                :
                <ScrollView style={{ padding: 12 }}>
                    <View style={{flexDirection: 'column', gap: 10}}>
                        {listMedicalReport?.map((i:any, index: number) => {
                            return <TouchableOpacity key={'lịch sử khám' + i._id + index} onPress={() => {
                                const id = i.appointment._id
                                getMedicalRecord(id)
                                setOpen(true)
                            }} style={{ backgroundColor: colors.white, padding: 10, borderRadius: 8, flexDirection: 'column', gap: 7,  }}>
                            <View style={{ backgroundColor: 1 === 1 ? "#E0FBE2" : "#fbe9dd", paddingVertical: 5, paddingHorizontal: 10, borderRadius: 100, flexDirection: 'row', alignItems: 'center', gap: 5, maxWidth: 130, justifyContent: 'center', marginBottom: 5 }}>
                                <FontAwesome name='circle' color={1 === 1 ? "#40A578" : colors.red} />
                                <Text style={{ color: "#40A578", fontWeight: 500, }}>{1 === 1 ? <Text style={{ color: colors['green-200'] }}>Đã hoàn thành</Text> : <Text style={{ color: colors.red }}>Hẹn tái khám</Text>}</Text>
                            </View>
                            <View style={style.row}>
                                <View style={{ flexDirection: 'row', gap: 5, alignItems: 'center' }}>
                                    <FontAwesome6 name="user-doctor" size={16} color={colors.green} />
                                    <Text style={{ fontSize: 16 }}>Bác sĩ</Text>
                                </View>
                                <Text style={{ opacity: .7, fontWeight: 500 }}>{i?.appointment?.doctor?.name}</Text>
                            </View>
                            <View style={style.row}>
                                <View style={{ flexDirection: 'row', gap: 4, alignItems: 'center' }}>
                                    <MaterialIcons name="home-repair-service" size={16} color={colors.green} style={{marginLeft: -1}} />
                                    <Text style={{ fontSize: 16 }}>Dịch vụ</Text>
                                </View>
                                <Text style={{ opacity: .7, fontWeight: 500 }}>{i?.appointment?.service?.name}</Text>
                            </View>
                            <View style={style.row}>
                                <View style={{ flexDirection: 'row', gap: 5, alignItems: 'center' }}>
                                    <Foundation name="clock" size={18} color={colors.green} />
                                    <Text style={{ fontSize: 16 }}>Thời gian</Text>
                                </View>
    
                                <Text style={{ opacity: .7, fontWeight: 500 }}>{getTime(i?.appointment?.workhour?.startTime) + " " + getDate(i?.appointment?.date)}</Text>
                            </View>
                        </TouchableOpacity>
                        })}
                    </View>
                    
                </ScrollView>
            }
            <MedicalHistoryPopup open={open} setOpen={setOpen} />
        </>
    )
}

export default observer(MedicalHistoryList) 