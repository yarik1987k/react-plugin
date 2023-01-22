import useSettingsContext from '../../context/useSettingsContext';

function useSidebarClassName() {
  const {displaySidebar} = useSettingsContext();

  const sidebarClassName = function() {
    let sidebarClassString;
    let sidebarClass = 'sidebar';

    if (displaySidebar === 'false') {
      sidebarClassString = `${sidebarClass}-disabled`;
    }

    else if (displaySidebar === 'top') {
      sidebarClassString = `${sidebarClass}-top`;
    }

    else if (displaySidebar === 'bottom') {
      sidebarClassString = `${sidebarClass}-bottom`;
    }

    else if (displaySidebar === 'left') {
      sidebarClassString = `${sidebarClass}-left`;
    }

    else if (displaySidebar === 'right') {
      sidebarClassString = `${sidebarClass}-right`;
    }

    else {
      sidebarClassString = `${sidebarClass}-top`;
    }

    return sidebarClassString;
  }

  return {
    sidebarClassName
  }
}

export default useSidebarClassName;