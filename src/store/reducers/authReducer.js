const defaultState = {
    user: {},
}

const auth = (state = defaultState, action) => {
    switch (action.type) {
        case 'LOGIN':
            return {
                ...state,
                user: action.payload.authObj,
            }
        default:
            return state
    }
}

export default auth