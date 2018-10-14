/**
 * Created by Administrator on 2018/4/3/003.
 */
'use strict';
app
//html输出
    .filter('to_html', ['$sce', $sce => text => $sce.trustAsHtml(text)])
    //快充 慢充
    .filter('slType', ['$sce', $sce => text => (
        $sce.trustAsHtml(text === '1' && '<span class="label-primary label-small">快充</span>' ||
            text === '2' && '<span class="label-warning label-small">慢充</span>' ||
            text === '3' && '<span class="label-primary label-small">快充</span> <span class="label-warning label-small">慢充</span>')
    )])
    //图片路径
    .filter('img', ['$rootScope', ($rootScope)=>text=>($rootScope.static.imgPath + text)])
    //徽章
    .filter('badge', ['$sce', ($sce)=>text=>text ? $sce.trustAsHtml(`<span class="weui-badge">${text}</span>`) : ''])
    //已未读
    .filter('isRead', ['$sce', $sce => text => $sce.trustAsHtml(text ? '<span class="label-warning label-small">未读</span>' : '<span class="label-primary label-small">已读</span>')
    ])
    // 充电枪状态图
    .filter('stateImg', ()=>text=>text == 0 && 'src/images/icon_state.png' || text == 1 && 'src/images/icon_state1.png' || text == 2 && 'src/images/icon_state2.png'|| text == 4 && 'src/images/icon_state4.png' || text == 5 && 'src/images/icon_state5.png' || text == 6 && 'src/images/icon_state6.png' || text == 7 && 'src/images/icon_state7.png' || text == 8 && 'src/images/icon_state8.png' || text == 9 && 'src/images/icon_state9.png' )
    // 充电枪状态说明
    .filter('stateText', ()=>text=>text == 0 && '空闲' || text == 1 && '充电中' || text == 2 && '充满'|| text == 4 && '故障' || text == 5 && '等待充电' || text == 6 && '预约'|| text == 7 && '在线更新'|| text == 8 && '离线' || text == 9 && '维护' )
    .filter('zxcStatus', ()=>text=>text == 0 && '空闲' || text == 1 && '充电中' || text == 2 && '充满'|| text == 4 && '故障' || text == 5 && '等待充电' || text == 6 && '预约'|| text == 7 && '在线更新'|| text == 8 && '离线' || text == 9 && '维护' )
    .filter('cdjk',()=> text => text == 1 && '直流' || text == 2 && '交流')
    .filter('zdlx',()=> text => text == 1 && '交流桩' || text == 2 && '直流桩' || text == 3 && '交直流混合桩')
    //运营状态
    .filter('state', ()=>text=>['','正常', '维护', '暂停'][text])
    //发票类型此处没有用数组是因为可能会返回ture和false
    .filter('fplx', ()=>text=>text == '1' && '电子发票' || text == '2' && '纸质发票')
    .filter('fpStatus', ()=>text=>text == '1' && '待审核' || text == '2' && '已开票' || text == '3' && '已邮寄'  || text=='4' && '待上传pdf')
    //人名币格式化
    .filter('je', ()=>text=>String(text).replace(/(-?)([0-9|\.]+)/, '$1¥$2'))
    //电话隐藏中间
    .filter('tel', ()=>text=>String(text).replace(/(.{3}).{4}(.+)/, '$1****$2'))
    //充电卡类型
    .filter('cdktype', ()=>text=>text == 0 && '普通充电卡' || text == 1 && '高级充电卡')
    //电站性质
    .filter('xz', ()=>text=>text == 0 && '公用充电站' || text == 1 && '专用充电站')
    .filter('ddzt', ()=>text=>text == 1 && '待审核' || text == 2 && '审核通过' || text == 3 && '审核不通过')
    .filter('dzddzt', ()=>text=>text == 1 && '充电中' || text == 2 && '计费中'  || text == 3 && '待支付'|| text == 4 && '已完成' || text == 5 && '异常结束' || text == 6 && '预约订单' || text == 7 && '取消预约' || text == 8 && '充电异常' || text== -1 && '')
    .filter('qfddzt', ()=>text=>text == 1 && '待支付' || text == 2 && '已支付' )
    .filter('tc', ()=>text=>text == 0 && '收费停车' || text == 1 && '免费停车')
    .filter('zy', ()=>text=>text == 0 && '自营' || text == 1 && '加盟')
    .filter('kf', ()=>text=>text == '1' && '对外开放' || text == '2' && '不开放')
    .filter('rz', ()=>text=>text == 0 && '未认证' || text == 1 && '已认证')
    .filter('flsm', ()=>text=>{
        // const arr = text.split('|');
        return text.start + '-'+ text.end +' 电价'+text.price+'元/度'
    })
    //保留2位小数
    .filter('tofixed2', ()=>text=>Number(text).toFixed(2))
    //格式化时间判断今天
    .filter('date', ()=>text=> {
        const date1 = new Date(text).getTime(),
            arr = text.split(' '),
            date2 = new Date().getTime(),
            num = 24 * 60 * 60 * 1000,
            c = date2 - date1; //一天的毫秒数

        if (0 < c && c < num) {
            return `今天 ${arr[1]}`;
        } else {
            return text;
        }
    });
