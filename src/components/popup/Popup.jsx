import React from 'react';
import Taro from "@tarojs/taro";
import {AtCheckbox} from 'taro-ui';
import "taro-ui/dist/style/components/checkbox.scss";
import {ScrollView, View} from '@tarojs/components';
import './Popup.scss';

export default class Popup extends React.Component {
    constructor(props) {
        super(props);

        const show = Taro.getStorageSync('show-popup');
        this.state = {
            show: show,
            checkedList: []
        };

        this.options = [{
            value: 'ck',
            label: '不在显示'
        }];

        this.close = this.close.bind(this);
        this.handleChange = this.handleChange.bind(this);
    }

    close() {
        this.setState({show: false});
    };

    handleChange(value) {
        Taro.setStorageSync('show-popup', value.length === 0);
        this.setState({checkedList: value});
    }

    render() {
        if (this.state.show === false) return null;

        return (
            <View className='dz-popup'>
                <View className='popup-cnt'>
                    <View className='popup-op'>
                        <AtCheckbox options={this.options} selectedList={this.state.checkedList} onChange={this.handleChange}/>
                        <View className='close' onClick={this.close}>关闭</View>
                    </View>
                    <ScrollView className='popup-hold' scrollY>
                        <View className='popup-pd'>
                            <View className='pp-title'>寻觅平台内容运营合作伙伴</View>
                            <View className='pp-section'>本司平台，采取文旅版块线上线下经营合作模式，以寺庙文化为起点，以有缘人（客户）为基础，为有缘人提供清修，静心，祈福，禅想等浸入式旅游平台服务。</View>
                            <View className='pp-section'>目前平台总运营，从入驻单位（寺庙）、用户（有缘人），平台内容三个方向入手，已获得合作伙伴加盟管控入驻单位，用户（获客）两个方面，平台内容运营伙伴缺席。</View>
                            <View className='pp-section'>因为是创业公司，需要具备极强的自我驱动力，以平台内容为目标导向，能够独立组建管理，运营平台，责任心强，能够长期有诚信共同合作的伙伴，诚邀加盟！</View>
                            <View className='pp-summery'>平台内容运营工作:</View>
                            <View className='pp-desc'>1. 平台内容优化、不断完善;</View>
                            <View className='pp-desc'>2. 平台前端用户行为分析，数据挖掘，流程优化，具有用户量、交易量、交易额等数据维度。通过对内容数据的研究，制定提升用户量、活跃度、黏度的运营内容方案;制定出符合平台内容留存客户成长激励体系，对平台留存率、活跃度等关键指标负责:</View>
                            <View className='pp-desc'>3. 平台后端服务提供者的服务管理、优化、合作等;</View>
                            <View className='pp-desc'>4. 平台相关活动的策划、营销、推广等活动开展;</View>
                            <View className='pp-desc'>5. 平台日常的用户运营方向的管理工作，创建引导和维护核心用户群同步收集挖掘用户需求，对平台提出持续改进意见并协调跟进相关改善，提升用户体验;</View>
                            <View className='pp-desc'>6. 平台内容组织架构的建立，人员岗位的设置和管理。</View>

                            <View className='pp-summery'>平台内容运营责任：</View>
                            <View className='pp-desc'>1. 负责公司平台运营，包括活动策划、在线宣传推广、平台定位包装等;</View>
                            <View className='pp-desc'>2. 根据平台营销数据进行深入分析，对内容运营情况进行评估，提炼卖点，指导美工进行页面优化，提升阅览量，粘连客户 防止已有客户流失；</View>
                            <View className='pp-desc'>3. 管理平台的运营环境、规则、内容资源，并根据统计分析最新数据变化采取针对性运营措施。</View>

                            <View className='pp-summery'>适合合作伙伴人群：</View>
                            <View className='pp-desc'>1. 对平台内容感兴趣（亲佛系），对行业发展趋势有深刻理解，并热衷于用户行为研究，有创意，思维活跃，对市面上的推广手段有敏感度和见解为人亲和力高:</View>
                            <View className='pp-desc'>2. 有团队搭建和管理经验，对文旅行业（亲佛系）有深入了解，对各项数据敏感，有丰富的平台推广能力和数据分析能力;</View>
                            <View className='pp-desc'>3. 热爱互联网平台行业，善于团队协作，有责任心，并能够承担工作压力;</View>
                        </View>
                    </ScrollView>
                </View>
            </View>
        )
    }
}
