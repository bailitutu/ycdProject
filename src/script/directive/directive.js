//自定义服务 适合用于控制器执行完后进行dom操作
app.directive('repeatFinish', ()=>({
        link(scope, element, attr) {
            scope.$last === true && scope.$eval(attr.repeatFinish)
        }
    }))
    .directive('stringToNumber', ()=>({
        require: 'ngModel',
        link(scope, element, attrs, ngModel) {
            ngModel.$parsers.push(function (value) {
                return '' + value;
            });
            ngModel.$formatters.push(function (value) {
                return parseFloat(value, 10);
            });
        }
    }))
    .directive('ngThumb', ['$window', ($window)=> {
        const helper = {
            support: !!($window.FileReader && $window.CanvasRenderingContext2D),
            isFile(item) {
                return angular.isObject(item) && item instanceof $window.File;
            },
            isImage(file) {
                const type = `|${file.type.slice(file.type.lastIndexOf('/') + 1)}|`;
                return '|jpg|png|jpeg|bmp|gif|'.includes(type);
            }
        };

        return {
            restrict: 'A',
            /*template: '<canvas/>',*/
            link(scope, element, attributes) {
                if (!helper.support) return;

                const params = scope.$eval(attributes.ngThumb);

                if (!helper.isFile(params.file)) return;
                if (!helper.isImage(params.file)) return;

                const reader = new FileReader();

                reader.onload = onLoadFile;
                reader.readAsDataURL(params.file);

                function onLoadFile(event) {
                    const img = new Image();
                    img.onload = onLoadImage;
                    img.src = event.target.result;
                }

                function onLoadImage() {
                    if (params.tx) scope.config.image = reader.result;
                    if (!params.img) {
                        element[0].style = `background-image:url(${reader.result})`;
                    } else {
                        element[0].src = reader.result;
                    }
                    /*if (!params.canvas) {
                     element[0].style = `background-image:url(${reader.result})`;
                     } else {
                     const canvas = element.find('canvas'),
                     width = params.width || this.width / this.height * params.height,
                     height = params.height || this.height / this.width * params.width;
                     canvas.attr({width: width, height: height});
                     canvas[0].getContext('2d').drawImage(this, 0, 0, width, height);
                     }*/
                }
            }
        };
    }])
    // 汽车站点分页
    .directive('myStation', ['myService', '$state', '$compile', (myService, $state, $compile)=> {
        return {
            restrict: 'AE',
            link(scope, element, attrs) {
                let loading = false,  //状态标记
                    $body = $(element);
                scope.updateState = 0;
                element.append($compile('<div ng-include="\'view/public/more.html\'"></div>')(scope));

                //$body.destroyInfinite();
                $body.infinite().on("infinite", function () {
                    if (loading) return;
                    loading = true;
                    scope.updateState = 1;
                    let p = myService.getStationData($state.current.name, true, {select: scope.select},false,1);
                    if (!p) {//end=true 终止 情况一在返回到此页面
                        scope.updateState = 2;
                        $body.destroyInfinite();
                    } else {
                        p.then((res)=> {
                            if (res.data.end) {//end=true 终止 情况二在滑动后
                                scope.updateState = 2;
                                $body.destroyInfinite();
                            } else {
                                loading = false;
                                scope.updateState = 1;
                            }
                        });
                    }
                    //如果在angular之外的事件中改变值，需要调用scope.$apply()
                    scope.$apply();
                });
            }
        }
    }])

    // 自行车站点分页
    .directive('myBike', ['myService', '$state', '$compile', (myService, $state, $compile)=> {
        return {
            restrict: 'AE',
            link(scope, element, attrs) {
                let loading = false,  //状态标记
                    $body = $(element);
                scope.updateState = 0;
                element.append($compile('<div ng-include="\'view/public/more.html\'"></div>')(scope));

                //$body.destroyInfinite();
                $body.infinite().on("infinite", function () {
                    if (loading) return;
                    loading = true;
                    scope.updateState = 1;
                    let p = myService.getBikeStationData($state.current.name, true, {select: scope.select},false,2);
                    if (!p) {//end=true 终止 情况一在返回到此页面
                        scope.updateState = 2;
                        $body.destroyInfinite();
                    } else {
                        p.then((res)=> {
                            if (res.data.end) {//end=true 终止 情况二在滑动后
                                scope.updateState = 2;
                                $body.destroyInfinite();
                            } else {
                                loading = false;
                                scope.updateState = 1;
                            }
                        });
                    }
                    //如果在angular之外的事件中改变值，需要调用scope.$apply()
                    scope.$apply();
                });
            }
        }
    }])
    // 收藏分页
    .directive('myCollect', ['myService', '$state', '$compile', (myService, $state, $compile)=> {
        return {
            restrict: 'AE',
            link(scope, element, attrs) {
                let loading = false,  //状态标记
                    $body = $(element);
                scope.updateState = 0;
                element.append($compile('<div ng-include="\'view/public/more.html\'"></div>')(scope));

                //$body.destroyInfinite();
                $body.infinite().on("infinite", function () {
                    if (loading) return;
                    loading = true;
                    scope.updateState = 1;
                    let p = myService.getCollectData($state.current.name, true, {select: scope.select});
                    if (!p) {//end=true 终止 情况一在返回到此页面
                        scope.updateState = 2;
                        $body.destroyInfinite();
                    } else {
                        p.then((res)=> {
                            if (res.data.end) {//end=true 终止 情况二在滑动后
                                scope.updateState = 2;
                                $body.destroyInfinite();
                            } else {
                                loading = false;
                                scope.updateState = 1;
                            }
                        });
                    }
                    //如果在angular之外的事件中改变值，需要调用scope.$apply()
                    scope.$apply();
                });
            }
        }
    }])
    //终端列表
    .directive('myGun', ['myService', '$state', '$compile', (myService, $state, $compile)=> {
        return {
            restrict: 'AE',
            link(scope, element, attrs) {
                let loading = false,  //状态标记
                    $body = $(element);
                scope.updateState = 0;
                element.append($compile('<div ng-include="\'view/public/more.html\'"></div>')(scope));
                //$body.destroyInfinite();
                $body.infinite().on("infinite", function () {
                    if (loading) return;
                    loading = true;
                    scope.updateState = 1;
                    let p = myService.setPageData('xq.zdxq', true, {select: scope.select});
                    if (!p) {//end=true 终止 情况一在返回到此页面
                        scope.updateState = 2;
                        $body.destroyInfinite();
                    } else {
                        p.then((res)=> {
                            if (res.data.end) {//end=true 终止 情况二在滑动后
                                scope.updateState = 2;
                                $body.destroyInfinite();
                            } else {
                                loading = false;
                                scope.updateState = 1;
                            }
                        });
                    }
                    //如果在angular之外的事件中改变值，需要调用scope.$apply()
                    scope.$apply();
                });
            }
        }
    }])
    // 自行车终端列表
    .directive('myBikes', ['myService', '$state', '$compile', (myService, $state, $compile)=> {
        return {
            restrict: 'AE',
            link(scope, element, attrs) {
                let loading = false,  //状态标记
                    $body = $(element);
                scope.updateState = 0;
                element.append($compile('<div ng-include="\'view/public/more.html\'"></div>')(scope));
                //$body.destroyInfinite();
                $body.infinite().on("infinite", function () {
                    if (loading) return;
                    loading = true;
                    scope.updateState = 1;
                    let p = myService.setPageData('bikezdxq', true, {select: scope.select});
                    if (!p) {//end=true 终止 情况一在返回到此页面
                        scope.updateState = 2;
                        $body.destroyInfinite();
                    } else {
                        p.then((res)=> {
                            if (res.data.end) {//end=true 终止 情况二在滑动后
                                scope.updateState = 2;
                                $body.destroyInfinite();
                            } else {
                                loading = false;
                                scope.updateState = 1;
                            }
                        });
                    }
                    //如果在angular之外的事件中改变值，需要调用scope.$apply()
                    scope.$apply();
                });
            }
        }
    }])
    // 列表分页
    .directive('myUpdate', ['myService', '$state', '$compile', (myService, $state, $compile)=> {
        return {
            restrict: 'AE',
            link(scope, element, attrs) {
                let loading = false,  //状态标记
                    $body = $(element);
                scope.updateState = 0;
                element.append($compile('<div ng-include="\'view/public/more.html\'"></div>')(scope));
                //$body.destroyInfinite();
                $body.infinite().on("infinite", function () {
                    if (loading) return;
                    loading = true;
                    scope.updateState = 1;
                    let p = myService.setPageData($state.current.name, true, {select: scope.select});
                    if (!p) {//end=true 终止 情况一在返回到此页面
                        scope.updateState = 2;
                        $body.destroyInfinite();
                    } else {
                        p.then((res)=> {
                            if (res.data.end) {//end=true 终止 情况二在滑动后
                                scope.updateState = 2;
                                $body.destroyInfinite();
                            } else {
                                loading = false;
                                scope.updateState = 1;
                            }
                        });
                    }
                    //如果在angular之外的事件中改变值，需要调用scope.$apply()
                    scope.$apply();
                });
            }
        }
    }])
    //控制输入最大值
    .directive('numberMax', ()=> ({
        restrict: 'AE',
        require: 'ngModel',
        link: function (scope, element, attr, linkfn) {
            let numberMax;
            scope.$watch(attr.ngModel, function (newValue, oldValue) {
                if (!newValue) {
                    return;
                }
                //直接在外面赋值在刷新的时候无法获取
                if (!numberMax) numberMax = Number(scope.$eval(attr.numberMax));
                if (angular.isNumber(numberMax) && !isNaN(numberMax)) {
                    if (newValue > numberMax) {
                        var exp = attr.ngModel + '=' + numberMax;
                        element.val(numberMax);
                        scope.$eval(exp);
                    }
                }
            });
        }
    }))
    //控制输入最小值
    .directive('numberMin', ()=> ({
        restrict: 'A',
        require: 'ngModel',
        link: function (scope, element, attr, linkfn) {
            const numberMin = Number(attr.numberMin);
            scope.$watch(attr.ngModel, function (newValue, oldValue) {
                if (!newValue) {
                    return;
                }
                if (angular.isNumber(numberMin) && !isNaN(numberMin)) {
                    if (oldValue == '-') {
                        const exp = attr.ngModel + '=' + undefined;
                        element.val(oldValue);
                        scope.$eval(exp);
                    } else if (newValue < numberMin) {
                        const exp = attr.ngModel + '=' + oldValue;
                        element.val(oldValue);
                        scope.$eval(exp);
                    }
                }
            });
        }
    }))
    .directive('datePicker', ['myService', '$state', (myService, $state)=> ({
        restrict: 'A',
        link: function (scope, element, attr, linkfn) {
            scope.select = {};
            $(element).picker({
                title: '选择时间',
                cols: [{textAlign: 'center', values: ['全部', '今天', '昨天', '一周前', '一月前']}],
                onClose: function (p, v, d) {
                    const active = p.cols[0].activeIndex;
                    if (scope.select.rq != active) {
                        scope.select.rq = active;
                        myService.setPageData($state.current.name, false, {select: scope.select}, true).then((res)=> {
                            scope.data = res.data;
                        });
                        scope.$apply();
                    }
                }
            });
        }
    })]);
