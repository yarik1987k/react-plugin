import useSettingsContext from '../../context/useSettingsContext';
import useDataContext from '../../context/useDataContext';

function useLoadFilters() {
  const {hideUncategorized, postType} = useSettingsContext();
  const {setFilters} = useDataContext();

  const loadFilters = async function() {
    const response = await fetch(`${wp.home_url}/wp-json/eight29/v1/filters/${postType}`);
    const data = await response.json();

    if (data.category !== undefined && hideUncategorized) {
      const filteredData = data.category.terms.filter((term) => term.slug !== 'uncategorized');
      data.category.terms = filteredData;
    }

    setFilters(data);
  }

  return {
    loadFilters
  }
}

export default useLoadFilters;