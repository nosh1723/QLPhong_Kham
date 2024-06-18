import React from 'react';
import { View } from 'react-native';
import { Text } from '@rneui/base';
import { IconUser } from '@/src/components/Icon/Icon';
import InputSearch from '@/src/components/form-component/InputSearch';

const ScheduleExamHeader = () => {
    return (
          <View style={{paddingTop: 20}}>
            <View style={{flexDirection: 'row', paddingTop: 10, justifyContent: 'center', paddingBottom: 10}}>
              <View >
                <Text style={{color: "#fff", fontWeight: 600, fontSize: 16}}>Lịch khám </Text>
              </View>
            </View>
            <InputSearch style={{marginVertical: 5}} placeHolder='Tìm kiếm theo mã phiếu khám...'/>
          </View>
    );
};

export default ScheduleExamHeader;