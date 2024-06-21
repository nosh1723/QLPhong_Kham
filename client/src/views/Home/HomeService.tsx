import CommonButton from '@/src/components/CommonButton';
import ViewContainer from '@/src/components/ViewContainer';
import { useStore } from '@/src/root-store';
import { useNavigation } from '@react-navigation/native';
import { observer } from 'mobx-react';
import React, { useEffect } from 'react';
import { ScrollView, Text, View } from 'react-native';

const HomeService = () => {
    const navigation = useNavigation()

    const { pagingService, pageService, isLoading } = useStore().service

    useEffect(() => {
        pagingService()
    }, [])

    return (
        <ViewContainer onPress={() => navigation.navigate("service")} title='Dịch vụ' >
            <>
                {pageService?.map((i, index) => {
                    if(index > 1) return
                    return (
                        <CommonButton key={"homesv" + i?._id} style={{width: "100%", flexDirection: "column", alignItems: "start", borderBottomWidth: index === 1 ? 0 : 1, borderColor: "#ddd", paddingBottom: 10, marginBottom: 10 }} color='transparent' onPress={() => navigation.navigate("appointment")}>
                            <Text style={{fontWeight: 600, fontSize: 14, paddingBottom: 15, }}>{i?.name}</Text>
                            {i?.services?.map(sv => {
                                return (
                                    <Text key={"homesv1" + sv?._id} style={{opacity: .7, paddingBottom: 5, fontSize: 12}}><Text style={{fontWeight: 600}}>{sv?.name}:</Text> {sv?.description}</Text>
                                )
                            })}
                                    {/* <Text style={{fontSize: 12, color: "#006778"}}>Xem thêm</Text> */}
                        </CommonButton>
                    )
                }
                    
                )}
                {/* <CommonButton title='Xem tất cả các dịch vụ'  style={{width: "100%", borderRadius: 100 }}  onPress={() => navigation.navigate("service")}/> */}
            </>
        </ViewContainer>
    );
};

export default observer(HomeService) ;