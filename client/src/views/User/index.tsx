import ViewComponent from '@/src/components/ViewComponent';
import React from 'react';
import { Platform, ScrollView, View } from 'react-native';
import UserContent from './UserContent';

const User = () => {
    const isIos = Platform.OS === 'ios'
    return (
        <ViewComponent style={{paddingVertical: isIos ? 50 : 30}}>
            <ScrollView>
                <UserContent/>
            </ScrollView>
        </ViewComponent>
    );
};

export default User;