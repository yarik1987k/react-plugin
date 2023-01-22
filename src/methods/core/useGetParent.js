import useDataContext from '../../context/useDataContext';
import useHasChildren from './useHasChildren';

function useGetParent() {
  const {filters} = useDataContext();
  const {hasChildren} = useHasChildren();

  function getParent(id, taxSlug) {
    const terms = filters[taxSlug].terms;
    let result = 0;
    let children;

    terms.forEach(term => {
      children = hasChildren(term.id, taxSlug);
      if (children && children.includes(id)) {
        result = term.id;
      }
    });

    return result;
  }

  return {
    getParent
  }
}

export default useGetParent;