import { createContext, useContext, useState } from 'react';
import axios from 'axios';
import toast from 'react-hot-toast';

import useFetch from '../../Hooks/useFetch';
const BookmarkContext = createContext();
const BASE_URL = 'http://localhost:5000';

function BookmarkListProvider({ children }) {
  const [currentBookmark, setCurrentBookmark] = useState(null);
  const [isLoadingCurrBookmark, setIsLoadinCurrBookmark] = useState(false);

  const { isLoading, data: bookmarks } = useFetch(`${BASE_URL}/bookmarks`);

  async function getBookmark(id) {
    setIsLoadinCurrBookmark(true);
    try {
      const { data } = await axios.get(`${BASE_URL}/bookmarks/${id}`);
      setCurrentBookmark(data);
      setIsLoadinCurrBookmark(false);
    } catch (error) {
      toast.error(error.message);
      setIsLoadinCurrBookmark(false);
    }
  }

  return (
    <BookmarkContext.Provider
      value={{
        isLoading,
        bookmarks,
        currentBookmark,
        getBookmark,
        isLoadingCurrBookmark,
      }}
    >
      {children}
    </BookmarkContext.Provider>
  );
}

export default BookmarkListProvider;

export function useBookmark() {
  return useContext(BookmarkContext);
}
