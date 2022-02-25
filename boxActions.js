
export function addBox(data) {
  return (dispatch) => {
    return dispatch({
      type: "ADD_BOX",
      payload: data 
    });
  };
}

export function editBox(data) {
  return (dispatch) => {
    return dispatch({
      type: "EDIT_BOX",
      payload: data
    });
  };
}

export function deleteBox(boxId) {
  return (dispatch) => {
    return dispatch({
      type: "DELETE_BOX",
      payload: boxId
    });
  };
}