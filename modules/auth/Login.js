import React, { Component } from 'react';
import { browserHistory, Link } from 'react-router';
import { connect } from 'react-redux'
import { sendDataLogin } from '../../redux/actions/auth'

class Login extends Component {
    constructor(props) {
        super(props)
        this.state = {
            name: '',
            email: '',
            password: '',
            notice: '',
            color: { color: 'red' },
            noticeClass: 'error',
            loadingClass: '',
            isDisabled: ''
        }
    }
    componentWillReceiveProps(props) {
        const {login} = props.auth
        if (login.type === "LOGIN_SUCCESS") {
            const {token, data: {id, name, email, image, role, status}} = login.data;
            this.setState({
                notice: 'login successfully',
                color: { color: 'green' }
            });
            if (typeof (Storage) !== "undefined") {
                let dataStorage = { token, id, email, name, image, role, status }
                localStorage.setItem("authZ", JSON.stringify(dataStorage));
            } else {
                console.error("your browser not support localStorage");
            }
            browserHistory.push('/order');
        }

        if (login.type === "LOGIN_FAIL") {
            this.setState({
                notice: 'User name or password invalid',
                color: { color: 'red' }
            });
        }
        this.setState({ loadingClass: '', isDisabled: '' });
    }
    onSubmitLogin(e) {
        e.preventDefault();
        const {email, password} = this.state;
        this.setState({ notice: '' });
        if (!email.trim() || !password.trim()) {
            this.setState({ notice: 'email or password not null' })
            return;
        }
        // this.setState({ loadingClass: 'fa fa-spinner fa-spin', isDisabled: 'disabled' });
        this.props.onSendDataLogin(email, password);
    }
    renderFormLogin(show) {

        if (show) {
            return null;
        }
        return (
            <form className="form-horizontal" onSubmit={e => this.onSubmitLogin(e)}>
                <div className="form-group">
                    <label htmlFor="exampleInputEmail1">Email:</label>
                    <input type="email" className="form-control" id="exampleInputEmail1" placeholder="Email" value={this.state.email}
                        onChange={(e) => this.setState({ email: e.target.value })}
                        />
                </div>
                <div className="form-group">
                    <label htmlFor="exampleInputPassword1">Password</label>
                    <input type="password" className="form-control" id="exampleInputPassword1" placeholder="Password" value={this.state.password}
                        onChange={(e) => this.setState({ password: e.target.value })}
                        />
                </div>
                <div className="form-group">
                    <button type="" className="btn btn-primary" disabled={this.state.isDisabled}>
                        <i className={this.state.loadingClass}></i> Login</button>
                </div>
                <div className="form-group">
                    <Link to="/auth/register">Register</Link> - <Link to="/auth/reset-password-step1">Fogot password?</Link>
                </div>
            </form>
        );
    }
    render() {
        return (
            <div>
                <div className="container">
                    <h1 className="text-center">Login</h1>
                    <hr />
                    <div className="row">
                        <div className="col-md-4 col-md-offset-4">


                            <p style={this.state.color}>{this.state.notice}</p>
                            {this.renderFormLogin(this.state.isLoged)}
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}
function mapDispatchToProps(dispatch) {
    return {
        onSendDataLogin: (email, password) =>
            dispatch(sendDataLogin.bind(null, email, password))
    }
}

export default connect(
    (state, ownProps) => ({
        auth: state.auth,
    }),
    mapDispatchToProps
)(Login)