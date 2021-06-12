import React from 'react';
import Taro from '@tarojs/taro';
import {Button, View} from '@tarojs/components';
import {hadPhone, memGet} from '../../store/menber';
import './Check.scss';
import api from "../../store/api";

export default class CheckPhone extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            hasPhone: memGet('hasPhone') === true
        };

        this.getPhone = this.getPhone.bind(this);
    }

    getPhone(e) {
        const detail = e.detail;
        if (detail.encryptedData) {
            Taro.request({
                url: api.regPhone + `?memId=${memGet('memId')}`,
                method: "POST",
                data: {
                    sessionKey: memGet('session'),
                    encrypted: detail.encryptedData,
                    iv: detail.iv
                },
                success: () => {
                    hadPhone();
                    this.setState({hasPhone: true});
                }
            });
        }
    }


    render() {
        if (this.state.hasPhone) return null;

        return (
            <View className='dz-check-back'>
                <View className='dz-check-cnt'>
                    <View className='text'>禅福缘需要获取您的电话号码，方便与您联系。</View>
                    <View className='bn-service-law' onClick={() => Taro.navigateTo({url: '/pages/policy/policy'})}>点击查看福缘善服务协议、用户隐私政策及免责说明</View>
                    <Button className='btn' openType='getPhoneNumber' onGetPhoneNumber={this.getPhone}>同意</Button>
                </View>
            </View>
        )
    }
}
