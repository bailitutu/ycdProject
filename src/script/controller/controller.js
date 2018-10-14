/*
* 云充电项目控制器列表
* */
app
    .controller('loginCtrl', function ($scope, $state, $rootScope, myService, $cookies) {
        console.log()
        $scope.form = {
            password: '',
            openId: 'oMGkK1CLUWpTHV7MSwQNe2hffsIY'
        };
        $scope.viewClass = "login";
        // $rootScope.userOpenId = 'oMGkK1CLUWpTHV7MSwQNe2hffsIY';
        var loginRegion = myService.getUrlParam('state');
        $rootScope.loginRegion = loginRegion ? loginRegion : 'grzx';

        // if ($rootScope.userOpenId) {
        //     $scope.form.openId = $rootScope.userOpenId;
        // } else {
        //     $scope.urlCode = myService.getUrlParam('code');
        //     var getId = myService.getUserOpenId($scope.urlCode);
        //     getId.then(function (res) {
        //         if (res.data.error) {
        //             $.toast(res.data.error, 'text');
        //             return false;
        //         }
        //         $rootScope.userOpenId = $scope.form.openId = res.data.openId || '';
        //     });
        //
        // }


        // 登录
        $scope.submit = (myForm) => {
            myService.phoneValid(myForm.username, () => {
                if ($scope.form.password == '' || !$scope.form.password) {
                    $.toptip('请输入密码！', 'warning');
                    return;
                }
                // $state.go($rootScope.loginRegion );
                // return
                myService.submit('登录', $scope.form, (success) => {
                    $rootScope.config = success.data;
                    $cookies.putObject('config', success.data);
                    console.log($cookies)
                    console.log($rootScope.loginRegion)
                    $state.go($rootScope.loginRegion);
                    return true;
                })
            })
        };

    })
    .controller('resCtrl', function ($scope, $rootScope) {
        $scope.viewClass = "login";
        $scope.form = {type: '个人用户', password: ''};
        $scope.code = '000000';
        $scope.xy = true;
        $scope.yz = '';
        var promise = myService.getPosition();
        promise.then(function (data) {
            $scope.form.currLng = data.longitude;
            $scope.form.currLat = data.latitude;
        });
        $scope.submit = (myForm) => {
            myService.phoneValid(myForm.username, () => {
                if (!$scope.yz || $scope.yz.toString() != $scope.code) {
                    $.toast('验证码错误！', "cancel");
                    return false;
                }
                if (!$scope.form.password || $scope.form.password == '') {
                    $.toptip('请输入密码！', 'warning');
                    return false;
                }
                if ($scope.form.password.length < 6 || $scope.form.password.length > 20) {
                    $.toptip('请输入6-20位密码！', 'warning');
                    return false;
                }
                if (!$scope.xy) {
                    $.toptip('请阅读并同意用户服务协议', 'warning');
                    return false;
                }

                myService.submit('注册', $scope.form, (success) => {
                    $rootScope.config = success.data;
                    $cookieStore.put('config', success.data);
                    $.toast("注册成功!", "text", function () {
                        history.back();
                    });
                    return true;
                })
            });
        };

        $scope.timer = (time, myForm) => {
            myService.phoneValid(myForm.username, () => {
                myService.time(time, $scope.form && $scope.form.username, 1, (val, code) => {
                    $scope.timeNum = val;
                    $scope.code = code;
                });
            })
        }

    })
    .controller('forgetCtrl', function ($scope, $state, myService) {
        $scope.form = {
            password: ''
        };
        $scope.viewClass = "login";
        $scope.code = '000000';
        $scope.submit = (myForm) => {
            myService.phoneValid(myForm.username, () => {
                if ($scope.form.yz != $scope.code) {
                    $.toptip('验证码错误！', 'warning');
                    return false;
                }
                if (!$scope.form.password || $scope.form.password == '') {
                    $.toptip('请输入新密码！', 'warning');
                    return false;
                }
                myService.submit('找回密码', $scope.form, () => {
                    $scope.form = {};
                }, () => {
                    history.back();
                })
            })
        };
        $scope.timer = (time, myForm) => {
            myService.phoneValid(myForm.username, () => {
                myService.time(time, $scope.form && $scope.form.username, 2, (val, code) => {
                    $scope.timeNum = val;
                    $scope.code = code;
                });
            })
        }
    })

    /*
    * 个人中心-grzxCtrl
    * */
    .controller('grzxCtrl', function ($scope, $rootScope, checkLogin, myService) {
        if (!checkLogin) {
            return false;
        } else {
            myService.showData('个人信息').then((res) => {
                $.hideLoading();
                $scope.data = res.data;
            },function () {
                $.hideLoading();
            })
        }
        $scope.lists1 = [
            {icon: 'icon_wallet.png', name: '我的钱包', href: 'wdqb'},
            {icon: 'icon_order.png', name: '我的订单', href: 'wddd'},
            {icon: 'icon_refund.png', name: '我的退款', href: 'wdtk'},
            {icon: 'icon_message.png', name: '我的消息', href: 'wdxx'},
            {icon: 'icon_collect.png', name: '我的收藏', href: 'wdsc'}
        ];
        $scope.lists2 = [
            {icon: 'icon_car.png', name: '我的爱车', href: 'wdac'},
            {icon: 'icon_fapiao.png', name: '我的发票', href: 'wdfp'},
            {icon: 'icon_fankui.png', name: '意见反馈', href: 'yjfk'}
        ];
        // $scope.config = $rootScope.config;
        // const p = ()=> {
        //     var pb1 = $.photoBrowser({
        //         items: [
        //             $rootScope.config.image
        //             // $scope.data.img
        //         ]
        //     });
        //     $scope.photos = () => {
        //         pb1.open();
        //     }
        // }
    })




    /*
    * 个人中心-我的钱包-wdqbCtrl;
    *
    * */
    .controller('wdqbCtrl', function ($scope, myData, $rootScope) {
        $scope.data = myData.data;
        $rootScope.config.zzhye = $scope.data.subaccount;
    })

    /*
    * 个人中心-设置页面
    * */
    .controller('settingCtrl', function ($scope, myService, FileUploader, $cookies, $state, $rootScope) {
        myService.setData('个人信息', {userId: $rootScope.config.id}).then((res) => {
            $.hideLoading();
            $scope.data = res.data;
        },function(){
            $.hideLoading();
        });

        const uploader = $scope.uploader = new FileUploader({
            url: $rootScope.uploadUrl + '/ycd/filesvr/uploadify',
            queueLimit: 1,
            autoUpload: true,
            formData: [],
            removeAfterUpload: true
        });
        $scope.form = {
            userId: $rootScope.config.id
        };

        uploader.onAfterAddingFile = function (item) {
            $.showLoading('上传中...');
            uploader.uploadAll();
            uploader.onCompleteItem = (cell, response) => {
                $scope.form.img = response.upfileFilePath;
            };
            uploader.onCompleteAll = () => {
                myService.submit('修改头像', $scope.form, () => {
                    $.hideLoading();
                    $scope.form = {};
                    return true;
                }, () => {
                    $.hideLoading();
                })
            }
        };

        $scope.goRz = (status) => {
            if (!status) {
                return false;
            }
            $state.go('smrzRz');
        };
        $scope.logout = () => {
            $cookies.remove('config');
            $rootScope.config = $rootScope.userPosition = {};
            // $window.location.href = 'https://open.weixin.qq.com/connect/oauth2/authorize?appid=wx3f5ac668fe3ce907&redirect_uri=http%3a%2f%2fwww.hzhaochong.cn%2fdist%2f%23%2flogin&response_type=code&scope=snsapi_base&state=grzx#wechat_redirect';
            $state.go('login', {'state': 'grzx'});
        }
    })

    /*
    *   个人中心-实名认证
    * */
    .controller('smrzRzCtrl', function($scope, $rootScope, $state, myService){
        $scope.form = {
            userId: $rootScope.config.id
        };
        $scope.submit = (myForm) => {
            myService.valid(myForm, () => {
                myService.submit('实名认证', $scope.form, (success) => {
                    $scope.form = {};
                }, () => {
                    $rootScope.config.rz = '1';
                    $state.go('smrz');
                })
            })
        }
    })
    /*
    * 个人中心-修改名称
    *
    * */
    .controller('xgmcCtrl', function($scope, $state, myService, $rootScope){
        $scope.form = {userId: $scope.config.id};
        $scope.submit = (myForm) => {
            myService.valid(myForm, () => {
                $.showLoading()
                myService.submit('修改名称', $scope.form, () => {
                    $.hideLoading();
                    $scope.config.nickName = $scope.form.nickName;
                    $rootScope.config.nickName = $scope.form.nickName;
                    $scope.form = {};
                    $timeout(function(){
                        history.back();
                    },1500)
                })
            })
        }
    })
    /*
    * 个人中心-手机号
    * */
    .controller('sjhCtrl', function ($scope, myService, $rootScope){
        myService.setData('个人信息', {userId: $rootScope.config.id}).then((res) => {
            $.hideLoading();
            $scope.data = res.data;
        },function(){
            $.hideLoading();
        });
    })
    /*
    * 个人中心-修改手机号
    * */
    .controller('xgsjhCtrl', function($scope, myService, $stateParams) {
        $scope.code = '000000';
        $scope.submit = (myForm) => {
            myService.phoneValid(myForm.phone, () => {
                if (!$scope.form.yzm || $scope.form.yzm == '' || $scope.form.yzm.toString() !== $scope.code) {
                    $.toptip('验证码错误！', 'warning');
                    return false;
                }
                if (!$scope.form.oldpwd || $scope.form.oldpwd == '') {
                    $.toptip('请输入原密码！', 'warning');
                    return false;
                }
                if (!$scope.form.newpwd || $scope.form.newpwd == '') {
                    $.toptip('请输入新密码！', 'warning');
                    return false;
                }
                var postData = {
                    oldPhone: $stateParams.phone,
                    newPhone: $scope.form.phone,
                    oldpwd: $scope.form.oldpwd,
                    newpwd: $scope.form.newpwd
                };
                myService.submit('修改手机号', postData, () => {
                    $scope.config.tel = $scope.form.phone;
                    $scope.form = {};
                }, () => {
                    history.back();
                })
            })
        };

        $scope.timer = (time, myForm) => {
            myService.phoneValid(myForm.phone, () => {
                if ($stateParams.phone == $scope.form.phone) {
                    $.toptip('请填写新手机号！', 'warning');
                    return false;
                }
                myService.time(time, $scope.form && $scope.form.phone, 4, (val, code) => {
                    $scope.timeNum = val;
                    $scope.code = code;
                });
            })
        }

    })
    /*
    * 个人中心-修改秘密
    * */
    .controller('xgmmCtrl', function($scope, $rootScope, myService, $state){
        $scope.form = {
            password: '',
            username: $rootScope.config.tel
        };
        $scope.submit = (myForm) => {
            myService.valid(myForm, () => {
                if ($scope.form.yzm.toString() !== $scope.code) {
                    $.toptip('验证码错误！', 'warning');
                    return false;
                }
                myService.submit('修改密码', $scope.form, () => {
                    $scope.form = {};
                }, () => {
                    history.back();
                })
            })
        };
        $scope.timer = (time) => myService.time(time, $scope.config.tel, 3, (val, code) => {
            $scope.timeNum = val;
            $scope.code = code;
        });
    })

    /*
       * 个人中心-我的爱车 -wdacCtrl
       * */
    .controller('wdacCtrl', function ($scope, myService) {
        myService.setPageData('wdac', false, {}, true).then((res) => {
            $scope.data = res.data;
        });
        $scope.viewClass = 'flexColumn';
        $scope.del = (carId, idx) => {
            $.confirm({
                title: '操作',
                text: '是否确定要删除！',
                onOK() {
                    myService.submit('删除爱车', {id: carId}, () => {
                        $scope.data.lists.splice(idx, 1);//截取数组，删除当前行
                    });
                },
                onCancel() {
                }
            });
        };


    })
    /*
    * 个人中心-添加爱车
    * */
    .controller('tjacCtrl', function($scope, $rootScope, myService, $state){
        $scope.form = {
            carArea: '浙',
            userId: $rootScope.config.id
        };

        // myService.getData('车型')
        var raw = [];
        $.ajax({
            url:'http://www.hzhaochong.cn/api/wechat/wechatApi/vehicleLibrary',
            type:'post',
            dataType:'json',
            async:false,
            success:function(res){
                console.log(res)
                raw = res.lists;

            }
        });
        //添加爱车

        $("#picker-car").picker({
            title: "请选择车型",
            showDistrict: false,
            cols: [
                {
                    textAlign: 'center',
                    values: ['赵', '钱', '孙', '李', '周', '吴', '郑', '王'],
                    displayValues: ['1','22','1','22','1','22','1','22']
                },
                {
                    textAlign: 'center',
                    values: ['杰伦', '磊', '明', '小鹏', '燕姿', '菲菲', 'Baby']
                },
                {
                    textAlign: 'center',
                    values: ['先生', '小姐']
                }
            ],
            // cols:raw,
            toolbarCloseText:'完成',
            onChange:function(picker,values,displayValues){
                console.log(picker)
                console.log(res.value[0])
                console.log(res.value[1])
                console.log(res.value[2])
                console.log(res.cols[0].values)
                console.log(res.cols[1].values)
                console.log(res.cols[2].values)

                res.cols[1].replaceValues(raw.map(function(c){
                    return c.code;
                }),raw.map(function(d){
                    console.log(d)
                    return d.name;
                }));



            },

            onClose: function (res) {
                console.log(res.value);
                $scope.form.carbrandId = res.value[0];
                $scope.form.cartypeId = res.value[1];
            }
        });

    /*    $("#picker-car").carPicker({
            title: "请选择车型",
            showDistrict: false,
            onClose: function (res) {
                console.log(res.value);
                $scope.form.carbrandId = res.value[0];
                $scope.form.cartypeId = res.value[1];
            }
        });*/

        $("#picker-lx").picker({
            title: '选择车牌类型',
            cols: [{textAlign: 'center', values: ["小型车", "中型车", "大型车"]}],
            onClose: function (res) {
                $scope.form.plateType = res.value[0];
            }
        });

        $("#picker-cp").picker({
            title: '选择地区',
            cols: [{
                textAlign: 'center',
                values: ["京", "津", "渝", "沪", "冀", "晋", "辽", "吉", "黑", "苏", "浙", "皖", "闽", "赣", "鲁", "豫", "鄂", "湘", "粤", "琼", "川", "贵", "云", "陕", "甘", "青", "台", "桂", "宁", "新", "藏", "港", "澳", "内蒙古"]
            }]
        });

        $scope.submit = (myForm) => {
            myService.valid(myForm, () => {
                if ($scope.form.carbrandId == '' || !$scope.form.carbrandId) {
                    $.toptip('请选择车型！', 'warning');
                    return false;
                }
                $scope.form.carNumber = $scope.form.carArea + $scope.form.carNum;
                myService.submit('添加爱车', $scope.form, () => {
                    myForm.$setPristine();
                }, () => {
                    $scope.form = {
                        carArea: '浙'
                    };
                    history.back();
                })
            })
        }
    })
