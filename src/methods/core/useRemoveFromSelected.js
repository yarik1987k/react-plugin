import useDataContext from '../../context/useDataContext';

function useRemoveFromSelected() {
  const {
    selected, 
    setSelected
  } = useDataContext();

  function removeFromSelected(id, taxSlug) {
    const selectedCopy = {...selected};
    const valuesToRemove = !Array.isArray(id) ? [id] : id;

    if (selectedCopy[taxSlug]) {
      selectedCopy[taxSlug] = selectedCopy[taxSlug].filter(termId => !valuesToRemove.includes(termId));

      setSelected(selectedCopy);
    }
  }

  return {
    removeFromSelected
  }
}

export default useRemoveFromSelected;