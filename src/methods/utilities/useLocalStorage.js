import useSettingsContext from '../../context/useSettingsContext';
import useDataContext from '../../context/useDataContext';

function useLocalStorage() {
  const {userData, rememberFilters, currentPagePath} = useSettingsContext();
  const {selected, order, afterFirstEvent} = useDataContext();

  function setLocalStorage() {
    const selectedCopy = userData && userData !== null ? userData : {};
    const values = {selected: [], order: ''};

    if (rememberFilters && afterFirstEvent) {
      values.selected = selected;
      values.order = order;
      selectedCopy[currentPagePath] = values;
      localStorage.setItem('selected', JSON.stringify(selectedCopy));
    }
  }

  return {
    setLocalStorage
  }
}

export default useLocalStorage;