const initialState = {
    customerList: [],
    selectedCustomer: null,
    customerDetails: null,
    statesList: [],
    customerDataList: [],
    customerUpdateList: []
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
                selectedCustomer: action.payload,
            };
        case 'GET_CUSTOMER_DETAILS':
            return {
                ...state,
                customerDetails: action.payload,
            };
        case 'GET_STATES':
            return {
                ...state,
                statesList: action.payload,
            }
        case 'ADD_CUSTOMER':
            return {
                ...state,
                customerDataList: [...state.customerDataList, action.payload],
            }
        case 'EDIT_CUSTOMER':
            return {
                ...state,
                customerDataList: state.customerDataList.map((customer) =>
                    customer.code === action.payload.code ? action.payload : customer
                ),
            }
        case 'DELETE_CUSTOMER':
            return {
                ...state,
                customerDataList : state.customerDataList.filter((customer) => customer.code !== action.payload.code),
            }
        default:
            return state;
    }
};
export default CustomerReducer;