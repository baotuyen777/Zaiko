export default new class ApiUrl {
    get baseUrl() {
        return 'http://192.168.2.87/zaiko/public/api/v1/';
    }


    //--- APPOINTMENT ---
    get appointmentDelete() {
        return this.baseUrl + '/doctor_appointment/delete';
    }

    get appointmentAdd() {
        return this.baseUrl + '/doctor_appointment/add';
    }

    get appointmentEdit() {
        return this.baseUrl + '/doctor_appointment/edit';
    }




}