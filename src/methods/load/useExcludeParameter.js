import useSettingsContext from '../../context/useSettingsContext';

function useExcludeParameter() {
  const {excludePosts} = useSettingsContext();
  
  const excludeParameter = function() {
    let excludeString = '';
    
    if (excludePosts) {
      excludeString = `&exclude=${excludePosts}`;
    }

    return excludeString;
  }

  return {
    excludeParameter
  }
}

export default useExcludeParameter;