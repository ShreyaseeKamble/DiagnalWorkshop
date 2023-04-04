import React, { useEffect, useState } from "react";
import ListItem from "../listItem/listItem";
import { loadDataAction } from "../../redux/action/loadDataAction";
import './listItems.css';
import store from '../../redux/store';
import useStateRef from '../../hook/useStateRef';
import setSearchData from '../../redux/action/setSearchData';
import SearchBar from "../searchBar/searchBar";

const ListItems = () => {
  const [data, setData] = useState([]);
  const [page, setPage, nativePage] = useStateRef(1);
  const [hasMore, setHasMore] = useState(true);
  const {content, searchResults} = store.getState();
  const [ searchText, setText ] = useState('');

  /**
   * Function call when search box is blured
   */
  const handleInputBlur = () => {
    store.dispatch(setSearchData(searchText));
    if(searchText === '') {
      setData(content);
    } else {
      setData(searchResults)
    }
  }

  /**
   * Function call when search box is changed
   */
  const handleInputChange = (value) => {
    setText(value);
  }

  /**
   * Function call when back button is clicked
   */
  const handleBackButtonClicked = () => {
    setText('');
    setData(content);
  }
 
  /**
   * Use effect for search functionality
   */
  useEffect(() => {
    hasMore && (searchText === '') && fetchData(); 
  }, [page, searchText, hasMore]);

  /**
   * scrolling functionality
   */
  useEffect(() => {
    window.addEventListener('scroll', trackScrolling);
    document.removeEventListener('scroll', trackScrolling);
  }, []);

  /**
   * Calls specific json file according to page no.
   */
  const fetchData = () => {
    try {
      let url = 'https://shreyaseekamble.github.io/DiagnalData/page'+page+'.json';
      fetch(url).then(
        (response) => response.json()
      ).then((data) => {  
        let newData = data.page;
        store.dispatch(loadDataAction(newData));
        const retrivedData = newData['content-items'].content;
        content ? setData([...content, ...retrivedData]) : setData(retrivedData);
        setHasMore(newData['page-size-returned'] === newData['page-size-requested']);
      });
    } catch (error) {
      console.error(error);
    }
  }

  /**
   * Checks if scroll is at bottom
   * @param {*} el 
   * @returns 
   */
  const isBottom = (el) => {
    return el.getBoundingClientRect().bottom >= (window.innerHeight);
  }

  /**
   * This functions implements the native scrolling feature
   */
  const trackScrolling = () => {
    const wrappedElement = document.getElementsByClassName('list_items');

    if (isBottom(wrappedElement[0])) {
      setPage(nativePage?.current+1);
    }
  };

  /**
   * Creates multiple list items
   * @returns list element of component ListItem
   */
  const getListItems = () => {
    return data && data.map((item, index) => {
      return <ListItem label={item.name} imgPath={item['poster-image']} key={item.name+index}></ListItem>
    })
  };

  return (
    <div className="container">
      <SearchBar searchText={searchText} handleInputBlur={handleInputBlur} 
        handleInputChange={handleInputChange} handleBackButtonClicked={handleBackButtonClicked}></SearchBar>
      {
        data?.length ? 
          <div className="list_items">{getListItems()}</div> : 
          <div className="no_data">No Data</div>
      }
    </div>
  )
};

export default ListItems;
