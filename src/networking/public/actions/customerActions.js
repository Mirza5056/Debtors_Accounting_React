import axios from 'axios';
export const setCustomers=(customers)=>{
    return {
        type : 'GET_CUSTOMERS',
        payload : customers,
    };
};
export const selectCustomer=(customers)=>({
    type : 'SELECT_CUSTOMERS',
    payload : customers,
});
export const setState=(states_name)=>{
    return {
        type : 'GET_STATES',
        payload : states_name,
    };
};
export const fetchCustomersDetails=(customerCode)=>{
    return async(dispatch)=>{
        try
        {
            const response=await axios.get(`http://localhost:8080/getByCustomerCode?code=${customerCode}`);
            dispatch({
                type : 'GET_CUSTOMER_DETAILS',
                payload : response.data,
            });
        }catch(error) {
            console.log('Some Error Ocuured',error);
        }
    };
};
export const fetchStates=()=>{
    return async(dispatch)=>{
        try 
        {
            const response=await axios.get('http://localhost:8080/getStates');
            dispatch(setState(response.data));
        }catch(error) {
            console.log("Internal Server Error",error);
        }
    };
};
export const fetchCustomers=()=>{
    return async(dispatch)=>{
        try 
        {
            const response=await axios.get('http://localhost:8080/getCustomer');
            dispatch(setCustomers(response.data));
        }catch(error) {
            console.log("Some Error occured",error);
        }
    };
};