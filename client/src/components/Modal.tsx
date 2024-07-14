import { View, Text, Modal, TouchableOpacity, ScrollView, ViewStyle, } from 'react-native'
import React from 'react'
import { Ionicons } from '@expo/vector-icons'
import { colors } from '../constants/Colors'
import CommonButton from './CommonButton'

const ModalComponent = ({ open, setOpen, children, hideButton, titleButton, onClickBtn, animationType = "none" }: any) => {
    return (
        <Modal
            animationType={animationType}
            transparent={true}
            visible={open}
        >
            <View style={{ flex: 1, backgroundColor: "rgba(0, 0, 0, .2)" }}>
                <View style={{ backgroundColor: colors.bgGray, flex: 1,margin: 30, marginVertical: 80, padding: 10, borderRadius: 12 }}>
                    <ScrollView style={{ }}>
                        <View>
                            <TouchableOpacity onPress={() => setOpen(false)} style={{ paddingHorizontal: 10, marginTop: 10 }}>
                                <Ionicons name="close" size={24} color="black" />
                            </TouchableOpacity>
        
                            {children}
                        </View>
                    </ScrollView>
                        {!hideButton && 
                           <View style={{marginBottom: 20}}>
                             <CommonButton title={titleButton} onPress={onClickBtn} style={{borderRadius: 12, marginTop: 15}}/>
                           </View>
                        }
                </View>
            </View>
        </Modal>
    )
}

export default ModalComponent