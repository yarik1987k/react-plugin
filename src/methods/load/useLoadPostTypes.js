import useDataContext from '../../context/useDataContext';

function useLoadPostTypes() {
  const {setPostTypes} = useDataContext();
  
  const loadPostTypes = async function() {
    const response = await fetch(`${wp.home_url}/wp-json/eight29/v1/post-types`);
    const data = await response.json();

    setPostTypes(data);
  }

  return {
    loadPostTypes
  }
}

export default useLoadPostTypes;