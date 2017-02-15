import React, { Component } from 'react';
import { browserHistory } from 'react-router';
import { connect } from 'react-redux'
import { getAllOrder, deleteOrder, changeStatusOrder } from '../../redux/actions/order'

class List extends Component {
    constructor(props) {
        super(props)
        this.state = {
            data: null,
            isLoading: false,
            isDisabled: ''
        }
    }
    componentWillMount() {
        let params = {
            // date:
        }
        this.props.onGetAllOrder(params);
    }
    componentWillReceiveProps(props) {
        const {listOrder} = props.order;
        if (listOrder.type === "ORDER_ALL_SUCCESS") {
            this.setState({
                data: listOrder.data,
            });

        }

        if (listOrder.type === "ORDER_ALL_FAIL") {
            alert('load data fail');
        }
        this.setState({ isLoading: false });
    }
    onDelete(id) {
        if (!id) {
            alert({ notice: 'ID invalid' });
            return;
        }
        var r = confirm("Are you sure ?");
        if (r) {
            this.props.onDelele(id);
            this.setState({ isLoading: true });
        }
    }
    onChangeStatus(id, e, index) {
        this.props.onChangeStatus({ id, status: e.target.value });
        this.state.data[index].status = e.target.value;
        this.setState({ data: this.state.data });
    }
    renderList() {

        if (this.state.data === null) {
            return (
                <div >
                    <center >
                        <div className="loading">
                            <i className="fa-spin fa fa-cog" aria-hidden="true"></i>
                        </div>
                    </center>
                </div>
            );
        }
        return (
            <table className="table table-bordered">
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Name</th>
                        <th>Cart</th>
                        <th>Total</th>
                        <th>Action</th>
                        <th>Payment Status</th>
                    </tr>
                </thead>
                <tbody>
                    {this.state.data.data.map((object, index) =>
                        <tr key={index}>
                            <td>{index + 1}</td>
                            <td>{object.name}</td>
                            <td>
                                {object.cart.map((product, index) =>
                                    <span key={index}>{product.quantity + " " + product.name}</span>
                                )}
                            </td>
                            <td>
                                {object.total}
                            </td>
                            <td>
                                <button onClick={() => this.onDelete(object.orderId)}><i className="fa fa-trash" aria-hidden="true"></i></button>
                            </td>
                            <td>
                                <select value={object.status} onChange={(e) => this.onChangeStatus(object.orderId, e, index)} className="form-control" >

                                    <option value="2">Unpaid</option>
                                    <option value="3">Cancelled</option>
                                    <option value="4">Complete</option>
                                    <option value="1">Pending</option>
                                </select>
                            </td>
                        </tr>
                    )
                    }
                </tbody>
                <tfoot>
                    <tr>
                        <td colSpan="6">
                            <p>Total: {this.state.data.totalPrice}</p>
                            <p>Tototal Cart: {this.state.data.totalCart.map((cart, index) =>
                                <span key={index}> {cart.quantity} {cart.name},</span>
                            )}</p>
                        </td>

                    </tr>
                </tfoot>
            </table>
        );

    }
    render() {

        return (
            <div>
                <div className="container">

                    <h1 className="text-center">Order</h1>
                    <div className="action">
                        <button className="btn btn-success" onClick={() => browserHistory.push('/order/add')}>
                            <i className="fa fa-plus" aria-hidden="true"></i> Add new </button>
                    </div>
                    {this.renderList(this)}
                </div>
            </div>
        )
    }
}
function mapDispatchToProps(dispatch) {
    return {
        onSendDataLogin: (email, password) => dispatch(sendDataLogin.bind(null, email, password)),
        onGetAllOrder: (params) => dispatch(getAllOrder.bind(null, params)),
        onDelele: (params) => dispatch(deleteOrder.bind(null, params)),
        onChangeStatus: (params) => dispatch(changeStatusOrder.bind(null, params)),
    }
}

export default connect(
    (state, ownProps) => ({
        auth: state.auth,
        order: state.order,
    })
    ,
    mapDispatchToProps
)(List)