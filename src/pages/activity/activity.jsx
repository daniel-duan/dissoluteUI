import React, {Component} from 'react';
import Taro from "@tarojs/taro";
import {Image, View} from '@tarojs/components';

import api, {remoteGet, remotePost} from "../../store/api";
import {get} from "../../store/global";
import './activity.scss'
import DzScrollView from "../../components/view/DzScrollView";
import TopBar from "../../components/topBar/TopBar";
import DzLoading from "../../components/loading/DzLoading";
import {hasLiked, setLike} from "../../util/localHistory";
import {memGet} from "../../store/menber";

function numFmt(num) {
    if (num >= 10000) {
        return parseInt(num / 10000) + 'w+';
    } else if (num >= 1000) {
        return parseInt(num / 1000) + 'k+';
    } else {
        return num;
    }
}

function ActItem(props) {
    const item = props.item;
    return (
        <View className='dz-act-card'>
            <View className='card-op eye'>{numFmt(item.paView)}</View>
            <View className='card-op card-click good' onClick={() => props.events.likeHandle(item.paId)}>{numFmt(item.paLike)}</View>
            <dzPaper border={false} onClick={() => props.events.itemClick(item.paId)}>
                <View className='card'>
                    <View className='card-img'>
                        {item.paTag && <View className='tag'>{item.paTag}</View>}
                        <Image src={item.paImage} mode='aspectFill'/>
                    </View>
                    <View className='title'>{item.paTitle}</View>
                    <View className='time'>{item.createDate}</View>
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
        this.itemClick = this.itemClick.bind(this);
        this.likeHandle = this.likeHandle.bind(this);
        this.loadData = this.loadData.bind(this);

        this.events = {
            itemClick: this.itemClick,
            likeHandle: this.likeHandle
        }
    }

    componentDidMount() {
        this.loadData();
    };

    onShareAppMessage() {
        return {
            title: `领跑体育`,
            path: '/pages/screen/screen',
            imageUrl: 'https://lingpaobasketball.com/file/wechat/lingpao_share.jpg'
        };
    }

    itemClick(paId) {
        Taro.navigateTo({url: '/pages/web/webView?type=1&id=' + paId});
    }

    likeHandle(paId) {
        const hasLike = hasLiked('1', paId);
        if (!hasLike) {
            remoteGet(api.addLike + `?sourceId=${paId}&type=1&memId=${memGet('memId')}`, () => {
                setLike('1', paId);
                const act = this.state.dataList.find(item => item.paId === paId);
                if (act !== undefined) {
                    act.paLike = act.paLike + 1;
                    this.forceUpdate();
                }
            });
        }
    }

    scrollBottom() {
        if (this.state.indicator === 1) {
            this.setState({indicator: 3});
            this.loadData();
        }
    }

    loadData() {
        const url = api.activityFind;
        remotePost(url, {
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
                <TopBar nav={false} title='活动·资讯'/>
                <DzScrollView top={this.navHeight} indicator={this.state.indicator} bottomFn={this.scrollBottom}>
                    {this.state.dataList.map(item => <ActItem key={item.taId} item={item} events={this.events}/>)}
                </DzScrollView>
                <DzLoading open={this.state.openLoad}/>
            </View>
        )
    }
}
