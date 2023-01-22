import useSettingsContext from '../../context/useSettingsContext';
import useDataContext from '../../context/useDataContext';

function useGetInitialTaxonomy() {
  const {selected, setSelected} = useDataContext();
  const {taxonomy, termId} = useSettingsContext();

  function getInitialTaxonomy() {
    if (taxonomy && termId) {
      setSelected(selected[taxonomy] = [parseInt(termId)]);
    }
  }

  return {
    getInitialTaxonomy
  }
}

export default useGetInitialTaxonomy;