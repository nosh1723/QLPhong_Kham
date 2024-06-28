import ViewComponent from '@/src/components/ViewComponent';
import React from 'react';
import { Platform, ScrollView, View } from 'react-native';
import UserContent from './UserContent';
import { colors } from '@/src/constants/Colors';
import { StatusBar } from 'expo-status-bar';

const User = () => {
    const isIos = Platform.OS === 'ios'
    return (
        <View style={{paddingVertical: isIos ? 50 : 30, flex: 1, backgroundColor: colors.bgGray}}>
            <StatusBar style='dark'/>
            <ScrollView style={{flexGrow: 1}}>
                <UserContent/>
            </ScrollView>
        </View>
    );
};

export default User;