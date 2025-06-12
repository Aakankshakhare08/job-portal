import { useEffect, useReducer } from "react";
import axios from "axios";

const initialState = {
  data: [],
  isLoading: false,
  isCompleted: false,
  search: "",
  limit: 5,
};

function reducer(state,action) {
    switch(action.type){
        case "API_INIT": {
            return {...state, isLoading: true };
        }
        case "API_SUCCESS": {
            return {...state, data: action.payload, isLoading:false };
        }
    }



};

export default UserDirectory = () => {
    const [users, dispatch] = useReducer(reducer,initialState);

    useEffect(() => {
        dispatch({type: "API_INIT "});
        (async () => {
            try {
                const response = await axios.get(
                    "https://jsonplaceholder.typicode.com/users"
                );
                dispatch({type: "API_SUCCESS", payload: response.data});
            } catch (err) {}
        })();
    }, []); 

    return (
        <div>
            <h1> User Directory</h1>
            {users.isLoading ? "loading..." : "content"}
                
        </div>    
        
        
    );
};
