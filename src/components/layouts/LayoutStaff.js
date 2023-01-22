import React from 'react';
import Sidebar from '../Sidebar';
import Posts from '../Posts';
import FilterSelect from '../filters/FilterSelect';
import FilterOrderBy from '../filters/FilterOrderBy';
import useDataContext from '../../context/useDataContext';
import useUtilities from '../../methods/utilities/useUtilities';

function LayoutStaff() {
  const {filters} = useDataContext();
  const {isEmpty} = useUtilities();
  let sidebarLeft, sidebarRight;

  if (!isEmpty(filters)) {
    sidebarLeft = <FilterSelect
      label={filters.staff_department.label}
      taxonomy={filters.staff_department.terms}
      taxSlug={'staff_department'}
    ></FilterSelect>
  }

  sidebarRight = <FilterOrderBy></FilterOrderBy>

  return (
    <div className="app-layout layout-staff sidebar-top">
      <Sidebar
        sidebarLeft={sidebarLeft}
        sidebarRight={sidebarRight}
      >
      </Sidebar>
    
      <Posts></Posts>
    </div>
  )
}

export default LayoutStaff;