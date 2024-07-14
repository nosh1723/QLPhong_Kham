import React, { memo, useEffect } from 'react';
import { ScrollView, Text, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Image } from '@rneui/themed';
import { IconRight } from '@/src/components/Icon/Icon';
import ViewContainer from '@/src/components/ViewContainer';
import { TouchableOpacity } from 'react-native';
import { observer } from 'mobx-react';
import { useStore } from '@/src/root-store';
import Loading from '@/src/components/Loading';
import { FontAwesome6 } from '@expo/vector-icons';
import { colors } from '@/src/constants/Colors';

const HomeDoctor = () => {
    const navigation = useNavigation()
    const { pageDoctor, getDoctor } = useStore().home

    const doctorName = (name: string) => {
        const res = name.split(" ")
        const nameLength = res.length
        return res[nameLength - 1]
    } 

    return (
        <>
            <ViewContainer iconLeft={<FontAwesome6 name="user-doctor" size={16} color={colors.green} />} title='Bác sĩ' onPress={() => navigation.navigate("appointment")}>
                <ScrollView showsHorizontalScrollIndicator={false} horizontal >
                    {pageDoctor?.length > 0 && pageDoctor?.map((i, index) => {
                        if(index > 5) return
                        return(
                            <TouchableOpacity key={"name doctor" + i?._id} onPress={async () => {
                                await getDoctor(i?._id)
                                navigation.navigate("doctor")
                            }} style={{flexDirection: "column", alignItems: 'center', paddingRight: 20}}>
                                <Image containerStyle={{width: 60, height: 60, borderRadius: 1000, marginBottom: 10}} source={{uri: "https://i.pinimg.com/736x/7d/9d/ed/7d9ded7751b328b1000bcfe4c1dc7727.jpg"}}/>
                                <Text style={{color: "#000", fontWeight: 500}}>Bác sĩ {doctorName(i?.name)}</Text>
                            </TouchableOpacity>
                        )
                    })}
                     
                 </ScrollView>
            </ViewContainer>
        </>
    );
};

export default observer(HomeDoctor);