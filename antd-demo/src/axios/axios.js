import JsonP from 'jsonp';
import axios from 'axios';
import { Modal } from 'antd';
import utils from '../utils/utils';


export default class Axios {
    static jsonp(options) {
        return new Promise((resolve, reject) => {
            JsonP(options.url, {
                param: 'callback'
            }, (err, res) => {
                if (res.status === 'success') {
                    resolve(res);
                } else {
                    reject(res.msssage);
                }
            })
        })
    }

    static getList(_this,url, params){
        this.ajax({
            url,
            params
        }).then((res) => {
            let list = res.result.list.map((item, index) => {
                item.key = index;
                return item;
            });
            _this.setState({
                list,
                pagination: utils.pagination(res, (page,pageSize) => {
                    _this.params.page = page;
                    _this.params.pageSize = pageSize;
                    _this.getList();
                })
            })
        })
    }

    static ajax(options) {
        let loading;
        if (options.isShowLoading !==false){
            loading = document.getElementById('ajaxLoading');
            loading.style.display = 'block';
        }

        let baseURL = 'https://www.easy-mock.com/mock/5c83123e23107a1da64ea2fb/api';
        return new Promise((resolve, reject) => {
            console.log(options)
            let postData = {};

            if (options.params) { //get 请求
                postData = {
                    url: options.url,
                    method:'get',
                    baseURL,
                    tiemout: 5000,
                    params: options.params || ''
    
                }
            }

            if (options.data) {//post 请求
                postData = {
                    url: options.url,
                    method: options.method || 'post',
                    baseURL,
                    tiemout: 5000,
                    data: options.data || null
                }
            }

            axios(postData).then((response) => {
                if (options.isShowLoading !== false) {
                    loading = document.getElementById('ajaxLoading');
                    loading.style.display = 'none';
                }

                if (response.status === 200){
                    let res = response.data;
                    console.log('res', response)
                    //请求的数据查询接口地址
                    if (response.config.url === 'http://jx.1000phone.net/teacher.php/Api/studentJobData_month') {
                        if (res){
                            resolve(res);
                        }
                    } else {
                        if (res.data.code === 0){
                            resolve(res.data);
                        }else{
                            Modal.info({
                                title:"提示",
                                content:res.data.msg
                            })
                        }
                    }
                    
                }else{
                    reject(response.data);
                }
            })
        })
    }
}