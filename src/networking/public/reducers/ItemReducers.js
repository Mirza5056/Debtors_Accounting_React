const initialState={
    itemsList : [],
    itemsDetails : [],
};
const ItemReducers=(state = initialState, action)=>{
    switch(action.type) {
        case 'GET_ITEMS_DATA' :
            return {
                ...state,
                itemsList : action.payload,
            };
        case 'SET_ITEMS_DETAILS' :
            return {
                ...state,
                itemsDetails : action.payload,
            };
        default:
            return state;
    }
};
export default ItemReducers;