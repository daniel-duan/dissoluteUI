import Taro from '@tarojs/taro';

export function hasLiked(type, key) {
    const synKey = 'likeHis_' + type;
    try {
        const like = Taro.getStorageSync(synKey);
        if (like) {
            return like.includes(type + '_' + key);
        }
        Taro.setStorageSync(synKey, []);
        return false;
    } catch (e) {
        return true;
    }

}

export function hasViewed(type, key) {
    const synKey = 'viewHis_' + type;
    try {
        const view = Taro.getStorageSync(synKey);
        if (view) {
            return view.includes(type + '_' + key);
        }
        Taro.setStorageSync(synKey, []);
        return false;
    } catch (e) {
        return true;
    }
}

export function setLike(type, key) {
    const synKey = 'likeHis_' + type;
    try {
        const like = Taro.getStorageSync(synKey);
        if (like.length > 100) {
            Taro.setStorageSync(synKey, [type + '_' + key]);
        } else {
            like.push(type + '_' + key);
            Taro.setStorageSync(synKey, like);
        }
    } catch (e) {
    }
}

export function setView(type, key) {
    const synKey = 'viewHis_' + type;
    try {
        const view = Taro.getStorageSync(synKey);
        view.push(type + '_' + key);
        if (view.length > 100) {
            Taro.setStorageSync(synKey, [type + '_' + key]);
        } else {
            view.push(type + '_' + key);
            Taro.setStorageSync(synKey, view);
        }
    } catch (e) {
    }

}
