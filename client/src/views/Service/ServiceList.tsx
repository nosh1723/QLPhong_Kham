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
                <Text style={{fontSize: 18, fontWeight: 600, paddingBottom: 8}}>Chỉnh nha</Text>
                <View style={{height: extend ? "auto" : 75, overflow: 'hidden'}} >
                    <Text style={{opacity: .7, paddingBottom: 5}}><Text style={{fontWeight: 600}}>Niềng răng:</Text> Điều chỉnh vị trí của răng bằng các phương pháp niềng răng cố định hoặc tháo lắp.</Text>
                    <Text style={{opacity: .7, paddingBottom: 5}}><Text style={{fontWeight: 600}}>Invisalign:</Text> Sử dụng khay trong suốt để chỉnh nha mà không cần niềng răng cố định..</Text>
                    <Text style={{opacity: .7, paddingBottom: 5}}><Text style={{fontWeight: 600}}>Invisalign:</Text> Sử dụng khay trong suốt để chỉnh nha mà không cần niềng răng cố định..</Text>
                    <Text style={{opacity: .7, paddingBottom: 5}}><Text style={{fontWeight: 600}}>Invisalign:</Text> Sử dụng khay trong suốt để chỉnh nha mà không cần niềng răng cố định..</Text>
                </View>
                    <TouchableOpacity onPress={() => setExtend(!extend)} style={{width: "100%", flexDirection: 'row', justifyContent: 'center'}}>
                        {extend ? 
                            <FontAwesome name="angle-up" size={24} color="black" />
                        :
                            <FontAwesome name="angle-down" size={24} color="black" />
                        }
                    </TouchableOpacity>
            </View>
            <View style={{width: "100%", flexDirection: "row", justifyContent: "flex-end", borderTopWidth: .8, borderColor: "#ddd", paddingTop: 5}}>
                <CommonButton title='Đặt lịch' style={{paddingHorizontal: 15, borderRadius: 8}} onPress={() => navigation.navigate("appointment")}/>
            </View>
        </View>
    );
};

export default ServiceList;