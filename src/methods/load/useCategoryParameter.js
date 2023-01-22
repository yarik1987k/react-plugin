import useDataContext from '../../context/useDataContext';
import useGetDateParameter from './useGetDateParameter';

function useCategoryParameter() {
  const {selected, filters} = useDataContext();
  const {getDateParameter} = useGetDateParameter();

  const categoryParameter = function() {
    let categoryString = '';

    for (const taxSlug in selected) {
      if ((selected[taxSlug].length !== 0 && selected[taxSlug][0] !== null && selected[taxSlug][0])) {
        if (taxSlug === 'category') {
          categoryString += `categories=${selected[taxSlug]}&`;
        }
        else if (taxSlug === 'post_tag') {
          categoryString += `tags=${selected[taxSlug]}&`;
        }
        else if (taxSlug === 'date' && selected[taxSlug][0] !== undefined && selected[taxSlug][0] !== '') {
          categoryString += `after=${getDateParameter(selected[taxSlug], 'after')}&before=${getDateParameter(selected[taxSlug], 'before')}&`;
        }

        if (filters[taxSlug] && filters[taxSlug].meta_query !== undefined) {
          let valueString = '';
          let compareString = '';
          let typeString = '';
          let seperator = '';
          let metaCount = 0;

          //If non date meta query
          if(filters[taxSlug].meta_query.type !== 'DATE') {
            selected[taxSlug].forEach(id => {
              if (id !== null && id !== undefined) {
                metaCount++;
                
                if (metaCount > 1) {
                  seperator = ',';
                }
  
                const matchedTerm = filters[taxSlug].terms.filter(term => term.id === id);
  
                if (matchedTerm) {
                  valueString += `${seperator}${encodeURI(matchedTerm[0].value)}`;
                }
              }
            });
          }

          //Date queries use an actual value instead of an id
          if (filters[taxSlug].meta_query.type === 'DATE' && filters[taxSlug].meta_query.compare === 'BETWEEN') {
            valueString = `${selected[taxSlug]}`;
          }

          if (filters[taxSlug].meta_query.compare !== undefined) {
            compareString = `meta_compare_${taxSlug}=${filters[taxSlug].meta_query.compare}&`;
          }

          if (filters[taxSlug].meta_query.type !== undefined) {
            typeString = `meta_type_${taxSlug}=${filters[taxSlug].meta_query.type}&`;
          }

          categoryString += `meta_key_${taxSlug}=${taxSlug}&meta_value_${taxSlug}=${valueString}&${compareString}${typeString}`;
        }

        //Everything else
        else {
          categoryString += `${taxSlug}=${selected[taxSlug]}&`;
        }
      }
    }

    return categoryString;
  }

  return {
    categoryParameter
  }
}

export default useCategoryParameter;