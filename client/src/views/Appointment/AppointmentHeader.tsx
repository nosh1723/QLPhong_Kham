import React from 'react';
import { Platform, View } from 'react-native';
import { Text } from '@rneui/base';
import { IconLeft, IconUser } from '@/src/components/Icon/Icon';
import InputSearch from '@/src/components/form-component/InputSearch';
import { AntDesign } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';

const AppointmentHeader = () => {
  const navigation = useNavigation()
    return (
          <View style={{paddingTop: 20, flexDirection: "row", alignItems: 'center'}}>
            {Platform.OS === 'ios' ?
              <IconLeft color='white' size={40} onPress={() => navigation.goBack()} />
            :
              <AntDesign name="arrowleft" size={24} color="white" onPress={() => navigation.goBack()} style={{paddingLeft: 15, paddingRight: 5}}/>
            }
            <InputSearch style={{marginVertical: 5, width: "85%"}} placeHolder='Tên bác sĩ, dịch vụ...'/>
          </View>
    );
};

export default AppointmentHeader;