import useDataContext from '../../context/useDataContext';

function useLoadGlobalData() {
  const {setGlobalData} = useDataContext();

  const loadGlobalData = async function() {
    const response = await fetch(`${wp.home_url}/wp-json/eight29/v1/global-data`);
    const data = await response.json();

    setGlobalData(data);
  }

  return {
    loadGlobalData
  }
}

export default useLoadGlobalData;