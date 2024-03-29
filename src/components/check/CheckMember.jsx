import React from 'react';
import Taro, {eventCenter, getCurrentInstance} from "@tarojs/taro";
import {Button, View} from '@tarojs/components';
import {cacheUserInfo, isMember} from '../../store/menber';
import DzLoading from "../loading/DzLoading";

export default class CheckMember extends React.Component {
    constructor(props) {
        super(props);

        const memStatus = isMember() ? 1 : 0;
        this.state = {
            status: memStatus//0 未注册 1已注册 2正在注册
        };

        this.getUserInfo = this.getUserInfo.bind(this);
        this.onShow = this.onShow.bind(this);
        this.cancelOnShow = this.cancelOnShow.bind(this);

        if (memStatus === 0) {
            this.eventId = getCurrentInstance().router.onShow;
            eventCenter.on(this.eventId, this.onShow);
        }
    }

    onShow() {
        if (isMember()) {
            this.setState({status: 1});
            this.cancelOnShow();
            //回调函数
            if (this.props.callback) {
                this.props.callback();
            }
        }
    };

    cancelOnShow() {
        eventCenter.off(this.eventId, this.onShow);
    }

    getUserInfo() {
        const that = this;
        wx.getUserProfile({
            desc: '领跑体育需要完善您的会员资料', // 声明获取用户个人信息后的用途，后续会展示在弹窗中，请谨慎填写
            success: (res) => {
                cacheUserInfo(res.userInfo);
                Taro.navigateTo({url: '/pages/register/register'})
            }
        })
    }

    render() {
        if (this.state.status === 1) return null;
        if (this.state.status === 2) return <DzLoading open={true}/>;

        return (
            <View className='dz-checking'>
                <View className='check-cnt'>
                    <View className='text'>您还不是会员，点击注册领跑体育，成为我们的尊贵会员。</View>
                    <View className='check-btn-group'>
                        <Button className='btn' onClick={() => Taro.switchTab({url: '/pages/home/home'})}>退出</Button>
                        <Button className='btn' openType='getUserInfo' onClick={this.getUserInfo}>注册领跑体育</Button>
                    </View>
                </View>
            </View>
        )
    }
}

CheckMember.defaultProps = {
    callback: null
};

CheckMember.propTypes = {
    callback: Function
};
