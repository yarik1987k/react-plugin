import useDataContext from '../../context/useDataContext';

function useOrderParameter() {
  const {order} = useDataContext();
  
  const orderParameter = function() {
    let orderString;

    if (order === 'date') {
      orderString = `&order=desc&orderby=date`;
    }
    else if (order === 'abc') {
      orderString = `&order=asc&orderby=title`;
    }
    else if (order === 'xyz') {
      orderString = `&order=desc&orderby=title`;
    }
    else if (order === 'menu_order') {
      orderString = `&order=desc&orderby=menu_order`;
    }
    else {
      orderString = '';
    }
    
    return orderString;
  }

  return {
    orderParameter
  }
}

export default useOrderParameter;