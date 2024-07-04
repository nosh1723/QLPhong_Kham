import { View, Text, Modal, ScrollView } from 'react-native'
import React from 'react'
import Header from '@/src/components/Header'
import { StatusBar } from 'expo-status-bar'
import { TouchableOpacity } from 'react-native'
import { Ionicons } from '@expo/vector-icons'
import { isIos } from '@/src/constants/LocalConst'
import { colors } from '@/src/constants/Colors'
import { style } from '@/src/styles'

const MedicalHistoryPopup = ({ open, setOpen }: any) => {
  return (
    <Modal
      animationType='fade'
      transparent={true}
      visible={open}
    >
      <View style={{ flex: 1, backgroundColor: "rgba(0, 0, 0, .2)" }}>
        <ScrollView style={{ backgroundColor: colors.bgGray, flexGrow: 1, margin: 30, marginVertical: 80, padding: 10, borderRadius: 12 }}>
          <TouchableOpacity onPress={() => setOpen(false)} style={{ paddingHorizontal: 10, marginTop: 10 }}>
            <Ionicons name="close" size={24} color="black" />
          </TouchableOpacity>

          <View style={{ marginTop: 20 }}>
            <View style={{ backgroundColor: colors.white, padding: 10, borderRadius: 8, flexDirection: 'column', gap: 8 }}>
              <Text style={{ fontWeight: 500, fontSize: 16, marginBottom: -4 }}>Nguyễn Hồng Sơn</Text>
              <Text>STT: 1</Text>
              <View style={[style.row, {}]}>
                <Text>Mã BN</Text>
                <Text style={{ fontWeight: 500 }}>Mã BN</Text>
              </View>
              <View style={[style.row, {}]}>
                <Text>Ngày sinh</Text>
                <Text style={{ fontWeight: 500 }}>Mã BN</Text>
              </View>
              <View style={[style.row, {}]}>
                <Text>Giới tính</Text>
                <Text style={{ fontWeight: 500 }}>Mã BN</Text>
              </View>
            </View>

            <Text style={{ marginTop: 20, marginBottom: 8 }}>Thông tin phiếu khám</Text>
            <View style={{ backgroundColor: colors.white, padding: 10, borderRadius: 8, flexDirection: 'column', gap: 8 }}>
              <View style={[style.row, {}]}>
                <Text>Mã phiếu khám</Text>
                <Text style={{ fontWeight: 500 }}>Mã BN</Text>
              </View>
              <View style={[style.row, {}]}>
                <Text>Ngày khám</Text>
                <Text style={{ fontWeight: 500 }}>Mã BN</Text>
              </View>
              <View style={[style.row, {}]}>
                <Text>Giờ khám</Text>
                <Text style={{ fontWeight: 500 }}>Mã BN</Text>
              </View>
              <View style={[style.row, {}]}>
                <Text>Bác sĩ</Text>
                <Text style={{ fontWeight: 500 }}>Mã BN</Text>
              </View>
              <View style={[style.row, {}]}>
                <Text>Dịch vụ</Text>
                <Text style={{ fontWeight: 500 }}>Mã BN</Text>
              </View>
            </View>

            <Text style={{marginTop: 20, marginBottom: 8}}>Kết quả khám</Text>
            <View style={{ backgroundColor: colors.white, padding: 10, borderRadius: 8, flexDirection: 'column', gap: 8 }}>
              <View style={[style.row, {}]}>
                <Text>Mã phiếu khám</Text>
                <Text style={{ fontWeight: 500 }}>Mã BN</Text>
              </View>
              <View style={[style.row, {}]}>
                <Text>Ngày khám</Text>
                <Text style={{ fontWeight: 500 }}>Mã BN</Text>
              </View>
            </View>
          </View>
        </ScrollView>
      </View>
    </Modal>
  )
}

export default MedicalHistoryPopup