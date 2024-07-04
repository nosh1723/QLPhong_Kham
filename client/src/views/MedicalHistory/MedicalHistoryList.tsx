import { View, Text, ScrollView, Touchable, TouchableOpacity } from 'react-native'
import React, { useState } from 'react'
import { colors } from '@/src/constants/Colors'
import { style } from '@/src/styles'
import { FontAwesome, FontAwesome6, Foundation, MaterialIcons } from '@expo/vector-icons'
import MedicalHistoryPopup from './MedicalHistoryPopup'

const MedicalHistoryList = ({navigation}: any) => {
    const [open, setOpen] = useState(false)
    return (
        <>
            {[1]?.length === 0 ?
                <View style={{ width: '100%', flex: 1, flexDirection: "row", alignItems: 'center', justifyContent: 'center' }}>
                    <Text style={{ fontSize: 20, color: "#9eabb9" }}>Bạn chưa có kết quả khám nào!</Text>
                </View>
                :
                <ScrollView style={{ padding: 12 }}>
                    <TouchableOpacity onPress={() => setOpen(true)} style={{ backgroundColor: colors.white, padding: 10, borderRadius: 8, flexDirection: 'column', gap: 7 }}>
                        <View style={{ backgroundColor: 1 === 1 ? "#E0FBE2" : "#fbe9dd", paddingVertical: 5, paddingHorizontal: 10, borderRadius: 100, flexDirection: 'row', alignItems: 'center', gap: 5, maxWidth: 130, justifyContent: 'center', marginBottom: 5 }}>
                            <FontAwesome name='circle' color={1 === 1 ? "#40A578" : colors.red} />
                            <Text style={{ color: "#40A578", fontWeight: 500, }}>{1 === 1 ? <Text style={{ color: colors['green-200'] }}>Đã hoàn thành</Text> : <Text style={{ color: colors.red }}>Hẹn tái khám</Text>}</Text>
                        </View>
                        <View style={style.row}>
                            <View style={{ flexDirection: 'row', gap: 5, alignItems: 'center' }}>
                                <FontAwesome6 name="user-doctor" size={16} color={colors.green} />
                                <Text style={{ fontSize: 16 }}>Bác sĩ</Text>
                            </View>
                            <Text style={{ opacity: .7, fontWeight: 500 }}>He hehehe</Text>
                        </View>
                        <View style={style.row}>
                            <View style={{ flexDirection: 'row', gap: 4, alignItems: 'center' }}>
                                <MaterialIcons name="home-repair-service" size={16} color={colors.green} style={{marginLeft: -1}} />
                                <Text style={{ fontSize: 16 }}>Dịch vụ</Text>
                            </View>
                            <Text style={{ opacity: .7, fontWeight: 500 }}>He hehehe</Text>
                        </View>
                        <View style={style.row}>
                            <View style={{ flexDirection: 'row', gap: 5, alignItems: 'center' }}>
                                <Foundation name="clock" size={18} color={colors.green} />
                                <Text style={{ fontSize: 16 }}>Thời gian</Text>
                            </View>

                            <Text style={{ opacity: .7, fontWeight: 500 }}>He hehehe</Text>
                        </View>
                    </TouchableOpacity>
                </ScrollView>
            }
            <MedicalHistoryPopup open={open} setOpen={setOpen} />
        </>
    )
}

export default MedicalHistoryList