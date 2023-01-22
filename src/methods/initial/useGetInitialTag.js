import useDataContext from '../../context/useDataContext';
import useSettingsContext from '../../context/useSettingsContext';

function useGetInitialTag() {
  const {tagId} = useSettingsContext();
  const {selected, setSelected} = useDataContext();

  function getInitialTag() {
    if (tagId) {
      setSelected(selected['post_tag'] = [parseInt(tagId)]);
    }
  }

  return {
    getInitialTag
  }
}

export default useGetInitialTag;