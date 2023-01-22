import React, {useState, useEffect} from 'react';
import PropTypes from 'prop-types';
import FilterContainer from './FilterContainer';
import DropdownContainer from './DropdownContainer';
import useDataContext from '../../context/useDataContext';

function FilterOrderBy(props) {
  const {
    order, 
    setOrder,
    setChangedFilter,
    setCurrentPage,
    setAfterFirstEvent
  } = useDataContext();

  const {
    label, 
    collapsible, 
    scrollable
  } = props;

  const options = [
    {id: 0, value: 'date', label: 'Newest To Oldest'},
    {id: 1, value: 'abc', label: 'Alphabetical: A to Z'},
    {id: 2, value: 'xyz', label: 'Alphabetical: Z to A'}
  ]

  const [closeRequest, setCloseRequest] = useState(false);
  const [menuList, setMenuList] = useState(options);
  const filterId = 'filter-orderby';

  const items = menuList.map(item => {
    return (
      <li 
        key={item.id}
      >
        <button 
          id={`order-${item.value}`} 
          className={activeClass(item.value)} 
          value={item.value}
          onClick={(e) => {clickHandler(e)}}
        >{item.label}</button>
      </li>
    )
  });

  FilterOrderBy.propTypes = {
    label: PropTypes.string,
    collapsible: PropTypes.bool,
    scrollable: PropTypes.bool
  }

  function clickHandler(e) {
    e.preventDefault();
    setOrder(e.target.value);
    setCloseRequest(true);
    setCurrentPage(1);
    setChangedFilter(true);
    setAfterFirstEvent(true);
  }

  function updateActive() {
    const itemsCopy = [...menuList];
    itemsCopy.forEach(item => {
      item.active = false;

      if (item.value === order) {
        item.active = true;
      }
    });

    setMenuList(itemsCopy);
  }

  function activeClass(value) {
    const classString = value === order ? 'active' : '';
    return classString;
  }

  useEffect(() => {
    updateActive();
  }, [order])

  return (
    <FilterContainer 
      className="filter-orderby"
      filterId={filterId}
      label={label}
      collapsible={collapsible}
      scrollable={scrollable}
    >
      <DropdownContainer
      closeRequest={closeRequest}
      setCloseRequest={setCloseRequest}
      menuList={menuList}
      defaultLabel="Sort By" 
      >
        <ul id={`${filterId}-input`} className="dropdown-list">
          {items}
        </ul>
      </DropdownContainer>
    </FilterContainer>
  )
}

export default FilterOrderBy;