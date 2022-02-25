const initialState = {
  boxes: []
};

const reducer = (state = initialState, action) => {
  switch(action.type) {
    case "GET_BOXES":
      return { ...state };
    case "ADD_BOX":
      return {
        ...state,
        boxes: state.boxes.concat(action.payload)
      };
    case "EDIT_BOX":
      return {
        ...state,
        boxes: state.boxes.map((content, i) =>
          content.id === action.payload.id
            ? {
              ...content,
              colorName: action.payload.colorName
            }
          : content
        )
      };
    case "DELETE_BOX":
      return {
        ...state,
        boxes: state.boxes.filter((box) => box.id !== action.payload)
      };
    default:
      return state;
  }
};

export default reducer;