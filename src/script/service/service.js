app.service("myService", function ($http, $rootScope, $stateParams, $interval, $state, $location, $window, $q, $cookies) {
    // const baseUrl = 'http://api.xmsjwl.com/server/index.php?g=Web&c=Mock&o=mock&projectID=2&uri=';
    // const baseUrl = 'http://192.168.10.8/api';  //xie；
    // const baseUrl = 'http://192.168.10.180/api'; // huang
    // const baseUrl = 'http://47.105.52.16:8040/api/wechat/wechatApi'; // url
    // const baseUrl = 'http://www.hzhaochong.cn/api'; // url
    const baseUrl = 'http://www.hzhaochong.cn/api'; // url
    $rootScope.baseUrl = 'http://www.hzhaochong.cn/api'; // url
    $rootScope.uploadUrl = 'http://www.hzhaochong.cn';//图片上传

    const url = {
        /*-------用户登陆-------*/
        '登录': '/wechat/wechatApi/login',
        '注册': '/wechat/wechatApi/register',
        '找回密码': '/wechat/wechatApi/changePwd',
        /*-------电站列表-------*/
        'home': '/wechat/wechatApi/carStationList',//电站列表
        '电站详情': '/wechat/wechatApi/getStationInfoForCar', //汽车电站详情
        '预充金额': '/wechat/wechatApi/getGunInfo', //预充金额页面
        'xq.zdxq': '/wechat/wechatApi/getTerminalInfoForCar',//汽车终端详情
        //提交
        '收藏': '/wechat/wechatApi/inserMyCollect',
        '预充电': '/wechat/wechatApi/readyCharge',
        '开始充电': '/communicate/weChatToHardware/mainStationStartingCharging',
        '结束充电': '/communicate/weChatToHardware/mainStationEndindCharging',
        '充电中': '/communicate/order/newestChargingInfo',
        '扫码充电': '/communicate/weChatToHardware/getGunInfo',
        /*-------电站订单-------*/
        'dzdd': '/wechat/wechatApi/bizOrder',//电站订单
        //提交
        '订单处理': '/ddcl',
        /*-------新闻活动-------*/
        'news': '/wechat/wechatApi/myNews',//新闻活动
        '新闻详情': '/wechat/wechatApi/myNewsDetail',//新闻活动
        /*-------个人中心-------*/
        //提交
        '创建订单': '/wechat/wxpay/createOrder',
        '充值': '/wechat/wxpay/dopay',
        '开票总额': '/wechat/wechatApi/getMyInovice',
        '申请开纸质票': '/wechat/wechatApi/applicationInvoiceinfo',
        '申请开电子票': '/wechat/wechatApi/electronicInvoice',
        '解除绑定': '/wechat/wechatApi/removeCard',
        '注销卡片': '/wechat/wechatApi/removeCard',
        '绑定充电卡': '/wechat/wechatApi/bindingCard',
        '取消收藏': '/wechat/wechatApi/inserMyCollect',
        '添加爱车': '/wechat/wechatApi/inserGarage',
        '删除爱车': '/wechat/wechatApi/deleteMycar',
        '修改充电卡密码': '/wechat/wechatApi/modifyCardPwd',
        '修改头像': '/wechat/wechatApi/changeTopImg',
        '优惠券': '/wechat/wechatApi/getUserDiscountConsume',
        '修改名称': '/wechat/wechatApi/changeNickName',
        '修改手机号': '/wechat/wechatApi/changePhone',
        '修改密码': '/wechat/wechatApi/changePwd',
        '获取验证码': '/wechat/wechatApi/sendSMS',
        '图片上传': '/wechat/wechatApi/upload',
        '实名认证': '/wechat/wechatApi/realNameAuth',
        '意见反馈': '/wechat/wechatApi/feedback',
        "申请退款": '/wechat/wechatApi/applicationOrderrd',
        //页面预加载数据
        '基础配置': '/wechat/wechatApi/config',
        'ddkp': '/wechat/wechatApi/selectOrderre',//订单开票
        'wddd': '/wechat/wechatApi/myOrderro',//我的订单
        '支付订单': '/communicate/order/orderPay',//支付订单
        'wdxx': '/wechat/wechatApi/myMessage',//我的消息
        '我的钱包': '/wechat/wechatApi/myWallet',//我的消息
        'wdtk': '/wechat/wechatApi/selectOrderrd',//我的退款
        'jjls': '/wechat/wechatApi/accountDetail',//流水历史
        'wdsc': '/wechat/wechatApi/myCollect',//我的收藏
        'kpls': '/wechat/wechatApi/applicationHistory',//开票历史
        "消息详情": '/wechat/wechatApi/myMessageDetail',
        'wdac': '/wechat/wechatApi/selectMyCar',//我的爱车
        "订单详情": '/wechat/wechatApi/orderDetail',
        "子账户明细": '/wechat/wechatApi/subaccountDetail',
        "充电卡明细": '/wechat/wechatApi/chargecardDetail',
        "手续费": '/sxf',
        "退款信息": '/wechat/wechatApi/getOrderrdInfo',
        "个人信息": '/wechat/wechatApi/getPersonalInfo',
        "退款限制": '/wechat/wxpay/getRefundsInfo',


        // 自行车
        "bike": '/wechat/wechatApi/bikeStationList',
        'bikexq': '/wechat/wechatApi/getStationInfoForBike',
        'bikezdxq': '/wechat/wechatApi/getTerminalInfoForBike',
        '自行车预充电': '/wechat/wechatApi/readyCharge',
        '自行车充电': '/communicate/bikeChargeController/startCharging',
        '自行车结束充电': '/communicate/bikeChargeController/endCharging',
    };
    const validMsg = {
        required: '必填',
        'ng-minlength': '长度最小不能少于',
        'ng-maxlength': '长度最大不能高于'/*,
     email:'格式错误',
     number:'格式错误'*/
    };
    //记录加载过的数据
    let dataArr = {};

    return {
        ycd: {},
        prevState: {},//记录登录前的状态
        parseFloat(v, n) {//js中浮点数计算会出现精度问题0.1+0.2=0.30000000000000004不推荐使用toFixed
            return Math.round(v * parseInt('1' + Array.prototype.join.call({length: n + 1}, '0'))) / 100;
        },
        valid(myForm, callback, tipsFn) {
            console.log(Object.keys(myForm.$error));
            if (myForm.$valid) {
                callback();
            } else {
                if (tipsFn) {
                    tipsFn();
                    return;
                }
                const type = Object.keys(myForm.$error)[0],
                    val = myForm.$error[type],
                    [first] = val,
                    l = $(`:input[name=${first.$name}]`),
                    la = l.attr('data-error'),
                    text = la ? la : l.closest('.weui-cell').find('.weui-label').text();

                $.toptip(`${text}：${validMsg[type] || '格式错误'}`, 'warning');
            }
        },

        phoneValid(params, callback) {
            if (params.$valid) {
                callback();
            } else {
                if (params.$error.required) {
                    $.toptip('请输入手机号', 'warning');
                    return false;
                }
                if (params.$invalid || !myService.isPhone(params)) {
                    $.toptip('请输入正确的手机号', 'warning');
                    return false;
                }
            }

        },
        submit(action, data, callback, toastBack) {//数据提交
            $.showLoading('请稍侯...')
            const promise = $http({method: 'post', url: baseUrl + url[action], params: data});
            promise.then((res) => {
                    $.hideLoading();
                    const stats = res.data.error;
                    if (!stats) {
                        let def = false;
                        if (callback) def = callback(res);
                        if (!def) {
                            if (toastBack) $.toast(`${action}成功!`, toastBack);
                            else $.toast(`${action}成功!`);
                        }
                    }
                    else {
                        $.toast(stats, 'cancel');
                    }
                },
                (res) => {
                    $.hideLoading();
                    //请求错误
                    $.toast(res.data.error, 'cancel');
                });
            return promise;
        },
        setPageData(type, step = false, select, where = false) {//where表示条件获取数据
            let p, limit = 10;
            if (where) {
                $('[my-update]').scrollTop(0);
                p = false;
            }
            else p = dataArr[type];
            if (!p || step) {//step表示滚动更新
                if (!p) p = dataArr[type] = {lists: [], page: 0, end: false};
                if (p.end) return false;
                p.page++;
                //数据不存在或页码不同加载新数据存放到对象
                const promise = $http({
                    method: 'post',
                    url: baseUrl + url[type],
                    params: Object.assign($stateParams, {
                        offset: p.page,//页码
                        limit: limit,//固定每页显示10条
                        userId: $rootScope.config.id
                    }, select)
                });
                promise.then((res) => {
                    p.lists = p.lists.concat(res.data.lists);
                    p.end = res.data.end;
                    res.data = p;
                });
                return promise;
            } else {
                //数据存在且页码相同则调用已有数据
                return {data: p};//保持一致
            }
        },
        setBikePageData(type, step = false, select, where = false) {//where表示条件获取数据
            let p, limit = 10;
            if (where) {
                $('[my-update]').scrollTop(0);
                p = false;
            }
            else p = dataArr[type];
            if (!p || step) {//step表示滚动更新
                if (!p) p = dataArr[type] = {lists: [], page: 0, end: false};
                if (p.end) return false;
                p.page++;
                //数据不存在或页码不同加载新数据存放到对象
                const promise = $http({
                    method: 'post',
                    url: baseUrl + url[type],
                    params: Object.assign($stateParams, {
                        offset: p.page,//页码
                        limit: limit,//固定每页显示10条,
                    }, select)
                });
                promise.then((res) => {
                    p.lists = p.lists.concat(res.data.lists);
                    p.end = res.data.end;
                    res.data = p;
                });
                return promise;
            } else {
                //数据存在且页码相同则调用已有数据
                return {data: p};//保持一致
            }
        },
        setData(type, params) {
            $.showLoading('加载中...');
            return $http({method: 'post', url: baseUrl + url[type], params: params});
        },
        showData(type) {
            $.showLoading('加载中...');
            return $http({
                method: 'post', url: baseUrl + url[type], params: {
                    userId: $rootScope.config.id
                }
            });
        },
        time(time, tel, type, callback) {
            const promise = $http({method: 'post', url: baseUrl + url['获取验证码'], params: {phone: tel, type: type}});
            promise.then((res) => {
                const stats = res.data.error;
                const code = res.data.code;

                if (!stats) {
                    // callback(time,code);
                    $interval((i) => {
                        callback(time - (i + 1) || '', code);
                    }, 1000, time);
                }
                else $.toast(stats, 'cancel');
            }, () => {
                $.toast('获取失败', 'cancel');
            })
        },
        // 获取汽车站点列表信息
        getStationData(type, step = false, select, where = false, stationType) {
            let p, limit = 10;
            if (where) {
                $('[my-update]').scrollTop(0);
                p = false;
            }
            else p = dataArr[type];
            if (!p || step) {
                if (!p) p = dataArr[type] = {lists: [], page: 0, end: false};
                if (p.end) return false;
                p.page++;
                const promise = $http({
                    method: 'post',
                    url: baseUrl + url[type],
                    params: Object.assign({
                        stationType: stationType, //汽车站点
                        // nowlng:30.123123,
                        // nowlat:120.2323123,
                        nowlng: $rootScope.userPosition.nowlng,
                        nowlat: $rootScope.userPosition.nowlat,
                        offset: p.page,//页码
                        limit: limit,//固定每页显示10条,
                        userId: $rootScope.config.id,
                    }, select)
                });
                promise.then((res) => {
                    p.lists = p.lists.concat(res.data.lists);
                    p.end = res.data.end;
                    res.data = p;
                });
                return promise;
            } else {
                //数据存在且页码相同则调用已有数据
                return {data: p};//保持一致
            }
        },
        // 获取自行车站点列表信息
        getBikeStationData(type, step = false, select, where = false, stationType) {
            let p, limit = 10;
            if (where) {
                $('[my-update]').scrollTop(0);
                p = false;
            }
            else p = dataArr[type];
            if (!p || step) {
                if (!p) p = dataArr[type] = {lists: [], page: 0, end: false};
                if (p.end) return false;
                p.page++;
                const promise = $http({
                    method: 'post',
                    url: baseUrl + url[type],
                    params: Object.assign({
                        stationType: stationType, //汽车站点
                        nowlng: $rootScope.userPosition.nowlng,
                        nowlat: $rootScope.userPosition.nowlat,
                        offset: p.page,//页码
                        limit: limit,//固定每页显示10条,
                    }, select)
                });
                promise.then((res) => {
                    p.lists = p.lists.concat(res.data.lists);
                    p.end = res.data.end;
                    res.data = p;
                });
                return promise;
            } else {
                //数据存在且页码相同则调用已有数据
                return {data: p};//保持一致
            }
        },
        checkLogin(router) {
            console.log($cookies)
            if (!$cookies.get('config')) {
                // $window.location.href = 'https://open.weixin.qq.com/connect/oauth2/authorize?appid=wx3f5ac668fe3ce907&redirect_uri=http%3a%2f%2fwww.hzhaochong.cn%2fdist%2f%23%2flogin&response_type=code&scope=snsapi_base&state='+ router +'#wechat_redirect';

                $state.go('login', {'state': router});
                return false;
            } else {
                return true;
            }
        },
        // 获取openid

        getUserOpenId(code) {
            // 获取openid并保存
            return $http({method: 'get', url: baseUrl + '/wechat/wxpay/getOpenId', params: {code: code}});
        },
        // 获取url参数
        getUrlParams(variable) {
            var query = $location.absUrl().substring(1);
            var vars = query.split("&");
            for (var i = 0; i < vars.length; i++) {
                var pair = vars[i].split("=");
                if (pair[0].indexOf(variable)) {
                    return pair[1];
                }
            }
            return (false);
        },

        getUrlParam(name) {
            var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
            var r = window.location.search.substr(1).match(reg);
            if (r != null) return unescape(r[2]);
            return null;
        },

        // 获取扫码参数
        getCodeParams(query, variable) {
            var vars = query.split("&");
            for (var i = 0; i < vars.length; i++) {
                var pair = vars[i].split("=");
                if (pair[0].indexOf(variable)) {
                    return pair[1];
                }
            }
            return (false);
        },
        // 获取收藏列表
        getCollectData(type, step = false, select, where = false) {
            let p, limit = 10;
            if (where) {
                $('[my-update]').scrollTop(0);
                p = false;
            }
            else p = dataArr[type];
            if (!p || step) {//step表示滚动更新
                if (!p) p = dataArr[type] = {lists: [], page: 0, end: false};
                if (p.end) return false;
                p.page++;
                // 数据不存在或页码不同加载新数据存放到对象
                const promise = $http({
                    method: 'post',
                    url: baseUrl + url[type],
                    params: Object.assign({
                        nowlng: $rootScope.userPosition.nowlng,
                        nowlat: $rootScope.userPosition.nowlat,
                        offset: p.page,//页码
                        limit: limit,//固定每页显示10条
                        userId: $rootScope.config.id
                    }, select)
                });
                promise.then((res) => {
                    p.lists = p.lists.concat(res.data.lists);
                    p.end = res.data.end;
                    res.data = p;
                });
                return promise;
            } else {
                //数据存在且页码相同则调用已有数据
                return {data: p};//保持一致
            }

        },

        //扫码充电
        scan() {
            const wxCon = $http({
                method: 'post',
                url: 'http://www.hzhaochong.cn/api/wechat/wechatApi/getWechatInfo',
                params: {url: 'http://www.hzhaochong.cn/dist/#/sm'}
            });
            wxCon.then((res) => {
                var nonceStr = res.data.nonceStr;
                var signature = res.data.signature;
                var timestamp = res.data.timestamp;
                wx.config({
                    debug: false,
                    appId: 'wx3f5ac668fe3ce907',
                    timestamp: timestamp,
                    nonceStr: nonceStr,
                    signature: signature,
                    jsApiList: [
                        'scanQRCode'
                    ]
                });
                wx.error(function (error) {
// config信息验证失败会执行error函数，如签名过期导致验证失败，具体错误信息可以打开config的debug模式查看，也可以在返回的res参数中查看，对于SPA可以在这里更新签名。
                    console.log(error);
                });
                wx.ready(function () {
                    wx.scanQRCode({
                        needResult: 1, // 默认为0，扫描结果由微信处理，1则直接返回扫描结果，
                        scanType: ["qrCode", "barCode"], // 可以指定扫二维码还是一维码，默认二者都有
                        success: function (res) {
                            var query = res.resultStr; // 当needResult 为 1 时，扫码返回的结果
                            $.toptip(query);
                            var number = myService.getCodeParams(query, '?g');
                            $.toptip(number);
                            var postData = {
                                pillarCode: number.substring(0, number.length - 2),//桩编号
                                gunNo: number.remove(0, number.length - 2), //枪序号
                            }
                            $.toptip(postData.pillarCode, 'warning');
                            $.toptip(postData.gunNo, 'warning');
                        }
                    });
                });
            });
        },
        isMoney(money) {
            var reg = /^(([1-9][0-9]*)|(([0]\.\d{1,2}|[1-9][0-9]*\.\d{1,2})))$/;
            var isMoney = reg.test(money);
            return isMoney;
        },
        isPhone(phone) {
            var reg = /^[1][3,4,5,7,8][0-9]{9}$/;
            var isPhone = reg.test(phone);
            return isPhone;
        },
        // 微信地理 位置
        getUserPosition() {
            let url = $location.absUrl().split('#')[0];
            const wxCon = $http({
                method: 'post',
                url: 'http://www.hzhaochong.cn/api/wechat/wechatApi/getWechatInfo',
                params: {url: url}
            });
            wxCon.then((res) => {
                var nonceStr = res.data.nonceStr;
                var signature = res.data.signature;
                var timestamp = res.data.timestamp;
                wx.config({
                    debug: false,
                    appId: 'wx3f5ac668fe3ce907',
                    timestamp: timestamp,
                    nonceStr: nonceStr,
                    signature: signature,
                    jsApiList: [
                        'getLocation'
                    ]
                });
                wx.error(function (error) {
// config信息验证失败会执行error函数，如签名过期导致验证失败，具体错误信息可以打开config的debug模式查看，也可以在返回的res参数中查看，对于SPA可以在这里更新签名。
                    console.log(error);
                    return false;
                });
                wx.ready(function () {
                    wx.getLocation({
                        type: 'wgs84', // 默认为wgs84的gps坐标，如果要返回直接给openLocation用的火星坐标，可传入'gcj02'
                        success: function (res) {
                            // var latitude = res.latitude; // 纬度，浮点数，范围为90 ~ -90
                            // var longitude = res.longitude; // 经度，浮点数，范围为180 ~ -180。
                            $rootScope.config.lng = res.longitude;
                            $rootScope.config.lat = res.latitude;
                            return true;
                        }
                    });
                });

            });
        },

        getPosition() {
            var url = $location.absUrl().split('#')[0];
            var deferred = $q.defer(); // 声明延后执行，表示要去监控后面的执行
            $http({
                method: 'post',
                url: 'http://www.hzhaochong.cn/api/wechat/wechatApi/getWechatInfo',
                params: {url: url}
            }).success(function (res, status, headers, config) {
                var nonceStr = res.nonceStr;
                var signature = res.signature;
                var timestamp = res.timestamp;
                wx.config({
                    debug: false,
                    appId: 'wx3f5ac668fe3ce907',
                    timestamp: timestamp,
                    nonceStr: nonceStr,
                    signature: signature,
                    jsApiList: [
                        'getLocation'
                    ]
                });
                wx.error(function (error) {
                    console.log(error);
                });
                wx.ready(function () {
                    wx.getLocation({
                        type: 'wgs84',
                        success: function (data) {
                            deferred.resolve(data);
                        },
                        fail: function () {
                            $.toast('请确保地理位置权限已打开！', 'text', 3000);
                            return false;
                        }
                    });
                });

            }).error(function (data, status, headers, config) {
                deferred.reject(data);   // 声明执行失败，即服务器返回错误
            });
            return deferred.promise;   // 返回承诺，这里并不是最终数据，而是访问最终数据的API
        },
        // 微信充值
        wxRecharge(data) {
            WeixinJSBridge.invoke('getBrandWCPayRequest', {
                    "appId": 'wx3f5ac668fe3ce907',     //公众号名称,由商户传入
                    "timeStamp": data.timeStamp,         //时间戳,自1970年以来的秒数
                    "nonceStr": data.nonceStr, //随机串
                    "package": data.package,
                    "signType": data.signType,         //微信签名方式：
                    "paySign": data.paySign //微信签名
                },
                function (res) {
                    if (res.err_msg == "get_brand_wcpay_request:ok") {
                        console.log('支付成功');
                        //支付成功后跳转的页面
                    } else if (res.err_msg == "get_brand_wcpay_request:cancel") {
                        console.log('支付取消');
                    } else if (res.err_msg == "get_brand_wcpay_request:fail") {
                        console.log('支付失败');
                        WeixinJSBridge.call('closeWindow');
                    } //使用以上方式判断前端返回,微信团队郑重提示：res.err_msg将在用户支付成功后返回ok,但并不保证它绝对可靠。
                });
        }
    }
});
