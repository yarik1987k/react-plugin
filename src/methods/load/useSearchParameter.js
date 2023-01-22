import useDataContext from '../../context/useDataContext';

function useSearchParameter() {
  const {currentSearchTerm} = useDataContext();

  const searchParameter = function() {
    if(currentSearchTerm.length !== 0) {
      return `search=${currentSearchTerm}&`;
    }
    else {
      return '';
    }
  }

  return {
    searchParameter
  }
}

export default useSearchParameter;