
import React from 'react';
import {  SafeAreaView, ScrollView, Text } from 'react-native';
import ScheduleExamCard from '../ScheduleExam/ScheduleExamCard';
import { View } from 'react-native';
import Header from '@/src/components/Header';
import ScheduleExamHeader from './ScheduleExamHeader';

const ScheduleExamIndex = () => {
    return (
             <>
                 <Header isHeaderBack={false}><ScheduleExamHeader></ScheduleExamHeader></Header>
                {/* <View style={{width: '100%', flexGrow: 1, flexDirection: "row", alignItems: 'center', justifyContent: 'center',}}>
                    <Text style={{fontSize: 20, color: "#9eabb9"}}>Bạn chưa có lịch khám nào!</Text>
                </View> */}
                 <ScrollView showsVerticalScrollIndicator={false}>
                     <ScheduleExamCard />
                </ScrollView>
             </>
       
    );
};

export default ScheduleExamIndex;