import CommonButton from '@/src/components/CommonButton';
import Header from '@/src/components/Header';
import ViewComponent from "@/src/components/ViewComponent";
import { AntDesign, Foundation } from '@expo/vector-icons';
import { useNavigation } from "@react-navigation/native";
import * as React from "react";
import { useState } from "react";
import { StyleSheet, Text, TextInput, View } from "react-native";

export default function ChangePassword() {
    const navigation = useNavigation()
    const [password1, setPassword1] = useState('');
    const [password2, setPassword2] = useState('');
    const [password3, setPassword3] = useState('');
    const handleSetPassword1 = () => {
        setPassword1('Nhập mật khẩu');
    };

    const handleSetPassword2 = () => {
        setPassword2('Mật khẩu mới');
    };

    const handleSetPassword3 = () => {
        setPassword3('Nhập lại mật khẩu mới');
    };

    return (
       <>
            <Header textHeaderBack='Đổi mật khẩu'/>
            <ViewComponent style={{flex: 1}}>
                <View style={[styles.container, {flexGrow: 1}]}>
                    < View style={{ flex: 1, justifyContent: 'flex-start' }}>
                        <View>
                            <Text style={{ color: '#000000', fontSize: 14, fontWeight: '500' }}>Mật khẩu hiện tại</Text>
                            <View style={{ flexDirection: 'row', borderWidth: 1, borderRadius: 10, marginTop: 8, borderColor: "#d3d5d9" }}>
                                <Foundation name="key" size={11} color="black" style={{ marginTop: 15, borderWidth: 1, height: 17, borderRadius: 5, padding: 2, marginLeft: 13 }} />
                                <TextInput style={{ height: 45, paddingHorizontal: 15, fontWeight: '400', fontSize: 15 }} placeholder="Nhập mật khẩu của bạn hiện tại" value={password1} onChangeText={setPassword1} secureTextEntry={true} ></TextInput>
                            </View>
                        </View>
                        <View>
                            <Text style={{ color: '#000000', fontSize: 14, fontWeight: '500', marginTop: 10 }}>Mật khẩu mới</Text>
                            <View style={{ flexDirection: 'row', borderWidth: 1, borderRadius: 10, marginTop: 8, borderColor: "#d3d5d9" }}>
                                <Foundation name="key" size={11} color="black" style={{ marginTop: 15, borderWidth: 1, height: 17, borderRadius: 5, padding: 2, marginLeft: 13 }} />
                                <TextInput style={{ height: 45, paddingHorizontal: 15, fontWeight: '400', fontSize: 15 }} placeholder="Mật khẩu mới" value={password2} onChangeText={setPassword2} secureTextEntry={true} ></TextInput>
                            </View>
                        </View>
                        <View>
                            <Text style={{ color: '#000000', fontSize: 14, fontWeight: '500', marginTop: 10 }}>Nhập lại mật khẩu mới</Text>
                            <View style={{ flexDirection: 'row', borderWidth: 1, borderRadius: 10, marginTop: 8, borderColor: "#d3d5d9" }}>
                                <Foundation name="key" size={11} color="black" style={{ marginTop: 15, borderWidth: 1, height: 17, borderRadius: 5, padding: 2, marginLeft: 13 }} />
                                <TextInput style={{ height: 45, paddingHorizontal: 15, fontWeight: '400', fontSize: 15 }} placeholder="Nhập lại mật khẩu mới" value={password3} onChangeText={setPassword3} secureTextEntry={true} ></TextInput>
                            </View>
                        </View>
                        <View style={{ flexDirection: "row" }}>
                            <AntDesign name="check" size={13} color="black" style={{ marginTop: 17 }} />
                            <Text style={{ marginTop: 15, marginLeft: 10, fontWeight: "300" }}>Mật khẩu phải có ít nhất 6 ký tự</Text>
                        </View>
                    </View>
                    <View style={{ flex: 3, justifyContent: 'flex-end', }}>
                        <View>
                            <CommonButton style={{}} title="Thay đổi"></CommonButton>
                        </View>
                    </View>
                </View>
            </ViewComponent >
       </>
      
    );
}
const styles = StyleSheet.create({
    container: {
        flexDirection: 'column',
        flex: 1,
        backgroundColor: '#FFFFFF',
        padding: 10,

    },

})