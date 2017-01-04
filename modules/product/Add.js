import React, { Component } from 'react'
import { connect } from 'react-redux'
import { getAllProduct, deleteProduct } from '../../redux/actions/product'

class Add extends Component {
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
        console.log(this.props)
        this.props.onGetAllProduct(params);
    }
    componentWillReceiveProps(props) {
        const {listProduct} = props.product;
        if (listProduct.type === "PRODUCT_ALL_SUCCESS") {
            this.setState({
                data: listProduct.data.data.data,
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
        return (
            <div>
                {this.notice(this.state.updateStatus, this.state.noticeText)}
                <form className="form-horizontal">
                    <div className="form-group">
                        <label className="control-label col-sm-2" for="email">Email:</label>
                        <div className="col-sm-10">
                            <input type="email" className="form-control" id="email" placeholder="Enter email" />
                        </div>
                    </div>
                    <div className="form-group">
                        <label className="control-label col-sm-2" for="pwd">Password:</label>
                        <div className="col-sm-10">
                            <input type="password" className="form-control" id="pwd" placeholder="Enter password" />
                        </div>
                    </div>
                    <div className="form-group">
                        <div className="col-sm-offset-2 col-sm-10">
                            <div className="checkbox">
                                <label><input type="checkbox" /> Remember me</label>
                            </div>
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

                    <h1 className="text-center">Product</h1>
                    <button className="btn btn-success" onClick={() => this.onDelete(object.productId)}>
                        <i className="fa fa-trash" aria-hidden="true"></i> Add new</button>
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
    }
}

export default connect(
    (state, ownProps) => ({
        auth: state.auth,
        product: state.product,
    })
    ,
    mapDispatchToProps
)(Add)