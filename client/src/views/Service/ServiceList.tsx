import CommonButton from '@/src/components/CommonButton';
import React, { useState } from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import { AntDesign, Entypo, FontAwesome } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { colors } from '@/src/constants/Colors';
import { IconRight } from '@/src/components/Icon/Icon';

const ServiceList = ({data}) => {
    const navigation = useNavigation()
    const [extend, setExtend] = useState(false)
    
    return (
        <View style={{flexDirection: 'column', backgroundColor: "#fff", padding: 10, marginBottom: 10}}>
            <View style={{flexDirection: "column", paddingVertical: 10}}>
                <TouchableOpacity onPress={() => navigation.navigate("appointment")} style={{flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingBottom: 8}}>
                    <Text style={{fontSize: 18, fontWeight: 600}}>{data?.name}</Text>
                    <IconRight size={24} color={colors.textGray}/>
                </TouchableOpacity>
                <View style={{flexDirection: 'column', gap: 10}} >
                    {data?.services?.map((i: any, index: number) => {
                        if(index > 1) return
                        return (
                            <View key={"svlist" + i._id} style={{ paddingBottom: 5, flexDirection: 'row', paddingRight: 18,}}>
                                <Entypo name="dot-single" size={24} color="black" /> 
                                <Text > 
                                    <Text style={{fontWeight: 600, opacity: .7}}>{i?.name}</Text>: {i?.description}
                                </Text>
                            </View>
                        )
                    })}
                    
                </View>
                   
            </View>
        </View>
    );
};

export default ServiceList;