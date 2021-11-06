import React from 'react';
import Taro from '@tarojs/taro';
import {Button, View} from '@tarojs/components';
import {AtIcon} from 'taro-ui';
import {get} from '../../store/global';

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

    render() {
        const cls = this.props.bottomBorder ? 'dz-top-nav bs-bottom-border' : 'dz-top-nav';

        return (
            <View className={cls} style={{height: this.rect.navHeight}}>
                <View className='nav-title' style={{marginTop: this.rect.stBarHeight, height: this.rect.tiBarHeight}}>{this.props.title}</View>
                {this.props.nav && <View className='nav-btn' style={{top: this.rect.capsuleTop, height: this.rect.capsuleHeight, borderRadius: this.rect.capsuleHeight}}>
                    <Button className='top-button' style={{height: this.rect.capsuleHeight}} onClick={() => Taro.navigateBack({delta: 1})}>
                        <AtIcon value='chevron-left' size='20' color='#000000'/>
                    </Button>
                    <Button className='top-button' style={{height: this.rect.capsuleHeight}} onClick={() => Taro.switchTab({url: '/pages/home/home'})}>
                        <AtIcon value='home' size='18' color='#000000'/>
                    </Button>
                </View>}
            </View>
        )
    }
}

TopBar.defaultProps = {
    nav: true,
    title: '',
    bottomBorder: false
};

TopBar.propTypes = {
    nav: Boolean,
    title: String,
    bottomBorder: Boolean
};