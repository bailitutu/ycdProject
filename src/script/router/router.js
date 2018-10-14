app.config(function ($stateProvider, $urlRouterProvider, $locationProvider) {
    $locationProvider.hashPrefix('');
    $urlRouterProvider.otherwise('/login');
    $stateProvider
        .state('home', {
            title: '首页',
            url: '/home',
            templateUrl: './view/mainPage/index.html',
            controller: 'homeCtrl'
        })
        .state('login', {
            title: '登录',
            url: '/login?{state}',
            templateUrl: './view/login/login.html',
            controller: 'loginCtrl'
        })
        .state('res', {
            title: '注册',
            url: '/res',
            templateUrl: './view/login/reg.html',
            controller: 'resCtrl'
        })
        .state('xy', {
            title: '用户协议',
            url: '/xy',
            templateUrl: './view/login/xy.html',
        })
        .state('forget', {
            title:'找回密码',
            url: '/forget',
            templateUrl: './view/login/forget.html',
            controller: 'forgetCtrl'
        })
        .state('grzx', {
            cache: false,
            title: '个人中心',
            url: '/grzx',
            resolve: {checkLogin: ["myService", myService => myService.checkLogin('grzx')]},
            templateUrl: 'view/personCenter/index.html',
            controller: 'grzxCtrl'
        })
        .state('wdqb', {
            title: '我的钱包',
            url: '/wdqb',
            templateUrl: 'view/wallet/index.html',
            resolve: {myData: ["myService", myService => myService.showData('我的钱包')]},
            controller: 'wdqbCtrl'
        })
        .state('zhcz', {
            cache: false,
            title: '充值',
            url: '/zhcz?{type}&{bizId}&{artId}&{disMoney}',
            templateUrl: 'view/wallet/zhcz.html',
            controller: 'zhczCtrl'
        })
        .state('zzhmx', {
            title: '子账户明细',
            url: '/zzhmx',
            templateUrl: 'view/wallet/zzhmx.html',
            controller: 'zzhmxCtrl'
        })
        .state('lsxq', {
            title: '流水详情',
            url: '/lsxq',
            templateUrl: 'view/wallet/lsxq.html'
        })
        .state('setting', {
            title: '个人资料',
            url: '/setting',
            templateUrl: 'view/personCenter/setting.html',
            controller: 'settingCtrl'
        })
        .state('xgmc', {
            title: '修改用户名',
            url: '/xgmc',
            templateUrl: 'view/personCenter/xgmc.html',
            controller: 'xgmcCtrl'
        })
        .state('smrzRz', {
            title: '实名认证',
            url: '/smrzRz',
            templateUrl: 'view/personCenter/smrz.html',
            controller: 'smrzRzCtrl'
        })
        .state('sjh', {
            title: '手机号',
            url: '/sjh',
            templateUrl: 'view/personCenter/sjh.html',
            controller: 'sjhCtrl'
        })
        .state('xgmm', {
            title: '修改密码',
            url: '/xgmm',
            templateUrl: 'view/personCenter/xgmm.html',
            controller: 'xgmmCtrl'
        })
        .state('xgsjh', {
            title: '修改手机号',
            url: '/xgsjh?{phone}',
            templateUrl: 'view/personCenter/xgsjh.html',
            controller: 'xgsjhCtrl'
        })
        .state('wddd', {
            title: '我的订单',
            url: '/wddd',
            templateUrl: 'view/personCenter/wddd.html',
            resolve: {checkLogin: ["myService", myService => myService.checkLogin('wddd')]},
            // resolve: {myData: ["myService", myService =>myService.setPageData('wddd')]},
            controller: 'wdddCtrl'
        })
        .state('wdddxq', {
            title: '订单详情',
            url: '/wdddxq/{id}',
            templateUrl: 'view/personCenter/wdddxq.html',
            resolve: {
                myData: ["myService", "$stateParams", "$rootScope", (myService, $stateParams) => myService.setData('订单详情', {
                    orderId: $stateParams.id,
                    type: "1",
                })]
            },
            controller: 'wdddxqCtrl'
        })
        .state('wdxx', {
            title: '我的消息',
            url: '/wdxx',
            templateUrl: 'view/personCenter/wdxx.html',
            resolve: {myData: ["myService", myService => myService.setPageData('wdxx')]},
            controller: 'dataCtrl'
        })
        .state('wdxxxq', {
            title: '消息详情',
            url: '/wdxxxq/{id}',
            templateUrl: 'view/personCenter/wdxxxq.html',
            resolve: {myData: ["myService", "$stateParams", (myService, $stateParams) => myService.setData('消息详情', $stateParams)]},
            controller: 'dataCtrl'
        })
        .state('yjfk', {
            title: '意见反馈',
            url: '/yjfk',
            templateUrl: 'view/personCenter/yjfk.html',
            controller: 'yjfkCtrl'
        })
        .state('fkcg', {
            title: '反馈成功',
            url: '/fkcg',
            templateUrl: 'view/personCenter/fkcg.html'
        })
        .state('sqtk', {
            title: '申请退款',
            url: '/sqtk',
            resolve: {myData: ["myService", myService => myService.showData('退款信息')]},
            templateUrl: 'view/personCenter/sqtk.html',
            controller: 'sqtkCtrl'
        })
        .state('wdfp', {
            title: '我的发票',
            url: '/wdfp',
            templateUrl: 'view/personCenter/wdfp.html',
            controller: 'wdfpCtrl'
        })
        .state('kpls', {
            title: '开票历史',
            url: '/kpls',
            templateUrl: 'view/personCenter/kpls.html',
            controller: 'kplsCtrl'
        })
        .state('sqkp', {
            title: '申请开票',
            url: '/sqkp/{total}/{ids}',
            templateUrl: 'view/personCenter/sqkp.html',
            controller: 'sqkpCtrl'
        })
        .state('ddkp', {
            cache: false,
            title: '订单开票',
            url: '/ddkp/',
            templateUrl: 'view/personCenter/ddkp.html',
            controller: 'ddkpCtrl'
        })
        .state('wdsc', {
            cache: false,
            title: '我的收藏',
            url: '/wdsc',
            templateUrl: 'view/personCenter/wdsc.html',
            controller: 'wdscCtrl'
        })
        .state('yhq', {
            cache: false,
            title: '我的优惠券',
            url: '/yhq',
            templateUrl: 'view/wallet/yhq.html',
            controller: 'yhqCtrl'
        })
        .state('selDis', {
            title: '选择优惠券',
            url: '/selDis?{bizId}&{nowMoney}',
            templateUrl: 'view/wallet/selyhq.html',
            controller: 'selDisCtrl'
        })
        .state('wdac', {
            cache: false,
            title: '我的爱车',
            url: '/wdac',
            templateUrl: 'view/personCenter/wdac.html',
            controller: 'wdacCtrl'
        })

        .state('tjac', {
            title: '添加爱车',
            url: '/tjac',
            templateUrl: 'view/personCenter/tjac.html',
            controller: 'tjacCtrl'
        })
        .state('xzcx', {
            title: '选择车型',
            url: '/xzcx',
            templateUrl: 'view/personCenter/xzcx.html',
            resolve: {myData: ["myService", myService => myService.setPageData('wdac')]},
            controller: 'xzcxCtrl'
        })
        .state('cdkmx', {
            cache: false,
            title: '我的充电卡',
            url: '/cdkmx',
            templateUrl: 'view/wallet/cdkmx.html',
            // resolve: {myData: ["myService", myService =>myService.setPageData('充电卡明细')]},
            controller: 'cdkmxCtrl'
        })
        .state('cdkxq', {
            title: '充电卡详情',
            url: '/cdkxq/{id}/{zx}/{kh}/{type}',
            templateUrl: 'view/wallet/cdkxq.html',
            controller: 'cdkxqCtrl'
        })
        .state('xgcdkmm', {
            title: '修改充电卡密码',
            url: '/xgcdkmm/{id}',
            templateUrl: 'view/wallet/xgcdkmm.html',
            controller: 'xgcdkmmCtrl'
        })
        .state('bdcdk', {
            title: '绑定充电卡',
            url: '/bdcdk',
            templateUrl: 'view/wallet/bdcdk.html',
            controller: 'bdcdkCtrl'
        })
        .state('jjls', {
            title: '我的流水账',
            url: '/jjls',
            templateUrl: 'view/wallet/jjls.html',
            controller: 'jjlsCtrl'
        })

        .state('wdtk', {
            title: '我的退款',
            url: '/wdtk',
            templateUrl: 'view/personCenter/wdtk.html',
            // resolve: {myData: ["myService", myService =>myService.setPageData('wdtk')]},
            controller: 'wdtkCtrl'
        })
        .state('bike', {
            title: '自行车站点',
            url: '/bike',
            templateUrl: 'tpl/zxccd/index.html',
            controller: 'bikeCtrl'
        })
        .state('bikexq', {
            cache: false,
            title: '自行车站点详情',
            url: '/bikexq?{id}&{nowLng}&{nowLat}',
            templateUrl: 'tpl/zxccd/dzxq.html',
            controller: 'bikexqCtrl'
        })
        .state('bikezbcd', {
            title: '云充电-准备充电',
            url: '/bikezbcd/{id}',
            templateUrl: 'tpl/zxccd/zbcd.html',
            resolve: {
                myData: ["myService", "$stateParams", (myService, $stateParams) => myService.setData('自行车预充电', {
                    id: $stateParams.id,
                    userId: ''
                })]
            },
            controller: 'bikezbcdCtrl'
        })

        .state('bikeycje', {
            title: '预充金额',
            url: '/bikeycje?{id}',
            templateUrl: 'tpl/zxccd/ycje.html',
            controller: 'bikeycjeCtrl'
        })
        .state('bikecdz', {
            cache: false,
            title: '充电中',
            url: '/bikecdz',
            templateUrl: 'tpl/zxccd/cdz.html',
            controller: 'bikecdzCtrl'
        })
        .state('bikedt', {
            title: '云充电-自行车地图',
            url: '/bikedt',
            templateUrl: 'tpl/zxccd/dt.html',
            controller: 'bikedtCtrl'
        })
})
