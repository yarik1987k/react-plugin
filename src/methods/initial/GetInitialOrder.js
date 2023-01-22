import useSettingsContext from '../../context/useSettingsContext';

function GetInitialOrder() {
  const {
    orderBy,
    rememberFilters,
    userData,
    currentPagePath
  } = useSettingsContext();

  let initialOrder;

  if (orderBy) {
    initialOrder = orderBy;
  }
  else if (rememberFilters && userData !== null && userData[currentPagePath] && userData[currentPagePath].order !== undefined) {
    initialOrder = userData[currentPagePath].order;
  }
  else {
    initialOrder = 'date';
  }
  
  return initialOrder;
}

export default GetInitialOrder;