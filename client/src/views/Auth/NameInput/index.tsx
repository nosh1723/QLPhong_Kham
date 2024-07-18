import { View, Text, TextInput } from 'react-native'
import React from 'react'
import { Formik } from 'formik'
import ViewComponent from '@/src/components/ViewComponent'
import Loading from '@/src/components/Loading'
import Toast from 'react-native-toast-message'
import CommonButton from '@/src/components/CommonButton'
import { useStore } from '@/src/root-store'
import { style } from '@/src/styles'
import { observer } from 'mobx-react'

const NameInput = ({navigation}: any) => {
    const { patient, createOrUpdatePatient, isLoading } = useStore().user
    
  return (
    <Formik
            initialValues={patient}
            onSubmit={(values) => {
                createOrUpdatePatient(values)
            }}
        >
            {({ values, handleSubmit, handleChange, errors, touched }) => (
                <>
                    <Loading visible={isLoading}/>
                    <ViewComponent style={{backgroundColor: "#fff", flex: 1 }}>
                        <View style={{paddingHorizontal: 30, paddingTop: 80, flexDirection: "column", justifyContent: "center"}}>
                            <View style={{marginTop: 50, flexDirection: "column", gap: 24}}>
                                <View style={{ flexDirection: "column", gap: 20}}>
                                <TextInput placeholder='Họ và tên của bạn' value={values.name} onChangeText={handleChange('name')} style={[style.input, {borderRadius: 0,  borderWidth:  0, padding: 16, paddingHorizontal: 0,  fontSize: 18, borderBottomWidth: 2, paddingBottom: 8}]}/>
                                    {/* {touched.email && errors.email &&
                                        <Text style={{color: "red", marginTop: -10}}>{errors.email}</Text>
                                    } */}
                                </View>
                                <CommonButton onPress={handleSubmit} title="Tiếp tục" style={{borderRadius: 12, paddingVertical: 12, marginVertical: 16, marginTop: 12}}/>
                            </View>
                        </View>
                    </ViewComponent>
                    <Toast position="top" topOffset={70} visibilityTime={2000}/>
                    <Loading visible={false} />
                </>
            )}
        </Formik>
  )
}

export default observer(NameInput) 