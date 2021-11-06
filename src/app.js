import Taro from '@tarojs/taro';
import {Component} from 'react';
import "taro-ui/dist/style/components/icon.scss"; //全局引入
import {put} from './store/global';
import './app.scss'

export default class App extends Component {
    constructor(props) {
        super(props);

        App.appInfo();
        App.appLaunch();
    }

    //对应wx onLaunch
    componentWillMount() {
    }

    static appInfo() {
        const {statusBarHeight, screenHeight, screenWidth, platform} = Taro.getSystemInfoSync();
        const {height, top} = Taro.getMenuButtonBoundingClientRect();// 获取胶囊信息

        const titleBarHeight = height + (top - statusBarHeight) * 2;// 计算标题栏高度
        const navHeight = statusBarHeight + titleBarHeight;// 计算导航栏高度
        const cntHeight = screenHeight - navHeight;//去掉导航栏，屏幕剩余的高度

        put('screenHeight', screenHeight);//屏幕高度
        put('screenWidth', screenWidth);//屏幕宽度
        put('capsuleTop', top);//胶囊top距离
        put('capsuleHeight', height);//胶囊高度
        put('stBarHeight', statusBarHeight);//状态栏高度
        put('tiBarHeight', titleBarHeight);//标题栏高度
        put('navHeight', navHeight);//导航栏高度
        put('cntHeight', cntHeight);//内容区高度
        put('platform', platform);//平台 ios android
    }

    static appLaunch() {
        //获取启动参数，分享进入可以获取分享者openId
        // const res = Taro.getLaunchOptionsSync();
        // console.log('app start', res);
    }

    render() {
        return this.props.children;
    }
}
