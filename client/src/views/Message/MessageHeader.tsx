import React from 'react';
import { View } from 'react-native';
import { Text } from '@rneui/base';
import InputSearch from '@/src/components/form-component/InputSearch';
import { isIos } from '@/src/constants/LocalConst';

const MessageHeader = () => {
    return (
          <View style={{paddingTop: isIos ? 30 : 20, paddingBottom: 10}}>
            <View style={{flexDirection: 'row', paddingHorizontal: 10,  justifyContent: 'center', paddingBottom: 5}}>
              <View >
                <Text style={{color: "#fff", fontWeight: 600, fontSize: 16}}>Tin nhắn </Text>
              </View>
            </View>
          </View>
    );
};

export default MessageHeader;