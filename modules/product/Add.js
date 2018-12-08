import React, { Component } from 'react'
import { connect } from 'react-redux'
import { getAllProduct, deleteProduct, createProduct } from '../../redux/actions/product'
import { browserHistory, Link } from 'react-router';

class Add extends Component {
    constructor(props) {
        super(props)
        this.state = {
            object: {
                name: '',
                price: ''
            },
            file: '',
            imagePreviewUrl: '',
            isLoading: false,
            isEdit: ''
        }
    }
    componentWillMount() {
        let params = {
        }
        // this.props.onGetAllProduct(params);
    }
    componentWillReceiveProps(props) {
        const {listProduct} = props.product;
        if (listProduct.type === "PRODUCT_ALL_SUCCESS") {
            this.setState({
                data: listProduct.data.data.data,
            });

        }
        if(listProduct.data.status){
            browserHistory.push('/product');
        }
console.log(props.product);
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
        let {name, price, category, description, image} = this.state.object;
        if (!name || !price ) {
            alert('name, price not null');
            return;
        }
        this.props.onCreate(this.state.object);
    }

    onChangeImage(e) {
        e.preventDefault();

        let reader = new FileReader();
        let file = e.target.files[0];
        reader.onloadend = () => {
            this.setState({
                file: file,
                imagePreviewUrl: reader.result
            });
        }
        let object = this.state.object;
        object[e.target.name] = file.name
        this.setState({ object });

        reader.readAsDataURL(file)
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
        let {name,slug, price, category, description, image} = this.state.object;
        let {imagePreviewUrl} = this.state;
        let $imagePreview = null;
        if (imagePreviewUrl) {
            $imagePreview = (<img style={{ height: 100 }} src={imagePreviewUrl} />);
        }
        return (
            <div>

                <form className="form-horizontal" onSubmit={(e) => this.onSubmit(e)}>
                    <div className="form-group">
                        <label className="control-label col-sm-2">Name:</label>
                        <div className="col-sm-10">
                            <input name='name' type="text" className="form-control" placeholder="Name"
                                value={name} onChange={(e) => this.onChange(e)} />
                        </div>
                    </div>
                    <div className="form-group">
                        <label className="control-label col-sm-2">Slug:</label>
                        <div className="col-sm-10">
                            <input name='slug' type="text" className="form-control" placeholder="Slug"
                                value={slug} onChange={(e) => this.onChange(e)} />
                        </div>
                    </div>
                    <div className="form-group">
                        <label className="control-label col-sm-2">Price:</label>
                        <div className="col-sm-10">
                            <input name='price' type="number" className="form-control" placeholder="Price"
                                value={price} onChange={(e) => this.onChange(e)}
                                />
                        </div>
                    </div>
                    <div className="form-group">
                        <label className="control-label col-sm-2" >Category:</label>
                        <div className="col-sm-10">
                            <select name="category" className="form-control"
                                value={category} onChange={(e) => this.onChange(e)}
                                >
                                <option value={1}>1</option>
                                <option value={2}>2</option>
                            </select>
                        </div>
                    </div>
                    <div className="form-group">
                        <label className="control-label col-sm-2">Description:</label>
                        <div className="col-sm-10">
                            <textArea name="description" className="form-control"
                                onChange={(e) => this.onChange(e)}>{description}</textArea>
                        </div>
                    </div>
                    <div className="form-group">
                        <label className="control-label col-sm-2" >Image :</label>
                        <div className="col-sm-10">
                            <input type="file" name='image' className="form-control" onChange={(e) => this.onChangeImage(e)} />
                            <div >
                                {$imagePreview}
                            </div>
                        </div>
                    </div>
                    <div className="form-group">
                        <div className="col-sm-offset-2 col-sm-10">
                            <div className="checkbox">
                                <label><input type="checkbox" /> Activate   </label>
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
        onCreate: (params) => dispatch(createProduct.bind(null, params)),
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