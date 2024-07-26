import createDataContext from "./createDataContext";

const PostReducer = (state, action) => {
    switch (action.type) {
        case 'add_Post':
            return [{
                id: Math.floor(Math.random() * 9999),
                user: 'Sarah J.',
                avatar: 'https://randomuser.me/api/portraits/women/41.jpg',
                title: action.payload.title,
                description: action.payload.description,
                image: action.payload.image,
                likes: 0,
                comments: 0
            },
            ...state]
        default:
            return state;
    }
}

const addPost = (dispatch) => {
    return (title, description, image) => {
        dispatch({ type: 'add_Post', payload: { title, description, image } })
    }
};

const mockPosts = [
    {
        id: '1',
        user: 'Sarah J.',
        avatar: 'https://randomuser.me/api/portraits/women/41.jpg',
        title: 'Beach Cleanup Drive',
        description: 'Organized a community beach cleanup. We collected over 200 lbs of trash!',
        image: 'https://images.unsplash.com/photo-1618477461853-cf6ed80faba5?auto=format&fit=crop&q=80&w=400&h=250',
        likes: 89,
        comments: 12,
    },
    {
        id: '2',
        user: 'Mike R.',
        avatar: 'https://randomuser.me/api/portraits/men/32.jpg',
        title: 'Volunteer at Local Food Bank',
        description: 'Spent the day helping sort and distribute food to those in need.',
        image: 'https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?auto=format&fit=crop&q=80&w=400&h=250',
        likes: 56,
        comments: 8,
    },
    {
        id: '3',
        user: 'Emma L.',
        avatar: 'https://randomuser.me/api/portraits/women/63.jpg',
        title: 'Tree Planting Initiative',
        description: 'Joined a local group to plant 50 new trees in our city park!',
        image: 'https://images.unsplash.com/photo-1564114973748-419542e4399a?auto=format&fit=crop&q=80&w=400&h=250',
        likes: 102,
        comments: 15,
    },
    // Add more mock posts as needed
];
export const { Context, Provider } = createDataContext(
    PostReducer,
    { addPost },
    mockPosts
);
