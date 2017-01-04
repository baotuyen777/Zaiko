import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link, browserHistory } from 'react-router';
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
        event.preventDefault();
        const {username, password} = this.state;
        this.setState({ notice: '' });

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
        // const { handleSubmit, submitting} = this.props;
        // const { handleSubmit, pristine, reset, submitting, valid} = this.props;
        return (
            <div className="login-form">
                <div className="container">
                    <div className="row">
                        <div className="col-md-4 col-md-offset-4 login-box">
                            <h3 className="text-center login-header">ĐĂNG NHẬP</h3>
                            {this.notice()}

                            <form onSubmit={(this.submit.bind(this))}>
                                <div className="form-group">
                                    <label>Tài khoản</label>
                                    <div>
                                        <input name="username" type="text" placeholder="Tài khoản" className="form-control"
                                            onChange={(e) => this.setState({ username: e.target.value })}
                                            />
                                    </div>
                                </div>
                                <div className="form-group">
                                    <label>Mật khẩu</label>
                                    <div>
                                        <input name="password" type="password" placeholder="Mật khẩu" className="form-control"
                                            onChange={(e) => this.setState({ password: e.target.value })}
                                            />
                                    </div>
                                </div>
                                <div className="form-group text-center">
                                    <button type="submit" className="btn btn-primary btn-lg col-md-6 col-sm-12" >
                                        <i className={this.state.loadingClass}></i>
                                        Đăng Nhập
                                        </button>
                                    <Link className="col-md-6 col-sm-12 hide" to="/" >Quên mật khẩu</Link>
                                </div>

                            </form>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}
export default connect(
    (state, ownProps) => ({
        count: state.examples.count,
        prop2: state.prop // just an example in case of many properties
    }),
    {
        onDecrement: decrease,
        func2: () => { } // just an example in case you need many functions from dispatch
    }
)(Login)