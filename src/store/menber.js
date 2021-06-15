const member = new Map();
member.set('memId', 0);//默认用户ID

export function memGet(key) {
    return member.get(key);
}

export function cacheMem(mem) {
    if (mem !== null) {
        member.set('memId', mem.memId);
        member.set('memType', mem.memType);
        member.set('openId', mem.openId);
        member.set('unionId', mem.unionId);
        member.set('registered', mem.registered);
        if (mem.session) {
            member.set('session', mem.session);
        }
    }
}

export function cacheUserInfo(userInfo) {
    const gender = userInfo.gender === 1 ? '男' : (userInfo.gender === 2 ? '女' : '');
    member.set('avatarUrl', userInfo.avatarUrl);
    member.set('gender', gender);
    member.set('nickName', userInfo.nickName);
}

export function isMember() {
    return member.get('registered') === true;
}

//{'1':'个人普通会员', '2':'团体普通会员', '3':'个人银卡会员', '4':'个人金卡会员', '5':'团体银卡会员', '6':'团体金卡会员'}
export function getMemType() {
    const memType = member.get('memType');
    switch (memType) {
        case 1:
            return '个人普通会员';
        case 2:
            return '团体普通会员';
        case 3:
            return '个人银卡会员';
        case 4:
            return '个人金卡会员';
        case 5:
            return '团体银卡会员';
        case 6:
            return '团体金卡会员';
        default:
            return '';
    }
}