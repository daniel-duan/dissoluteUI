import React, {Component} from 'react';
import Taro from "@tarojs/taro";
import {Button, Text, View} from '@tarojs/components';
import {AtModal, AtModalAction, AtModalContent, AtModalHeader} from "taro-ui";
import DzLoading from "../../components/loading/DzLoading";

import './entrance.scss'
import TopBar from "../../components/topBar/TopBar";
import {get} from "../../store/global";
import api, {remoteGet} from "../../store/api";
import {cardType, memGet} from "../../store/menber";
import wxPay from "../../util/wxPay";
import CheckMember from "../../components/check/CheckMember";

function Ticket(props) {
    const item = props.item;
    return (
        <View className={props.cardIdx === props.index ? 'i-card active' : 'i-card'} onClick={() => props.cardClick(props.index)}>
            <View className="card-left">
                <View className="price"><Text className='origin'>{item.originPrice}元</Text><Text>折扣价</Text><Text className='promotion'>{item.promoPrice}</Text><Text>元</Text></View>
                <View className='desc'>{item.summary}</View>
            </View>
            <view className="card-right"><Text>{item.ticketName}</Text></view>
            <view className="i-dot"><Text className="dot1"/><Text className="dot2"/><Text className="dot3"/><Text className="dot4"/></view>
        </View>
    );
}

export default class Entrance extends Component {
    constructor(props) {
        super(props);

        this.navHeight = get('navHeight') - 10;
        this.state = {
            cardType: cardType(),
            openLoad: true,
            showModel: false,
            payModel: false,
            cardIdx: -1,
            step: 1,
            ticketList: [],
            ticketName: '',
            price: 0,
            wpPrice: 0,
            period: ''
        };

        this.cardClick = this.cardClick.bind(this);
        this.openModel = this.openModel.bind(this);
        this.submit = this.submit.bind(this);
        this.cashPay = this.cashPay.bind(this);
    }

    componentDidMount() {
        remoteGet(api.enTicket + '?memId=' + memGet('memId'), (res) => {
            this.setState({openLoad: false, ticketList: res.data});
        }, () => this.setState({openLoad: false}));
    }

    cardClick(idx) {
        this.setState({step: 2, cardIdx: idx});
    }

    openModel() {
        if (this.state.cardIdx < 0) {
            Taro.showToast({title: '请选择入场券', icon: 'none', duration: 1500});
            return;
        }

        const card = this.state.ticketList[this.state.cardIdx];
        this.setState({showModel: true, ticketName: card.ticketName, wpPrice: card.originPrice, price: card.promoPrice, period: card.periodDesc});
    }

    submit() {
        this.setState({openLoad: true, showModel: false});

        const card = this.state.ticketList[this.state.cardIdx];
        remoteGet(api.orderTicket + `?memId=${memGet('memId')}&etId=${card.etId}&amount=${this.state.price}`, (res) => {
            const d = res.data;
            if (d === 1) {
                this.setState({openLoad: false, payModel: true});
            } else {
                Taro.redirectTo({url: '/pages/mine/cards/cards'});
            }
        }, () => this.setState({openLoad: false}));
    }

    cashPay() {
        this.setState({openLoad: true, payModel: false});

        const card = this.state.ticketList[this.state.cardIdx];
        const payData = {
            memId: memGet('memId'),
            sourceId: card.etId,
            amount: this.state.wpPrice,
            payType: 1
        };
        wxPay(payData, () => this.setState({openLoad: false}), () => {
            Taro.redirectTo({url: '/pages/mine/cards/cards'});
        });
    }

    render() {
        return (
            <View class='app-content'>
                <CheckMember/>
                <TopBar title='入场券'/>
                <View className='auto-scroll-view' style={{top: this.navHeight}}>
                    <View className='entrance-head'>
                        <View className="dz-steps">
                            <View className={this.state.step >= 1 ? 'dz-item active' : 'dz-item'}><Text>1</Text><View className='tx'>准备入场</View></View>
                            <View className={this.state.step >= 2 ? 'dz-item active' : 'dz-item'}><Text>2</Text><View className='tx'>选择入场券</View></View>
                            <View className={this.state.step >= 3 ? 'dz-item active' : 'dz-item'}><Text>3</Text><View className='tx'>购买</View></View>
                            <View className={this.state.step >= 4 ? 'dz-item active' : 'dz-item'}><Text>4</Text><View className='tx'>人脸识别入场</View></View>
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
                        {this.state.ticketList.map((item, idx) => <Ticket key={idx} item={item} index={idx} cardIdx={this.state.cardIdx} cardType={this.state.cardType} cardClick={this.cardClick}/>)}
                    </View>
                    <View className='button-hold'>
                        <dzButton onClick={this.openModel}>确定</dzButton>
                    </View>
                </View>
                <AtModal isOpened={this.state.showModel}>
                    <AtModalHeader>入场券信息确认</AtModalHeader>
                    <AtModalContent>
                        <View className='modal-line'><View className='name'>入场券</View><View className='info'>{this.state.ticketName}</View></View>
                        <View className='modal-line'><View className='name'>优惠价格</View><View className='info'>{this.state.price} 元</View></View>
                        <View className='modal-line'><View className='name'>到期时间</View><View className='info'>{this.state.period}</View></View>
                        <View className='modal-line'><View className='name'>温馨提示</View><View className='info'>购买前如有任何问题请提前电话咨询</View></View>
                    </AtModalContent>
                    <AtModalAction>
                        <Button onClick={() => this.setState({showModel: false})}>取消</Button>
                        <Button className='submit-btn' onClick={this.submit}>确认支付</Button>
                    </AtModalAction>
                </AtModal>
                <AtModal isOpened={this.state.payModel}>
                    <AtModalHeader>账户余额不足</AtModalHeader>
                    <AtModalContent>
                        <View className='modal-line'><View className='name'>入场券</View><View className='info'>{this.state.ticketName}</View></View>
                        <View className='modal-line'><View className='name'>实际价格</View><View className='info'>{this.state.wpPrice} 元</View></View>
                        <View className='modal-line'><View className='name'>到期时间</View><View className='info'>{this.state.period}</View></View>
                        <View className='modal-line'><View className='name'>温馨提示</View><View className='info'>购买前如有任何问题请提前电话咨询</View></View>
                        <View className='tips-line'>账户余额不足，您可使用微信支付，但不能享受会员优惠。您确认使用微信支付吗？</View>
                    </AtModalContent>
                    <AtModalAction>
                        <Button onClick={() => this.setState({payModel: false})}>取消</Button>
                        <Button className='submit-btn' onClick={this.cashPay}>微信支付</Button>
                    </AtModalAction>
                </AtModal>
                <DzLoading open={this.state.openLoad}/>
            </View>
        )
    }
}
