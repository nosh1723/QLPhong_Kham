
import React from 'react';
import { SafeAreaView, ScrollView, Text } from 'react-native';
import MessageCard from '../Message/MessageCard';
import ViewComponent from '@/src/components/ViewComponent';
import { View } from 'react-native';
import Header from '@/src/components/Header';
import MessageHeader from './MessageHeader';

const Message = () => {
    return (
        <>
            <>
                <Header isHeaderBack={false}><MessageHeader></MessageHeader></Header>
                <ViewComponent style={{ paddingTop: 10, flex: 1 }}>
                    <ScrollView showsVerticalScrollIndicator={false} style={{ flexGrow: 1 }}>
                        {/* <View style={{width: '100%',flexDirection: "row", alignItems: 'center', justifyContent: 'center'}}>
                        <Text style={{fontSize: 20, color: "#9eabb9"}}>Bạn chưa có tin nhắn nào!</Text>
                    </View> */}
                        <MessageCard />
                    </ScrollView>
                </ViewComponent>
            </>
        </>
    );
};

export default Message;