import { View, Text, Modal, TouchableOpacity } from 'react-native'
import React from 'react'
import { colors } from '../constants/Colors'

const ModalConfirm = ({open, onPress, onClose, title}: any) => {
    return (
        <Modal
            animationType='slide'
            transparent={true}
            visible={open}
        >
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', marginTop: -30 }}>
                <View style={{
                    backgroundColor: colors.white,
                    shadowColor: "#000000",
                    shadowOffset: {
                        width: 0,
                        height: 2,
                    },
                    shadowOpacity: 0.17,
                    shadowRadius: 2.54,
                    elevation: 3,
                    borderRadius: 8
                }}>
                    <View style={{ padding: 12, paddingHorizontal: 20 }}>
                        <Text style={{ fontSize: 18, fontWeight: 500 }}>{title}</Text>
                    </View>
                    <View style={{ borderTopWidth: .8, borderColor: colors.gray, padding: 10, flexDirection: 'row', gap: 10, }}>
                        <TouchableOpacity activeOpacity={1} onPress={() => onClose(false)} style={{ borderWidth: 1, borderColor: colors.gray, padding: 10, borderRadius: 8, flexDirection: 'row', justifyContent: 'center', flex: 1 }}>
                            <Text style={{ color: colors.black, fontWeight: 500 }}>Đóng</Text>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={onPress} activeOpacity={1} style={{ backgroundColor: colors.blue, padding: 10, borderRadius: 8, flexDirection: 'row', justifyContent: 'center', flex: 1 }}>
                            <Text style={{ color: colors.white, fontWeight: 500 }}>Xác nhận</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        </Modal>
    )
}

export default ModalConfirm