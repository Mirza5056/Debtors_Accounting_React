import axios from "axios";
export const setTrader=(traders)=>{
    return {
        type : 'GET_TRADERS',
        payload : traders,
    };
};
export const fetchTraders=()=>{
    return async(dispatch)=>{
        try
        {
            const response=await axios.get('http://localhost:8080/getTraders');
            dispatch(setTrader(response.data));
        }catch(error) {
            alert('Some Error Occured',error);
            console.log('Some Error Occured',error);
        }
    };
};