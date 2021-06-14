import React, {Component} from 'react';
import {Button, Image, Text, View} from '@tarojs/components';
import {AtModal, AtModalAction, AtModalContent, AtModalHeader} from "taro-ui";

import './book.scss'
import {get} from "../../store/global";
import TopBar from "../../components/topBar/TopBar";
import DzLoading from "../../components/loading/DzLoading";
import map from '../../assets/image/map.png';
import Taro from "@tarojs/taro";

export default class Book extends Component {
    constructor(props) {
        super(props);

        this.navHeight = get('navHeight');
        this.state = {
            openLoad: false,
            showModel: true,
            site: 0,
            totalAmt: 0,
            totalTime: 0,
            bookDate: '2021年6月14日',
            siteName: ['全场A', '全场B', '半场1', '半场2', '半场3', '半场4'],
            booked: ['booked', 'available', 'booked', 'available', 'available', 'available', 'booked'],
            timeSeg: ['08:00-10:00', '10:00-12:00', '12:00-14:00', '14:00-16:00', '16:00-18:00', '18:00-20:00', '20:00-22:00'],
            timeDetail: '',
            prices: [12, 14, 15, 15, 14, 14, 14]
        };

        this.mapClick = this.mapClick.bind(this);
        this.timeItem = this.timeItem.bind(this);
        this.validate = this.validate.bind(this);
        this.submit = this.submit.bind(this);
    }

    mapClick(idx) {
        this.setState({site: idx});
    }

    timeItem(idx) {
        const cls = this.state.booked[idx];
        if (cls === 'booked') return;

        if (cls === 'available') {
            this.state.booked[idx] = 'book-now';
        } else {
            this.state.booked[idx] = 'available';
        }

        let time = 0, price = 0;
        this.state.booked.forEach((name, idx) => {
            if (name === 'book-now') {
                price += this.state.prices[idx];
                time += 2;
            }
        });
        this.setState({totalAmt: price, totalTime: time});
    }

    validate() {
        if (this.state.site === 0) {
            Taro.showToast({title: '请选择场地', icon: 'none', duration: 1500});
            return;
        }
        if (this.state.bookDate === '') {
            Taro.showToast({title: '请选择预定日期', icon: 'none', duration: 1500});
            return;
        }

        const time = [];
        let price = 0;
        this.state.booked.forEach((name, idx) => {
            if (name === 'book-now') {
                time.push(this.state.timeSeg[idx]);
                price += this.state.prices[idx];
            }
        });

        if (time.length === 0 || price <= 0) {
            Taro.showToast({title: '请选择时段', icon: 'none', duration: 1500});
            return;
        }
        this.setState({showModel: true, totalAmt: price, timeDetail: time.join(', ')});
    }

    submit() {
        this.setState({openLoad: true, showModel: false});
    }

    render() {
        return (
            <View class='app-content'>
                <TopBar nav={false} title='场馆预定'/>
                <View className='auto-scroll-view' style={{top: this.navHeight}}>
                    <View className='book-map'>
                        <Image src={map} mode='widthFix'/>
                        <View className={this.state.site === 1 ? 'seg1 active' : 'seg1'} onClick={() => this.mapClick(1)}/>
                        <View className={this.state.site === 2 ? 'seg2 active' : 'seg2'} onClick={() => this.mapClick(2)}/>
                        <View className={this.state.site === 3 ? 'seg3 active' : 'seg3'} onClick={() => this.mapClick(3)}/>
                        <View className={this.state.site === 4 ? 'seg4 active' : 'seg4'} onClick={() => this.mapClick(4)}/>
                        <View className={this.state.site === 5 ? 'seg5 active' : 'seg5'} onClick={() => this.mapClick(5)}/>
                        <View className={this.state.site === 6 ? 'seg6 active' : 'seg6'} onClick={() => this.mapClick(6)}/>
                    </View>
                    <View className='book-item'>
                        <View className='item'>
                            <View className='title'>请选择日期</View>
                            <View className='date'>2021年6月13日</View>
                        </View>
                    </View>
                    <View className='book-item'>
                        <View className='item'>
                            <View className='title'>请选择时间段</View>
                            <View className='time'>
                                <View className='time-item'>
                                    <View className='seg-name'>早晨</View>
                                    <View className='seg'><View className={this.state.booked[0]} onClick={() => this.timeItem(0)}>{this.state.timeSeg[0]}</View></View>
                                    <View className='seg'><View className={this.state.booked[1]} onClick={() => this.timeItem(1)}>{this.state.timeSeg[1]}</View></View>
                                </View>
                                <View className='time-item'>
                                    <View className='seg-name'>下午</View>
                                    <View className='seg'><View className={this.state.booked[2]} onClick={() => this.timeItem(2)}>{this.state.timeSeg[2]}</View></View>
                                    <View className='seg'><View className={this.state.booked[3]} onClick={() => this.timeItem(3)}>{this.state.timeSeg[3]}</View></View>
                                    <View className='seg'><View className={this.state.booked[4]} onClick={() => this.timeItem(4)}>{this.state.timeSeg[4]}</View></View>
                                </View>
                                <View className='time-item'>
                                    <View className='seg-name'>晚上</View>
                                    <View className='seg'><View className={this.state.booked[5]} onClick={() => this.timeItem(5)}>{this.state.timeSeg[5]}</View></View>
                                    <View className='seg'><View className={this.state.booked[6]} onClick={() => this.timeItem(6)}>{this.state.timeSeg[6]}</View></View>
                                </View>
                            </View>
                        </View>
                    </View>
                    <View className='book-summary'>
                        共<Text>2</Text>小时， 总额：<Text>2</Text> 元
                    </View>
                    <View className='button-hold'>
                        <dzButton onClick={this.validate}>确定</dzButton>
                    </View>
                </View>
                <AtModal isOpened={this.state.showModel}>
                    <AtModalHeader>场馆预定信息确认</AtModalHeader>
                    <AtModalContent>
                        <View className='modal-line'><View className='name'>场地</View><View className='info'>{this.state.siteName[this.state.site]}</View></View>
                        <View className='modal-line'><View className='name'>预定日期</View><View className='info'>{this.state.bookDate}</View></View>
                        <View className='modal-line'><View className='name'>预定时段</View><View className='info'>{this.state.timeDetail}</View></View>
                        <View className='modal-line'><View className='name'>优惠总额</View><View className='info'>{this.state.totalAmt} 元</View></View>
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
