import { View, Text, ScrollView, TouchableOpacity } from 'react-native'
import React from 'react'
import Header from '@/src/components/Header'
import { Image } from '@rneui/themed'
import { colors } from '@/src/constants/Colors'
import { useStore } from '@/src/root-store'
import { observer } from 'mobx-react'
import { formatCurrency } from '@/src/constants/LocalFunction'
import { IconRight } from '@/src/components/Icon/Icon'

const ServiceDetailIndex = ({ route }) => {
    const { name, id } = route.params
    const { selectServiceCat } = useStore().service

    return (
        <>
            <Header textHeaderBack={name} />
            <ScrollView style={{ padding: 12 }}>
                {selectServiceCat?.length > 0 &&
                    selectServiceCat?.map(i => (
                        <View key={"service detail" + i?._id} style={{ padding: 6, flexDirection: 'row', alignItems: 'center', gap: 10, backgroundColor: colors.white, borderRadius: 10 , marginBottom: 12}}>
                            <Image containerStyle={{ width: 100, height: 100, borderRadius: 10, }} source={{ uri: "https://i.pinimg.com/736x/7d/9d/ed/7d9ded7751b328b1000bcfe4c1dc7727.jpg" }} />
                            <View style={{ flexDirection: 'column', paddingRight: 10, maxWidth: '76%' }}>
                                <View style={{ minHeight: 50, flexDirection: 'column',width: '96%', gap: 4  }}>
                                    <Text style={{ fontWeight: 500, fontSize: 15 }}>{i?.name}</Text>
                                    <Text numberOfLines={3} style={{ opacity: .6}}>{i?.description}</Text>
                                </View>
                                <View style={{ flexDirection: 'row', justifyContent: "space-between", marginTop: 8, width: '96%' }}>
                                    <Text style={{color: colors.blue}}>{formatCurrency(i?.price)}</Text>
                                    <TouchableOpacity style={{flexDirection: 'row', alignItems: "center"}}>
                                        <Text style={{fontWeight: 500, color: colors.green}}>Đặt lịch</Text>
                                        <IconRight size={18} color={colors.green}/>
                                    </TouchableOpacity>
                                </View>
                            </View>
                        </View>
                    ))
                }

            </ScrollView>
        </>
    )
}

export default observer(ServiceDetailIndex); 