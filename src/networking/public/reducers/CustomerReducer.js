const initialState = {
    customerList:[],
    selectedCustomer : null,
    customerDetails : null,
    statesList:[]
};
const CustomerReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'GET_CUSTOMERS':
            return {
                ...state,
                customerList: action.payload,
            };
        case 'SELECT_CUSTOMERS': 
            return {
                ...state,
                selectedCustomer : action.payload,
            };
        case 'GET_CUSTOMER_DETAILS' : 
            return {
                ...state,
                customerDetails : action.payload,
            };
        case 'GET_STATES' :
            return {
                ...state,
                statesList : action.payload,
            }
        default:
            return state;
    }
};
export default CustomerReducer;