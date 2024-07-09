import axios from "axios";
export const setItems=(items)=>{
    return {
        type : 'GET_ITEMS_DATA',
        payload : items,
    };
};
export const fetchItemsData=()=>{
    return async(dispatch)=>{
        try
        {
            const response=await axios.get('http://localhost:8080/getItems');
            dispatch(setItems(response.data));
        }catch(error) {
            alert('Some Internal Error',error);
        }
    };
};
export const setItemDetails=(items)=>{
    return {
        type : 'SET_ITEMS_DETAILS',
        payload : items,
    };
};
export const fetchItemsDetails=(code)=>{
    return async(dispatch)=>{
        try
        {
            const response=await axios.get(`http://localhost:8080/getByItemCode?code=${code}`);
            dispatch(setItemDetails(response.data));
            console.log(response.data);
        }catch(error) {
            console.log(error);
        }
    };
};