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
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const {content, searchResults} = store.getState();
  const [ searchText, setText ] = useState('');

  const handleInputBlur = () => {
    store.dispatch(setSearchData(searchText));
    if(searchText === '') {
      setData(content);
    } else {
      setData(searchResults)
    }
  }

  const handleInputChange = (value) => {
    setText(value);
  }
 
  useEffect(() => {
    setLoading(true);
    hasMore && fetchData(); 
  }, [page]);

  useEffect(() => {
    window.addEventListener('scroll', trackScrolling);
    document.removeEventListener('scroll', trackScrolling);
  }, []);

  const fetchData = () => {
    try {
      let url = 'http://localhost:3000/page'+page;
      fetch(url).then(
        (response) => response.json()
      ).then((data) => {  
        let newData = data.page;
        store.dispatch(loadDataAction(newData));
        const retrivedData = newData['content-items'].content;
        content ? setData([...content, ...retrivedData]) : setData(retrivedData);
        setLoading(false);
        setHasMore(newData['page-size-returned'] === newData['page-size-requested']);
      });
    } catch (error) {
      console.error(error);
    }
  }

  const isBottom = (el) => {
    return el.getBoundingClientRect().bottom <= window.innerHeight;
  }

  const trackScrolling = () => {
    const wrappedElement = document.getElementsByClassName('list_items');

    if (isBottom(wrappedElement[0])) {
      setPage(nativePage?.current+1);
    }
  };

  const getListItems = () => {
    return data && data.map((item, index) => {
      return <ListItem label={item.name} imgPath={item['poster-image']} key={item.name+index}></ListItem>
    })
  };

  return (
    <div className="container">
      <SearchBar searchText={searchText} handleInputBlur={handleInputBlur} handleInputChange={handleInputChange}></SearchBar>
      {
        data?.length ? 
          <div className="list_items">{getListItems()}</div> : 
          <div className="no_data">No Data</div>
      }
      {loading && hasMore && <div className="no_data">Loading...</div>}
    </div>
  )
};

export default ListItems;