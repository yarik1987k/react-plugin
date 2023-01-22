import useDataContext from '../../context/useDataContext';
import useRemoveFromSelected from './useRemoveFromSelected';
import useIsSelected from './useIsSelected';

function useReplaceSelected() {
  const {
    selected,
    setSelected,
    setCurrentPage,
    setChangedFilter,
    setAfterFirstEvent
  } = useDataContext();

  const {removeFromSelected} = useRemoveFromSelected();
  const {isSelected} = useIsSelected();
  
  function replaceSelected(id, taxSlug) {
    const selectedCopy = {...selected};
    selectedCopy[taxSlug] = [id];

    if(isSelected(id, taxSlug)) {
      removeFromSelected(id, taxSlug);
    }
    else {
      setSelected(selectedCopy);
    }
    
    setCurrentPage(1);
    setChangedFilter(true);
    setAfterFirstEvent(true);
  }

  return {
    replaceSelected
  }
}

export default useReplaceSelected;