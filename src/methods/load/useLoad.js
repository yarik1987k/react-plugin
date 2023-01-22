import usePostTypeParamter from './usePostTypeParameter';
import useCategoryParameter from './useCategoryParameter';
import useSearchParameter from './useSearchParameter';
import useOrderParameter from './useOrderParameter';
import useTaxRelationParameter from './useTaxRelationParameter';
import useExcludeParameter from './useExcludeParameter';
import useGetDateParameter from './useGetDateParameter';
import useLoadPostTypes from './useLoadPostTypes';
import useLoadFilters from './useLoadFilters';
import useLoadPosts from './useLoadPosts';
import useLoadGlobalData from './useLoadGlobalData';

function useLoad() {
  const {postTypeParameter} = usePostTypeParamter();
  const {categoryParameter} = useCategoryParameter();
  const {searchParameter} = useSearchParameter();
  const {orderParameter} = useOrderParameter();
  const {taxRelationParameter} = useTaxRelationParameter();
  const {excludeParameter} = useExcludeParameter();
  const {getDateParameter} = useGetDateParameter();
  const {loadPostTypes} = useLoadPostTypes();
  const {loadFilters} = useLoadFilters();
  const {loadPosts} = useLoadPosts();
  const {loadGlobalData} = useLoadGlobalData();

  return {
    postTypeParameter,
    categoryParameter,
    searchParameter,
    orderParameter,
    taxRelationParameter,
    excludeParameter,
    getDateParameter,
    loadPostTypes,
    loadFilters,
    loadPosts,
    loadGlobalData
  }
}

export default useLoad;