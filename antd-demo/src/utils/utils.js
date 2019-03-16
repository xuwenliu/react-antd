// import React from 'react';
// import {Button} from 'antd';
const filterDate = (date, fmt = 'YYYY-MM-DD HH:mm:ss') => {
    if (!date) {
        return '';
    }
    if (typeof date === 'number') {
        date = new Date(date * 1000);
    }
    var o = {
        'M+': date.getMonth() + 1,
        'D+': date.getDate(),
        'h+': date.getHours() % 12 === 0 ? 12 : date.getHours() % 12,
        'H+': date.getHours(),
        'm+': date.getMinutes(),
        's+': date.getSeconds(),
        'q+': Math.floor((date.getMonth() + 3) / 3),
        'S': date.getMilliseconds()
    }
    var week = {
        '0': '\u65e5',
        '1': '\u4e00',
        '2': '\u4e8c',
        '3': '\u4e09',
        '4': '\u56db',
        '5': '\u4e94',
        '6': '\u516d'
    }
    if (/(Y+)/.test(fmt)) {
        fmt = fmt.replace(RegExp.$1, (date.getFullYear() + '').substr(4 - RegExp.$1.length))
    }
    if (/(E+)/.test(fmt)) {
        fmt = fmt.replace(RegExp.$1, ((RegExp.$1.length > 1) ? (RegExp.$1.length > 2 ? '\u661f\u671f' : '\u5468') : '') + week[date.getDay() + ''])
    }
    for (var k in o) {
        if (new RegExp('(' + k + ')').test(fmt)) {
            fmt = fmt.replace(RegExp.$1, (RegExp.$1.length === 1) ? (o[k]) : (('00' + o[k]).substr(('' + o[k]).length)))
        }
    }
    return fmt
}

const pagination = (data,pageOrPageSizeChange) =>{
    return {
        //这里page和pageSize 的回调是同一个函数处理
        //page 变化的回调 参数是改变后的页码page及每页条数pageSize
        onChange:(currentPage,currentPageSize)=>{
            pageOrPageSizeChange(currentPage,currentPageSize)
        },
        //pageSize 变化的回调
        onShowSizeChange: (currentPage,currentPageSize) => {
            pageOrPageSizeChange(currentPage,currentPageSize);
        },
        // itemRender:(current, type, originalElement)=> {
        //     console.log(type)
        //     if (type === 'prev') {
        //       return (<Button size="small" style={{marginRight:10}}>上一页</Button>);
        //     } if (type === 'next') {
        //       return (<Button size="small" style={{marginRight:10}}>下一页</Button>);
        //     }
        //     return originalElement;
        // },
        current:data.result.page,
        pageSize:data.result.pageSize,
        total: data.result.totalCount,
        showTotal:()=>{
            return `${data.result.pageSize}/${data.result.totalCount}条`
        },
        showQuickJumper: true,
        showSizeChanger: true,//是否可以改变 pageSize
        pageSizeOptions:['10','20','50','100','200','500','1000']
    }
}

export default {
    filterDate,
    pagination
}