import React from 'react';
import Sidebar from '../Sidebar';
import Posts from '../Posts';
import CurrentSelected from '../CurrentSelected';
import useSettingsContext from '../../context/useSettingsContext';
import useUtilities from '../../methods/utilities/useUtilities';

function LayoutDefault() {
  const {sidebarClassName} = useUtilities();
  const {displaySelected, displaySidebar} = useSettingsContext();
  let sidebarLeft, sidebarRight, sidebarTop, sidebarContent;

  if (displaySelected) {
    sidebarTop = <CurrentSelected></CurrentSelected>
  }

  if (displaySidebar !== 'false') {
    sidebarContent = <Sidebar
      sidebarLeft={sidebarLeft}
      sidebarRight={sidebarRight}
      autoLoadFilters={true}
    >
    </Sidebar>
  }

  return (
    <div className={`app-layout layout-default ${sidebarClassName()}`}>
      {sidebarTop}
      {sidebarContent}
    
      <Posts></Posts>
    </div>
  )
}

export default LayoutDefault;