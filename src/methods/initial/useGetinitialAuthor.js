import useDataContext from '../../context/useDataContext';
import useSettingsContext from '../../context/useSettingsContext';

function useGetInitialAuthor() {
  const {authorId} = useSettingsContext();
  const {selected, setSelected} = useDataContext();

  function getInitialAuthor() {
    if (authorId) {
      setSelected(selected['author'] = [parseInt(authorId)]);
    }
  }

  return {
    getInitialAuthor
  }
}

export default useGetInitialAuthor;