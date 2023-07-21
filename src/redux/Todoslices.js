import { createSlice } from "@reduxjs/toolkit";

const initialState={
    input:"",
    list: [],
    userName:false,
    uid:false,
    loader:true,
    index:false
}

const TodoSlices = createSlice({ 
    name: "Todo",
    initialState,
    reducers: {
getInputValue:(state,action)=>{
return({
  ...state,
  input:action.payload
})

},

todoUpdate : (state,action)=>{

  return({
    ...state,
    index:false,
    input:""
  })
},

Edit:(state,action)=>{
return({
  ...state,
  input: state.list[action.payload],
  index:action.payload

})
},

      firebaseData: (state, action) => {
        return({
            ...state,
            userName:action.payload.userName,
            loader: false,
            list : action.payload.list||[],
            input:"",
           
        })
      },
      firebaseUid:(state,action)=>{
return({
    ...state,
    uid:action.payload
})
      },

 cancel : (state,action)=>{
return({
  ...state,
  index:false,
  input:""
})
 },
       

     setLoading : (state,action)=>{
return({
  loader:action.payload,
  uid:false,
  index:false
})
     }

    },
  });
  export default TodoSlices.reducer;
  export const { firebaseData ,firebaseUid,getInputValue,Edit , todoUpdate,cancel,setLoading} = TodoSlices.actions;