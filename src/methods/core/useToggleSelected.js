import useDataContext from '../../context/useDataContext';
import useHasChildren from './useHasChildren';
import useGetParent from './useGetParent';
import useIsSelected from './useIsSelected';
import useAddToSelected from './useAddToSelected';
import useRemoveFromSelected from './useRemoveFromSelected';

function useToggleSelected() {
  const {
    setCurrentFilter,
    setCurrentPage,
    setChangedFilter,
    setAfterFirstEvent
  } = useDataContext();

  const {hasChildren} = useHasChildren();
  const {getParent} = useGetParent();
  const {isSelected} = useIsSelected();
  const {addToSelected} = useAddToSelected();
  const {removeFromSelected} = useRemoveFromSelected();

  function toggleSelected(object, taxSlug) {
    const id = object.id;
    const children = hasChildren(object.id, taxSlug);
    const parent = getParent(object.id, taxSlug);
    const parentSelected = isSelected(parent, taxSlug);
    let values;

    //Add to selected
    if (!isSelected(id, taxSlug)) {
      if (children) {
        values = [...children, id];
        addToSelected(values, taxSlug);
      }
      else {
        addToSelected(id, taxSlug);
      }
    }

    //Remove from selected
    else {
      if (children) {
        values = [...children, id];
        removeFromSelected(values, taxSlug);
      }
      else if (parentSelected) {
        values = [parent, id];
        removeFromSelected(values, taxSlug);
      }
      else {
        removeFromSelected(id, taxSlug);
      }
    }

    setCurrentFilter({object: object, taxSlug: taxSlug});
    setCurrentPage(1);
    setChangedFilter(true);
    setAfterFirstEvent(true);
  }

  return {
    toggleSelected
  }
}

export default useToggleSelected;