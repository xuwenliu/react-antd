import JsonP from 'jsonp';
import axios from 'axios';
import { Modal } from 'antd';


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

    static ajax(options) {
        let loading;
        if (options.isShowLoading !==false){
            loading = document.getElementById('ajaxLoading');
            loading.style.display = 'block';
        }

        let baseURL = 'https://www.easy-mock.com/mock/5c83123e23107a1da64ea2fb/api';
        return new Promise((resolve, reject) => {
            axios({
                url: options.url,
                method: options.method || 'get',
                baseURL,
                tiemout: 5000,
                params: options.params || '',

            }).then((response) => {
                if (options.isShowLoading !==false) {
                    loading = document.getElementById('ajaxLoading');
                    loading.style.display = 'none';
                }
                if (response.status === 200){
                    let res = response.data;
                    if (res.data.code === 0){
                        resolve(res.data);
                    }else{
                        Modal.info({
                            title:"提示",
                            content:res.data.msg
                        })
                    }
                }else{
                    reject(response.data);
                }
            })
        })
    }
}