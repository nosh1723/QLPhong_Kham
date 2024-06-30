
import React, { useEffect, useState } from 'react';
import { SafeAreaView, ScrollView, Text } from 'react-native';
import ScheduleExamCard from '../ScheduleExam/ScheduleExamCard';
import { View } from 'react-native';
import Header from '@/src/components/Header';
import ScheduleExamHeader from './ScheduleExamHeader';
import { useStore } from '@/src/root-store';
import { useIsFocused } from '@react-navigation/native';
import Loading from '@/src/components/Loading';
import { observer } from 'mobx-react';

const ScheduleExamIndex = () => {
    const isFocused = useIsFocused();
    const { pageAppointment, isLoading } = useStore().apointment
    
    return (
        <View style={{flex: 1}}>
            <Loading visible={isLoading} />
            <Header isHeaderBack={false}><ScheduleExamHeader></ScheduleExamHeader></Header>
            {pageAppointment?.length === 0 ?
                <View style={{ width: '100%', flex: 1, flexDirection: "row", alignItems: 'center', justifyContent: 'center'}}>
                    <Text style={{ fontSize: 20, color: "#9eabb9" }}>Bạn chưa có lịch khám nào!</Text>
                </View>
            :   
            <ScrollView showsVerticalScrollIndicator={false}>
                <ScheduleExamCard />
            </ScrollView>
            }
            
        </View>

    );
};

export default observer(ScheduleExamIndex) ;