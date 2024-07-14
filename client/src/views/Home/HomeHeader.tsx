import React from 'react';
import { View } from 'react-native';
import { Text } from '@rneui/base';
import { IconUser } from '@/src/components/Icon/Icon';
import InputSearch from '@/src/components/form-component/InputSearch';
import { useStore } from '@/src/root-store';
import { colors } from '@/src/constants/Colors';
import Loading from '@/src/components/Loading';
import { observer } from 'mobx-react';
import { authSelector } from '@/src/redux/reducers/authReducer';
import { useSelector } from 'react-redux';

const HomeHeader = () => {
  const { patient, isLoading } = useStore().user
  const { doctor } = useStore().home
  const auth = useSelector(authSelector)

  const userName = auth?.user?.role === 'user' ? patient?.name : doctor?.name

  return (
    <View style={{ paddingTop: 30, paddingBottom: 15 }}>
      <View style={{ flexDirection: 'row', paddingHorizontal: 10, alignItems: 'center', gap: 15 }}>
        <IconUser color="#fff" />
        <View >
          <Text style={{ color: "#fff" }}>Chào mừng </Text>
          <Text style={{ color: colors.white, fontSize: 16, fontWeight: 500 }}>{userName}</Text>
        </View>
      </View>
      {/* <InputSearch style={{ marginVertical: 5 }} /> */}
    </View>
  );
};

export default observer(HomeHeader);