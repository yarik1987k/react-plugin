import React from 'react';
import PropTypes from 'prop-types';
import FilterContainer from './FilterContainer';
import useSettingsContext from '../../context/useSettingsContext';
import useDataContext from '../../context/useDataContext';
import useCore from '../../methods/core/useCore';

function FilterSelect(props) {
  const {
    taxonomy,
    taxSlug,
    label,
    collapsible,
    scrollable
  } = props;

  const {selected} = useDataContext();
  const {displayPostCounts} = useSettingsContext();
  const {replaceSelected} = useCore();
  const allTerms = [];
  const filterId = taxSlug ? `filter-${taxSlug}` : '';
  let parentContent;
  let childContent;

  FilterSelect.propTypes = {
    taxonomy: PropTypes.array,
    taxSlug: PropTypes.string,
    label: PropTypes.string,
    collapsible: PropTypes.bool,
    scrollable: PropTypes.bool
  }

  function changeValue(value) {
    if (value === 'empty') {
      replaceSelected('', taxSlug);
    }

    else {
      replaceSelected(value, taxSlug);
    }
  }

  if (taxonomy) {
    allTerms.push(
        <option 
          key={`empty-${taxSlug}`}
          value={'empty'}
          id={`empty-${taxSlug}`}
        >Select {label}
        </option>
    );

    taxonomy.forEach(term => {
      if (displayPostCounts) {
        parentContent = `${term.name} (${term.count})`;
      }
      else {
        parentContent = term.name;
      }

      if (!term.hide_term) {
        allTerms.push(
          <option 
            key={term.id}
            value={`${term.id}`}
            id={`${taxSlug}-${term.id}`}
          >
          {parentContent}
          </option>
        )
      }

      if (term.children) {
        term.children.forEach(child => {
          if (displayPostCounts) {
            childContent = `${child.name} (${child.count})`;
          }
          else {
            childContent = child.name;
          }

          if(!term.hide_term) {
            allTerms.push(
              <option 
                key={child.id}
                value={`${child.id}`}
                id={`${taxSlug}-${child.id}`}
              >
              {childContent}
              </option>
            )
          }
        });
      }
    });
  }

  return (
    <FilterContainer 
    className="filter-select"
    filterId={filterId}
    label={label}
    collapsible={collapsible}
    scrollable={scrollable}
    >
      <select
        id={`${filterId}-input`}
        multiple={false}
        value={selected[taxSlug]}
        onChange={(e) => {changeValue(e.target.value)}}
      >
        {allTerms}
      </select>
    </FilterContainer>
  )
}

export default FilterSelect;