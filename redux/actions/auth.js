import Services from './Services'
export const sendDataLogin = (email, password, dispatch, state) => {
  let url = "authenticate";
  let param = {
    email,
    password,
  }
 
  Services.post(url, param,
    res => dispatch({ type: 'LOGIN_SUCCESS', data: res }),
    res => dispatch({ type: 'LOGIN_FAIL', data: res }),
    err => console.log(err));
}
export const doLogout = (dispatch, state) => {
  dispatch({ type: 'DO_LOGOUT' })
}

