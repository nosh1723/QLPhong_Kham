import CommonButton from '@/src/components/CommonButton';
import React, { useState } from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';

const ServiceList = ({data}) => {
    const navigation = useNavigation()
    const [extend, setExtend] = useState(false)
    
    return (
        <View style={{flexDirection: 'column', backgroundColor: "#fff", padding: 10, marginBottom: 10}}>
            <View style={{flexDirection: "column", paddingVertical: 10}}>
                <Text style={{fontSize: 18, fontWeight: 600, paddingBottom: 8}}>{data?.name}</Text>
                <View style={{maxHeight: extend ? "auto" : 75, overflow: 'hidden'}} >
                    {data?.services?.map(i => (
                        <Text key={"svlist" + i._id} style={{opacity: .7, paddingBottom: 5}}><Text style={{fontWeight: 600}}>{i?.name}:</Text> {i?.description}</Text>
                    ))}
                    
                </View>
                   
            </View>
            <View style={{width: "100%", flexDirection: "row", justifyContent: "flex-end", borderTopWidth: .8, borderColor: "#ddd", paddingTop: 5}}>
                <CommonButton title='Xem thêm' style={{paddingHorizontal: 15, borderRadius: 8}} onPress={() => navigation.navigate("appointment")}/>
            </View>
        </View>
    );
};

export default ServiceList;