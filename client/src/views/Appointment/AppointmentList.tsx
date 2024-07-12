import { Image } from '@rneui/themed';
import React, { useEffect } from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import CommonButton from '@/src/components/CommonButton';
import { useStore } from '@/src/root-store';
import Loading from '@/src/components/Loading';
import { useNavigation } from '@react-navigation/native';
import { FontAwesome6 } from '@expo/vector-icons';
import { colors } from '@/src/constants/Colors';
import { observer } from 'mobx-react';
const AppointmentList = ({navigation, route}: any) => {
    const { pageDoctor, getDoctor, isLoading } = useStore().home
    return (
        <>
            {pageDoctor?.length > 0 && pageDoctor?.map((item: any) => {
                if(route.params) {
                    if(route.params.id === item?.categoryService?.category_Id + ""){
                        return (
                            <View key={"apointment" + item?._id} style={{ flexDirection: 'column', backgroundColor: "#fff", padding: 10, marginBottom: 10 }}>
                                <TouchableOpacity onPress={() => {
                                    getDoctor(item?.id)
                                    navigation.navigate("doctor")
                                }} style={{ flexDirection: "row", gap: 15, paddingVertical: 0 }}>
                                    <Image containerStyle={{ width: 80, height: 80, borderRadius: 1000, marginBottom: 10 }} source={{ uri: "https://i.pinimg.com/736x/7d/9d/ed/7d9ded7751b328b1000bcfe4c1dc7727.jpg" }} />
                                    <View style={{ paddingTop: 15 }}>
                                        <Text style={{ fontSize: 18, fontWeight: 600, paddingBottom: 5 }}>{item?.name}</Text>
                                        <Text style={{ color: "#222931" }}><Text style={{ fontWeight: 600 }}>{item?.year_of_experience}</Text> năm kinh nghiệm</Text>
                                        <Text style={{}}>{item?.branch?.name}</Text>
                                    </View>
                                </TouchableOpacity>
                                <View style={{ paddingBottom: 5, flexDirection: 'row', gap: 5, alignItems: 'flex-start', paddingRight: 10, paddingTop: 5 }}>
                                    <View style={{ marginTop: 2 }}><FontAwesome6 name="location-dot" size={18} color={colors.textGray} /></View>
                                    <Text>{item?.branch?.address}</Text>
                                </View>
                                <View style={{ width: "100%", flexDirection: "row", justifyContent: "flex-end", }}>
                                    <CommonButton title='Đặt lịch ngay' style={{ paddingHorizontal: 15, borderRadius: 8 }} onPress={async () => {
                                        await getDoctor(item?.id)
                                        navigation.navigate("makeAppointmentIndex")
                                    }
                                    } />
                                </View>
                            </View>
                        )
                    }
                    return 
                }else {
                    return (
                        <View key={"apointment" + item?._id} style={{ flexDirection: 'column', backgroundColor: "#fff", padding: 10, marginBottom: 10 }}>
                            <TouchableOpacity onPress={() => {
                                getDoctor(item?.id)
                                navigation.navigate("doctor")
                            }} style={{ flexDirection: "row", gap: 15, paddingVertical: 0 }}>
                                <Image containerStyle={{ width: 80, height: 80, borderRadius: 1000, marginBottom: 10 }} source={{ uri: "https://i.pinimg.com/736x/7d/9d/ed/7d9ded7751b328b1000bcfe4c1dc7727.jpg" }} />
                                <View style={{ paddingTop: 15 }}>
                                    <Text style={{ fontSize: 18, fontWeight: 600, paddingBottom: 5 }}>{item?.name}</Text>
                                    <Text style={{ color: "#222931" }}><Text style={{ fontWeight: 600 }}>{item?.year_of_experience}</Text> năm kinh nghiệm</Text>
                                    <Text style={{}}>{item?.branch?.name}</Text>
                                </View>
                            </TouchableOpacity>
                            <View style={{ paddingBottom: 5, flexDirection: 'row', gap: 5, alignItems: 'flex-start', paddingRight: 10, paddingTop: 5 }}>
                                <View style={{ marginTop: 2 }}><FontAwesome6 name="location-dot" size={18} color={colors.textGray} /></View>
                                <Text>{item?.branch?.address}</Text>
                            </View>
                            <View style={{ width: "100%", flexDirection: "row", justifyContent: "flex-end", }}>
                                <CommonButton title='Đặt lịch ngay' style={{ paddingHorizontal: 15, borderRadius: 8 }} onPress={async () => {
                                    await getDoctor(item?.id)
                                    navigation.navigate("makeAppointmentIndex")
                                }
                                } />
                            </View>
                        </View>
                    )
                }
            })}
            <Loading visible={isLoading} />
        </>
    );
}
export default observer(AppointmentList) 