import React from 'react';
import { View } from 'react-native';
import { Text } from '@rneui/base';
import { IconUser } from '@/src/components/Icon/Icon';
import InputSearch from '@/src/components/form-component/InputSearch';
import { useStore } from '@/src/root-store';
import { colors } from '@/src/constants/Colors';
import Loading from '@/src/components/Loading';
import { observer } from 'mobx-react';

const HomeHeader = () => {
  const { patient, isLoading } = useStore().user
  
    return (
          <View style={{paddingTop: 30}}>
            <View style={{flexDirection: 'row', paddingHorizontal: 10, alignItems: 'center', gap: 15}}>
              <IconUser color="#fff"/>
              <View >
                <Text style={{color: "#fff"}}>Chào mừng </Text>
                <Text style={{color: colors.white, fontSize: 16, fontWeight: 500}}>{patient?.name}</Text>
              </View>
            </View>
            <InputSearch style={{marginVertical: 5}}/>
            <Loading visible={isLoading}/>
          </View>
    );
};

export default observer(HomeHeader);