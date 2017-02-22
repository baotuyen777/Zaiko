import React, { Component } from 'react';
import { browserHistory } from 'react-router';
import { connect } from 'react-redux'
import { getAllOrder, deleteOrder, changeStatusOrder, addOrder, updateOrder } from '../../redux/actions/order'
import { getAllProduct } from '../../redux/actions/product';
import { getAllDate, changeStatusDate } from '../../redux/actions/date';
const cartDefault = [
    {
        productId: "",
        quantity: 1,

    }
];
const user = JSON.parse(localStorage.getItem("authZ")) || null;
class List extends Component {
    constructor(props) {
        super(props);
        let today = new Date();
        let dd = today.getDate();
        let mm = today.getMonth() + 1; //January is 0!
        let yyyy = today.getFullYear();

        this.state = {
            data: null,
            name: null,
            isLoading: false,
            isDisabled: '',
            cart: cartDefault,
            orderId: null,
            listProduct: null,
            listDate: null,
            currentDateOrder: yyyy + '-' + mm + '-' + dd,
            dateStatus:false
        }
    }
    componentWillMount() {

        let params = {
            date: this.state.currentDateOrder
        }
        this.props.onGetAllProduct({});
        this.props.onGetAllOrder(params);
        if (user.role === "2") {
            this.props.onGetAllDate({});
        }

    }
    componentWillReceiveProps(props) {
        const {listOrder} = props.order;
        const {listProduct} = props.product;
        const {listDate} = props.date;
        if (listOrder.type === "ORDER_ALL_SUCCESS") {
            this.setState({
                data: listOrder.data,
                dateStatus:listOrder.data.dateStatus
            });
            console.log(listOrder.data,1111);

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
        if (listProduct.type === "ORDER_CREATE_SUCCESS" || listProduct.type === "ORDER_UPDATE_SUCCESS" || listProduct.type === "ORDER_DELETE_SUCCESS" || listProduct.type === "ORDER_CHANGE_STATUS_SUCCESS") {
            this.props.onGetAllOrder({ date: this.state.currentDateOrder });
            this.setState({
                cart: [
                    {
                        productId: "",
                        quantity: 1,

                    }
                ]
            });
        }
        //get date
        if (listDate.type === "DATE_ALL_SUCCESS") {
            this.setState({
                listDate: listDate.data,
            });
        }
        //get date
        if (listDate.type === "DATE_CHANGE_STATUS_SUCCESS") {
            this.props.onGetAllDate({});
            this.props.onGetAllOrder({ date: this.state.currentDateOrder });
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
        // this.props.onChangeStatus({ id, status: e.target.value });
        // this.state.data[index].status = e.target.value;
        let params = { status: e.target.value };
        this.props.onChangeStatus(id, params)
        // this.setState({ data: this.state.data });
    }
    onChangeStatusDate() {
        let params = { status: !this.state.dateStatus };
        this.props.onChangeStatusDate(this.state.currentDateOrder, params)
    }
    onSubmit(e) {
        e.preventDefault();
        // var today = new Date();
        // var dd = today.getDate();
        // var mm = today.getMonth() + 1; //January is 0!
        // var yyyy = today.getFullYear();
        let object = {};
        for (let i in this.state.cart) {
            if (object[this.state.cart[i]['productId']] === undefined) {

                object[this.state.cart[i]['productId']] = this.state.cart[i];
            } else if (this.state.cart[i]['productId'] == object[this.state.cart[i]['productId']]['productId']) {
                object[this.state.cart[i]['productId']].quantity = parseInt(object[this.state.cart[i]['productId']].quantity) + parseInt(this.state.cart[i].quantity);
            } else {
                object[this.state.cart[i]['productId']] = this.state.cart[i];

            }

        }
        // var arrCart = map(object, (value, index) => [value])
        var arrCart = Object.keys(object).map(function (k) { return object[k] });
        let params = {
            cart: JSON.stringify(arrCart),
            date: this.state.data.currentDateOrder
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
        this.setState({ orderId: null, cart: cartDefault, name: null });
    }
    onUpdate(index, id) {
        if (!id) {
            alert({ notice: 'ID invalid' });
            return;
        }
        let orderId = this.state.data.data[index].orderId;
        let cart = this.state.data.data[index].cart;
        let name = this.state.data.data[index].name;
        let newCart = [];
        for (let k in cart) {
            newCart.push({
                productId: cart[k]['productId'],
                quantity: cart[k]['quantity']
            })
        }

        this.setState({ cart: newCart, orderId, name });
        // this.setState({ isLoading: true });
    }
    getDay(date) {
        let today = new Date(date);
        return today.getDate();
    }
    onChooseDay(date) {
        console.log(date);
        this.setState({ currentDateOrder: date });
        this.props.onGetAllOrder({ date });
    }
    renderAction(index, orderId, userId) {

        if (user.role === "2" || userId == user.id) {
            return (
                <div>
                    <button onClick={() => this.onDelete(orderId)} className="btn btn-danger"><i className="fa fa-trash" aria-hidden="true"></i></button> &nbsp;
                    <button onClick={() => this.onUpdate(index, orderId)} className="btn btn-warning"><i className="fa fa-pencil" aria-hidden="true"></i></button>
                </div>
            );
        }
    }

    renderPaymentStatus(object, index) {
        if (user.role === "2") {
            return (
                <select value={object.status} onChange={(e) => this.onChangeStatus(object.orderId, e, index)} className="form-control" >

                    <option value="2">Unpaid</option>
                    <option value="3">Cancelled</option>
                    <option value="4">Complete</option>
                    <option value="1">Pending</option>
                </select>
            );
        } else {
            let statusName = 'Pending';
            switch (object.status) {
                case 1: statusName = "Pending"; break;
                case 2: statusName = "Unpaid"; break;
                case 3: statusName = "Cancelled"; break;
                case 4: statusName = "Complete"; break;
            }
            return (<span>{statusName}</span>);
        }
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
        let date = new Date(this.state.currentDateOrder);
        let currentDate = date.getDate() + '/' + (date.getMonth() + 1) + '/' + date.getFullYear();
        return (
            <div>
                <p>order date: {currentDate}</p>
                <table className="table table-bordered">
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Name</th>
                            <th>Cart</th>
                            <th>Total</th>
                            <th>Action</th>
                            <th width="17%">Payment Status</th>
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
                                    {this.renderAction(index, object.orderId, object.userId)}
                                </td>
                                <td>
                                    {this.renderPaymentStatus(object, index)}
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
            </div>
        );

    }

    renderCalendar() {
        if (this.state.listDate === null) {
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
            <div className="calendar">
                <div className="cHeader"><a className="btn">prev</a> November <a className="btn">next</a></div>
                <div className="cContent">
                    {this.state.listDate.data.map((date, index) =>
                        <span key={index} onClick={e => this.onChooseDay(date.date)} className={date.status == 1 ? "dateActice" : ""}>{this.getDay(date.date)}</span>
                    )}
                </div>

            </div>
        );
    }
    renderForm() {
        if (this.state.data !== null && !this.state.data.dateStatus) {
            return (
                <div className="alert alert-danger">
                    <strong>Notice!</strong> the order in today blocked!
                    </div>

            );
        }
        if (this.state.listProduct !== null) {

            return (
                <div>

                    <table className="table table-bordered">
                        <thead>
                            <tr>
                                <th>Product {this.state.name !== null ? "(" + this.state.name + ")" : "(Add new)"} {this.renderButtonAdd()}</th>
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

                </div>
            );
        }
    }
    renderButtonAdd() {
        if (this.state.orderId !== null) {
            return (
                <button className="btn btn-warning" onClick={() => this.onAddNewOrder()}>
                    <i className="fa fa-times" aria-hidden="true"></i> Cancel</button>
            );
        }
    }
    render() {
        // {this.state.isLoading ? "" : "hidden"}
        return (
            <div className="relative">
                <div className="loading "></div>
                <div className="container">
                    <div className="row">
                        <div className="col-md-12" >
                            <h1 className="text-center">Order</h1>
                            <div className="action">
                                <button className="btn btn-primary" onClick={e => this.onChangeStatusDate()}> Change Status </button>
                            </div>
                        </div>

                        <div className="col-md-8">
                            {this.renderList(this)}
                        </div>
                        {/* sidebar  */}
                        <div className="col-md-4">
                            <p> &nbsp;</p>
                            {this.renderCalendar()}
                            <div className="error">{this.state.notice}</div>
                            {this.renderForm(this)}
                        </div>

                    </div>

                </div>
            </div >
        )
    }
}
function mapDispatchToProps(dispatch) {
    return {
        onSendDataLogin: (email, password) => dispatch(sendDataLogin.bind(null, email, password)),
        onGetAllOrder: (params) => dispatch(getAllOrder.bind(null, params)),
        onAddOrder: (params) => dispatch(addOrder.bind(null, params)),
        onDelele: (params) => dispatch(deleteOrder.bind(null, params)),
        onChangeStatus: (id, params) => dispatch(changeStatusOrder.bind(null, id, params)),
        onUpdateOrder: (id, params) => dispatch(updateOrder.bind(null, id, params)),
        onGetAllProduct: (params) => dispatch(getAllProduct.bind(null, params)),
        onGetAllDate: (params) => dispatch(getAllDate.bind(null, params)),
        onChangeStatusDate: (date, params) => dispatch(changeStatusDate.bind(null, date, params)),
    }
}

export default connect(
    (state, ownProps) => ({
        auth: state.auth,
        order: state.order,
        product: state.product,
        date: state.date,
    })
    ,
    mapDispatchToProps
)(List)
