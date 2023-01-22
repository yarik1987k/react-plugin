import React from 'react';
import Sidebar from '../Sidebar';
import Posts from '../Posts';
import FilterButtonGroup from '../filters/FilterButtonGroup';
import useDataContext from '../../context/useDataContext';
import isEmpty from '../../methods/utilities/isEmpty';

function LayoutBlogA() {
  const {filters} = useDataContext();
  let sidebarLeft, sidebarRight;

  if (!isEmpty(filters)) {
    sidebarLeft = <FilterButtonGroup
      taxonomy={filters.category.terms}
      taxSlug={'category'}
    ></FilterButtonGroup>
  }

  return (
    <div className="app-layout blog-a sidebar-top">
      <Sidebar
        sidebarLeft={sidebarLeft}
        sidebarRight={sidebarRight}      
      >
      </Sidebar>
    
      <Posts></Posts>
    </div>
  )
}

export default LayoutBlogA;