import React, { Component } from 'react';
import { browserHistory } from 'react-router';
import { connect } from 'react-redux'
import { getAllOrder, deleteOrder, changeStatusOrder, addOrder, updateOrder } from '../../redux/actions/order'
import { getAllProduct } from '../../redux/actions/product';
const cartDefault = [
    {
        productId: "",
        quantity: 1,

    }
];
class List extends Component {
    constructor(props) {
        super(props)
        this.state = {
            data: null,
            isLoading: false,
            isDisabled: '',
            cart: cartDefault,
            orderId: null,
            listProduct: null,
        }
    }
    componentWillMount() {
        let params = {
            // date:
        }
        this.props.onGetAllProduct({});
        this.props.onGetAllOrder(params);

    }
    componentWillReceiveProps(props) {
        const {listOrder} = props.order;
        const {listProduct} = props.product;
        if (listOrder.type === "ORDER_ALL_SUCCESS") {
            this.setState({
                data: listOrder.data,
            });

        }

        if (listOrder.type === "ORDER_ALL_FAIL") {
            alert('load data fail');
        }
        if (listProduct.type === "PRODUCT_ALL_SUCCESS") {
            this.setState({
                listProduct: listProduct.data.data,
            });

        }

        if (listProduct.type === "PRODUCT_ALL_FAIL") {
            alert('load data fail');
        }
        //update data
        if (listProduct.type === "ORDER_CREATE_SUCCESS" || listProduct.type === "ORDER_UPDATE_SUCCESS" || listProduct.type === "ORDER_DELETE_SUCCESS") {
            this.props.onGetAllOrder();
            this.setState({
                cart: [
                    {
                        productId: "",
                        quantity: 1,

                    }
                ]
            });
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
    onSubmit(e) {
        e.preventDefault();
        var today = new Date();
        var dd = today.getDate();
        var mm = today.getMonth() + 1; //January is 0!
        var yyyy = today.getFullYear();
        let object = {};
        for (let i in this.state.cart) {
            if (object[this.state.cart[i]['productId']] === undefined) {

                object[this.state.cart[i]['productId']] = this.state.cart[i];
            } else if (this.state.cart[i]['productId'] == object[this.state.cart[i]['productId']]['productId']) {
                object[this.state.cart[i]['productId']].quantity += this.state.cart[i].quantity;
            } else {
                object[this.state.cart[i]['productId']] = this.state.cart[i];

            }

        }
        // var arrCart = map(object, (value, index) => [value])
        var arrCart = Object.keys(object).map(function (k) { return object[k] });
        let params = {
            cart: JSON.stringify(arrCart),
            date: yyyy + '-' + mm + "-" + dd
        }
        if (this.state.orderId === null) {
            this.props.onAddOrder(params);
        } else {
            this.props.onUpdateOrder(this.state.orderId, params);
        }

    }
    onChageCart(e, index) {
        e.preventDefault();
        this.state.cart[index][e.target.name] = e.target.value;
        this.setState({ cart: this.state.cart });
    }
    onAddRowCart() {
        this.state.cart.push({ productId: "", quantity: 1 });
        this.setState({ cart: this.state.cart });
    }
    onDelRowCard(index) {
        const cart = this.state.cart;
        this.state.cart.splice(0, 1);
        this.setState({ cart: this.state.cart });
    }
    onAddNewOrder() {
        this.setState({ orderId: null, cart: cartDefault });
    }
    onUpdate(index, id) {
        if (!id) {
            alert({ notice: 'ID invalid' });
            return;
        }

        let {orderId, cart} = this.state.data.data[index];
        let order = this.state.data.data[index];
        // let cart = [
        //     {
        //         id: "94",
        //         name: 'banh gao',
        //         price: '10000',
        //         productId: "1",
        //         quantity: "1"
        //     }
        // ];
        // let orderId = this.state.data.data[index].orderId;
        this.setState({ cart: order.cart, orderId: order.orderId });
        // this.setState({ isLoading: true });
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
                        <tr key={index} className={object.orderId === this.state.orderId ? "info" : ""}>
                            <td>{index + 1}</td>
                            <td>{object.name}</td>
                            <td>
                                {object.cart.map((product, index) =>
                                    <span key={index}>{product.quantity + " " + product.name} &nbsp;</span>
                                )}
                            </td>
                            <td>
                                {object.total}
                            </td>
                            <td>
                                <button onClick={() => this.onDelete(object.orderId)} className="btn btn-danger"><i className="fa fa-trash" aria-hidden="true"></i></button> &nbsp;
                                <button onClick={() => this.onUpdate(index, object.orderId)} className="btn btn-warning"><i className="fa fa-pencil" aria-hidden="true"></i></button>
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
    renderForm() {
        if (this.state.listProduct !== null) {
            return (
                <table className="table table-bordered">
                    <thead>
                        <tr>
                            <th>Product</th>
                            <th>Quantity</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            this.state.cart.map((product, index) =>
                                <tr key={index}>
                                    <td width="60%">
                                        <select className="form-control" onChange={(e) => this.onChageCart(e, index)} name="productId" value={product.productId}>
                                            <option value="" >Please choose product</option>
                                            {this.state.listProduct.map((product, index) =>
                                                <option key={index} value={product.id} >{product.name} ({product.price})</option>
                                            )}
                                        </select>
                                    </td>
                                    <td width="20%">
                                        <input type="number" value={product.quantity} name={product.productId} name="quantity"
                                            onChange={(e) => this.onChageCart(e, index)}
                                            className="form-control" id="quantity" placeholder="Quantity" />
                                    </td>

                                </tr>
                            )
                        }
                        <tr>
                            <td colSpan="2">
                                <button className="btn btn-success" style={{ float: "right" }} onClick={this.onAddRowCart.bind(this)}><i className="fa fa-plus"></i> Add row</button> &nbsp;
                                <button className="btn btn-danger" onClick={e => this.onDelRowCard()}><i className="fa fa-trash"></i> Del row</button>
                            </td>

                        </tr>
                    </tbody>
                    <tfoot>
                        <tr>
                            <td colSpan="3" style={{ textAlign: "center" }}>
                                <button type="button" style={{ width: "100%" }} onClick={this.onSubmit.bind(this)} className="btn btn-primary">
                                    <i className={this.state.loadingSubmitClass}></i>Submit</button>
                            </td>
                        </tr>
                    </tfoot>
                </table>

            );
        }
    }
    render() {

        return (
            <div>
                <div className="container">
                    <div className="row">
                        <div className="col-md-12" >
                            <h1 className="text-center">Order</h1>
                            <div className="action">
                                <button className="btn btn-success" onClick={() => this.onAddNewOrder()}>
                                    <i className="fa fa-plus" aria-hidden="true"></i> Add new </button>
                            </div>
                        </div>

                        <div className="col-md-8">


                            {this.renderList(this)}
                        </div>
                        {/* sidebar  */}
                        <div className="col-md-4">
                            <div className="error">{this.state.notice}</div>
                            {this.renderForm(this)}
                        </div>

                    </div>

                </div>
            </div>
        )
    }
}
function mapDispatchToProps(dispatch) {
    return {
        onSendDataLogin: (email, password) => dispatch(sendDataLogin.bind(null, email, password)),
        onGetAllOrder: (params) => dispatch(getAllOrder.bind(null, params)),
        onAddOrder: (params) => dispatch(addOrder.bind(null, params)),
        onDelele: (params) => dispatch(deleteOrder.bind(null, params)),
        onChangeStatus: (params) => dispatch(changeStatusOrder.bind(null, params)),
        onUpdateOrder: (id, params) => dispatch(updateOrder.bind(null, id, params)),
        onGetAllProduct: (params) => dispatch(getAllProduct.bind(null, params)),
    }
}

export default connect(
    (state, ownProps) => ({
        auth: state.auth,
        order: state.order,
        product: state.product,
    })
    ,
    mapDispatchToProps
)(List)