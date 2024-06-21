import { View, Text, SafeAreaView, ScrollView } from 'react-native'
import React from 'react'
import Header from '@/src/components/Header'

const MessageScreen = () => {
  return (

    <>
        <Header textHeaderBack='Bác sĩ Lê văn lmao'></Header>
        <ScrollView style={{flexGrow: 1}}>
          <Text>mes123sageScreen</Text>
        </ScrollView>
    </>
   
  )
}

export default MessageScreen