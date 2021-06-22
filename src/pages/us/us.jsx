import React, {Component} from 'react';
import {Button, View} from '@tarojs/components';

import './us.scss';
import TopBar from "../../components/topBar/TopBar";
import {get} from "../../store/global";

export default class Us extends Component {
    constructor(props) {
        super(props);
        this.navHeight = get('navHeight');
    }

    render() {
        return (
            <View className='app-content'>
                <TopBar title='关于我们'/>
                <View className='auto-scroll-view' style={{top: this.navHeight}}>
                    <View className='us-content'>
                        <View className='us-title'>宁夏领跑体育科技有限责任公司</View>
                        <View className='us-summery'>领距领跑体育运动中心简介：</View>
                        <View className='us-sec'>宁夏领跑体育运动中心位于宁夏银川市金凤万达商圈南侧(尹家渠街与新昌路交汇处详安巷66号),于2021年3月动工建设,将于2021年6月20日正式对外营业。</View>
                        <View className='us-sec'>领跑体育中心是宁夏首家集篮球、羽毛球、乒乓球等综合性私人专业运动体育场馆。</View>
                        <View className='us-sec'>宁夏领跑体育运动中心室内空间2400平米，包含2个全场4个半场及羽毛球场地4块供各位体验，球馆层高11米，视野开阔，良好的保温层设计，双龙骨运动木地板、人脸识别门禁系统是您良好运动体验的绝对保障球馆外设有停车场，不用再为停车发愁！</View>
                        <View className='us-sec'>现在球馆正在如火如荼的装修中，预计六月二十日开始营业，届时欢迎广大运动爱好者前来体验。</View>
                        <View className='us-sec'>球馆照明由多盏防炫目灯光组成，排布合理，并配有多台大型通风机，打破室内球馆一贯的闷热流的通风舒适感，让您可以在这里尽情挥洒汗水；冬季有独立供热系统，给你满意的体验。</View>
                        <View className='us-sec'>同时，本场馆具有专业的篮球场服务</View>
                        <View className='us-sec'>①电子计分、计时显示器;</View>
                        <View className='us-sec'>②专业比赛裁判提供;</View>
                        <View className='us-sec'>③篮球战队约战平台服务;</View>
                        <View className='us-sec'>④承接定制各类运动赛事、企业活动、主题嘉年华服务等等。</View>

                        <View className='us-title'>联系方式</View>
                        <View className='us-sec'>公司地址：银川市金凤区祥安巷</View>
                        <View className='us-sec'>联系电话：15349699997</View>
                    </View>
                </View>
                <Button className='contact-us' openType='contact'>联系我们</Button>
            </View>
        )
    }
}
