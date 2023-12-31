import { DATA_ERROR, DATA_SUCCESS, DATA_REQUEST, ADD_POST, SET_SEARCH_QUERY, GET_USER_POST_REQ, GET_USER_POST_SUCCESS, GET_USER_POST_FAIL, USER_EDIT, USER_DELETE } from "./actionType";
import axios from "axios";

export const getUsersPostAction = (token)=>(dispatch) => {
  dispatch({ type: GET_USER_POST_REQ });

  const config = {
    headers: {
      Authorization: `Bearer ${token}` // Set the authorization header
    }
  };

  axios
    .get(`https://arthub-be.onrender.com/posts/userpost`, config)
    .then((res) => {
      // console.log(res.data);
      dispatch({ type: GET_USER_POST_SUCCESS, payload: res.data });
    })
    .catch((err) => {
      dispatch({ type: GET_USER_POST_FAIL });
    });
};




export const editUserPostAction=(token,updatedpost,postId)=>(dispatch)=>{
  dispatch({type:GET_USER_POST_REQ})
  
  axios.patch(`https://arthub-be.onrender.com/posts/update/${postId}`,updatedpost,{
    headers:{
      "Authorization":`Bearer ${token}`
    }

  })
  .then((res)=>{
      dispatch({type: USER_EDIT})
      console.log(res);
  })
  .catch((err)=>{
      dispatch({type:GET_USER_POST_FAIL})
      console.log(err);
  })
}


// export const deleteUserPostAction = (token, postId) => (dispatch) => {
//   dispatch({ type: GET_USER_POST_REQ });

//   axios
//     .delete(`https://arthub-be.onrender.com/posts/delete/${postId}`, {
//       headers: {
//         Authorization: `Bearer ${token}`,
//       },
//     })
//     .then((res) => {
//       dispatch({ type: USER_DELETE }); 
//       console.log(res);
//     })
//     .catch((err) => {
//       dispatch({ type: GET_USER_POST_FAIL });
//       console.log(err);
//     });
// };


export const deleteUserPostAction = (token, postId) => (dispatch) => {
  dispatch({ type: GET_USER_POST_REQ });

  axios
    .delete(`https://arthub-be.onrender.com/posts/delete/${postId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    .then((res) => {
      // Fetch the remaining posts after deleting
      axios
        .get("https://arthub-be.onrender.com/posts/userpost", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        .then((response) => {
          dispatch({
            type: USER_DELETE,
            payload: response.data, // Dispatch the remaining posts as payload
          });
        })
        .catch((err) => {
          dispatch({ type: GET_USER_POST_FAIL });
          console.log(err);
        });

      console.log(res);
    })
    .catch((err) => {
      dispatch({ type: GET_USER_POST_FAIL });
      console.log(err);
    });
};