import useSettingsContext from '../../context/useSettingsContext';
import useDataContext from '../../context/useDataContext';

function useResetSelected() {
  const {
    taxonomy,
    termId,
    authorId,
    tagId,
    preSelect,
    orderBy
  } = useSettingsContext();

  const {
    selected,
    setSelected,
    setOrder,
    setCurrentPage,
    setCurrentSearchTerm,
    setFilterReset,
    setChangedFilter,
    setAfterFirstEvent
  } = useDataContext();

  function resetSelected() {
    let selectedCopy = {...selected};

    for (const taxonomy in selectedCopy) {
      selectedCopy[taxonomy] = [];
    }

    //If preset reset to preset values
    if (taxonomy && termId) {
      selectedCopy[taxonomy] = [parseInt(termId)];
    }

    if (authorId) {
      selectedCopy['author'] = [parseInt(authorId)];
    }

    if (tagId) {
      selectedCopy['post_tag'] = [parseInt(tagId)];
    }

    if (preSelect) {
      selectedCopy = preSelect;
    }

    if (orderBy) {
      setOrder(orderBy);
    }
    else {
      setOrder('date');
    }

    setSelected(selectedCopy);
    setCurrentPage(1);
    setCurrentSearchTerm('');
    setFilterReset(true);
    setChangedFilter(true);
    setAfterFirstEvent(true);
  }

  return {
    resetSelected
  }
}

export default useResetSelected;