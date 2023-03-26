
  const initialState = {
    content: [],
    page: 1,
    size: 0,
    sizeReturned: 0,
    total: 0,
    title: '',
  }

  const checkWordExist = (item, search) => {
    let name = item.name;
    if(name.includes(search)) {
      return item;
    }
  }
  
  const getSearchResults = (search, content) => {

   return content.filter((item) => checkWordExist(item, search))
  }

  export default function appReducer(state = initialState, action) {

    switch (action.type) {
        case "loadData":
          const updatedState = {
            ...initialState,
            page: action.payload['page-num-requested'],
            size: action.payload['page-num-requested'],
            sizeReturned: action.payload['page-num-requested'],
            total: action.payload['page-num-requested'],
            content: action.payload['content-items'].content,
            title: action.payload['title']
          }

          return updatedState;

        case "setSearchData": 
          const results = getSearchResults(action.payload, state.content);

          const updatedStateResults = {
            ...initialState,
            content: results,
          };
          
          return updatedStateResults;

        default:
          return state;
      }
  }