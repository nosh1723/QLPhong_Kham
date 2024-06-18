import React, { useState } from 'react';
import { ScrollView, Switch, Text, TouchableOpacity } from 'react-native';
import ViewComponent from '@/src/components/ViewComponent';
import { View } from 'react-native';
import Card from '@/src/components/Card';
import { useNavigation } from '@react-navigation/native';


const SettingList = ({ data, border }) => {
    const [isEnabled, setIsEnabled] = useState(false)
    const navigation = useNavigation()

    return (
        <View>
            <TouchableOpacity onPress={data?.navigate ? () => navigation.navigate(data?.navigate) : () => { }} style={{ borderBottomWidth: !border ? .17 : 0, borderBottomColor: !border ? "#ddd" : '', paddingHorizontal: 5, paddingVertical: 14, paddingBottom: border ? 9 : 14 }}>
                <View style={{ flexDirection: "row", alignItems: 'center', }}>
                    <Text style={{ flex: 1 }}>{data.icon}</Text>
                    <View style={{ flex: 7, paddingLeft: 5, paddingRight: 20 }}>
                        <Text style={{ fontSize: 18, fontWeight: 300 }}>{data.name}</Text>
                        {data.description ? <Text style={{ fontSize: 13, fontWeight: 300 }}>{data.description}</Text> : ''}
                    </View>
                    <View style={{ flex: 2, flexDirection: "row", justifyContent: 'flex-end', paddingRight: 5 }}>
                        {data?.iconRedirect ? data?.iconRedirect
                            :
                            <Switch
                                trackColor={{ false: '#bec4d0', true: '#5ec268' }}
                                thumbColor={isEnabled ? '#fff' : '#fff'}
                                ios_backgroundColor="#3e3e3e"
                                onValueChange={() => setIsEnabled(!isEnabled)}
                                value={isEnabled}
                            />
                        }

                    </View>
                </View>
            </TouchableOpacity>
        </View>
    );
};

export default SettingList