import axios from "axios";
export const setItems = (items) => {
    return {
        type: 'GET_ITEMS_DATA',
        payload: items,
    };
};
export const fetchItemsData = () => {
    return async (dispatch) => {
        try {
            const response = await axios.get('http://localhost:8080/getItems');
            dispatch(setItems(response.data));
        } catch (error) {
            //alert('Some Internal Error',error);
        }
    };
};
export const setItemDetails = (items) => {
    return {
        type: 'SET_ITEMS_DETAILS',
        payload: items,
    };
};
export const fetchItemsDetails = (code) => {
    return async (dispatch) => {
        try {
            const response = await axios.get(`http://localhost:8080/getByItemCode?code=${code}`);
            dispatch(setItemDetails(response.data));
        } catch (error) {
            console.log(error);
        }
    };
};
export const addItem = (item) => {
    return {
        type: 'ADD_ITEMS',
        payload: item,
    };
};
export const addItemData = (item) => {
    return async (dispatch) => {
        try {
            const response = await axios.post(
                'http://localhost:8080/addItems',
                item,
                { headers: { 'Content-Type': 'application/json' } }
            );
            dispatch(addItem(response.data));
            return response.data;
        } catch (error) {
            console.log('Some Error Occured', error);
            return { success: false, message: error.response?.data.message || "An error occured." };
        }
    };
};