import useDataContext from '../../context/useDataContext';

function useAddToSelected() {
  const {
    selected,
    setSelected,
    setChangedFilter,
    setAfterFirstEvent
  } = useDataContext();

  function addToSelected(id, taxSlug) {
    const selectedCopy = {...selected};
    let valuesToAdd = id;

    if(!Array.isArray(id)) {
      valuesToAdd = [id];
    }

    if(selectedCopy[taxSlug]) {
      valuesToAdd.forEach(id => {
        if (!selected[taxSlug].includes(id)) {
          selectedCopy[taxSlug] = [...selectedCopy[taxSlug], id];
          setSelected(selectedCopy);
        }
      });
    }

    setChangedFilter(true);
    setAfterFirstEvent(true);
  }

  return {
    addToSelected
  }
}

export default useAddToSelected;