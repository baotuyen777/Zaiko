import Services from './Services'
let entity = 'extra/product/';
export const getAllProduct = (param, dispatch, state) => {
  Services.get(
    entity,
    res => dispatch({ type: 'PRODUCT_ALL_SUCCESS', data: res }),
    res => dispatch({ type: 'PRODUCT_ALL_FAIL', data: res }),
    err => console.log(err));
}
export const deleteProduct = (id, dispatch, state) => {
  Services.delete(
    entity + id,
    res => dispatch({ type: 'PRODUCT_DELETE_SUCCESS', data: res }),
    res => dispatch({ type: 'PRODUCT_DELETE_FAIL', data: res }),
    err => console.log(err));
}
export const createProduct = (params, dispatch, state) => {
  Services.post(
    entity,
    params,
    res => dispatch({ type: 'PRODUCT_CREATE_SUCCESS', data: res }),
    res => dispatch({ type: 'PRODUCT_CREATE_FAIL', data: res }),
    err => console.log(err));
}
