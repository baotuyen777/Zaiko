import 'whatwg-fetch';
// import ApiUrl from './ApiUrl'
//contain common service 
const ApiUrl = 'http://192.168.1.87/nanoAPI/';
class Services {
    constructor(url) {
        this.serviceUrl = url;
        const user = JSON.parse(localStorage.getItem("authZ")) || null;
        if (user != null) {
            this.token =  user.token;
        }
    }

    delete(url, success, error) {
        console.log(this.token)
        fetch(ApiUrl + url, {
            method: 'delete',
            headers: {
                'Accept': 'application/json',
                'Authorization': this.token,
            },
        }).then(function (request) {

            return request.json();
        }).then((res) => {
            if (res.status == true) {
                if (success !== undefined && (typeof success === 'function')) {
                    success(res);
                }
                return;
            }
            if (failed !== undefined && typeof failed === 'function') {
                failed(res);
            }
        }).catch(function (ex) {
            if (error !== undefined && (typeof error === 'function')) {
                error(ex);
            }
        })
    }

    get(url, success, failed, error) {
        const user = JSON.parse(localStorage.getItem("authZ")) || null;
        if (user != null) {
            this.token =  user.token;
        }
        fetch(ApiUrl + url, {
            method: 'get',
            headers: {
                'Accept': 'application/json',
                'Content-Type' : 'application/x-www-form-urlencoded; charset=UTF-8',
                'token': this.token,
            },
        }).then((response) => {
            return response.json();
        }).then((res) => {
            if (res.status == true) {
                if (success !== undefined && typeof success === 'function') {

                    success(res);
                }
                return;
            }
            if (failed !== undefined && typeof failed === 'function') {
                failed(res);
            }
        }).catch((message) => {
            if (error !== undefined && (typeof error === 'function')) {
                error(message);
            }
        })
    }
    post(url, params, success, failed, error) {
        let form = new FormData();
        for (const key in params) {
            form.append(key, params[key]);
        }
        fetch(ApiUrl + url, {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Authorization': this.token,
            },
            body: form
        }).then((response) => {
            return response.json();
        }).then((res) => {

            if (res.status == true) {
                if (success !== undefined && typeof success === 'function') {
                    success(res);
                }
                return;
            }
            if (failed !== undefined && typeof failed === 'function') {
                failed(res);
            }
        }).catch((message) => {
            if (error !== undefined && typeof error === 'function') {
                error(message);
            }
        });
    }
    //pass params and call back function success, error ( post form demo)
    put(url, params, success, error) {
        if (params) {
            let form = new FormData();
            for (const key in params) {
                form.append(key, params[key]);
            }

            fetch(ApiUrl + url, {
                method: 'put',
                headers: {
                    'Accept': 'application/json',
                    //'Content-Type': 'multipart/form-data',
                    'Authorization': this.token,
                },
                body: form
            }).then(function (request) {
                return request.json();

            }).then(function (response) {
                if (success !== undefined && (typeof success === 'function')) {
                    success(response);
                }
            }).catch(function (ex) {
                if (error !== undefined && (typeof error === 'function')) {
                    error(ex);
                }
            })
        }

    }

}
export default new Services;