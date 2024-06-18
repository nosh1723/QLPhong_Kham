
import Card from '@/src/components/Card';
import { FontAwesome } from '@expo/vector-icons';
import React from 'react';
import { Text, View, StyleSheet, ScrollView } from 'react-native';

const ScheduleExamCard = () => {
    return (
        <>
            <Card style={{borderRadius: 10, paddingVertical: 15}}>
                <View>
                    <View style={style.CardContent}>
                        <View style={{backgroundColor: "#E0FBE2", paddingVertical: 5, paddingHorizontal: 10, borderRadius: 100,flexDirection: 'row', alignItems: 'center' }}>
                            <FontAwesome name='circle' color={"#40A578"}/>
                            <Text style={{ color: "#40A578", fontWeight: 500, }}> Đã đặt lịch</Text>
                        </View>
                        <Text style={{fontSize: 16}}>STT <Text style={{fontWeight: 700}}>1</Text></Text>
                    </View>
                    <View style={[style.CardContent, {paddingVertical: 20}]}>
                        <Text style={[ style.Text, {fontWeight: 500, opacity: 1}]}>Phòng khám chi nhánh bla bla</Text>
                        <></>
                    </View>
                    <View >
                        <View style={style.CardContent}>
                            <Text style={[style.Text]}>Giờ khám dự kiến</Text>
                            <Text style={[style.Text, {opacity: 1}]}>09:00 - 29/05/2024</Text>
                        </View>
                        <View style={style.CardContent}>
                            <Text style={[style.Text]}>Giờ khám</Text>
                            <Text style={[style.Text, {opacity: 1}]}>09:00 - 12:00 - 29/05/2024</Text>
                        </View>
                        <View style={style.CardContent}>
                            <Text style={[style.Text]}>Bệnh nhân</Text>
                            <Text style={[style.Text, {opacity: 1}]}>Vip pro</Text>
                        </View>
                    </View>
                </View>
            </Card>
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