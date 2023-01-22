import useGetParent from './useGetParent';
import useHasChildren from './useHasChildren';

function useGetSiblings() {
  const {getParent} = useGetParent();
  const {hasChildren} = useHasChildren();

  function getSiblings(id, taxSlug) {
    const parent = getParent(id, taxSlug);
    const siblings = hasChildren(parent, taxSlug);
    return siblings;
  }

  return {
    getSiblings
  }
}

export default useGetSiblings;