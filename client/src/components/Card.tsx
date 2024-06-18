import React from 'react';
import { Text, View } from 'react-native';
import { IconRight } from './Icon/Icon';

const Card = ({
    children = <></>,
    style = {}
}) => {
    return (
        <View style={{width: "95%", height: 'auto', marginHorizontal: 10, marginTop: 10, marginBottom: 5, backgroundColor: "#fff", borderRadius: 20,  padding: 10, ...style}}>
            {children}
        </View>
    );
};

export default Card;