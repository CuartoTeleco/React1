function favouriteReducer(state = false, action) {
    switch (action.type) {
    case 'FAVOURITE_CLICKED':
        return action.favourite;
    default:
        return state;
    }
}

export default favouriteReducer;
