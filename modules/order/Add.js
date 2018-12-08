import React, { Component } from 'react'
import { connect } from 'react-redux'
import { getAllProduct, deleteProduct } from '../../redux/actions/product'
import { createOrder } from '../../redux/actions/order'
import { browserHistory, Link } from 'react-router';

class Add extends Component {
    constructor(props) {
        super(props)
        this.state = {
            object: {
                note: '',
                product_id: '',
                cart: null
            },
            listProduct: false,
            imagePreviewUrl: '',
            isLoading: false,
            isEdit: '',
        }
    }
    componentWillMount() {
        let params = {
            // date:
        }
        console.log(this.props)
        this.props.onGetAllProduct(params);
    }
    componentWillReceiveProps(props) {
        const { listProduct } = props.product;
        const { listOrder } = props.order;
        
        if (listProduct.type === "PRODUCT_ALL_SUCCESS") {
            this.setState({
                listProduct: listProduct.data.data,
            });
        }
        console.log(listOrder.type,55)
        if (listOrder.type === "ORDER_CREATE_SUCCESS") {
            browserHistory.push('/order');
        }

        // if (listProduct.type === "PRODUCT_ALL_FAIL") {
        //     alert('load data fail');
        // }
        this.setState({ isLoading: false });
    }
    onChange(e) {
        let object = this.state.object;
        object[e.target.name] = e.target.value
        this.setState({ object });
    }
    onSubmit(e) {
        e.preventDefault();
        let { note, product_id } = this.state.object;
        if (!note || !product_id) {
            alert('data not null');
            return;
        }
        let date = new Date();
        let currentDate = date.getDate() + '/' + (date.getMonth() + 1) + '/' + date.getFullYear();
        this.state.object.cart = JSON.stringify([{
            product_id,
            quantity: 1,
        }]);
        this.state.object.date = currentDate;
        this.props.onCreate(this.state.object);
    }
    renderProduct() {
        if (this.state.listProduct) {
            return (
                this.state.listProduct.map((object, index) =>
                    <option key={index} value={object.id}>{object.name}</option>
                )
            );
        }
    }
    renderForm() {

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
        //   {this.notice(this.state.updateStatus, this.state.noticeText)}
        let { note, product_id } = this.state.object;
        return (
            <div>

                <form className="form-horizontal" onSubmit={(e) => this.onSubmit(e)}>
                    <div className="form-group">
                        <label className="control-label col-sm-2" >Product:</label>
                        <div className="col-sm-10">
                            <select name="product_id" className="form-control"
                                value={product_id} onChange={(e) => this.onChange(e)}
                            >
                                <option value="">Please choose 1 product</option>
                                {this.renderProduct(this)}
                            </select>
                        </div>
                    </div>
                    <div className="form-group">
                        <label className="control-label col-sm-2">Description:</label>
                        <div className="col-sm-10">
                            <textArea name="note" className="form-control" value={note}
                                onChange={(e) => this.onChange(e)} />
                        </div>
                    </div>
                    <div className="form-group">
                        <div className="col-sm-offset-2 col-sm-10">
                            <button type="submit" className="btn btn-default">Submit</button>
                        </div>
                    </div>
                </form>
            </div>
        );

    }
    render() {

        return (
            <div>
                <div className="container">

                    <h1 className="text-center">Order</h1>
                    <button className="btn btn-default" onClick={() => this.onDelete(object.productId)}>
                        <i className="fa fa-reply" aria-hidden="true"></i> List</button>
                    {this.renderForm(this)}
                </div>
            </div>
        )
    }
}
function mapDispatchToProps(dispatch) {
    return {
        onSendDataLogin: (email, password) => dispatch(sendDataLogin.bind(null, email, password)),
        onGetAllProduct: (params) => dispatch(getAllProduct.bind(null, params)),
        onDelele: (params) => dispatch(deleteProduct.bind(null, params)),
        onCreate: (params) => dispatch(createOrder.bind(null, params)),
    }
}

export default connect(
    (state, ownProps) => ({
        auth: state.auth,
        product: state.product,
        order: state.order,
    })
    ,
    mapDispatchToProps
)(Add)