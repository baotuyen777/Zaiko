import Services from './Services'
export const getAllProduct = (param, dispatch, state) => {
  Services.get(
    'product',
    res => dispatch({ type: 'PRODUCT_ALL_SUCCESS', data: res }),
    res => dispatch({ type: 'PRODUCT_ALL_FAIL', data: res }),
    err => console.log(err));
}
export const deleteProduct = (id, dispatch, state) => {
  Services.delete(
    'product/'+id,
    res => dispatch({ type: 'PRODUCT_DELETE_SUCCESS', data: res }),
    res => dispatch({ type: 'PRODUCT_DELETE_FAIL', data: res }),
    err => console.log(err));
}

