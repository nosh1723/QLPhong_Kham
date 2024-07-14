
import React, { useEffect } from 'react';
import {  ScrollView, Text } from 'react-native';
import ViewComponent from '@/src/components/ViewComponent';
import { View } from 'react-native';
import ServiceList from './ServiceList';
import { useStore } from '@/src/root-store';
import Header from '@/src/components/Header';
import Loading from '@/src/components/Loading';
import { observer } from 'mobx-react';

const Service = ({navigation}: any) => {
    const { listServiceByCate, isLoading } = useStore().service

    return (
        <>
        <Loading visible={isLoading}/>
        <Header textHeaderBack='Dịch vụ'/>
            <View style={{flex: 1}}>
                <ScrollView style={{paddingTop: -10, flexGrow: 1}}>
                    {listServiceByCate?.length > 0 && 
                        listServiceByCate?.map((item: any) => {
                            return <ServiceList data={item} key={"service" + item?._id} navigation={navigation}/>
                        })
                    }
                </ScrollView>
            </View>
        </>
    );
};

export default observer(Service);