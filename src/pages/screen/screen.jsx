import React from 'react';
import Taro from "@tarojs/taro";
import {View} from '@tarojs/components';
import "taro-ui/dist/style/components/textarea.scss";
import "taro-ui/dist/style/components/modal.scss";
import './screen.scss'
import api from "../../store/api";
import {cacheMem} from "../../store/menber";

export default class Screen extends React.Component {
    constructor(props) {
        super(props);

        this.synData = {
            login: false,
            time: false
        };

        this.logon = this.logon.bind(this);
        this.navigate = this.navigate.bind(this);
    }

    componentDidMount() {
        setTimeout(() => {
            this.synData.time = true;
            this.navigate();
        }, 2300);

        //this.logon();
    }

    logon() {
        const that = this;
        Taro.login({
            success: function (res) {
                if (res.code) {
                    //发起网络请求
                    Taro.request({
                        url: api.login,
                        data: {code: res.code},
                        success: suc => {
                            if (suc.data.success) {
                                //缓存用户基本信息
                                cacheMem(suc.data.data);
                                that.synData.login = true;
                                that.navigate();
                            } else {
                                Taro.showModal({content: '无法连接服务器，请稍后再试', showCancel: false, confirmText: "等下再来"})
                            }
                        },
                        fail: () => {
                            Taro.showModal({content: '无法连接服务器，请稍后再试', showCancel: false, confirmText: "等下再来"})
                        }
                    })
                } else {
                    Taro.showModal({content: '无法连接服务器，请稍后再试', showCancel: false, confirmText: "等下再来"})
                }
            }
        });
    }

    navigate() {
        if (this.synData.login === true && this.synData.time === true) {
            Taro.switchTab({url: '/pages/focus/focus'});
            // Taro.navigateTo({url: '/temple/pages/quiz/quiz?tempId=1'});
        }
    }

    render() {
        return (
            <View className='app-content'>
                <View className='load-back'>
                    <View className='load-center'>
                        {/*<Image className='load-logo' src={logo} mode='widthFix'/>*/}
                    </View>
                    <View className='login-load'>登陆中...</View>
                </View>
            </View>
        )
    }
}
