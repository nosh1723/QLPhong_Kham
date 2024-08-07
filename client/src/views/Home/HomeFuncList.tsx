import Card from '@/src/components/Card';
import { IconCalendar, IconDrug, IconList, IconMediBag, IconMessage, IconSetting, IconStethoscope, IconUser } from '@/src/components/Icon/Icon';
import { Button } from '@rneui/base';
import React from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import { AntDesign, MaterialIcons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { useSelector } from 'react-redux';
import { authSelector } from '@/src/redux/reducers/authReducer';
import { colors } from '@/src/constants/Colors';
import { observer } from 'mobx-react';
import Toast from 'react-native-toast-message';



const HomeFuncList = ({navigation}: any) => {
    const auth = useSelector(authSelector)

    const listFunc = auth?.user?.role === 'user' ? LIST_FUNC_PATIENT : LIST_FUNC_DOCTOR

    return (
        <Card style={{marginTop: 20}}>
            <View style={{flexDirection: 'row', flexWrap: 'wrap', gap: 5, justifyContent: 'space-between', paddingHorizontal: 20}}>
                {listFunc.map(i => {
                    return (
                        <TouchableOpacity  onPress={() => {
                            if(i.navigate !== "") {
                                navigation.navigate(i.navigate)
                            }else {
                                Toast.show({
                                    type: 'info',
                                    text1: "Chức năng đang trong giai đoạn phát triển!"
                                })
                            }
                            
                        }} key={"listfunc"+i.title} style={{width: "30%", height: 'auto', flexDirection: "column", alignItems: "center", padding: 10}}>
                                <View style={{ backgroundColor: i.color, width: 55, height: 55, flexDirection: "row", justifyContent: 'center', alignItems: 'center',borderRadius: 1000, shadowColor: "#000", shadowOffset: {width: 0, height: 2}, shadowOpacity: 0.23, shadowRadius: 2.6, elevation: 4}}>
                                    <Text>{i.icon}</Text>
                                </View>
                            <Text style={{color: "#000", paddingTop: 5, textAlign: 'center'}}>{i.title}</Text>
                        </TouchableOpacity>
                )
                })}
            </View>
        </Card>
    );
};

export default observer(HomeFuncList) ;


const LIST_FUNC_PATIENT = [
    {
        title: "Đặt lịch khám",
        navigate: "appointment",
        color: "#2A629A",
        icon: <IconStethoscope color='#fff'  />,
    },
    {
        title: "Dịch vụ",
        navigate: "service",
        color: "#C73659",
        icon: <MaterialIcons name="home-repair-service" size={24} color="white" />
    },
    {
        title: "Chat với bác sĩ",
        navigate: "",
        color: "#03AED2",
        icon: <IconMessage  color='#fff'/>
    },
    {
        title: "Kết quả khám",
        navigate: "medicalHistory",
        color: "#40A578",
        icon: <IconMediBag  color='#fff'/>
    },
    {
        title: "Thuốc",
        navigate: "",
        color: "#F97300",
        icon: <IconDrug  color='#fff'/>
    },
    {
        title: "Cài đặt",
        navigate: "setting",
        color: "#C7B7A3",
        icon: <IconSetting  color='#fff'/>
    },
]

const LIST_FUNC_DOCTOR = [
    {
        title: "Lịch làm việc",
        navigate: "workSchedule",
        color: "#2A629A",
        icon: <AntDesign name="calendar" size={20} color={colors.white} />
    },
    {
        title: "Chat với bệnh nhân",
        navigate: "",
        color: "#03AED2",
        icon: <IconMessage  color='#fff'/>
    },
    {
        title: "Tài khoản",
        navigate: "user",
        color: "#C7B7A3",
        icon: <IconUser  color='#fff' style={{marginTop: 5}}/>
    },
]
