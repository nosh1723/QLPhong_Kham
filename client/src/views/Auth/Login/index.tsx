import { ScrollView, Text, View, TextInput, StyleSheet, TouchableWithoutFeedback, Keyboard, TouchableOpacity } from "react-native";
import * as React from "react";
import CommonButton from '@/src/components/CommonButton';
import ViewComponent from "@/src/components/ViewComponent";
import { Formik } from "formik";
import { style } from "@/src/styles";
import { useStore } from "@/src/root-store";
import Toast from "react-native-toast-message";
import Loading from "@/src/components/Loading";
import { observer } from "mobx-react";
import * as Yup from "yup"
import { useDispatch } from "react-redux";
import { addAuth } from "@/src/redux/reducers/authReducer";
import { useNavigation } from "@react-navigation/native";

export default observer(function Login() {
    const navigation = useNavigation()
    const dispatch = useDispatch()

    const { user, isLoading,  reset, searchObject, handleLogin} = useStore().auth

    // React.useEffect(() => {
    //     if(user) {
    //         Toast.show({
    //             type: "success",
    //             text1: "Đăng ký thành công"
    //         }) 
    //     }
        
    //     return reset()
    // },[])

    const validationSchema = Yup.object().shape({
        email: Yup.string().nullable().email("Email không đúng định dạng!").required("Không được bỏ trống!"),
        password: Yup.string().nullable().min(6, "Mật khẩu phải dài hơn 6 kí tự").max(24, "Mật khẩu không được quá 24 kí tự").required("Không được bỏ trống!"),
    })
    
    return (
        <Formik
            initialValues={searchObject}
            validationSchema={validationSchema}
            onSubmit={values => {
                handleLogin(values).then(data => {
                    if(Boolean(data)) {
                        dispatch(addAuth(data))
                        const timeout = setTimeout(() => {
                            navigation.navigate('tabs')
                          }, 1500);
                      
                          return () => clearTimeout(timeout);
                    }
                    else console.log(data);
                })
            }}
        >
            {({ values, handleSubmit, handleChange, errors, touched }) => (
                <>
                    <ViewComponent style={{backgroundColor: "#fff", flex: 1 }}>
                        <View style={{paddingHorizontal: 20, paddingTop: 80, flexDirection: "column", justifyContent: "center"}}>
                            <Text style={{fontSize: 30, fontWeight: 600, textAlign: "center", color: "#006778"}}>Đăng nhập</Text>
                            <View style={{marginTop: 50, flexDirection: "column", gap: 24}}>
                                <View style={{paddingHorizontal: 20, flexDirection: "column", gap: 20}}>
                                    <TextInput value={values.email} onChangeText={handleChange("email")} keyboardType="email-address" placeholder="Địa chỉ Email" style={[style.input, {borderRadius: 0,  borderWidth:  0, padding: 16, paddingHorizontal: 0,  fontSize: 18, borderBottomWidth: 2, paddingBottom: 8}]}/>
                                    {touched.email && errors.email &&
                                        <Text style={{color: "red", marginTop: -10}}>{errors.email}</Text>
                                    }
                                    <TextInput value={values.password} onChangeText={handleChange("password")} secureTextEntry={true} placeholder="Mật khẩu" style={[style.input, {borderRadius: 0,  borderWidth: 0, padding: 16, paddingHorizontal: 0, fontSize: 18, borderBottomWidth: 2, paddingBottom: 8}]}/>
                                    {touched.password && errors.password &&
                                        <Text style={{color: "red", marginTop: -10}}>{errors.password}</Text>
                                    }
                                <TouchableOpacity style={{flexDirection: "row", justifyContent: "flex-end", marginVertical: 5}}>
                                    <Text style={{fontWeight: 600, color: "#006778"}}>Quên mật khẩu?</Text>
                                </TouchableOpacity>
                                </View>
                                <CommonButton onPress={handleSubmit} title="Đăng nhập" style={{borderRadius: 12, paddingVertical: 16, marginVertical: 20, marginTop: 12}}/>
                                <View style={{flexDirection: "row", justifyContent: "center"}}>
                                    <Text style={{fontWeight: 500}}>Chưa có tài khoản? </Text> 
                                    <TouchableOpacity onPress={() => navigation.navigate("register")}><Text style={{fontWeight: 600, textDecorationLine: "underline"}}>Đăng ký ngay</Text></TouchableOpacity>
                                </View>
                            </View>
                        </View>
                    </ViewComponent>
                    <Toast position="top" topOffset={70} visibilityTime={2000}/>
                    <Loading visible={isLoading} />
                </>
            )}
        </Formik>
    );
})