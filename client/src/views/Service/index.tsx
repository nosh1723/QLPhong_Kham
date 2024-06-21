
import React, { useEffect } from 'react';
import {  ScrollView, Text } from 'react-native';
import ViewComponent from '@/src/components/ViewComponent';
import { View } from 'react-native';
import ServiceList from './ServiceList';
import { useStore } from '@/src/root-store';
import Header from '@/src/components/Header';
import Loading from '@/src/components/Loading';
import { observer } from 'mobx-react';

const Service = () => {
    const { pagingService, pageService, isLoading } = useStore().service

    return (
        <>
        <Loading visible={isLoading}/>
        <Header textHeaderBack='Dịch vụ'/>
            <View style={{flex: 1}}>
                <ScrollView showsVerticalScrollIndicator={false} style={{paddingTop: -10, flexGrow: 1}}>
                    {pageService?.length > 0 && 
                        pageService?.map(item => {
                            return <ServiceList data={item} key={"service" + item?._id}/>
                        })
                    }
                </ScrollView>
            </View>
        </>
    );
};

export default observer(Service);