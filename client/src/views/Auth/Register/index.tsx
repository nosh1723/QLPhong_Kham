import CommonButton from '@/src/components/CommonButton';
import Loading from "@/src/components/Loading";
import ViewComponent from "@/src/components/ViewComponent";
import { useStore } from "@/src/root-store";
import { style } from "@/src/styles";
import { useNavigation } from "@react-navigation/native";
import { Formik } from "formik";
import { observer } from "mobx-react";
import { useEffect, useState } from 'react';
import { Platform, Text, TextInput, TouchableOpacity, View } from "react-native";
import Toast from "react-native-toast-message";
import * as Yup from "yup";

export default observer(function LoginRes() {
    const navigation = useNavigation()
    const [limit, setLimit] = useState(0)
    const isIos = Platform.OS === "ios"

    const { isLoading, code, searchObject, handleSendEmailCode, handleRegister} = useStore().auth

    useEffect(() => {
        if(limit > 0) {
            const interval = setInterval(() => {
                setLimit(limit - 1)
            }, 1000)
            return () => clearInterval(interval)
        }
    }, [limit])

    const validationSchema = Yup.object().shape({
        email: Yup.string().nullable().email("Email không đúng định dạng!").required("Không được bỏ trống!"),
        password: Yup.string().nullable().min(6, "Mật khẩu phải dài hơn 6 kí tự").max(24, "Mật khẩu không được quá 24 kí tự").required("Không được bỏ trống!"),
        repassword: Yup.string().nullable().min(6, "Mật khẩu phải dài hơn 6 kí tự").max(24, "Mật khẩu không được quá 24 kí tự").required("Không được bỏ trống!").oneOf([Yup.ref('password'), ''], 'Mật khẩu khớp!')
    })
  
    return (
        <Formik
            initialValues={{
                ...searchObject,
                code: '',
                repassword: "",
            }}
            validationSchema={validationSchema}
            onSubmit={async (values) => {
                if(limit > 0) {
                    if(code === values?.code){
                        const newValues = {
                            email: values.email,
                            password: values.password
                        } 
                        await handleRegister(newValues)
                        navigation.navigate('login')
                    }else Toast.show({
                        type: 'error',
                        text1: "Mã xác thực sai!!"
                    })
                }else Toast.show({
                    type: "error",
                    text1: values.code ? "Mã xác thực hết hạn!!" : "Chưa nhập mã xác thực"
                })
            }}
        >
            {({ values, handleChange, handleSubmit, errors, touched }) => (
                <ViewComponent style={{backgroundColor: "#fff" }}>
                    <View style={{width: "100%", height: "100%", position: "relative"}}>
                        <View style={{paddingHorizontal: 20, paddingTop: 80, flexDirection: "column", justifyContent: "center"}}>
                            <Text style={{fontSize: 30, fontWeight: 600, textAlign: "center", color: "#006778"}}>Đăng ký</Text>
                            <View style={{marginTop: 50, flexDirection: "column", gap: 24}}>
                                <View style={{paddingHorizontal: 20, flexDirection: "column", gap: 20}}>
                                    <TextInput value={values?.email} onChangeText={handleChange('email')} keyboardType="email-address" placeholder="Địa chỉ Email" style={[style.input, {borderRadius: 0,  borderWidth:  0, padding: 16, paddingHorizontal: 0,  fontSize: 18, borderBottomWidth: 2, paddingBottom: 8}]}/>
                                    {touched.email && errors.email &&
                                        <Text style={{color: "red", marginTop: -10}}>{errors.email}</Text>
                                    }
                                    <View style={[style.input, {borderRadius: 0,  borderWidth:  0, padding: 16, paddingHorizontal: 0,  borderBottomWidth: 2, paddingBottom: 5, flexDirection: "row", justifyContent: "space-between", alignItems: "center"}]}>
                                        <TextInput value={values?.code} onChangeText={handleChange("code")} keyboardType="number-pad" placeholder="Nhập mã xác thực của bạn" style={{ fontSize: 18,}}/>
                                        <TouchableOpacity disabled={limit > 0 } style={{ borderLeftWidth: 1.5, borderColor: "#ccc", width: 50, flexDirection: "row", justifyContent: "center"}} onPress={() => {
                                            setLimit(120)
                                            handleSendEmailCode(values)
                                        }}>
                                            <Text style={{ fontSize: 18, color: limit > 0 ? "#ccc" : "#006778", fontWeight: 500, textDecorationLine: limit > 0 ? "none" : "underline", paddingVertical: 3}}>
                                                {limit > 0 ? limit : "Gửi"}
                                            </Text>
                                        </TouchableOpacity>
                                    </View>
                                    <TextInput value={values.password} onChangeText={handleChange("password")} secureTextEntry={true} placeholder="Mật khẩu" style={[style.input, {borderRadius: 0,  borderWidth: 0, padding: 16, paddingHorizontal: 0, fontSize: 18, borderBottomWidth: 2, paddingBottom: 8}]}/>
                                    {touched.password && errors.password &&
                                        <Text style={{color: "red", marginTop: -10}}>{errors.password}</Text>
                                    }
                                    <TextInput value={values.repassword} onChangeText={handleChange("repassword")} secureTextEntry={true} placeholder="Nhập lại mật khẩu" style={[style.input, {borderRadius: 0,  borderWidth: 0, padding: 16, paddingHorizontal: 0, fontSize: 18, borderBottomWidth: 2, paddingBottom: 8}]}/>
                                    {touched.repassword && errors.repassword &&
                                        <Text style={{color: "red", marginTop: -10}}>{errors.repassword}</Text>
                                    }
                                </View>
                                <CommonButton onPress={handleSubmit} title="Đăng ký" style={{borderRadius: 12, paddingVertical: 16, marginVertical: 20, marginTop: 12}}/>
                                <View style={{flexDirection: "row", justifyContent: "center"}}>
                                    <Text style={{fontWeight: 500}}>Đã có tài khoản? </Text> 
                                    <TouchableOpacity onPress={() => navigation.navigate("login")}><Text style={{fontWeight: 600, textDecorationLine: "underline"}}>Đăng nhập</Text></TouchableOpacity>
                                </View>
                            </View>
                        </View>
                        <Loading visible={isLoading} />
                    </View>
                </ViewComponent>
            )}
        </Formik>
    );
})