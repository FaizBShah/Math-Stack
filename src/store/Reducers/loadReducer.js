const initState = {
    loading: false
  }
  
  const loadReducer = (state = initState, action) => {
    switch (action.type) {
      case 'LOADING':
        return {
          loading: true
        }
      case 'LOADED':
        return {
          loading: false
        }
      default:
        return state
    }
  };
  
  export default loadReducer;