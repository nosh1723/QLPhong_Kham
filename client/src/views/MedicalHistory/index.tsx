import { View, Text, ScrollView } from 'react-native'
import React from 'react'
import Header from '@/src/components/Header'
import MedicalHistoryList from './MedicalHistoryList'

const MedicalHistoryIndex = ({navigation} :any) => {
    return (
        <>
            <Header textHeaderBack='Kết quả khám' />
            <MedicalHistoryList navigation={navigation}/>
        </>
    )
}

export default MedicalHistoryIndex