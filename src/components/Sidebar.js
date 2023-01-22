import React, {useState} from 'react';
import PropTypes from 'prop-types';
import FilterSearch from './filters/FilterSearch';
import FilterCheckbox from './filters/FilterCheckbox';
import FilterSelect from './filters/FilterSelect';
import FilterAccordionMultiSelect from './filters/FilterAccordionMultiSelect';
import FilterAccordionSingleSelect from './filters/FilterAccordionSingleSelect';
import FilterButtonGroup from './filters/FilterButtonGroup';
import FilterOrderBy from './filters/FilterOrderBy';
import FilterDate from './filters/FilterDate';
import FilterIcon from '../assets/images/icons/FilterIcon.svgr'; 
import CloseIcon from '../assets/images/icons/CloseIcon.svgr';
import useSettingsContext from '../context/useSettingsContext'; 
import useDataContext from '../context/useDataContext';
import useCore from '../methods/core/useCore';

function Sidebar(props) {
  const { 
    autoLoadFilters,
    sidebarLeft,
    sidebarRight
  } = props;

  const {
    selected,
    filters,
    results 
  } = useDataContext();

  const {
    layout,
    mobileStyle, 
    displayPostCounts,
    displayReset,
    displayResults,
    displaySort,
    displaySearch
  } = useSettingsContext();

  const {resetSelected} = useCore();
  const [modalVisible, setModalVisible] = useState(false);
  const className = props.className ? props.className : '';
  
  const components = {
    'checkbox': FilterCheckbox,
    'select' : FilterSelect,
    'button-group' : FilterButtonGroup,
    'accordion-multi-select' : FilterAccordionMultiSelect,
    'accordion-single-select' : FilterAccordionSingleSelect,
    'date' : FilterDate
  }

  const filterList = autoLoadFilters ? [] : props.children;
  let modalClose;
  let modalOpen;
  let applyFilters; 
  let contentLeft;
  let contentRight;
  let sidebarDetail;
  let reset;
  let totalResults;
  let searchComponent;
  let sortComponent;

  Sidebar.propTypes = {
    autoLoadFilters: PropTypes.bool,
    sidebarLeft: PropTypes.element,
    sidebarRight: PropTypes.element,
    className: PropTypes.string,
    children: PropTypes.elementType
  }

  function toggleModal(e) {
    e.preventDefault();
    setModalVisible(!modalVisible);
  }

  function modalActiveClass() {
    let modalClassString = '';

    if(modalVisible) {
      modalClassString = 'modal-active';
    }

    return modalClassString;
  }

  if (Object.entries(filters).length !== 0 && autoLoadFilters) {
    let i = 0;
    for (const taxonomy in filters) {
      const type = filters[taxonomy].type;
      const TheFilter = components[type];

      filterList.push(
        <TheFilter
          key={i++}
          label={filters[taxonomy].label}
          option={filters[taxonomy].option}
          taxonomy={filters[taxonomy].terms}
          taxSlug={taxonomy}
          selected={selected}
          displayPostCounts={displayPostCounts}
          collapsible={filters[taxonomy].collapsible}
          scrollable={filters[taxonomy].scrollable}
          dropdown={filters[taxonomy].dropdown}
        ></TheFilter>
      );
    }
  }

  if (mobileStyle === 'modal') {
    modalClose = <button
    className="eight29-sidebar-toggle eight29-sidebar-close" 
    onClick={(e) => {toggleModal(e)}}
    >
      <CloseIcon></CloseIcon>
    </button>

    modalOpen = <div>
      <button 
      className="eight29-sidebar-toggle eight29-sidebar-open c-btn c-btn-secondary c-btn-color-normal" 
      onClick={(e) => {toggleModal(e)}}
      >
        <FilterIcon className="app-icon"></FilterIcon>
        Filter Posts
      </button>
    </div>

    applyFilters = <div>
      <button 
      className="eight29-sidebar-toggle apply-filters c-btn c-btn-secondary c-btn-color-normal" 
      onClick={(e) => {toggleModal(e)}}
      >Apply Filters</button>
    </div>
  }

  if(displayResults) {
    totalResults = <li>
      <span>Posts ({results})</span>
    </li>
  }

  if (displayReset) {
    reset = <li>
      <a className="eight29-reset" onClick={() => {resetSelected()}}>
        <span>Reset</span>
      </a>
    </li>
  }

  if (displaySearch && layout === 'default') {
    searchComponent = <FilterSearch></FilterSearch>
  }

  if (displaySort && layout === 'default') {
    sortComponent = <FilterOrderBy></FilterOrderBy>
  }

  if (autoLoadFilters) {
    contentLeft = <div className="eight29-filter-list left-content">
      {filterList}
    </div>
  }
  else {
    contentLeft = <div className="eight29-filter-list left-content">
      {sidebarLeft}
    </div>
  }

  if (sidebarRight && layout !== 'default') {
    contentRight = <div className="eight29-filter-list right-content">
      {sidebarRight}
    </div>
  }

  if (layout === 'default' && (reset || totalResults)) {
    sidebarDetail = <ul className="eight29-sidebar-detail">
      {reset}
      {totalResults}
    </ul>
  }

  const content = <div className="eight29-filter-group">
    {searchComponent}
    {sortComponent}
    {contentLeft}
    {contentRight}
  </div>

  return (
    <form className={`eight29-sidebar ${modalActiveClass()} ${className}`}>
      <div className="eight29-sidebar-content">
        {modalClose}
        {sidebarDetail}
        {content}
        {applyFilters}
      </div>

      {modalOpen}
    </form>
  );
}

export default Sidebar;