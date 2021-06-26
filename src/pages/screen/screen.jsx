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

        this.initParam = Taro.getCurrentInstance().router.params;
        this.logon = this.logon.bind(this);
        this.navigate = this.navigate.bind(this);
    }

    componentDidMount() {
        setTimeout(() => {
            this.synData.time = true;
            this.navigate();
        }, 2300);

        this.logon();
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
            if (this.initParam.forward === "YES") {
                switch (this.initParam.type) {
                    case "JOIN":
                        Taro.redirectTo({url: '/pages/join/join?bhkId=' + this.initParam.bhkId});
                        break;
                    default:
                        Taro.switchTab({url: '/pages/home/home'});
                        break;
                }
            } else {
                Taro.switchTab({url: '/pages/home/home'});
                // Taro.switchTab({url: '/pages/mine/mine'});
                // Taro.navigateTo({url: '/pages/join/join?bhkId=16'});
            }
        }
    }

    render() {
        return (
            <View className='app-content'>
                <View className='load-back'>
                    <View className='load-center'>
                        <View className='load-text'>领跑体育</View>
                    </View>
                    <View className='login-load'>登陆中...</View>
                </View>
            </View>
        )
    }
}
