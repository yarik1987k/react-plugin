import useToggleSelected from './useToggleSelected';
import useReplaceSelected from './useReplaceSelected';
import useAddToSelected from './useAddToSelected';
import useRemoveFromSelected from './useRemoveFromSelected';
import useIsSelected from './useIsSelected';
import useIsAllChildrenSelected from './useIsAllChildrenSelected';
import useResetSelected from './useResetSelected';
import useHasChildren from './useHasChildren';
import useGetParent from './useGetParent';
import useGetSiblings from './useGetSiblings';
import usePageNext from './usePageNext';
import usePagePrev from './usePagePrev';
import scrollUp from './scrollUp';

function useCore() {
  const {toggleSelected} = useToggleSelected();
  const {replaceSelected} = useReplaceSelected();
  const {addToSelected} = useAddToSelected();
  const {removeFromSelected} = useRemoveFromSelected();
  const {isSelected} = useIsSelected();
  const {isAllChildrenSelected} = useIsAllChildrenSelected();
  const {resetSelected} = useResetSelected();
  const {hasChildren} = useHasChildren();
  const {getParent} = useGetParent();
  const {getSiblings} = useGetSiblings();
  const {pageNext} = usePageNext();
  const {pagePrev} = usePagePrev();

  return {
    toggleSelected,
    replaceSelected,
    addToSelected,
    removeFromSelected,
    isSelected,
    isAllChildrenSelected,
    resetSelected,
    hasChildren,
    getParent,
    getSiblings,
    pageNext,
    pagePrev,
    scrollUp
  }
}

export default useCore;