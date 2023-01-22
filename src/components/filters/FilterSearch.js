import React, {useState, useEffect} from 'react';
import PropTypes from 'prop-types';
import FilterContainer from './FilterContainer';
import useDataContext from '../../context/useDataContext';

function FilterSearch(props) {
  const {
    filterReset,
    setFilterReset,
    setCurrentPage, 
    setChangedFilter, 
    setCurrentSearchTerm,
    setAfterFirstEvent
  } = useDataContext();

  const {
    label, 
    collapsible,
    scrollable
  } = props;

  const [term, setTerm] = useState('');
  const filterId = 'filter-search';
  let clearSearchVisible = '';

  FilterSearch.propTypes = {
    label: PropTypes.string,
    collapsible: PropTypes.bool,
    scrollable: PropTypes.bool
  }

  function changeHandler(e) {
    e.preventDefault();
    setTerm(e.target.value);
  }

  function clearSearchTerm(e) {
    if (e) {
      e.preventDefault();
    }
    
    setTerm('');
    setCurrentSearchTerm('');
    setCurrentPage(1);
    setChangedFilter(true);
    setAfterFirstEvent(true);
  }

  function onReset() {
    if (filterReset) {
      clearSearchTerm();
      setFilterReset(false);
    }
  }

  function keyHandler(e) {
    if (e.key === 'Enter') {
      e.preventDefault();
      setCurrentSearchTerm(term);
      setCurrentPage(1);
      setChangedFilter(true);
      setAfterFirstEvent(true);
    }
  }

  if (term && term.length > 0) {
    clearSearchVisible = 'visible';
  }

  useEffect(() => {
    onReset();
  },[filterReset])

  return (
    <FilterContainer 
      className="filter-search"
      filterId={filterId}
      label={label}
      collapsible={collapsible}
      scrollable={scrollable}
    >
      <div className="filter-input">
        <input
          id={`${filterId}-input`} 
          type="search" 
          placeholder="Search" 
          value={term} 
          onChange={(e) => {changeHandler(e)}}
          onKeyPress={(e) => {keyHandler(e)}}
        ></input>

        <button 
          className={`clear-search ${clearSearchVisible}`}
          onClick={(e) => {clearSearchTerm(e)}}
        >
          <span>+</span>
        </button>
      </div>
    </FilterContainer>
  );
}

export default FilterSearch;