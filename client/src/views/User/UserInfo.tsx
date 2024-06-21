import ViewComponent from '@/src/components/ViewComponent';
import React, { useEffect } from 'react';
import { ScrollView, Text, View, StyleSheet, TouchableOpacity } from 'react-native';
import { Octicons } from '@expo/vector-icons';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import Header from '@/src/components/Header';
import { useStore } from '@/src/root-store';
import Loading from '@/src/components/Loading';
import { observer } from 'mobx-react';
import { getDate, getGenderFomat } from '@/src/constants/LocalFunction';
import { authSelector } from '@/src/redux/reducers/authReducer';
import { useSelector } from 'react-redux';

const UserInfo = () => {
    const auth = useSelector(authSelector)
    const navigation = useNavigation()

    const { patient, isLoading, getPatient } = useStore().user

    useEffect(() => {
        getPatient(auth?.user?.email)
    },[])
    return (
        <>
        <Loading visible={isLoading}/>
        <Header textHeaderBack='Thông tin cá nhân'/>
            <ViewComponent style={{backgroundColor: "#fff", flex: 1}}>
                <ScrollView showsVerticalScrollIndicator={false} style={{flexGrow: 1}}>
                    <View style={{padding: 15, }}>
                        <View style={[style.View , {marginBottom: 25}]}>
                            <View style={[style.flexRow, {alignItems: 'center'}]}>
                                <Octicons name="person" size={18} color="#006778" style={{paddingRight: 3}}/>                        
                                <Text style={[style.Text, {color: "#006778"}]}>Thông tin cơ bản</Text>
                            </View>
                           
                            <TouchableOpacity onPress={() => navigation.navigate("userEdit")}><Text style={[style.Text, {color: "#006778"}]}>Điều chỉnh</Text></TouchableOpacity>
                        </View>
                        <View style={[style.View, {marginBottom: 15}]}>
                            <View>
                                <Text style={[style.Text, {color: "#62718b"}]}>Mã bệnh nhân</Text>
                                <Text style={[style.Text, {}]}>{patient?.code || "Chưa cập nhật"}</Text>
                            </View>
                            <TouchableOpacity ><Ionicons name="copy-outline" size={20} color="black" /></TouchableOpacity>
                        </View>
                        <View style={[style.View, {marginBottom: 15}]}>
                            <View>
                                <Text style={[style.Text, {color: "#62718b"}]}>Mã bảo hiểm y tế</Text>
                                <Text style={[style.Text, {}]}>{patient?.health_insurance_code || "Chưa cập nhật"}</Text>
                            </View>
                            <TouchableOpacity ><Ionicons name="copy-outline" size={20} color="black" /></TouchableOpacity>
                        </View>
                        <View style={[style.View, {marginBottom: 15}]}>
                            <View>
                                <Text style={[style.Text, {color: "#62718b"}]}>Họ và tên</Text>
                                <Text style={[style.Text, {}]}>{patient?.name || "Chưa cập nhật"}</Text>
                            </View>
                        </View>
                        <View style={[style.View, {marginBottom: 15}]}>
                            <View>
                                <Text style={[style.Text, {color: "#62718b"}]}>Email</Text>
                                <Text style={[style.Text, {}]}>{patient?.email || "Chưa cập nhật"}</Text>
                            </View>
                        </View>
                        <View style={[style.View, {marginBottom: 15}]}>
                            <View>
                                <Text style={[style.Text, {color: "#62718b"}]}>Số điện thoại</Text>
                                <Text style={[style.Text, {}]}>{patient?.phone_number || "Chưa cập nhật"}</Text>
                            </View>
                        </View>
                        <View style={[style.View, {marginBottom: 15}]}>
                            <View>
                                <Text style={[style.Text, {color: "#62718b"}]}>Ngày sinh</Text>
                                <Text style={[style.Text, {}]}>{getDate(patient?.birth_date) || "Chưa cập nhật"}</Text>
                            </View>
                        </View>
                        <View style={[style.View, {marginBottom: 15}]}>
                            <View>
                                <Text style={[style.Text, {color: "#62718b"}]}>Giới tính</Text>
                                <Text style={[style.Text, {}]}>{getGenderFomat(patient?.gender) || "Chưa cập nhật"}</Text>
                            </View>
                        </View>
                        <View style={[style.View, {marginBottom: 15}]}>
                            <View>
                                <Text style={[style.Text, {color: "#62718b"}]}>Địa chỉ</Text>
                                <Text style={[style.Text, {}]}>{patient?.address || "Chưa cập nhật"}</Text>
                            </View>
                        </View>
                        <View style={[style.View, {marginBottom: 15}]}>
                            <View>
                                <Text style={[style.Text, {color: "#62718b"}]}>Dân tộc</Text>
                                <Text style={[style.Text, {}]}>{patient?.ethnic || "Chưa cập nhật"}</Text>
                            </View>
                        </View>
                    </View>
                    
                </ScrollView>
            </ViewComponent>
        </>
       
        
    );
};

export default observer(UserInfo);

const style = StyleSheet.create({
    Text: {
        fontSize: 16,
        fontWeight: 500
    },
    flexRow: {
        flexDirection: 'row'
    },
    View: {
        flexDirection: 'row',
        alignItems: "center",
        justifyContent: "space-between"
    }
})