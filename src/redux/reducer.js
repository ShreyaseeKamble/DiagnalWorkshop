
  const initialState = {
    content: [],
    page: 1,
    size: 0,
    sizeReturned: 0,
    total: 0,
    title: '',
    searchResults: []
  }

  const checkWordExist = (item, search) => {
    let name = item.name;
    if(name.includes(search)) {
      return item;
    }
  }
  
  const getSearchResults = (search, data) => {

    return data.filter((item) => checkWordExist(item, search))
  }

  export default function appReducer(state = initialState, action) {

    switch (action.type) {
        case "loadData":
          let arrOldContent = state.content;
          let arrNewContent = action.payload['content-items'].content;

          const updatedState = {
            page: action.payload['page-num-requested'],
            size: action.payload['page-num-requested'],
            sizeReturned: action.payload['page-num-requested'],
            total: action.payload['page-num-requested'],
            content: arrOldContent.concat(arrNewContent),
            title: action.payload['title']
          }

          return updatedState;

        case "setSearchData": 
          const results = getSearchResults(action.payload, state.content);

          const updatedStateResults = {
            searchResults: results,
            searchText: action.payload,
            content: state.content
          };

          return updatedStateResults;

        default:
          return state;
      }
  }