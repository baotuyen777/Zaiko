import React, { Component } from 'react';
import { connect } from 'react-redux'
import { actions, types } from '../../../../config/redux';
import './Login.scss';
import { Field, reduxForm } from 'redux-form'
import validate from './validate.js'
import { Link, browserHistory } from 'react-router'
import { renderField } from '../../../components/Form'
import { OurToaster } from '../../../components'
import {Intent } from "@blueprintjs/core"
class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isLoged: false,
            fullname: null,
            notice: '',
            noticeClass: 'hidden',
            loadingClass: '',
            isDisabled: '',
            values: {}
        }

    }
    componentWillReceiveProps(props) {
        const {auth} = props;
        if (auth.authError !== null && auth.action === "LOGIN_BACKEND_CLEAR") {
            this.setState({ notice: 'Tài khoản đăng nhập không tồn tại! ', noticeClass: 'alert alert-danger' });
        }

        if (auth !== undefined && auth.action !== null && auth.action === types.auth.LOGIN_BACKEND) {
            this.setState({ notice: 'Login success', noticeClass: 'alert alert-success' });
            // const { account_id, access_token, token_type, email, nickname, fullname, username } = auth.auth.data
            if (typeof (Storage) !== "undefined") {
                let dataStorage = auth.auth.data;
                localStorage.setItem("qsdkUser", JSON.stringify(dataStorage));
            } else {
                console.error("trình duyệt không hỗ trợ localStorage");
            }
            OurToaster.show({ intent: Intent.SUCCESS, message: "Đăng nhập thành công!" });
            browserHistory.push('/app360/rate');
        }
        this.setState({ isDisabled: false, loadingClass: '' });
    }
    checkLogin() {
        const user = JSON.parse(localStorage.getItem("qsdkUser")) || null;
        if (user !== null) {
            browserHistory.push('/');
        }
    }
    componentWillMount() {
        this.checkLogin();
    }
    submit(event) {
        // event.preventDefault();
        const {username, password} = event;
        // this.setState({ notice: '' });

        // this.setState({ loadingClass: 'fa fa-spinner fa-spin', isDisabled: 'disabled' });
        let param = {
            username, password,
            grant_type: 'password',
            client_id: 1,
            client_secret: 123
        };
        this.props.handlelogin(param);
    }
    notice() {
        if (this.state.notice !== '') {
            return (
                <div className="alert alert-danger">
                    <strong>Lỗi!</strong> {this.state.notice}
                </div>
            );
        }

    }
    render() {
        const { handleSubmit, submitting} = this.props;
        // const { handleSubmit, pristine, reset, submitting, valid} = this.props;
        return (
            <div className="login-form">
                <div className="container">
                    <div className="row">
                        <div className="col-md-4 col-md-offset-4 login-box">
                            <h3 className="text-center login-header">ĐĂNG NHẬP</h3>
                            {this.notice()}

                            <form onSubmit={handleSubmit(this.submit.bind(this))}>
                                <Field name="username" type="text" component={renderField} label="Tài khoản" />
                                <Field name="password" type="password" component={renderField} label="Mật khẩu" />
                                <div className="form-group text-center">
                                    <button type="submit" className="btn btn-primary btn-lg" disabled={submitting}>
                                        <i className={this.state.loadingClass}></i>
                                        Đăng Nhập
                                    </button>
                                    <Link to="/" >Quên mật khẩu</Link>
                                </div>

                            </form>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}
Login = reduxForm({
    form: 'ReduxFormTest',
    validate
})(Login)
// export default Login;
const mapStateProps = (state) => {
    const { auth } = state;
    return {
        auth
    }
}
const { auth } = actions;

const mapDispathToProps = {
  ...auth
}
export default connect(mapStateProps, mapDispathToProps)(Login)