export const login = (authObj) => {
    return {
        type: 'LOGIN',
        payload: authObj
    }
}