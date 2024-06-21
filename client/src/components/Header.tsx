
import { useNavigation } from '@react-navigation/native';
import React, { CSSProperties, Children, ReactNode } from 'react';
import { Platform, Text, View } from 'react-native';
import { IconLeft } from './Icon/Icon';
import { AntDesign } from '@expo/vector-icons';
import { colors } from '../constants/Colors';

interface Props {
    style?: CSSProperties,
    children?: ReactNode,
    isHeaderBack?: boolean,
    textHeaderBack?: string,
    handleBack?: () => void
}

const Header = ({
    style,
    children,
    isHeaderBack = true,
    textHeaderBack,
    handleBack
}: Props) => {
    const navigation = useNavigation()
    const isIos = Platform.OS === "ios"

    return (
        <View style={{ height: "auto", width: "100%", backgroundColor: "#006778", paddingTop: 15 }}>
            {isHeaderBack &&
                <View style={{ paddingVertical: !isIos ? 20 : 10, paddingTop: 30, flexDirection: "row", alignItems: 'center', gap: 15 }}>
                    {Platform.OS === 'ios' ?
                        <IconLeft color='white' size={40} onPress={() => {
                            handleBack ? handleBack() : navigation.goBack()
                        }} />
                        :
                        <AntDesign name="arrowleft" size={24} color="white" onPress={() => {
                            handleBack ? handleBack() : navigation.goBack()
                        }} style={{ paddingLeft: 15, paddingRight: 5 }} />
                    }
                    <Text style={{ color: colors.white, fontSize: 18 }}>{textHeaderBack}</Text>
                </View>
            }
            {children}
        </View>
    );
};

export default Header;

