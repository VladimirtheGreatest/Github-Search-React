import React, { useReducer } from 'react' ;
import axios from 'axios';
import GithubContext from './githubContext';
import GithubReducer from './githubReducer';
import {
    SEARCH_USERS,
    SET_LOADING,
    CLEAR_USERS,
    GET_USERS,
    GET_REPOS
} from '../types';


const GithubState = props => {
    const initialState = {
        users: [],
        user: {},
        repos: [],
        loading: false
    }
    const [state,dispatch] = useReducer(GithubReducer, initialState)

    //Search Users, check Search.js to see how are we using this method, if we want to use this method in ANY component all we have to do is bring in the context, initialize it etc.

    const searchUsers = async text => { 
        setLoading()
    
        const res = await axios.get(`https://api.github.com/search/users?q=${text}&client_id=${process.env.REACT_APP_GITHUB_CLIENT_ID}&client_secret=${process.env.REACT_APP_GITHUB_CLIENT_SECRET}`)
        

        dispatch({
            type: SEARCH_USERS,   //setUsers(res.data.items);    //setLoading(false)
            payload: res.data.items
        });
      };

    //Get User

    //Get Repos

    //Clear Users 
    const clearUsers = () => dispatch({type: CLEAR_USERS})

    //Set Loading

    const setLoading = () => dispatch({ type: SET_LOADING });

    return (
    <GithubContext.Provider
        value={{
            users:state.users,
            user:state.user,
            repos:state.repos,
            loading:state.loading,
            searchUsers,
            clearUsers
        }}
        >
        {props.children}
    </GithubContext.Provider>
    );
};

export default GithubState
