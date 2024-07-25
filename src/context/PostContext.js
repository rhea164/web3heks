import createDataContext from "./createDataContext";

const PostReducer = (state, action) => {
    switch (action.type) {
        case 'add_Post':
            return [...state, { id: Math.floor(Math.random() * 9999), title: action.payload.title, description: action.payload.description }]
    }

}

const addPost = (dispatch) => {
    return (title, description) => {
        dispatch({ type: 'add_Post', payload: { title, description } })
    }
};

export const { Context, Provider } = createDataContext(
    PostReducer,
    { addPost },
    []
);

