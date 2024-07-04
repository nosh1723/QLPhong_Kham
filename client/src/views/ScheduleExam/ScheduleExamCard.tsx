
import Card from '@/src/components/Card';
import { colors } from '@/src/constants/Colors';
import { getDate, getTime } from '@/src/constants/LocalFunction';
import { useStore } from '@/src/root-store';
import { FontAwesome } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { Image } from '@rneui/themed';
import React from 'react';
import { Text, View, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';

const ScheduleExamCard = () => {
    const navigation = useNavigation()

    const { pageAppointment, getAppointment } = useStore().apointment

    return (
        <>
            {pageAppointment?.length > 0 && pageAppointment?.map(i => {
                const status = {
                    bgColor: i?.status === 1 ? "#E0FBE2" : i?.status === 2 ? "#F3F6D0" : i?.status === 3 ? "rgba(222, 235, 246, .7)" : "#fbe9dd",
                    color: i?.status === 1 ? colors['green-200'] : i?.status === 2 ? colors.orange : i?.status === 3 ? colors.blue : colors.red,
                    text: i?.status === 1 ? "Đã đặt lịch" : i?.status === 2 ? "Đã hết hạn" : i?.status === 3 ? "Đã hoàn thành" : "Đã hủy"
                }
                return <TouchableOpacity key={'list schedule exam card' + i?._id} onPress={() => {
                    getAppointment(i?._id).then(data => navigation.navigate("scheduleExamDetailIndex"))
                }} >
                    <Card style={{ borderRadius: 10, paddingVertical: 15 }}>
                        <View>
                            <View style={style.CardContent}>
                                <View style={{ backgroundColor: status.bgColor, paddingVertical: 5, paddingHorizontal: 10, borderRadius: 100, flexDirection: 'row', alignItems: 'center', gap: 5 }}>
                                    <FontAwesome name='circle' color={status.color} />
                                    <Text style={{ color: "#40A578", fontWeight: 500, }}> <Text style={{ color: status.color }}>{status.text}</Text> </Text>
                                </View>
                                <Text style={{ fontSize: 16 }}>STT <Text style={{ fontWeight: 700 }}>{i?.serialNumber}</Text></Text>
                            </View>
                            <View style={[style.CardContent, { paddingVertical: 4 }]}>
                                <Text style={[style.Text, { fontWeight: 500, opacity: 1 }]}>BS. {i?.doctor?.name}</Text>
                                <Image containerStyle={{ width: 50, height: 50, borderRadius: 1000, marginBottom: 10 }} source={{ uri: "https://i.pinimg.com/736x/7d/9d/ed/7d9ded7751b328b1000bcfe4c1dc7727.jpg" }} />
                            </View>
                            <View >
                                <View style={style.CardContent}>
                                    <Text style={[style.Text]}>Giờ khám dự kiến</Text>
                                    <Text style={[style.Text, { opacity: 1 }]}>{getTime(i?.workhour?.startTime)} - {getDate(i?.date)}</Text>
                                </View>
                                <View style={style.CardContent}>
                                    <Text style={[style.Text]}>Giờ khám</Text>
                                    <Text style={[style.Text, { opacity: 1 }]}>{getTime(i?.workhour?.startTime)} - {getTime(i?.workhour?.endTime)} - {getDate(i?.date)}</Text>
                                </View>
                                <View style={style.CardContent}>
                                    <Text style={[style.Text]}>Bệnh nhân</Text>
                                    <Text style={[style.Text, { opacity: 1 }]}>{i?.patient?.name}</Text>
                                </View>
                            </View>
                        </View>
                    </Card>
                </TouchableOpacity>
            })}

        </>
    );
};



const style = StyleSheet.create({
    CardContent: {
        flexDirection: 'row',
        justifyContent: "space-between",
        alignItems: 'center',
        paddingHorizontal: 5
    },
    Text: {
        fontSize: 16,
        opacity: 0.7
    }
})

export default ScheduleExamCard;