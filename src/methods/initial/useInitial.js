import useGetInitialTaxonomy from './useGetInitialTaxonomy';
import useGetFilterSlugs from './useGetFilterSlugs';
import useGetInitialAuthor from './useGetinitialAuthor';
import useGetInitialTag from './useGetInitialTag';

function useInitial() {
  const {getInitialTaxonomy} = useGetInitialTaxonomy();
  const {getFilterSlugs} = useGetFilterSlugs();
  const {getInitialAuthor} = useGetInitialAuthor();
  const {getInitialTag} = useGetInitialTag();

  return {
    getInitialTaxonomy,
    getFilterSlugs,
    getInitialAuthor,
    getInitialTag
  }
}

export default useInitial;