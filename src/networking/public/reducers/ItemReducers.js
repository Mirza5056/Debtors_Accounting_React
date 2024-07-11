const initialState={
    itemsList : [],
    itemsDetails : [],
    addItemList : [],
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
        case 'ADD_ITEMS' :
            return {
                ...state,
                addItemList : [...state.addItemList, action.payload],
            };
        default:
            return state;
    }
};
export default ItemReducers;