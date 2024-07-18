import { ActivityIndicator, Modal, StyleSheet, Text, View } from 'react-native'
import React from 'react'

interface Props {
    visible?: boolean,
    mess?: string
}

const Loading = (props: Props) => {
    const { visible, mess } = props

    return (
        <Modal
            visible={visible}
            transparent
            statusBarTranslucent
            style={{
                width:"100%",
                height:"100%"
            }}
        >
            <View style={{ backgroundColor: "rgba(255,255,255,.6)", justifyContent: "center", alignItems: "center", flex: 1 }}>
                <ActivityIndicator />
                <Text>Loading</Text>
            </View>
        </Modal>
    )
}

export default Loading

const styles = StyleSheet.create({})