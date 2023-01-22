import React from 'react';
import Sidebar from '../Sidebar';
import Posts from '../Posts';
import FilterAccordionMultiSelect from '../filters/FilterAccordionMultiSelect';
import FilterSearch from '../filters/FilterSearch';
import useDataContext from '../../context/useDataContext';
import useUtilities from '../../methods/utilities/useUtilities';

function LayoutBlogC() {
  const {filters} = useDataContext();
  const {isEmpty} = useUtilities();
  let sidebarLeft, sidebarRight;

  if (!isEmpty(filters)) {
    sidebarLeft = <div className="">
      <FilterSearch></FilterSearch>

        <FilterAccordionMultiSelect
        label={filters.category.label}
        taxonomy={filters.category.terms}
        taxSlug={'category'}
        collapsible={true}
        scrollable={true}
      ></FilterAccordionMultiSelect>
    </div>
  }

  return (
    <div className="app-layout blog-c sidebar-left">
      <Sidebar
        sidebarLeft={sidebarLeft}
        sidebarRight={sidebarRight}
      >
      </Sidebar>
    
      <Posts></Posts>
    </div>
  )
}

export default LayoutBlogC;