import ViewComponent from '@/src/components/ViewComponent';
import React, { useState } from 'react';
import { Platform, ScrollView, View } from 'react-native';
import UserContent from './UserContent';
import { colors } from '@/src/constants/Colors';
import { StatusBar } from 'expo-status-bar';
import Backdrop from '@/src/components/Backdrop';

const User = ({navigation}: any) => {
    const [showModal, setShowModal] = useState(false)
    return (
        <View style={{ flex: 1, backgroundColor: colors.bgGray}}>
            <StatusBar style='dark'/>
            <ScrollView style={{flexGrow: 1}}>
                <UserContent navigation={navigation} showModal={showModal} setShowModal={setShowModal}/>
            </ScrollView>
            {showModal ? <Backdrop /> : <></>}
        </View>
    );
};

export default User;