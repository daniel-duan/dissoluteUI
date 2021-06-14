import React, {Component} from 'react';
import {View} from '@tarojs/components';

import api, {remotePost} from "../../store/api";
import {get} from "../../store/global";
import {memGet} from "../../store/menber";
import './activity.scss'
import DzScrollView from "../../components/view/DzScrollView";
import TopBar from "../../components/topBar/TopBar";
import DzLoading from "../../components/loading/DzLoading";

function ActItem(props) {
    const item = props.item;
    return (
        <View className='dz-act-card'>
            <dzPaper onClick={() => props.itemEvent.clickHandle(item)}>
                <View className={''}>
                    <View className='dz-card-head'>
                        <Image className='c-avatar' src={item.tempAvatar} mode='aspectFill'/>
                        <View className='dz-card-title'>
                            <View className='c-title'>{item.actTitle}</View>
                            <View className='c-time'>{item.templeName}</View>
                        </View>
                    </View>
                    <View className='dz-card-desc'>{item.actDesc}</View>
                    <View className='dz-card-img'>
                        <Image className='c-img' src={item.actImage} mode='aspectFill'/>
                    </View>
                    <View className='dz-card-bt'>{item.createDate}</View>
                </View>
            </dzPaper>
        </View>
    );
}

export default class Activity extends Component {
    constructor(props) {
        super(props);

        this.navHeight = get('navHeight');
        this.state = {
            openLoad: true,
            indicator: 0,//0：不需要、1：下拉加载更多、2：已经到底了、3：加载中、4：没有内容
            curPage: 0,
            dataList: []
        };

        this.scrollBottom = this.scrollBottom.bind(this);
        this.clickHandle = this.clickHandle.bind(this);
        this.loadData = this.loadData.bind(this);

        this.itemEvent = {
            clickHandle: this.clickHandle
        }
    }

    componentDidMount() {
        // this.loadData();
    };

    clickHandle() {

    }

    scrollBottom() {
        if (this.state.indicator === 1) {
            this.setState({indicator: 3});
            this.loadData();
        }
    }

    loadData() {
        const url = api.tempAct + '?memId=' + memGet('memId');
        remotePost(url, {
            paging: {
                current: this.state.curPage + 1
            }
        }, (suc) => {
            const pag = suc.data.paging;
            const ind = pag.total === 0 ? 4 : (pag.total > (pag.current * pag.page) ? 1 : 2);
            const list = this.state.dataList;
            this.setState({openLoad: false, indicator: ind, curPage: pag.current, dataList: list.concat(suc.data.data)});
        });
    }

    render() {
        return (
            <View class='app-content'>
                <TopBar nav={false} title='活动·资讯'/>
                <DzScrollView indicator={this.state.indicator} bottomFn={this.scrollBottom}>
                    {this.state.dataList.map(item => <ActItem key={item.taId} item={item} itemEvent={this.itemEvent}/>)}
                </DzScrollView>
                <DzLoading open={this.state.openLoad}/>
            </View>
        )
    }
}
