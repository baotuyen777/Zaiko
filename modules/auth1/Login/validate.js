var validate = (values) => {
    const errors = {};
    const warnings = {};
    if (!values.username) {
        errors.username = 'Tên tài khoản không được để trống'
    } else if (values.username.length > 15) {
        errors.username = 'Tên tài khoản phải nhỏ hơn 15 ký tự'
    }
    if (!values.favoriteColor) {
        errors.favoriteColor = 'This favoriteColor is required!'
    }
    if (!values.email) {
        errors.email = 'This email is required!'
    } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
        errors.email = 'Invalid email address'
    }
    if (!values.age) {
        errors.age = 'This field is required!'
    } else if (isNaN(Number(values.age))) {
        errors.age = 'Must be a number'
    } else if (Number(values.age) < 18) {
        errors.age = 'Sorry, you must be at least 18 years old'
    }
    if (values.age < 19) {
        warnings.age = 'Hmm, you seem a bit young...'
    }
    //some new rule
    if (!values.password || values.password.trim() === '') {
        errors.password = 'Mật khẩu không được để trống';
    }
    if (!values.confirmPassword || values.confirmPassword.trim() === '') {
        errors.confirmPassword = 'Enter Confirm Password';
    }

    if (values.confirmPassword && values.confirmPassword.trim() !== '' && values.password && values.password.trim() !== '' && values.password !== values.confirmPassword) {
        errors.password = 'Password And Confirm Password don\'t match';
    }
    /** ---------*/

    return errors;
}
export default validate