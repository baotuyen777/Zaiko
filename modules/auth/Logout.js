import React, { Component } from 'react'
import { connect } from 'react-redux'
import { browserHistory } from 'react-router'
//import { actions, types } from '../../../../config/redux';
// import { OurToaster, ImageLoading } from '../../../components'
// import { Intent } from "@blueprintjs/core"
class Logout extends Component {
    constructor(props) {
        super(props);
        this.state = {
            notice: ""
        }
        this.props.logout();
    }
    componentWillReceiveProps(props) {
        const { auth } = props;
        if (auth.logout === null && auth.action === "LOGOUT_CLEAR") {
            // this.setState({ notice: 'Logout fail ', noticeClass: 'alert alert-danger' });
        }
        if (auth !== undefined && auth.action !== null && auth.action === types.auth.LOGOUT_SUCCESS) {
            // this.setState({ notice: 'Logout success', noticeClass: 'alert alert-success' });
        }
        localStorage.removeItem('authZ');
        // OurToaster.show({ intent: Intent.WARNING, message: "Đăng xuất thành công!" });
        browserHistory.push('/login');
    }
    render() {
        return (<ImageLoading css={{ paddingTop: '20%' }} />);

    }
}
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
export default connect(mapStateProps, mapDispathToProps)(Logout)