import React, {Component} from 'react';
import Taro from "@tarojs/taro";
import {Button, Input, View} from '@tarojs/components';
import {AtModal, AtModalAction, AtModalContent, AtModalHeader} from "taro-ui";

import './recharge.scss'
import TopBar from "../../components/topBar/TopBar";
import {get} from "../../store/global";
import DzLoading from "../../components/loading/DzLoading";
import {getMemType, memGet} from "../../store/menber";
import wxPay from "../../util/wxPay";
import CheckMember from "../../components/check/CheckMember";
import api, {remoteGet} from "../../store/api";

function AmtItem(props) {
    const amt = props.amt;
    return (
        <View className='item'>
            <View className={props.amtIdx === props.idx ? 'recharge-item active' : 'recharge-item'} onClick={() => props.amtChange(props.idx)}>
                <View>￥{amt.recAmount}</View>
                {amt.promoAmount > 0 && <View className='promo'>赠送{amt.promoAmount}元</View>}
            </View>
        </View>
    );
}

export default class Recharge extends Component {
    constructor(props) {
        super(props);

        this.navHeight = get('navHeight');
        this.amtReg = /^[1-9]\d*$/;
        this.state = {
            openLoad: true,
            showModel: false,
            amtIdx: -1,
            amount: '',
            amtList: []
        };

        this.amtChange = this.amtChange.bind(this);
        this.selfAmtChange = this.selfAmtChange.bind(this);
        this.validate = this.validate.bind(this);
        this.submit = this.submit.bind(this);
    }

    componentDidMount() {
        remoteGet(api.rechargeList + '?memId=' + memGet('memId'), (res) => {
            this.setState({openLoad: false, amtList: res.data});
        });
    }

    amtChange(idx) {
        const amount = idx === 100 ? '' : this.state.amtList[idx].recAmount;
        this.setState({amtIdx: idx, amount: amount});
    }

    selfAmtChange(e) {
        const amt = e.detail.value;
        if (this.amtReg.test(amt)) {
            this.setState({amount: e.detail.value});
        } else if (amt === '') {
            this.setState({amount: ''});
        } else {
            this.forceUpdate();
        }
    }

    validate() {
        if (this.state.amount === '') {
            Taro.showToast({title: '请选择/输入充值金额', icon: 'none', duration: 1500});
            return;
        }
        const amount = parseInt(this.state.amount);
        if (amount <= 0) {
            Taro.showToast({title: '请选择/输入合法的充值金额', icon: 'none', duration: 1500});
            return;
        }
        this.setState({showModel: true});
    }

    submit() {
        this.setState({showModel: false, openLoad: true});
        const payData = {
            memId: memGet('memId'),
            amount: this.state.amount,
            payType: 3
        };
        wxPay(payData, () => this.setState({openLoad: false}), () => {
            Taro.redirectTo({url: '/pages/mine/balance/balance'});
        });
    }

    render() {
        return (
            <View class='app-content'>
                <CheckMember/>
                <TopBar title='账户充值'/>
                <View className='auto-scroll-view' style={{top: this.navHeight}}>
                    <View className='recharge-hold'>
                        {this.state.amtList.map((amt, idx) => <AmtItem amt={amt} amtIdx={this.state.amtIdx} idx={idx} amtChange={this.amtChange}/>)}
                        <View className='item'>
                            <View className={this.state.amtIdx === 100 ? 'recharge-item active' : 'recharge-item'} onClick={() => this.amtChange(100)}>自定义金额</View>
                        </View>
                        {this.state.amtIdx === 100 && <View className='self-hold'>
                            <Input className='self-amount' type='number' value={this.state.amount} placeholder='请输入金额' onInput={this.selfAmtChange}/>
                        </View>}
                    </View>
                    <View className='recharge-desc'>
                        <View className='item'>
                            <View className='head'>1.</View>
                            <View className='body'>个人用户单次充值200元以上成为银卡会员</View>
                        </View>
                        <View className='item'>
                            <View className='head'>2.</View>
                            <View className='body'>个人用户单次充值500元以上成为金卡会员</View>
                        </View>
                        <View className='item'>
                            <View className='head'>3.</View>
                            <View className='body'>团体用户单次充值3000元以上成为银卡会员</View>
                        </View>
                        <View className='item'>
                            <View className='head'>4.</View>
                            <View className='body'>团体用户单次充值5000元以上成为金卡</View>
                        </View>
                        <View className='item'>
                            <View className='head'>5.</View>
                            <View className='body'>团体用户单次充值10000元以上成为钻石卡</View>
                        </View>
                    </View>

                    <View className='sure-hold'>
                        <dzButton onClick={this.validate}>下一步</dzButton>
                    </View>
                </View>
                <AtModal isOpened={this.state.showModel}>
                    <AtModalHeader>充值信息确认</AtModalHeader>
                    <AtModalContent>
                        <View className='modal-line'><View className='name'>充值金额</View><View className='info'>￥{this.state.amount}</View></View>
                        <View className='modal-line'><View className='name'>当前会员类型</View><View className='info'>{getMemType()}</View></View>
                    </AtModalContent>
                    <AtModalAction>
                        <Button onClick={() => this.setState({showModel: false})}>取消</Button>
                        <Button className='submit-btn' onClick={this.submit}>确认充值</Button>
                    </AtModalAction>
                </AtModal>
                <DzLoading open={this.state.openLoad}/>
            </View>
        )
    }
}
