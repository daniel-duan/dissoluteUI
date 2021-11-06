import React, {Component} from 'react'
import {View} from '@tarojs/components'

import './order.scss'
import TopBar from "../../../components/topBar/TopBar";
import DzLoading from "../../../components/loading/DzLoading";
import DzScrollView from "../../../components/view/DzScrollView";
import api, {remotePost} from "../../../store/api";
import {memGet} from "../../../store/menber";
import {get} from "../../../store/global";
import CheckMember from "../../../components/check/CheckMember";

//1':'入场券微信支付','2':'订场券微信支付','3':'充值'
function orderType(type) {
    switch (type) {
        case 1:
            return "入场券微信支付";
        case 2:
            return "订场券微信支付";
        case 3:
            return "账户充值";
        default:
            return "";
    }
}

function OrderItem(props) {
    const item = props.item;
    return (
        <View className='tab-item'>
            <View className='content'>
                <View className='header'>{orderType(item.payType)}</View>
                <View className='line'><View className='head'>账单金额</View><View className='body'>{item.amount}</View></View>
                <View className='line'><View className='head'>账单日期</View><View className='body'>{item.createDate}</View></View>
            </View>
        </View>
    );
}

export default class Order extends Component {
    constructor(props) {
        super(props);

        this.navHeight = get('navHeight');
        this.state = {
            openLoad: false,
            indicator: 0,//0：不需要、1：下拉加载更多、2：已经到底了、3：加载中、4：没有内容
            curPage: 0,
            dataList: []
        };

        this.scrollBottom = this.scrollBottom.bind(this);
        this.loadData = this.loadData.bind(this);
    }

    componentDidMount() {
        this.loadData();
    }

    scrollBottom() {
        if (this.state.indicator === 1) {
            this.setState({indicator: 3});
            this.loadData();
        }
    }

    loadData() {
        remotePost(api.payList, {
            memId: memGet('memId'),
            paging: {
                current: this.state.curPage + 1
            }
        }, (res) => {
            const pag = res.paging;
            const ind = pag.total === 0 ? 4 : (pag.total > (pag.current * pag.page) ? 1 : 2);
            const list = this.state.dataList;
            this.setState({openLoad: false, indicator: ind, curPage: pag.current, dataList: list.concat(res.data)});
        }, () => this.setState({openLoad: false}));
    }

    render() {
        return (
            <View class='app-content'>
                <CheckMember/>
                <TopBar title='账单记录'/>
                <DzScrollView top={this.navHeight} indicator={this.state.indicator} bottomFn={this.scrollBottom}>
                    {this.state.dataList.map((item, idx) => <OrderItem key={idx} item={item}/>)}
                </DzScrollView>
                <DzLoading open={this.state.openLoad}/>
            </View>
        )
    }
}
