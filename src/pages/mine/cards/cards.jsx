import React, {Component} from 'react'
import {View} from '@tarojs/components'

import './cards.scss'
import TopBar from "../../../components/topBar/TopBar";
import DzScrollView from "../../../components/view/DzScrollView";
import DzLoading from "../../../components/loading/DzLoading";
import {get} from "../../../store/global";
import api, {remotePost} from "../../../store/api";
import {memGet} from "../../../store/menber";
import CheckMember from "../../../components/check/CheckMember";

function CardItem(props) {
    const item = props.item;
    return (
        <View className='tab-item'>
            <View className='content'>
                <View className='header'>{item.ticketName}</View>
                <View className='line'><View className='head'>入场时间</View><View className='body'>{item.startTime}</View></View>
                <View className='line'><View className='head'>出场时间</View><View className='body'>{item.endTime}</View></View>
            </View>
        </View>
    );
}

export default class Cards extends Component {
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
        remotePost(api.myTicket, {
            memId: memGet('memId'),
            paging: {
                current: this.state.curPage + 1
            }
        }, (res) => {
            const pag = res.paging;
            const ind = pag.total === 0 ? 4 : (pag.total > (pag.current * pag.page) ? 1 : 2);
            const list = this.state.dataList;
            this.setState({openLoad: false, indicator: ind, curPage: pag.current, dataList: list.concat(res.data)});
        });
    }

    render() {
        return (
            <View class='app-content'>
                <CheckMember/>
                <TopBar title='我的卡券'/>
                <DzScrollView top={this.navHeight} indicator={this.state.indicator} bottomFn={this.scrollBottom}>
                    {this.state.dataList.map((item, idx) => <CardItem key={idx} item={item}/>)}
                </DzScrollView>
                <DzLoading open={this.state.openLoad}/>
            </View>
        )
    }
}
