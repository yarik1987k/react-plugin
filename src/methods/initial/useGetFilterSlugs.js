import useDataContext from '../../context/useDataContext';

//Manages object keys with an array of what terms are selected for each taxonomy in selected object
function useGetFilterSlugs() {
  const {
    selected, 
    setSelected,
    filters
  } = useDataContext();

  function getFilterSlugs() {
    const selectedCopy = {...selected};

    for (const taxSlug in filters) {
      if (selectedCopy[taxSlug] === undefined) {
        if (filters[taxSlug].type === 'select') {
          selectedCopy[taxSlug] = '';
        }
        else {
          selectedCopy[taxSlug] = [];
        }
      }
    }
    
    setSelected(selectedCopy);
  }

  return {
    getFilterSlugs
  }
}

export default useGetFilterSlugs;