import { View, Text, ScrollView, TouchableOpacity } from 'react-native'
import React from 'react'
import Header from '@/src/components/Header'
import { GestureHandlerRootView } from 'react-native-gesture-handler'
import { style } from '@/src/styles'
import { Ionicons } from '@expo/vector-icons'
import { color } from '@rneui/base'
import { colors } from '@/src/constants/Colors'

const ScheduleExamDetailIndex = () => {
    return (
        <>
            <GestureHandlerRootView>
                <Header textHeaderBack='Phiếu khám' />
                <View>
                    <ScrollView showsVerticalScrollIndicator={false} style={{ paddingVertical: 12 }}>
                        <View style={{}}>
                            <Text style={{ padding: 10, fontWeight: 500 }}>Thông tin phiếu khám</Text>

                            <View style={{ padding: 12, backgroundColor: colors.white, marginHorizontal: 12, borderRadius: 8, flexDirection: 'column', gap: 10 }}>
                                <View style={{padding: 10, flexDirection: 'row', borderRadius: 1,  borderBottomWidth: 2, borderBottomColor: "black"}}>
                                    <Text style={{fontSize: 24, fontWeight: 500}}>STT: </Text>
                                    <Text style={{fontSize: 24, fontWeight: 900, color: colors['green-200']}}>1</Text>
                                </View>
                                <View style={[style.row]}>
                                    <Text style={{ opacity: .7 }}>Mã phiếu khám</Text>
                                    <View style={style.row}>
                                        <Text style={{ fontWeight: 500, paddingRight: 4 }}>bnabanbnab</Text>
                                        <TouchableOpacity ><Ionicons name="copy-outline" size={18} color={colors.black} style={{ opacity: .6 }} /></TouchableOpacity>
                                    </View>
                                </View>
                                <View style={[style.row]}>
                                    <Text style={{ opacity: .7 }}>Ngày khám</Text>
                                    <View style={style.row}>
                                        <Text style={{ fontWeight: 500, paddingRight: 4 }}>bnabanbnab</Text>
                                    </View>
                                </View>
                                <View style={[style.row]}>
                                    <Text style={{ opacity: .7 }}>Giờ khám</Text>
                                    <View style={style.row}>
                                        <Text style={{ fontWeight: 500, paddingRight: 4 }}>bnabanbnab</Text>
                                    </View>
                                </View>
                            </View>
                        </View>
                    </ScrollView>
                </View>
            </GestureHandlerRootView>
        </>
    )
}

export default ScheduleExamDetailIndex