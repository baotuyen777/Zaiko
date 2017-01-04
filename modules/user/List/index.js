import React, { Component } from 'react';
import { Link,browserHistory } from 'react-router';
import { connect } from 'react-redux'
import { actions, types } from '../../../../config/redux';
import {
  ImageLoading
} from '../../../components';
class List extends Component {
  //Khởi tạo state 
  constructor(props)
  {
    super(props);
    const page = this.props.params.page || 1;
    this.state = {
      data: {},
      isDataReady: false,
      isDeleteLoading: false,
      loadingClass: 'show',
      totalPages: 1,
      chooseItem: {},
      checkAll: false,
      currentPage: page,
      checked: false,
      showModal: false
    }
    this.props.fetchUser('', page);
  }
  //Nhận dữ liệu 
  componentWillReceiveProps(props) {
    if (props.user !== undefined && props.user.action === types.user.USER_FETCH) {
      const { list: {data, total_pages, current_page} } = props.user;
      this.setState({
        data, totalPages: total_pages,
        currentPage: current_page

      });

      setTimeout(() => { this.setState({ isDataReady: true }) }, 1000);
    }
    if ((
      this.state.currentPage !== parseInt(props.params.page,10)
      && props.params.page !== undefined
      && props.user.action !== types.user.USER_FETCH)) {
      props.fetchUser('', props.params.page);
      this.setState({ isDataReady: false });
    }


    if (props.user.action === types.user.USER_DELETE && props.user.delete.success) {
      if (this.state.isDeleteLoading) {
        props.fetchUser('', props.params.page);
        this.setState({ isDeleteLoading: false });
      }
    }

  }
  //Xóa 1 bản ghi
  delete(id) {
    if (!id) {
      this.setState({ notice: 'ID invalid' });
      return;
    }
    var r = confirm("Are you sure ?");
    if (r) {
      this.props.deleteUser(id);
      this.setState({ isDeleteLoading: true, isDataReady: false });
    }

  }
  //Xóa nhiều bản ghi
  deleteMulti() {
    var count = Object.keys(this.state.chooseItem).length;
    if (count > 0) {
      var r = confirm("Are you sure ?");
      if (r) {
        this.setState({ chooseItem: {} });
        this.setState({ isDeleteLoading: true, isDataReady: false });
      }

    }
  }
  getUserStatus(status)
  {
      if(status) 
        return(<span className="label label-success">Hoạt động</span>)
      else
        return(<span className="label label-danger">Bị khóa</span>)
  }
  //render area
  renderAction(id) {
    return (
        <div>
            <div>{/* Modal */}
                <div className="modal fade" id={"delModalPlan" + id} tabIndex={-1} role="dialog" aria-labelledby="myModalLabel">
                    <div className="modal-dialog" role="document">
                        <div className="modal-content">
                            <div className="modal-header">
                                <button type="button" className="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">×</span></button>
                                <h4 className="modal-title" id="myModalLabel">Thông báo</h4>
                            </div>
                            <div className="modal-body">
                                <p>Bạn có chắc muốn xóa không ?</p>
                            </div>
                            <div className="modal-footer">
                                <button type="button" className="btn btn-default" data-dismiss="modal">Không</button>
                                <button type="button" className="btn btn-primary" data-dismiss="modal">Có</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>{/*End  Modal */}

            <button type="button" data-toggle="modal" data-target={"#delModalPlan" + id} className="btn btn-danger hide" >
                <i className="fa fa-times"></i>
            </button>
            <button type="button"  className='btn btn-warning' onClick={() => browserHistory.push('/user/update/' + id)}  >
                <i className="fa fa-pencil"></i>
            </button>
        </div>
    );
  }
  loadData(show) {
    if (!show) {
      return (
        <div>
          <ImageLoading/>
        </div>
      );
    }
    let pageTag = [];
    for (var i = 1; i <= this.state.totalPages; i++) {

      let active = i === this.state.currentPage ? 'active' : '';
      pageTag.push(<li key={i} className={active}><Link to={"/user/page/" + i}>{i}</Link></li>);
    }
    
    return (
      <div  className="">
        <table className="table table-hover">
          <thead>
            <tr>
              <th>Chi tiết</th>
              <th>Nhóm thành viên</th>
              <th>Tên đăng nhập</th>
              <th>Trạng thái</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {this.state.data.map(user=>
            <tr key={user.id} >
              <td>
                <Link to={"/user/update/"+user.id}>
                 
                  <img src={user.avatar?user.avatar:'images/DefaultUserIcon.png'} className="img-responsive avatar" alt="user"/>
                </Link>
                <div className="info">
                    <h5><Link to={"/user/view/"+user.id}>{user.name} </Link></h5>
                    <p><a  href={"mailto:"+ user.email }>{user.email}</a></p>
                </div>
              </td>
              <td>{user.role===1?'SM':'Thành viên'}</td>
              <td>{user.userName}</td>
              <td>{this.getUserStatus(user.active)} </td>
              <td>
                {this.renderAction(user.id)}
              </td>
            </tr>
            )}
            
          </tbody>
        </table>
        <ul className="pagination">
          {pageTag}
        </ul>
      </div>
    )

  }
  render() {
    return (
      <div className="listView">
       
          <div className="panel tableView panel-default">
            <div className="panel-heading clearfix">
                <div className="col-md-4 action">
                    <select className="selectpicker" disabled>
                        <option>Actions</option>
                        <option>Edit</option>
                        <option>Delete</option>
                    </select>
                    <button disabled onClick={() => browserHistory.push('/user/add')} type="button"><i className="fa fa-plus" aria-hidden="true"></i>Add user</button>
                </div>{/* end action*/}
                <div className="col-md-4 filter">
                    <select className="widgetFilter" disabled>
                      <option>All</option>
                      <option>Active users</option>
                      <option>InActive users</option>
                    </select>
                </div>{/* end filter*/}
            </div>
            <div className="panel-body">
                {this.loadData(this.state.isDataReady)}
            </div>
          </div>
         
      </div>
  
    );
  }
}
const mapStateProps = (state) => {
  const { user } = state;
  return {
    user
  }
}
const { user } = actions;
const mapDispatchToProps = {
  ...user
}
export default connect(mapStateProps, mapDispatchToProps)(List)