import useSettingsContext from '../../context/useSettingsContext';

function usePostTypeParameter() {
  const {postType} = useSettingsContext();

  const postTypeParameter = function() {
    const postString = postType === 'post' ? 'posts' : postType;
    return postString;
  }

  return {
    postTypeParameter
  }
}

export default usePostTypeParameter;