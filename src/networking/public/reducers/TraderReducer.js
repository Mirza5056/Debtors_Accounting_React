const initialState={
    traderList : [],
    traderDataList : [],
};
const TraderReducer=(state = initialState,action)=>{
    switch(action.type) {
        case 'GET_TRADERS' :
            return {
                ...state,
                traderList : action.payload,
            }; 
        case 'ADD_TRADERS':
            return {
                ...state,
                traderDataList : [...state.traderDataList, action.payload],
            };
        default :
            return state;
    };
};
export default TraderReducer;