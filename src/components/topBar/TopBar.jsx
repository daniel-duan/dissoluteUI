import React from 'react';
import Taro from '@tarojs/taro';
import {Button, View} from '@tarojs/components';
import {AtIcon} from 'taro-ui';
import {get} from '../../store/global';
import './TopBar.scss';

export default class TopBar extends React.Component {
    constructor(props) {
        super(props);

        this.rect = {
            capsuleTop: get('capsuleTop'),
            capsuleHeight: get('capsuleHeight'),
            stBarHeight: get('stBarHeight'),
            tiBarHeight: get('tiBarHeight'),
            navHeight: get('navHeight')
        };
    }

    backHandle() {
        Taro.navigateBack({delta: 1});
    }

    homeHandle() {
        Taro.switchTab({url: '/pages/home/home'});
    }

    render() {
        const cls = this.props.backColor === 'transparent' ? 'dz-top-nav' : 'dz-top-nav dz-top-border';
        return (
            <View className={cls} style={{height: this.rect.navHeight, backgroundColor: this.props.backColor}}>
                <View className='dz-nav-title' style={{marginTop: this.rect.stBarHeight, height: this.rect.tiBarHeight}}>{this.props.title}</View>
                {this.props.nav && <View className='dz-nav-op' style={{top: this.rect.capsuleTop, height: this.rect.capsuleHeight, borderRadius: this.rect.capsuleHeight}}>
                    <Button className='dz-top-button' style={{height: this.rect.capsuleHeight}} onClick={this.backHandle}>
                        <AtIcon value='chevron-left' size='20' color='#111111'/>
                    </Button>
                    <Button className='dz-top-button' style={{height: this.rect.capsuleHeight}} onClick={this.homeHandle}>
                        <AtIcon value='home' size='18' color='#111111'/>
                    </Button>
                </View>}
            </View>
        )
    }
}

TopBar.defaultProps = {
    nav: true,
    navImg: null,
    title: '',
    backColor: 'white'
};

TopBar.propTypes = {
    nav: Boolean,
    navImg: String,
    title: String,
    backColor: String
};

