import React, {Component} from 'react';
import Taro from "@tarojs/taro";
import {Button, Camera, Image, Input, Picker, Text, View} from '@tarojs/components'
import {AtIcon} from "taro-ui";

import './register.scss'
import api, {remoteGet, remotePost} from "../../store/api";
import TopBar from "../../components/topBar/TopBar";
import {get} from "../../store/global";
import DzLoading from "../../components/loading/DzLoading";
import {cacheMem, getMemType, isMember, memGet} from "../../store/menber";

function isTeamMem(type) {
    return type === 2 || type === 5 || type === 6;
}

function RealNameWidget(props) {
    if (!props.edit) return props.realName;
    return <Input className='body-input' type='text' value={props.realName} maxlength={8} placeholder='请输入真实姓名' onInput={(e) => props.setValue('realName', e.detail.value)}/>;
}

function TeamNameWidget(props) {
    if (!props.edit) return props.teamName;
    return <Input className='body-input' type='text' value={props.teamName} maxlength={36} placeholder='请输入团体名称' onInput={(e) => props.setValue('teamName', e.detail.value)}/>;
}

function FaceWidget(props) {
    if (!props.edit) return <Image className='head-image' src={props.faceImage} mode='aspectFill'/>;
    return <View className='face-add' onClick={props.openCamera}><Image className='head-image' src={props.faceImage} mode='aspectFill'/></View>;
}

function RegionWidget(props) {
    if (!props.edit) return props.address;
    return <Picker className='line-picker' mode='region' value={props.memRegion} onChange={(e) => props.setValue('memRegion', e.detail.value)}><Text>{props.memRegion.join(' ')}</Text></Picker>;
}

function MemTypeWidget(props) {
    if (!props.edit || props.registered) return getMemType();
    return (
        <View className='type-body'>
            <View className={props.memType === 1 ? 'member-type active' : 'member-type'} onClick={() => props.setValue('memType', 1)}>个人会员</View>
            <View className={props.memType === 2 ? 'member-type active' : 'member-type'} onClick={() => props.setValue('memType', 2)}>团体会员</View>
        </View>
    );
}

function StreetWidget(props) {
    if (!props.edit) return null;
    return (
        <View className='line'>
            <Input className='input' type='text' value={props.memStreet} maxlength={60} placeholder='请输入详细地址' onInput={(e) => props.setValue('memStreet', e.detail.value)}/>
        </View>
    );
}

function PhoneWidget(props) {
    if (!props.edit) return props.phoneNumber;
    return <Button className='phone-btn' openType='getPhoneNumber' onGetPhoneNumber={props.getPhone}>{props.phoneNumber}</Button>;
}

export default class Register extends Component {
    constructor(props) {
        super(props);

        this.navHeight = get('navHeight');

        const registered = isMember();
        this.state = {
            openLoad: true,
            registered: registered,
            edit: !registered,
            showCamera: false,
            btnText: registered ? '修改' : '注册',
            opText: '编辑',
            newFace: false,
            realName: '',
            phoneNumber: '',
            faceImage: '',
            gender: '',
            memType: '',
            teamName: '',
            memRegion: [],
            memStreet: '',
            memAddress: '',
            inviteCode: ''
        };

        this.openCamera = this.openCamera.bind(this);
        this.photograph = this.photograph.bind(this);
        this.submit = this.submit.bind(this);
        this.setValue = this.setValue.bind(this);
        this.fillMember = this.fillMember.bind(this);
        this.opClick = this.opClick.bind(this);
        this.getPhone = this.getPhone.bind(this);
        this.loadMember = this.loadMember.bind(this);
    }

    setValue(key, value) {
        const obj = {};
        obj[key] = value;
        this.setState(obj);
    }

    componentDidMount() {
        this.loadMember({openLoad: false});
    }

    loadMember(init) {
        const url = api.memInfo + '?memId=' + memGet('memId');
        remoteGet(url, (res) => {
            this.member = res.data === null ? {
                realName: '',
                memType: 1,
                gender: memGet('gender'),
                faceImage: '',
                teamName: '',
                memStreet: '',
                memAddress: '',
            } : res.data;
            this.fillMember(init);
        });
    }

    fillMember(state) {
        const mem = this.member;
        const region = mem.memRegion ? mem.memRegion.split(' ') : ['宁夏回族自治区', '银川市', ''];
        state.realName = mem.realName;
        state.gender = mem.gender;
        state.faceImage = mem.faceImage;
        state.memType = mem.memType;
        state.teamName = mem.teamName;
        state.memRegion = region;
        state.memStreet = mem.memStreet;
        state.memAddress = mem.memAddress;
        this.setState(state);
    }

    opClick() {
        if (this.state.edit) {
            this.fillMember({edit: false, newFace: false, opText: '修改'});
        } else {
            this.setState({edit: true, opText: '取消'});
        }
    }

    submit() {
        if (this.state.realName.length < 2) {
            Taro.showToast({title: '请输入合法的真实姓名', icon: 'none', duration: 2000});
            return;
        }
        // if (this.state.phoneNumber.length < 2) {
        //     Taro.showToast({title: '请选择的手机号码', icon: 'none', duration: 2000});
        //     return;
        // }
        if (this.state.faceImage === '') {
            Taro.showToast({title: '请选择人脸识别头像', icon: 'none', duration: 2000});
            return;
        }
        if (this.state.memStreet.length < 1) {
            Taro.showToast({title: '请输入详细地址', icon: 'none', duration: 2000});
            return;
        }

        const mem = this.state;
        const region = mem.memRegion.join(' ');
        const avatarUrl = memGet('avatarUrl');
        const nickName = memGet('nickName');
        const unionId = memGet('unionId');
        const data = {
            memId: memGet('memId'),
            openId: memGet('openId'),
            unionId: unionId ? unionId : '',
            realName: mem.realName,
            phoneNumber: mem.phoneNumber,
            gender: mem.gender,
            memType: mem.memType,
            teamName: mem.teamName,
            memRegion: region,
            memStreet: mem.memStreet,
            memAddress: region + ' ' + mem.memStreet,
            inviteCode: mem.inviteCode,
            wxImage: avatarUrl ? avatarUrl : '',
            wxName: nickName ? nickName : ''
        };

        this.setState({openLoad: true});
        if (this.state.newFace) {
            const file = this.state.faceImage;
            Taro.uploadFile({
                url: api.memSaveFace,
                filePath: file,
                name: 'face',
                formData: data,
                success: (suc) => {
                    const res = JSON.parse(suc.data);
                    cacheMem(res.data);
                    this.loadMember({openLoad: false, edit: false, newFace: false, registered: isMember(), btnText: '修改', opText: '编辑'});
                }
            });
        } else {
            remotePost(api.memSave, data, (res) => {
                cacheMem(res.data);
                this.loadMember({openLoad: false, edit: false, newFace: false, registered: isMember(), btnText: '修改', opText: '编辑'});
            });
        }
    }

    openCamera() {
        if (this.state.edit) {
            this.setState({showCamera: true});
        }
    }

    getPhone(e) {
        const detail = e.detail;
        const data = {
            sessionKey: memGet('session'),
            encrypted: detail.encryptedData,
            iv: detail.iv
        };
        if (detail.encryptedData) {
            this.setState({openLoad: true});
            remotePost(api.regPhone, data, (res) => {
                console.log(res);
                this.setState({phoneNumber: res.data, openLoad: false});
            });
        }
    }

    photograph() {
        const ctx = Taro.createCameraContext();
        ctx.takePhoto({
            quality: 'high',
            success: (res) => {
                this.setState({openLoad: true, showCamera: false});
                const that = this;
                Taro.uploadFile({
                    url: api.validFace,
                    filePath: res.tempImagePath,
                    name: 'face',
                    success(suc) {
                        const info = suc.data;
                        if (info.length > 0) {
                            const gender = that.state.gender ? that.state.gender : info;
                            that.setState({faceImage: res.tempImagePath, newFace: true, gender: gender, openLoad: false});
                        } else {
                            Taro.showToast({title: '识别失败，图片中没有人脸或者有多个人脸信息', icon: 'none', duration: 2000});
                            that.setState({openLoad: false});
                        }
                    }
                });
            }
        })
    }

    render() {
        return (
            <View class='app-content'>
                <TopBar title='领跑体育会员'/>
                <View className='auto-scroll-view' style={{top: this.navHeight}}>
                    {this.state.registered && <View className='member-head'>
                        <View className='text'>我的会员信息</View>
                        <View className='opBtn' onClick={this.opClick}>{this.state.opText}</View>
                    </View>}
                    <View className='info-hold'>
                        <View className='info-item'>
                            <View className='line'>
                                <View className='head'>真实姓名</View>
                                <View className='body'><RealNameWidget edit={this.state.edit} realName={this.state.realName} setValue={this.setValue}/></View>
                            </View>
                            <View className='line'>
                                <View className='head'>手机号码</View>
                                <View className='body'><PhoneWidget edit={this.state.edit} phoneNumber={this.state.phoneNumber} getPhone={this.getPhone}/></View>
                            </View>
                        </View>
                        <View className='info-item'>
                            <View className='line'>
                                <View className='head'>人脸识别</View>
                                <View className='body'><FaceWidget edit={this.state.edit} faceImage={this.state.faceImage} openCamera={this.openCamera}/></View>
                            </View>
                            <View className='line'>
                                <View className='head'>性别</View>
                                <View className='body'>{this.state.gender}</View>
                            </View>
                        </View>
                        <View className='info-item'>
                            <View className='line'>
                                <View className='head'>会员类型</View>
                                <View className='body'><MemTypeWidget registered={this.state.registered} edit={this.state.edit} memType={this.state.memType} setValue={this.setValue}/></View>
                            </View>
                            {isTeamMem(this.state.memType) && <View className='line'>
                                <View className='head'>团体名称</View>
                                <View className='body'><TeamNameWidget edit={this.state.edit} teamName={this.state.teamName} setValue={this.setValue}/></View>
                            </View>}
                            <View className='line'>
                                <View className='head'>地址</View>
                                <View className='body'><RegionWidget edit={this.state.edit} address={this.state.memAddress} memRegion={this.state.memRegion} setValue={this.setValue}/></View>
                            </View>
                            <StreetWidget edit={this.state.edit} memStreet={this.state.memStreet} setValue={this.setValue}/>
                        </View>
                        {this.state.registered || <View className='info-item'>
                            <View className='line'>
                                <View className='head'>邀请码</View>
                                <View className='body'>
                                    <Input className='body-input' type='text' value={this.state.inviteCode} maxlength={50} placeholder='请输入邀请码' onInput={(e) => this.setState({inviteCode: e.detail.value})}/>
                                </View>
                            </View>
                        </View>}
                    </View>
                    {this.state.edit && <View className='register-hold'>
                        <dzButton onClick={this.submit}>{this.state.btnText}</dzButton>
                    </View>}
                </View>
                {this.state.showCamera && <View className='camera-hold'>
                    <View className='camera-close' onClick={() => this.setState({showCamera: false})}><AtIcon value='close' size='20' color='#ffffff'/>关闭</View>
                    <Camera className='face-camera' devicePosition='front' flash='auto'/>
                    <View className='tips'>请将头像放到轮廓中拍照</View>
                    <View className='camera-btn'>
                        <dzButton onClick={this.photograph}>拍照</dzButton>
                    </View>
                </View>}
                <DzLoading open={this.state.openLoad}/>
            </View>
        )
    }
}
