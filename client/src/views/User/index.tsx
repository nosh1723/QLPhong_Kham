import Backdrop from '@/src/components/Backdrop';
import { colors } from '@/src/constants/Colors';
import { StatusBar } from 'expo-status-bar';
import React, { useState } from 'react';
import { ScrollView, View } from 'react-native';
import UserContent from './UserContent';

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