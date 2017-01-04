import React, { Component } from 'react';
import { connect } from 'react-redux';
import { actions, types } from '../../../../config/redux';
import { browserHistory } from 'react-router';
import { OurToaster } from '../../../components'
import {Intent } from "@blueprintjs/core";

class Add extends Component {
   constructor(props) {
    super(props);
    this.state = {
      id: 0,
      name:'',
      userName:'',
      email: '',
      avatar: '',
      note:'',
      routers:'',
      menu:'',
      active:true,
    }
  }
  componentWillReceiveProps(props) {
    if (props.user !== undefined && props.user.action === types.user.FETCH_ONE_USER_SUCCESS) {
      const { id,name,userName,email, avatar,note,routers,menu,active } = props.user.single.data;
      this.setState({ id,name,userName,email, avatar,note,routers,menu,active });
    }
    if (props.user !== undefined && props.user.action === types.user.USER_ADD_SUCCESS) {
       OurToaster.show({ intent: Intent.SUCCESS, message: "Thêm mới thành công!" });
       console.log(props.user.action,'action')
       //browserHistory.push('/user/update/'+this.state.id)
    }
    if (props.user !== undefined && props.user.action === types.user.USER_ADD_FAILED) {
       OurToaster.show({ intent: Intent.DANGER, message: "Thêm mới thất bại!" });
    }
    if (props.user !== undefined && props.user.action === types.user.FETCH_ONE_USER_FAIL) {
      this.setState({ note: 'Không tìm thấy dữ liệu ' });
    }
  }

  onSubmit(e) {
    e.preventDefault();
    let params = {
      name: this.state.name,
      userName: this.state.userName,
      email: this.state.email,
      active: this.state.active,
      note: this.state.note,
    }
    this.props.addUser(params)
    
  }
  render() {
    return (
      <div className="formView">
      {console.log(this.state,'state')}
      <form onSubmit={this.onSubmit.bind(this)}>
        <div className="panel tableView panel-default">
          <div className="panel-heading clearfix">
            <div className="col-md-6 action">
              <button onClick={() => browserHistory.push('/user')} type="button">
                <i className="fa fa-back" aria-hidden="true"></i>Quay về danh sách</button>
            </div>{/* end action*/}
            <div className="col-md-6 action text-right">
                <button type="submit" className="save btn btn-success">SAVE</button>
                <button type="button" className="cancel btn btn-danger">Cancel</button>
            </div>{/* end action*/}

          </div>
          <div className="panel-body">
            <div className="panel-group">
              <div className="panel panel-default">
                <div className="panel-heading clearfix">
                  <div className="col-md-5">
                    <h4 className="panel-title"> <a data-toggle="collapse" href="#plg" > Thêm mới tài khoản</a> </h4>
                  </div>
                </div>
                <div id="plg" className="panel-collapse collapse in clearfix" style={{ padding: '15px' }}>
                  <div className="col-md-12">
                    
                    <div className="row">
                      <div className="col-md-6">
                        <div className="panel panel-default">
                          <div className="panel-heading clearfix">
                            <h3 className="panel-title">Chi tiết</h3>
                          </div>
                          <div className="panel-body">
                              <div  className="form-group">
                                <label  >Họ tên </label>
                                <input type="text" value={this.state.name} name="name" className="form-control"
                                  onChange={(e) => this.setState({ name: e.target.value })}
                                  />
                              </div>
                              <div  className="form-group">
                                <label>Tên tài khoản </label>
                                <input  type="userName" value={this.state.userName} name="userName" className="form-control"
                                  onChange={(e) => this.setState({ userName: e.target.value })}
                                  />
                              </div>
                              <div  className="form-group">
                                <label>Email </label>
                                <input  type="email" value={this.state.email} name="email" className="form-control"
                                  onChange={(e) => this.setState({ email: e.target.value })}
                                  />
                              </div>
                              <div  className="form-group">
                                <label>Trạng thái </label>
                                <select name="active" value={this.state.active} className="form-control"
                                  onChange={(e) => this.setState({ active: e.target.value })}
                                  >
                                  <option value="true" >Họat động</option>
                                  <option value="false" >Bị khóa</option>
                                </select>
                              </div>
                            
                          </div>{/*/panel-body*/}
                        </div>
                      </div>
                      <div className="col-md-6">
                        <div className="panel panel-default">
                          <div className="panel-heading clearfix">
                            <h3 className="panel-title">Mô tả</h3>
                          </div>
                          <div className="panel-body">
                              <div className="form-group">
                                <label className=" control-label">Mô tả</label>
                                <textarea onChange={(e) => this.setState({ note: e.target.value })}  value={this.state.note} name="note" className="form-control" rows="" cols="">{this.state.note}</textarea>
                              </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                </div>
              </div>
            </div>
          </div>{/** end panel body */}
        </div>
        </form>
      </div >
    );
  }
}
// export default
const mapStateProps = (state) => {
  const { user } = state;
  return {
    user,
  }
}
const { user } = actions;
const mapDispatchToProps = {
  ...user,
}
export default connect(mapStateProps, mapDispatchToProps)(Add)