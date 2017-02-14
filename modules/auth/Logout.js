import React, { Component } from 'react'
import { browserHistory } from 'react-router'

export default class Logout extends Component {
    constructor(props) {
        super(props);
     
    }
    componentWillMount(){
   localStorage.removeItem('authZ');
        browserHistory.push('/login');
    }
    render() {
        return (<div></div>);
    }
}
