import React from 'react';
import { Text, View } from 'react-native';
import { IconRight } from './Icon/Icon';

const ViewContainer = ({
    icon = <IconRight color='#8a8c80' size={28}/>,
    onPress = () => {},
    title = '',
    children = <></>,
    style = {},
    noIcon = false
}) => {
    return (
        <View style={{backgroundColor: "#fff", width: "100%", marginVertical: 5, padding: 10, marginBottom: 5, ...style}}>
            <View style={{flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center'}}>
                <Text style={{fontSize: 20, fontWeight: 600, color: "#000"}}>{title}</Text>
                <Text onPress={onPress}>
                    {!noIcon ? icon : <></>}
                </Text>
            </View>
            <View style={{marginVertical: 20,...style}}>
                {children}
            </View>
        </View>
    );
};

export default ViewContainer;