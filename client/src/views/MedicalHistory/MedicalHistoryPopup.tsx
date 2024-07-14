import { View, Text, Modal, ScrollView } from 'react-native'
import React from 'react'
import Header from '@/src/components/Header'
import { StatusBar } from 'expo-status-bar'
import { TouchableOpacity } from 'react-native'
import { FontAwesome, Ionicons } from '@expo/vector-icons'
import { isIos } from '@/src/constants/LocalConst'
import { colors } from '@/src/constants/Colors'
import { style } from '@/src/styles'
import { useStore } from '@/src/root-store'
import { getDate, getGenderFomat, getTime } from '@/src/constants/LocalFunction'
import { observer } from 'mobx-react'

const MedicalHistoryPopup = ({ open, setOpen }: any) => {
  const { selectMedicalRecord } = useStore().medicalResultStore
  
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
              <Text style={{ fontWeight: 500, fontSize: 16, marginBottom: -4 }}>{selectMedicalRecord?.appointment?.patient?.name}</Text>
              <Text>STT: {selectMedicalRecord?.appointment?.serialNumber}</Text>
              <View style={[style.row, {}]}>
                <Text>Mã BN</Text>
                <Text style={{ fontWeight: 500 }}>{selectMedicalRecord?.appointment?.patient?.code}</Text>
              </View>
              <View style={[style.row, {}]}>
                <Text>Ngày sinh</Text>
                <Text style={{ fontWeight: 500 }}>{getDate(selectMedicalRecord?.appointment?.patient?.birth_date)}</Text>
              </View>
              <View style={[style.row, {}]}>
                <Text>Giới tính</Text>
                <Text style={{ fontWeight: 500 }}>{getGenderFomat(selectMedicalRecord.appointment?.patient?.gender)}</Text>
              </View>
            </View>

            <Text style={{ marginTop: 20, marginBottom: 8 }}>Thông tin phiếu khám</Text>
            <View style={{ backgroundColor: colors.white, padding: 10, borderRadius: 8, flexDirection: 'column', gap: 8 }}>
              <View style={[style.row, {}]}>
                <Text>Mã phiếu khám</Text>
                <Text style={{ fontWeight: 500 }}>{selectMedicalRecord?.appointment?.code}</Text>
              </View>
              <View style={[style.row, {}]}>
                <Text>Ngày khám</Text>
                <Text style={{ fontWeight: 500 }}>{getDate(selectMedicalRecord?.appointment?.date)}</Text>
              </View>
              <View style={[style.row, {}]}>
                <Text>Giờ khám</Text>
                <Text style={{ fontWeight: 500 }}>{getTime(selectMedicalRecord?.appointment?.workhour?.startTime)}</Text>
              </View>
              <View style={[style.row, {}]}>
                <Text>Bác sĩ</Text>
                <Text style={{ fontWeight: 500 }}>{selectMedicalRecord?.appointment?.doctor?.name}</Text>
              </View>
              <View style={[style.row, {}]}>
                <Text>Dịch vụ</Text>
                <Text style={{ fontWeight: 500 }}>{selectMedicalRecord?.appointment?.service?.name}</Text>
              </View>
            </View>

            <Text style={{ marginTop: 20, marginBottom: 8 }}>Kết quả khám</Text>
            <View style={{ backgroundColor: colors.white, padding: 10, borderRadius: 8, flexDirection: 'column', gap: 8 }}>
              <View style={[{}]}>
                <View style={{ marginBottom: 16, paddingHorizontal: 10, gap: 12, backgroundColor: "#f0f5fa", borderRadius: 8, paddingVertical: 5 }}>
                  {selectMedicalRecord?.results?.map(i => {
                    return <View key={"kết quả khám" + i._id} style={{ flexDirection: 'row', alignItems: 'center', justifyContent: "space-between" }}>
                      <View style={{ flexDirection: 'row', alignItems: 'center', gap: 5 }}>
                        <FontAwesome name='circle' color={colors.textGray} size={8} />
                        <Text style={{ color: "rgba(0, 0, 0, .8)" }}>{i.description}</Text>
                      </View>
                    </View>
                  })}
                </View>
                {selectMedicalRecord?.reExamination &&
                  <View style={[style.row, {}]}>
                    <Text>Hẹn tái khám vào</Text>
                    <Text style={{ fontWeight: 500 }}>{getDate(selectMedicalRecord?.dateReExam)}</Text>
                  </View>
                }
              </View>
            </View>
          </View>
        </ScrollView>
      </View>
    </Modal>
  )
}

export default observer(MedicalHistoryPopup)