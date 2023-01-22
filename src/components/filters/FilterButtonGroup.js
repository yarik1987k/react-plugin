import React from 'react';
import PropTypes from 'prop-types';
import FilterContainer from './FilterContainer';
import useSettingsContext from '../../context/useSettingsContext';
import useCore from '../../methods/core/useCore';
import useDataContext from '../../context/useDataContext';

function FilterButtonGroup(props) {
  const {
    taxonomy,
    taxSlug,
    label,
    collapsible,
    scrollable
  } = props;

  const {selected} = useDataContext();
  const {displayPostCounts} = useSettingsContext();
  const {resetSelected, replaceSelected, isSelected} = useCore();
  const allTerms = [];
  const filterId = taxSlug ? `filter-${taxSlug}` : '';
  let termContent;

  FilterButtonGroup.propTypes = {
    taxonomy: PropTypes.array,
    taxSlug: PropTypes.string,
    label: PropTypes.string,
    collapsible: PropTypes.bool,
    scrollable: PropTypes.bool
  }

  function resetCat(e) {
    e.preventDefault();
    resetSelected();
  }

  function changeCat(event, id) {
    event.preventDefault();
    replaceSelected(id, taxSlug);
  }

  function allClass() {
    let classString = '';

    if (selected[taxSlug] !== undefined && selected[taxSlug].length === 0) {
      classString = 'active';
    }

    return classString;
  }

  function termClass(id) {
    let classString = '';

    if (isSelected(id, taxSlug)) {
      classString = 'active';
    }

    return classString;
  }

  if (taxonomy) {
    allTerms.push(
        <button 
          key={0}
          id="0"
          onClick={(e) => resetCat(e)}
          className={allClass()}
        >
        All
        </button>
    );

    taxonomy.forEach(term => {
      if (displayPostCounts) {
        termContent = `${term.name} (${term.count})`;
      }
      else {
        termContent = term.name;
      }

      if (!term.hide_term) {
        allTerms.push(
          <button 
            key={term.id}
            id={term.id}
            onClick={(e) => changeCat(e, term.id)}
            className={termClass(term.id)}
          >
          {termContent}
          </button>
        )
      }
    });
  }

  return (
    <FilterContainer 
    className="filter-button-group"
    label={label}
    taxSlug={taxSlug}
    filterId={filterId}
    collapsible={collapsible}
    scrollable={scrollable}
    >
      <div id={`${filterId}-input`} className="button-wrap">
        {allTerms}
      </div>
    </FilterContainer>
  )
}

export default FilterButtonGroup;