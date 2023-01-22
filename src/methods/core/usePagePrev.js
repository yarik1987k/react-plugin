import useDataContext from '../../context/useDataContext';

function usePagePrev() {
  const {currentPage, setCurrentPage} = useDataContext();

  function pagePrev() {    
    if (!(currentPage <= 1)) {
      setCurrentPage(currentPage - 1);
    }
  }

  return {
    pagePrev
  }
}

export default usePagePrev;