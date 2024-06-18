import { View, Text } from 'react-native'
import React from 'react'

export default function Backdrop() {
  return (
    <View style={{ height: "100%", width: "100%", backgroundColor: "#ddd", opacity: .5, position: "absolute" }}></View>
  )
}