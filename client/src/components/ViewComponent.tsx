import React, { CSSProperties, ReactNode } from 'react';
import { SafeAreaView, View } from 'react-native';

interface Props {
    children?: ReactNode,
    style?: CSSProperties
}

const ViewComponent = ({
    children,
    style = {backgroundColor: "#f2f2f2", width: "100%", height: "100%"}
}: Props) => {
    return (
        <SafeAreaView style={style}>
            {children}
        </SafeAreaView>
    );
};

export default ViewComponent;