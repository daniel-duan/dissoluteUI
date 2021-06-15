import React, {Component} from 'react';
import {Button, Text, View} from '@tarojs/components';
import {AtModal, AtModalAction, AtModalContent, AtModalHeader} from "taro-ui";
import DzLoading from "../../components/loading/DzLoading";

import './entrance.scss'
import TopBar from "../../components/topBar/TopBar";
import {get} from "../../store/global";
import Taro from "@tarojs/taro";

export default class Entrance extends Component {
    constructor(props) {
        super(props);

        this.navHeight = get('navHeight') - 10;
        this.state = {
            openLoad: false,
            showModel: false,
            cardIdx: -1,
            step: 1
        };

        this.cardList = [];

        this.cardClick = this.cardClick.bind(this);
        this.openModel = this.openModel.bind(this);
    }

    cardClick(idx) {
        this.setState({step: 2, cardIdx: idx});
    }

    openModel() {
        if (this.state.cardIdx < 0) {
            Taro.showToast({title: '请选择入场券', icon: 'none', duration: 1500});
            return;
        }
        this.setState({showModel: true});
    }

    render() {
        return (
            <View class='app-content'>
                <TopBar title='入场券'/>
                <View className='auto-scroll-view' style={{top: this.navHeight}}>
                    <View className='entrance-head'>
                        <View className="dz-steps">
                            <View className={this.state.step >= 1 ? 'dz-item active' : 'dz-item'}><Text>1</Text><View className='tx'>准备入场</View></View>
                            <View className={this.state.step >= 2 ? 'dz-item active' : 'dz-item'}><Text>2</Text><View className='tx'>选择入场券</View></View>
                            <View className={this.state.step >= 3 ? 'dz-item active' : 'dz-item'}><Text>3</Text><View className='tx'>购买</View></View>
                            <View className={this.state.step >= 4 ? 'dz-item active' : 'dz-item'}><Text>3</Text><View className='tx'>人脸识别入场</View></View>
                        </View>
                    </View>
                    <View className='entrance-tips'>
                        <View className='summary'>友情提示</View>
                        <View className='item'>
                            <View className='key'>1.</View>
                            <View className='body'>入场券购买之后不可退款</View>
                        </View>
                        <View className='item'>
                            <View className='key'>2.</View>
                            <View className='body'>请在入场券有效期内出入场地</View>
                        </View>
                        <View className='item'>
                            <View className='key'>3.</View>
                            <View className='body'>不同入场券入场时段具体可咨询前台</View>
                        </View>
                    </View>

                    <View className="card-hold">
                        <View className={this.state.cardIdx === 0 ? 'i-card active' : 'i-card'} onClick={() => this.cardClick(0)}>
                            <View className="card-left">
                                <View className="price"><Text className='origin'>234元</Text><Text>折扣价</Text><Text className='promotion'>234</Text><Text>元</Text></View>
                                <View className='desc'>胜多负少发送到发送到发手动阀撒大声地范德萨发送到发手动阀撒大声地范德萨发生</View>
                            </View>
                            <view className="card-right"><Text>畅打卡畅打</Text></view>
                            <view className="i-dot"><Text className="dot1"/><Text className="dot2"/><Text className="dot3"/><Text className="dot4"/></view>
                        </View>

                        <View className="i-card">
                            <View className="card-left">
                                <View className="price"><Text className='origin'>234元</Text><Text>折扣价</Text><Text className='promotion'>234</Text><Text>元</Text></View>
                                <View className='desc'>胜多负少发送到发送到发手动阀撒大声地范德萨发送到发手动阀撒大声地范德萨发生</View>
                            </View>
                            <view className="card-right"><Text>畅打卡畅打</Text></view>
                            <view className="i-dot"><Text className="dot1"/><Text className="dot2"/><Text className="dot3"/><Text className="dot4"/></view>
                        </View>
                    </View>
                    <View className='button-hold'>
                        <dzButton onClick={this.openModel}>确定</dzButton>
                    </View>
                </View>
                <AtModal isOpened={this.state.showModel}>
                    <AtModalHeader>入场券信息确认</AtModalHeader>
                    <AtModalContent>
                        <View className='modal-line'><View className='name'>类型</View><View className='info'>{''}</View></View>
                        <View className='modal-line'><View className='name'>实际价格</View><View className='info'>{''}</View></View>
                        <View className='modal-line'><View className='name'>到期时间</View><View className='info'>{''}</View></View>
                        <View className='modal-line'><View className='name'>温馨提示</View><View className='info'>购买前如有任何问题请提前电话咨询</View></View>
                    </AtModalContent>
                    <AtModalAction>
                        <Button onClick={() => this.setState({showModel: false})}>取消</Button>
                        <Button className='submit-btn' onClick={this.submit}>确认支付</Button>
                    </AtModalAction>
                </AtModal>
                <DzLoading open={this.state.openLoad}/>
            </View>
        )
    }
}
