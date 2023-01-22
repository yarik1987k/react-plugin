import useSettingsContext from '../../context/useSettingsContext';
import useDataContext from '../../context/useDataContext';
import usePostTypeParameter from './usePostTypeParameter';
import useCategoryParameter from './useCategoryParameter';
import useSearchParameter from './useSearchParameter';
import useOrderParameter from './useOrderParameter';
import useExcludeParameter from './useExcludeParameter';
import useTaxRelationParameter from './useTaxRelationParameter';

function useLoadPosts() {
  const {
    currentPage,
    changedFilter,
    posts,
    setPosts,
    setMaxPages,
    setResults,
    setLoading,
    setChangedFilter
  } = useDataContext();

  const {postsPerPage} = useSettingsContext();
  const {paginationStyle} = useSettingsContext();
  const {postTypeParameter} = usePostTypeParameter();
  const {categoryParameter} = useCategoryParameter();
  const {searchParameter} = useSearchParameter();
  const {orderParameter} = useOrderParameter();
  const {excludeParameter} = useExcludeParameter();
  const {taxRelationParameter} = useTaxRelationParameter();

  const loadPosts = async function() {
    const requestURL = `${wp.home_url}/wp-json/wp/v2/${postTypeParameter()}?${categoryParameter()}${searchParameter()}page=${currentPage}&per_page=${postsPerPage}${orderParameter()}${excludeParameter()}${taxRelationParameter()}`;

    setLoading(true);
    console.log(requestURL);

    const response = await fetch(requestURL);
    const data = await response.json();
    
    if (paginationStyle === 'more') {
      const postsCopy = changedFilter ? [] : [...posts];

      data.forEach(post => {
        postsCopy.push(post);
      });

      setPosts(postsCopy);
    }

    else {
      setPosts(data);
    }

    setMaxPages(parseInt(response.headers.get('X-WP-TotalPages')));
    setResults(parseInt(response.headers.get('X-WP-Total')));
    setLoading(false);
    setChangedFilter(false);
  }

  return {
    loadPosts
  }
}

export default useLoadPosts;