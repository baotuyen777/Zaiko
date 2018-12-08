import Services from './Services'
let entity = 'extra/order/';
export const getAllOrder = (param, dispatch, state) => {
  Services.get(
    entity,
    res => dispatch({ type: 'ORDER_ALL_SUCCESS', data: res }),
    res => dispatch({ type: 'ORDER_ALL_FAIL', data: res }),
    err => console.log(err));
}
export const deleteOrder = (id, dispatch, state) => {
  Services.delete(
    entity + id,
    res => dispatch({ type: 'ORDER_DELETE_SUCCESS', data: res }),
    res => dispatch({ type: 'ORDER_DELETE_FAIL', data: res }),
    err => console.log(err));
}
export const changeStatusOrder = (id, params, dispatch, state) => {
  Services.put(
    entity + "updateStatus/" + id,
    params,
    res => dispatch({ type: 'ORDER_CHANGE_STATUS_SUCCESS', data: res }),
    res => dispatch({ type: 'ORDER_CHANGE_STATUS_FAIL', data: res }),
    err => console.log(err));
}
export const updateOrder = (id, params, dispatch, state) => {
  Services.put(
    entity + id,
    params,
    res => dispatch({ type: 'ORDER_UPDATE_SUCCESS', data: res }),
    res => dispatch({ type: 'ORDER_UPDATE_FAIL', data: res }),
    err => console.log(err));
}
// export const addOrder = (params, dispatch, state) => {
//   Services.post(
//     entity,
//     params,
//     res => dispatch({ type: 'ORDER_CREATE_SUCCESS', data: res }),
//     res => dispatch({ type: 'ORDER_CREATE_FAIL', data: res }),
//     err => console.log(err));
// }

export const createOrder = (params, dispatch, state) => {
  Services.post(
    entity,
    params,
    res => dispatch({ type: 'ORDER_CREATE_SUCCESS', data: res }),
    res => dispatch({ type: 'ORDER_CREATE_FAIL', data: res }),
    err => console.log(err));
}