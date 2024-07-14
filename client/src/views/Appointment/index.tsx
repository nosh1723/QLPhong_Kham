
import React from 'react';
import {  ScrollView, Text } from 'react-native';
import ViewComponent from '@/src/components/ViewComponent';
import { View } from 'react-native';
import ViewContainer from '@/src/components/ViewContainer';
import CommonButton from '@/src/components/CommonButton';
import { Image } from '@rneui/themed';
import AppointmentList from './AppointmentList';
import Header from '@/src/components/Header';
import AppointmentHeader from './AppointmentHeader';

const AppointmentIndex = ({route, navigation}: any) => {
    
    return (
        <>
        <Header isHeaderBack={false}><AppointmentHeader /></Header>
            <ViewComponent style={{paddingTop: 10, flex: 1}} >
                <ScrollView showsVerticalScrollIndicator={false} style={{marginTop: -10, flexGrow: 1}}>
                        <AppointmentList route={route} navigation={navigation}/>
                </ScrollView>
            </ViewComponent>
        </>
       
    );
};

export default AppointmentIndex;