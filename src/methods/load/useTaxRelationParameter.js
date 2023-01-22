import useSettingsContext from '../../context/useSettingsContext';

function useTaxRelationParameter() {
  const {taxRelation} = useSettingsContext();

  const taxRelationParameter = function() {
    const taxRelationString = `&tax_relation=${taxRelation}`;
    return taxRelationString;
  }

  return {
    taxRelationParameter
  }
}

export default useTaxRelationParameter;