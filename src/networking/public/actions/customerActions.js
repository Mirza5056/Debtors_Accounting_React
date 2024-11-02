import axios from 'axios';
export const setCustomers = (customers) => {
    return {
        type: 'GET_CUSTOMERS',
        payload: customers,
    };
};
export const selectCustomer = (customers) => ({
    type: 'SELECT_CUSTOMERS',
    payload: customers,
});
export const setState = (states_name) => {
    return {
        type: 'GET_STATES',
        payload: states_name,
    };
};

export const setCustomerDetails = (items) => {
    return {
        type: 'GET_CUSTOMER_DETAILS',
        payload: items,
    };
};

export const fetchCustomersDetails = (code) => {
    return async (dispatch) => {
        try {
            const response = await axios.get(`http://localhost:8080/getByCustomerCode?code=${code}`);
            dispatch(setCustomerDetails(response.data));
        } catch (error) {
            console.log('Some Error Ocuured', error);
        }
    };
};
export const fetchStates = () => {
    return async (dispatch) => {
        try {
            const response = await axios.get('http://localhost:8080/getStates');
            dispatch(setState(response.data));
        } catch (error) {
            console.log("Internal Server Error", error);
        }
    };
};
export const fetchCustomers = () => {
    return async (dispatch) => {
        try {
            const response = await axios.get('http://localhost:8080/getCustomer');
            dispatch(setCustomers(response.data));
        } catch (error) {
            console.log("Some Error occured", error);
        }
    };
};

export const setCustomerData = (customers) => {
    return {
        type: 'ADD_CUSTOMER',
        payload: customers
    };
};

export const addCustomerData = (customer) => {
    return async (dispatch) => {
        try {
            const response = await axios.post('http://localhost:8080/addCustomer',
                customer,
                {
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(customer)
                }
            );
            dispatch(setCustomerData(response.data));
            return response.data;
        } catch (error) {
            console.log("Some Problem Occured", error);
            return { success: false, message: error.response?.data.message || "An error occured." };
        }
    };
};


export const setCustomerDataEdit = (customers) => {
    return {
        type: 'EDIT_CUSTOMER',
        payload: customers
    };
};

export const editCustomerData = (customer) => {
    return async (dispatch) => {
        try {
            const response = await axios.post('http://localhost:8080/updateCustomer',
                customer,
                {
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(customer)
                }
            );
            dispatch(setCustomerDataEdit(response.data));
            return response.data;
        } catch (error) {
            console.log("Some Problem Occured", error);
            return { success: false, message: error.response?.data.message || "An error occured." };
        }
    };
};

export const deleteCustomer = (code) => {
    return {
        type: 'DELETE_CUSTOMER',
        payload: {code}
    }
};

export const deleteCustomerData = (code) => {
    return async (dispatch) => {
        try {
            const response = await axios.delete(`http://localhost:8080/deleteCustomer/${code}`,
                code,
                {
                    headers: { 'Content-Type': 'application/json' },
                }
            );               
            if(response.data.success) {
                dispatch(deleteCustomer(response.data));
            }
            return response.data;
        } catch (error) {
            console.log("Some Problem Occured", error);
            return { success: false, message: error.response?.data.message || "An error occured." };
        }
    }
};