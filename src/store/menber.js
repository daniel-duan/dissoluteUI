const member = new Map();
member.set('memId', 0);//默认用户ID
member.set('memType', 0);//默认用户ID

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

//0 普通卡 1银卡 2金卡
//{'0':'个人普通会员','1':'个人VIP会员', '2':'个人银卡会员', '3':'个人金卡会员', '10':'团体普通会员', '11':'团体VIP会员', '12':'团体银卡会员', '13':'团体金卡会员', '99':'超级管理员'}
export function cardType() {
    const type = member.get('memType');
    if (type === 2 || type === 12) {
        return 1;
    } else if (type === 3 || type === 13) {
        return 2;
    }
    return 0;
}

export function isMember() {
    return member.get('registered') === true;
}

//{'0':'个人普通会员','1':'个人VIP会员', '2':'个人银卡会员', '3':'个人金卡会员', '10':'团体普通会员', '11':'团体VIP会员', '12':'团体银卡会员', '13':'团体金卡会员', '99':'超级管理员'}
export function getMemType() {
    const memType = member.get('memType');
    switch (memType) {
        case 0:
            return '个人普通会员';
        case 1:
            return '个人VIP会员';
        case 2:
            return '个人银卡会员';
        case 3:
            return '个人金卡会员';
        case 10:
            return '团体普通会员';
        case 11:
            return '团体VIP会员';
        case 12:
            return '团体银卡会员';
        case 13:
            return '团体金卡会员';
        case 99:
            return '超级管理员';
        default:
            return '';
    }
}