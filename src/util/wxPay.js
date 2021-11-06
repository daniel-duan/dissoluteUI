import Taro from "@tarojs/taro";
import api from "../store/api";

export default function wxPay(payData, errFn, callback) {
    Taro.request({
        url: api.wxPay,
        method: "POST",
        data: payData,
        success: suc => {
            if (suc.data.status !== 888) {
                Taro.showToast({title: '暂时无法完成支付，请稍后再试', icon: 'none', duration: 1500});
                errFn();
                return;
            }

            const payd = suc.data.data;
            Taro.requestPayment({
                timeStamp: payd.timeStamp,
                nonceStr: payd.nonceStr,
                package: payd.package,
                signType: payd.signType,
                paySign: payd.paySign,
                success: () => {
                    Taro.showToast({title: '确认支付结果，请稍等...', icon: 'none', duration: 1500});
                    Taro.request({
                        url: api.wxPayQuery + '?payId=' + payd.payId,
                        success: pay => {
                            if (pay.data.status === 888) {
                                callback(payd.payId);
                            } else {
                                Taro.showToast({title: '无法查询支付结果，请联系管理员', icon: 'none', duration: 1500});
                                errFn();
                            }
                        }
                    });
                },
                fail: () => {
                    Taro.showToast({title: '支付失败', icon: 'none', duration: 1500});
                    errFn();
                }
            });
        }
    });
}
