import useDataContext from '../../context/useDataContext';

function useHasChildren() {
  const {filters} = useDataContext();

  function hasChildren(id, taxSlug) {
    const terms = filters[taxSlug].terms;
    const ids = [];

    terms.forEach(term => {
      if (term.children && term.parent === 0 && term.id === id) {
        term.children.forEach(child => {
          ids.push(child.id);
        });
      }
    })

    const result = ids.length === 0 ? false : ids;
    return result;
  }

  return {
    hasChildren
  }
}

export default useHasChildren;