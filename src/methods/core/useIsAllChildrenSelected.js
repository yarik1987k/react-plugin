import useDataContext from '../../context/useDataContext';
import useGetParent from './useGetParent';
import useGetSiblings from './useGetSiblings';
import useIsSelected from './useIsSelected';
import useAddToSelected from './useAddToSelected';

function useIsAllChildrenSelected() {
  const {currentFilter} = useDataContext();
  const {getParent} = useGetParent();
  const {getSiblings} = useGetSiblings();
  const {isSelected} = useIsSelected();
  const {addToSelected} = useAddToSelected();

  function isAllChildrenSelected() {
    if (!currentFilter.object) {return}

    const id = currentFilter.object.id;
    const taxSlug = currentFilter.taxSlug;
    const parent = getParent(id, taxSlug);
    const siblings = getSiblings(id, taxSlug);
    const siblingsSelected = [];

    if (!siblings) {return}
    siblings.forEach(sibling => {
      if (isSelected(sibling, taxSlug)) {
        siblingsSelected.push(sibling);
      }
    })

    if (siblings.length === siblingsSelected.length) {
      addToSelected(parent, taxSlug);
    }
  }

  return {
    isAllChildrenSelected
  }
}

export default useIsAllChildrenSelected;