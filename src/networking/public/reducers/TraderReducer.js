const initialState={
    traderList : [],
};
const TraderReducer=(state = initialState,action)=>{
    switch(action.type) {
        case 'GET_TRADERS' :
            return {
                ...state,
                traderList : action.payload,
            }; 
        default :
            return state;
    };
};
export default TraderReducer;