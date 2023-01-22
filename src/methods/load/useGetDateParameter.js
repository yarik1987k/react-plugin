import useDataContext from '../../context/useDataContext';
import isEmpty from '../utilities/isEmpty';

function useGetDateParameter() {
  const {filters} = useDataContext();

  function getDateParameter(id, param) {
    id = parseInt(id);
    let string = '';

    if (!isEmpty(filters)) {
      const months = filters.date.terms;

      months.forEach(month => {
        if (id === month.id) {
          string = month[param];
        }
      });
    }

    return string;
  }

  return {
    getDateParameter
  }
}

export default useGetDateParameter;