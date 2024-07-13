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
export const setTraderData=(traders)=>{
    return {
        type : 'ADD_TRADERS',
        payload : traders,
    };
};
export const addTraderData=(trader)=>{
    return async(dispatch)=>{
        try
        {
            const response=await axios.post
            ('http://localhost:8080/updateTraders',
                trader,
                {
                    headers : {'Content-Type' : 'application/json'},
                    body : JSON.stringify(trader) 
                }
            );
            dispatch(setTraderData(response.data));
            alert(response.data);
            console.log(response.data);
        }catch(error) {
            console.log("Some Problem Occured",error);
            alert(error);
        }
    };
};