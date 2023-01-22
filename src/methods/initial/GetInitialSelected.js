import useSettingsContext from '../../context/useSettingsContext';

function GetInitialSelected() {
  const {
    rememberFilters, 
    currentPagePath, 
    userData,
    preSelect
  } = useSettingsContext();

  let initialSelected;

  if (rememberFilters && userData !== null && userData[currentPagePath]) {
    initialSelected = {...userData[currentPagePath].selected};
  }
  else if (preSelect) {
    initialSelected = preSelect;
  }
  else {
    initialSelected = {};
  }
  
  return initialSelected;
}

export default GetInitialSelected;