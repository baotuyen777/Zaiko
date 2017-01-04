import React, { Component } from 'react';
import { connect } from 'react-redux'
import { actions, types } from '../../../../config/redux';
import { Field, reduxForm } from 'redux-form'
import validate from './validate.js'
// import { browserHistory } from 'react-router'
import { renderField } from '../../../components/Form'

class ChangePassword extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isSuccess: false,
            fullname: null,
            notice: '',
            loadingClass: '',
            isDisabled: '',
            values: {}
        }

    }
    componentWillReceiveProps(props) {
        const {auth} = props;
        if (auth.changePasswordError !== null && auth.action === "CHANGEPASSWORD_CLEAR") {

            this.setState({ notice: auth.changePasswordError.message });
        }

        if (auth !== undefined && auth.action !== null && auth.action === types.auth.CHANGEPASSWORD_SUCCESS) {
            this.setState({ notice: auth.changePassword.message, isSuccess: true });
            // const { access_token, token_type, email, nickname, fullname, username } = auth.auth.data

        }
        // this.setState({ isDisabled: false, loadingClass: '' });
    }

    submit(event) {
        // event.preventDefault();
        const {currentPassword, newPassword, newConfirmedPassword} = event;
        this.setState({ notice: '', isSuccess: false });

        // this.setState({ loadingClass: 'fa fa-spinner fa-spin', isDisabled: 'disabled' });
        let param = {
            currentPassword,
            newPassword,
            newConfirmedPassword
        };
        this.props.changePassword(param);
    }

    notice() {
        const {auth} = this.props;
        if (this.state.isSuccess) {
            return (
                <div className="alert alert-success">
                    <strong>Success!</strong> {this.state.notice}
                </div>
            );
        }
        if (auth.changePasswordError !== null ) {
            // this.setState({ isDisabled: false, loadingClass: '' });
            return (
                <div className="alert alert-danger">
                    <strong>Error!</strong> {auth.changePasswordError.message}
                </div>
            );
            
        }

    }


    render() {
        const { handleSubmit, submitting} = this.props;
       
        return (
            <div className="changepassword-form">
                <div className="container">
                    <div className="row">
                        <div className="col-md-4 col-md-offset-4">
                            {this.notice()}
                            <form onSubmit={handleSubmit(this.submit.bind(this))}>
                                <Field name="currentPassword" type="password" component={renderField} label="Mật khẩu hiện tại" />
                                <Field name="newPassword" type="password" component={renderField} label="Mật khẩu mới" />
                                <Field name="newConfirmedPassword" type="password" component={renderField} label="Nhập lại mật khẩu mới" />
                                <div className="form-group text-center">
                                    <button type="submit" className="btn btn-primary " disabled={ submitting }>
                                        <i className={this.state.loadingClass}></i> Đổi mật khẩu</button>
                                </div>

                            </form>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}
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
export default connect(mapStateProps, mapDispathToProps)(ChangePassword= reduxForm({
    form: 'ReduxFormTest',
    validate
})(ChangePassword))