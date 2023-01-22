import React from 'react';
import Sidebar from '../Sidebar';
import Posts from '../Posts';
import FilterSearch from '../filters/FilterSearch';
import FilterSelect from '../filters/FilterSelect';
import useDataContext from '../../context/useDataContext';
import useUtilities from '../../methods/utilities/useUtilities';

function LayoutBlogB() {
  const {filters} = useDataContext();
  const {isEmpty} = useUtilities();
  let sidebarLeft, sidebarRight;

  if (!isEmpty(filters)) {
    sidebarLeft = <FilterSelect
      taxonomy={filters.category.terms}
      taxSlug={'category'}
    ></FilterSelect>
  }

  sidebarRight = <FilterSearch></FilterSearch>

  return (
    <div className="app-layout blog-b sidebar-top">
      <Sidebar
        sidebarLeft={sidebarLeft}
        sidebarRight={sidebarRight}
      >
      </Sidebar>
    
      <Posts></Posts>
    </div>
  )
}

export default LayoutBlogB;