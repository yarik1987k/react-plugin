import useDataContext from '../../context/useDataContext';

function useIsSelected() {
  const {selected} = useDataContext();

  function isSelected(id, taxSlug) {
    if (selected[taxSlug] && Array.isArray(selected[taxSlug]) && selected[taxSlug].includes(id)) {
      return true;
    }
    else {
      return false;
    }
  }

  return {
    isSelected
  }
}

export default useIsSelected;