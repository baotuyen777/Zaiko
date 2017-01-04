var validate = (values) => {
    const errors = {};
    // const warnings = {};

    //some new rule
    if (!values.currentPassword) {
        errors.currentPassword = 'Enter current Password';
    }
    if (!values.newPassword) {
        errors.newPassword = 'Enter new Password';
    } else if (values.newPassword.length <= 8){
        errors.newPassword = 'The new password length must be at least 8 characters';
    }
    if (!values.newConfirmedPassword || values.newConfirmedPassword.trim() === '') {
        errors.newConfirmedPassword = 'Enter Confirm Password';
    } else if (values.newPassword !== values.newConfirmedPassword) {
        errors.newConfirmedPassword = 'Password And Confirm Password don\'t match';
    }
    /** ---------*/

    return errors;
}
export default validate