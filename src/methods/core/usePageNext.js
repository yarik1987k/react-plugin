import useDataContext from '../../context/useDataContext';

function usePageNext() {
  const {
    currentPage, 
    maxPages, 
    setCurrentPage
  } = useDataContext();

  function pageNext() {  
    if (!(currentPage >= maxPages)) {
      setCurrentPage(currentPage + 1);
    }
  }

  return {
    pageNext
  }
}

export default usePageNext;