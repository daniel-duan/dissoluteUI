import React, {Component} from 'react';
import Taro from "@tarojs/taro";
import {Button, Image, Picker, Text, View} from '@tarojs/components';
import {AtModal, AtModalAction, AtModalContent, AtModalHeader} from "taro-ui";

import './book.scss'
import {get} from "../../store/global";
import TopBar from "../../components/topBar/TopBar";
import DzLoading from "../../components/loading/DzLoading";
import map from '../../assets/image/map.png';
import {dateFormat, dateTrans} from '../../util/utils';
import api, {remoteGet, remotePost} from "../../store/api";
import {cardType, memGet} from "../../store/menber";

const timePeriod = ['08:00', '10:00', '12:00', '14:00', '16:00', '18:00', '20:00', '22:00'];

function getTimePeriod(pes) {
    const first = pes[0];
    const last = pes[pes.length - 1];

    return timePeriod[first] + '-' + timePeriod[last + 1];
}

function getPrice(ct, snp) {
    switch (ct) {
        case 1:
            return snp.sliverPrice;
        case 2:
            return snp.goldPrice;
        default:
            return snp.originPrice;
    }
}

function GetSite(props) {
    if (props.siteType === 1) {
        return (
            <React.Fragment>
                <View className={props.siteNumber === 'S1' ? 'site1 active' : 'site1'} onClick={() => props.mapClick('S1')}/>
                <View className={props.siteNumber === 'S2' ? 'site2 active' : 'site2'} onClick={() => props.mapClick('S2')}/>
            </React.Fragment>
        );
    }
    return (
        <React.Fragment>
            <View className={props.siteNumber === 'H1' ? 'seg1 active' : 'seg1'} onClick={() => props.mapClick('H1')}/>
            <View className={props.siteNumber === 'H2' ? 'seg2 active' : 'seg2'} onClick={() => props.mapClick('H2')}/>
            <View className={props.siteNumber === 'H3' ? 'seg3 active' : 'seg3'} onClick={() => props.mapClick('H3')}/>
            <View className={props.siteNumber === 'H4' ? 'seg4 active' : 'seg4'} onClick={() => props.mapClick('H4')}/>
            <View className={props.siteNumber === 'H5' ? 'seg5 active' : 'seg5'} onClick={() => props.mapClick('H5')}/>
            <View className={props.siteNumber === 'H6' ? 'seg6 active' : 'seg6'} onClick={() => props.mapClick('H6')}/>
            <View className={props.siteNumber === 'H7' ? 'seg7 active' : 'seg7'} onClick={() => props.mapClick('H7')}/>
            <View className={props.siteNumber === 'H8' ? 'seg8 active' : 'seg8'} onClick={() => props.mapClick('H8')}/>
        </React.Fragment>
    );
}

function timeCls(type) {
    switch (type) {
        case 1:
            return 'booked';
        case 2:
            return 'booked';
        case 3:
            return 'book-now';
        default:
            return 'available';
    }
}

function TimeSegment(props) {
    if (props.booked.length === 0) return <View className='time'/>;

    return (
        <View className='time'>
            <View className='time-item'>
                <View className='seg-name'>早晨</View>
                <View className='seg'><View className={timeCls(props.booked[0])} onClick={() => props.timeItem(0)}>{props.timeSeg[0]}</View></View>
                <View className='seg'><View className={timeCls(props.booked[1])} onClick={() => props.timeItem(1)}>{props.timeSeg[1]}</View></View>
            </View>
            <View className='time-item'>
                <View className='seg-name'>下午</View>
                <View className='seg'><View className={timeCls(props.booked[2])} onClick={() => props.timeItem(2)}>{props.timeSeg[2]}</View></View>
                <View className='seg'><View className={timeCls(props.booked[3])} onClick={() => props.timeItem(3)}>{props.timeSeg[3]}</View></View>
                <View className='seg'><View className={timeCls(props.booked[4])} onClick={() => props.timeItem(4)}>{props.timeSeg[4]}</View></View>
            </View>
            <View className='time-item'>
                <View className='seg-name'>晚上</View>
                <View className='seg'><View className={timeCls(props.booked[5])} onClick={() => props.timeItem(5)}>{props.timeSeg[5]}</View></View>
                <View className='seg'><View className={timeCls(props.booked[6])} onClick={() => props.timeItem(6)}>{props.timeSeg[6]}</View></View>
            </View>
        </View>
    );
}

export default class Book extends Component {
    constructor(props) {
        super(props);

        this.navHeight = get('navHeight');
        this.originState = {
            openLoad: true,
            showModel: false,
            payModel: false,
            siteNumber: '',
            totalAmt: 0,
            totalHour: 0,
            bookDate: '',
            booked: [],
            timeDetail: '',
            siteName: '',
            siteType: 1,//1 全场 2半场
            dateText: '',
            priceList: [],
            originTotal: 0,
            bhkId: 0
        };
        this.state = Object.assign({}, this.originState);

        this.cardType = cardType();
        this.dateRange = [];
        this.timeSeg = ['08:00-10:00', '10:00-12:00', '12:00-14:00', '14:00-16:00', '16:00-18:00', '18:00-20:00', '20:00-22:00'];
        let now = new Date();
        this.dateRange.push(dateFormat(now));
        this.dateRange.push(dateFormat(new Date(new Date().setDate(now.getDate() + 1))));
        this.dateRange.push(dateFormat(new Date(new Date().setDate(now.getDate() + 2))));
        this.dateRange.push(dateFormat(new Date(new Date().setDate(now.getDate() + 3))));
        this.dateRange.push(dateFormat(new Date(new Date().setDate(now.getDate() + 4))));
        this.dateRange.push(dateFormat(new Date(new Date().setDate(now.getDate() + 5))));
        this.dateRange.push(dateFormat(new Date(new Date().setDate(now.getDate() + 6))));

        this.mapClick = this.mapClick.bind(this);
        this.dateClick = this.dateClick.bind(this);
        this.siteTypeClick = this.siteTypeClick.bind(this);
        this.timeItem = this.timeItem.bind(this);
        this.calculate = this.calculate.bind(this);
        this.validate = this.validate.bind(this);
        this.submit = this.submit.bind(this);
        this.wxPay = this.wxPay.bind(this);
    }

    componentDidMount() {
        remoteGet(api.bookPrice, (res) => {
            this.priceList = res.data;
            this.setState({openLoad: false});
        })
    }

    mapClick(idx) {
        if (this.state.siteNumber !== idx) {
            const snp = this.priceList.find(item => item.siteKey === idx);
            const price = getPrice(this.cardType, snp);
            this.setState({siteNumber: idx, booked: [], siteName: snp.siteName, priceList: [price, price, price, price, price, price, price]});
            this.calculate({siteNumber: idx, bookDate: this.state.bookDate});
        }
    }

    dateClick(e) {
        const bkDate = this.dateRange[e.detail.value];
        const date = dateTrans(bkDate);
        this.setState({bookDate: date, dateText: bkDate, booked: []});
        this.calculate({siteNumber: this.state.siteNumber, bookDate: date});
    }

    siteTypeClick(type) {
        if (type !== this.state.siteType) {
            this.setState({siteType: type, siteNumber: '', booked: []});
        }
    }

    calculate(state) {
        if (state.siteNumber !== '' && state.bookDate !== '') {
            const url = api.bookData + `?bookDate=${state.bookDate}&siteNumber=${state.siteNumber}`;
            remoteGet(url, (res) => {
                console.log(res);
                if (res.data !== null) {

                } else {
                    this.setState({booked: [0, 0, 0, 0, 0, 0, 0]});
                }
            })
        }
    }

    //{'1':'已预订','2':'已锁定', '3':'当前已选'}
    timeItem(idx) {
        const status = this.state.booked[idx];
        if (status === 1 || status === 2) return;

        if (status === 3) {
            this.state.booked[idx] = 0;
        } else {
            this.state.booked[idx] = 3;
        }

        let hour = 0, price = 0;
        this.state.booked.forEach((st, idx) => {
            if (st === 3) {
                price += this.state.priceList[idx];
                hour += 2;
            }
        });
        this.setState({totalAmt: price, totalHour: hour});
    }

    validate() {
        if (this.state.siteNumber === '') {
            Taro.showToast({title: '请选择场地', icon: 'none', duration: 1500});
            return;
        }
        if (this.state.bookDate === '') {
            Taro.showToast({title: '请选择预定日期', icon: 'none', duration: 1500});
            return;
        }

        const segment = [];
        let price = 0;
        this.state.booked.forEach((st, idx) => {
            if (st === 3) {
                segment.push(idx);
                price += this.state.priceList[idx];
            }
        });

        if (segment.length === 0 || price <= 0) {
            Taro.showToast({title: '请选择时段', icon: 'none', duration: 1500});
            return;
        }

        if (segment.length > 1) {
            let succession = true;
            let num = segment[0];
            for (let i = 0; i < segment.length; i++) {
                if (segment[i] !== num++) {
                    succession = false;
                    break;
                }
            }
            if (!succession) {
                Taro.showToast({title: '请选择连续的时间段', icon: 'none', duration: 1500});
                return;
            }
        }

        this.setState({showModel: true, totalAmt: price, timeDetail: getTimePeriod(segment)});
    }

    submit() {
        this.setState({openLoad: true, showModel: false});
        const data = {
            memId: memGet('memId'),
            siteType: this.state.siteType,
            siteNumber: this.state.siteNumber,
            bookDate: this.state.bookDate,
            bookPeriod: this.state.timeDetail,
            bookHour: this.state.totalHour,
            payAmount: this.state.totalAmt
        };
        remotePost(api.orderBooking, data, (res) => {
            const rd = res.data;
            if (rd === null) {
                Taro.showToast({title: '支付失败，核对订单数据有误', icon: 'none', duration: 2000});
            } else if (rd.bookStatus === 0) {
                {
                }
                this.setState({openLoad: false, payModel: true, originTotal: rd.payAmount, bhkId: rd.bhkId});
            } else {
                Taro.navigateTo({url: '/pages/mine/bookList/bookList'});
                this.setState(Object.assign(this.originState, {openLoad: false}));//还原
            }
        })
    }

    wxPay() {
        this.setState({openLoad: true, payModel: false});
    }

    render() {
        return (
            <View class='app-content'>
                {/*<CheckMember/>*/}
                <TopBar nav={false} title='场馆预定'/>
                <View className='auto-scroll-view' style={{top: this.navHeight}}>
                    <View className='book-map'>
                        <Image src={map} mode='widthFix'/>
                        <GetSite siteType={this.state.siteType} siteNumber={this.state.siteNumber} mapClick={this.mapClick}/>
                    </View>
                    <View className='book-item'>
                        <View className='item'>
                            <View className='title'>请选择场地类型</View>
                            <View className='site'>
                                <View className={this.state.siteType === 1 ? 'type active' : 'type'} onClick={() => this.siteTypeClick(1)}>全场</View>
                                <View className={this.state.siteType === 2 ? 'type active' : 'type'} onClick={() => this.siteTypeClick(2)}>半场</View>
                            </View>
                        </View>
                    </View>
                    <View className='book-item'>
                        <View className='item'>
                            <View className='title'>请选择日期</View>
                            <Picker mode='selector' range={this.dateRange} onChange={this.dateClick}><View className='date'>{this.state.dateText}</View></Picker>
                        </View>
                    </View>
                    <View className='book-item'>
                        <View className='item'>
                            <View className='title'>请选择时间段</View>
                            <TimeSegment booked={this.state.booked} timeSeg={this.timeSeg} timeItem={this.timeItem}/>
                        </View>
                    </View>
                    <View className='book-summary'>
                        共<Text>{this.state.totalHour}</Text>小时， 总额：<Text>{this.state.totalAmt}</Text> 元
                    </View>
                    <View className='button-hold'>
                        <dzButton onClick={this.validate}>确定</dzButton>
                    </View>
                </View>
                <AtModal isOpened={this.state.showModel}>
                    <AtModalHeader>场馆预定信息确认</AtModalHeader>
                    <AtModalContent>
                        <View className='modal-line'><View className='name'>场地</View><View className='info'>{this.state.siteName}</View></View>
                        <View className='modal-line'><View className='name'>预定日期</View><View className='info'>{this.state.bookDate}</View></View>
                        <View className='modal-line'><View className='name'>预定时段</View><View className='info'>{this.state.timeDetail}</View></View>
                        <View className='modal-line'><View className='name'>优惠总额</View><View className='info'>{this.state.totalAmt} 元</View></View>
                        <View className='tips-line'>在线场地预定均不支持开票。如需开票请咨询前台，了解开票预定价格。</View>
                    </AtModalContent>
                    <AtModalAction>
                        <Button onClick={() => this.setState({showModel: false})}>取消</Button>
                        <Button className='submit-btn' onClick={this.submit}>确认支付</Button>
                    </AtModalAction>
                </AtModal>
                <AtModal isOpened={this.state.payModel}>
                    <AtModalHeader>账户余额不足</AtModalHeader>
                    <AtModalContent>
                        <View className='modal-line'><View className='name'>场地</View><View className='info'>{this.state.siteName}</View></View>
                        <View className='modal-line'><View className='name'>预定日期</View><View className='info'>{this.state.bookDate}</View></View>
                        <View className='modal-line'><View className='name'>预定时段</View><View className='info'>{this.state.timeDetail}</View></View>
                        <View className='modal-line'><View className='name'>总金额</View><View className='info'>{this.state.originTotal} 元</View></View>
                        <View className='tips-line'>账户余额不足，您可使用微信支付，但不能享受会员优惠。您确认使用微信支付吗？</View>
                    </AtModalContent>
                    <AtModalAction>
                        <Button onClick={() => this.setState({payModel: false})}>取消</Button>
                        <Button className='submit-btn' onClick={this.wxPay}>微信支付</Button>
                    </AtModalAction>
                </AtModal>
                <DzLoading open={this.state.openLoad}/>
            </View>
        )
    }
}
