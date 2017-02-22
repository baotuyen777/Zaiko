import React, { Component } from 'react';
import { browserHistory } from 'react-router';
import { connect } from 'react-redux'
import { getAllProduct, deleteProduct } from '../../redux/actions/product'

class List extends Component {
    constructor(props) {
        super(props)
        this.state = {
            data: null,
            isLoading: false,
            isDisabled: ''
        }
        console.log(JSON.stringify({1:3, 2:4}));
    }
    componentWillMount() {
        let params = {
            // date:
        }
        console.log(this.props)
        this.props.onGetAllProduct(params);
    }
    componentWillReceiveProps(props) {
        const {listProduct} = props.product;
        if (listProduct.type === "PRODUCT_ALL_SUCCESS") {
            this.setState({
                data: listProduct.data.data,
            });

        }

        if (listProduct.type === "PRODUCT_ALL_FAIL") {
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
                        <th>id</th>
                        <th>Name</th>
                        <th>Price</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {this.state.data.map((object, index) =>
                        <tr key={index}>
                            <td>{index}</td>
                            <td>{object.name}</td>
                            <td>{object.price}</td>
                            <td><button onClick={() => this.onDelete(object.id) }><i className="fa fa-trash" aria-hidden="true"></i></button></td>
                        </tr>
                    )
                    }
                </tbody>
            </table>
        );

    }
    render() {

        return (
            <div>
                <div className="container">

                    <h1 className="text-center">Product</h1>
                    <div className="action">
                        <button className="btn btn-success" onClick={() => browserHistory.push('/product/add') }>
                            <i className="fa fa-plus" aria-hidden="true"></i> Add new </button>
                    </div>
                    {this.renderList(this) }
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
    }
}

export default connect(
    (state, ownProps) => ({
        auth: state.auth,
        product: state.product,
    })
    ,
    mapDispatchToProps
)(List)