import Services from './Services';
let entity = 'auth';
export const sendDataLogin = (email, password, dispatch, state) => {
  let url = entity + "/login";
  let param = {
    email,
    password,
  }
  Services.post(
    url,
    param,
    res => dispatch({ type: 'LOGIN_SUCCESS', data: res }),
    res => dispatch({ type: 'LOGIN_FAIL', data: res }),
    err => console.log(err));
}
export const doLogout = (dispatch, state) => {
  dispatch({ type: 'DO_LOGOUT' })
}
export const register = (params, dispatch, state) => {
  Services.post(
    entity + '/register',
    params,
    res => dispatch({ type: 'REGISTER_SUCCESS', data: res }),
    res => dispatch({ type: 'REGISTER_FAIL', data: res }),
    err => console.log(err));
}
