import Card from '@/src/components/Card';
import ViewContainer from '@/src/components/ViewContainer';
import { FontAwesome, MaterialIcons } from '@expo/vector-icons';
import React, { useState } from 'react';
import { Modal, Text, View } from 'react-native';
import { AntDesign } from '@expo/vector-icons';
import { Ionicons } from '@expo/vector-icons';
import { IconRight, IconSetting } from '@/src/components/Icon/Icon';
import { TouchableOpacity } from 'react-native';
import { Dialog } from '@rneui/themed';
import { openURL } from 'expo-linking';
import { useDispatch, useSelector } from 'react-redux';
import { authSelector, removeAuth } from '@/src/redux/reducers/authReducer';
import { useNavigation } from '@react-navigation/native';
import { useStore } from '@/src/root-store';
import { formatPhoneNumber } from '@/src/constants/LocalFunction';
import { colors } from '@/src/constants/Colors';
import Backdrop from '@/src/components/Backdrop';
import ModalConfirm from '@/src/components/ModalConfirm';


const UserContent = ({ navigation, showModal, setShowModal }: any) => {
    const auth = useSelector(authSelector)
    const user = auth?.user?.role
    const [isVisible, setIsVisivle] = useState(false)

    const dispatch = useDispatch()

    const { patient } = useStore().user
    const { doctor } = useStore().home

    const userName = user === 'user' ? patient?.name : doctor?.name

    const toggleDialog = () => {
        setIsVisivle(!isVisible)
    }

    const LIST_OPTIONS = [
        {
            name: 'Liên hệ, hỗ trợ',
            icon: <AntDesign name="customerservice" size={24} color="#00b9d1" />,
            iconVector: "",
            onPress: () => openURL("tel:+84367937416")
        },
        {
            name: 'Cài đặt',
            icon: <IconSetting color='black' />,
            iconVector: <IconRight color='black' />,
            navigate: "setting"
        },
        {
            name: 'Đăng xuất',
            icon: <Ionicons name="log-out" size={24} color="#ef4342" />,
            iconVector: "",
            onPress: () => {
                setShowModal(true)
            }
        },
    ]


    return (
        <>
            <View style={{paddingVertical: 50}}>
                <Card>
                    <TouchableOpacity onPress={() => navigation.navigate("userInfo")} style={{ flexDirection: 'row', alignItems: 'center', padding: 5 }}>
                        <View style={{ paddingRight: 10 }}>
                            <FontAwesome name="user-circle-o" size={50} color="#969ba7" />
                        </View>
                        <View style={{ justifyContent: "flex-start" }}>
                            <Text style={{ fontWeight: 600, fontSize: 18 }}>
                                {userName}
                            </Text>
                            <Text>
                                {patient?.phone_number ? formatPhoneNumber(patient?.phone_number) : "Chưa cập nhật"}
                            </Text>
                        </View>
                    </TouchableOpacity>
                </Card>
    
                <Card style={{ paddingVertical: 0, borderRadius: 14 }}>
                    <View>
                        {LIST_OPTIONS?.map((item, index) => {
                            const check = index === LIST_OPTIONS?.length - 1
                            return <TouchableOpacity onPress={item.navigate ? (() => navigation.navigate(item.navigate)) :
                                item.onPress
                            } key={"userOption" + item.name} style={{ flexDirection: 'row', paddingHorizontal: 10, paddingVertical: 15, borderBottomWidth: !check ? .8 : 0, borderColor: !check ? "#f2f2f2" : "", alignItems: 'center' }}>
                                <View style={{ flex: .7, flexDirection: 'row', justifyContent: "flex-start" }}>{item?.icon}</View>
                                <Text style={{ flex: 5 }}>{item?.name}</Text>
                                <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'flex-end' }}>{item?.iconVector}</View>
                            </TouchableOpacity>
                        })}
                    </View>
    
                </Card>
                {/* <Text style={{ paddingHorizontal: 10, paddingTop: 10, color: "#9eabb9", fontSize: 12 }}>
                    Version 3.2.6 (2024052302) - Prod - PUBLISHED
                </Text>  */}
                
            </View>

            <ModalConfirm 
                open={showModal}
                onClose={setShowModal}
                title="Đăng xuất khỏi tài khoản của bạn?"
                onPress={() => dispatch(removeAuth({}))}
            />
        </>
    );
};

export default UserContent;