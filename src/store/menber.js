const member = new Map();
member.set('integral', 0);//默认积分
member.set('message', 0);//默认未读消息
member.set('memId', 0);//默认用户ID

export function memGet(key) {
    return member.get(key);
}

export function cacheMem(mem) {
    if (mem !== null) {
        if (mem.memId !== null) {
            member.set('memId', mem.memId);
        }
        member.set('memType', mem.memType);
        member.set('integral', mem.integral);
        member.set('openId', mem.openId);
        member.set('unionId', mem.unionId);
        if (mem.session) {
            member.set('session', mem.session);
        }
        member.set('registered', mem.registered);
        member.set('message', mem.message);
        member.set('mastId', mem.mastId);
        member.set('tempId', mem.tempId);
        member.set('hasPhone', mem.hasPhone);
    }
}

export function hadPhone() {
    member.set('hasPhone', true);
}

export function isMember() {
    return member.get('registered') === true;
}
