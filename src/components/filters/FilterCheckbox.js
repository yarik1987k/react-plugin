import React, {useState} from 'react';
import PropTypes from 'prop-types';
import FilterContainer from './FilterContainer';
import DropdownContainer from './DropdownContainer';
import useSettingsContext from '../../context/useSettingsContext';
import useDataContext from '../../context/useDataContext';
import useCore from '../../methods/core/useCore';

function FilterCheckbox(props) {
  const {
    taxonomy,
    taxSlug,
    label,
    collapsible,
    scrollable,
    dropdown
  } = props;

  const {
    toggleSelected,
    addToSelected,
    removeFromSelected,
    isSelected
  } = useCore();

  const {selected} = useDataContext();
  const {displayPostCounts} = useSettingsContext();
  const [termOpen, setTermOpen] = useState({});
  const [closeRequest, setCloseRequest] = useState(false);
  const filterId = taxSlug ? `filter-${taxSlug}` : '';
  let termList;
  let parentContent;
  let childrenList
  let childContent;
  let filterContent;
  let selectAll;

  FilterCheckbox.propTypes = {
    taxonomy: PropTypes.array,
    taxSlug: PropTypes.string,
    label: PropTypes.string,
    collapsible: PropTypes.bool,
    scrollable: PropTypes.bool,
    dropdown: PropTypes.bool
  }

  if (taxonomy) {
    termList = taxonomy.map((term) => {
      let children = '';
      let childToggle = '';
      let eligibleChildren = [];
  
      if (term.children && term['children'].length > 0) {
        eligibleChildren = term['children'].filter(childTerm => !childTerm.hide_term);

        childrenList = eligibleChildren.map((child, index) => {
          if (displayPostCounts) {
            childContent = <label htmlFor={child.id}>
              <span>
                {child.name}
                <span className="eight29-category-count">({child.count})</span>
              </span>
            </label>
          }
          else {
            childContent = <label htmlFor={child.id}><span>{child.name}</span></label>
          }

          return (
            <li key={index}>
              <input 
                type="checkbox"
                value={child.slug}
                id={child.id}
                checked={isSelected(child.id, taxSlug)}
                onChange={() => {toggleSelected(child, taxSlug), setCloseRequest(true)}}
              ></input>
  
              {childContent}
            </li>
          );
        });
  
        if (eligibleChildren.length > 0) {
          children = <ul className="eight29-category-children">
            {childrenList}
          </ul>

          childToggle = <span 
            className="child-toggle"
            onClick={() => toggleTerm(term.slug)}
          ></span>
        }
      }
  
      if ((term.parent === 0 || !term.parent) && !term.hide_term) {
        if (displayPostCounts) {
          parentContent = <label htmlFor={term.id}>{term.name}
            <span className="eight29-category-count">({term.count})</span>
          </label>
        }
        else {
          parentContent = <label htmlFor={term.id}>{term.name}</label>
        }

        return (
          <li key={term.id} className={`${toggleTermClass(term.slug)}`}>
            <div>
              <input 
                type="checkbox"
                value={term.slug}
                id={term.id}
                name={term.id}
                checked={isSelected(term.id, taxSlug)}
                onChange={() => {toggleSelected(term, taxSlug), setCloseRequest(true)}}
              ></input>
    
              {parentContent}
              {childToggle}
            </div>

            {children}
          </li>
        );
      }
    });
  }

  function toggleTerm(slug) {
    if (termOpen){
      const objectCopy = {...termOpen};
      objectCopy[slug] = !objectCopy[slug];

      setTermOpen(objectCopy);
    }
  }

  function toggleTermClass(slug) {
    let classString = '';

    if (termOpen && termOpen[slug]) {
      classString = 'open';
    }

    return classString;
  }

  function modifyAll(termIds, taxSlug, totalTerms, totalSelected) {
    if (totalTerms === totalSelected) {
      removeFromSelected(termIds, taxSlug);
    }
    else {
      addToSelected(termIds, taxSlug);
    }
  }

  if (selected[taxSlug] && taxonomy && taxonomy.length > 0) {
    const terms = taxonomy.filter(tax => tax.parent !== null);
    const termIds = terms.map(tax => tax.id);
    const totalTerms = terms.length;
    const totalSelected = selected[taxSlug].length;

    selectAll = <li key={`select-all-${taxSlug}`} className="select-all">
      <div>
        <input 
          type="checkbox"
          id={`select-all-${taxSlug}`}
          name={`select-all-${taxSlug}`}
          checked={totalTerms === totalSelected}
          onChange={() => {modifyAll(termIds, taxSlug, totalTerms, totalSelected), setCloseRequest(true)}}
        ></input>

        <label htmlFor={`select-all-${taxSlug}`}>All</label>
      </div>
    </li>;

    termList.unshift(selectAll);
  }

  if (dropdown) {
    filterContent = <DropdownContainer
        taxSlug={taxSlug} 
        taxonomy={taxonomy}
        closeRequest={closeRequest}
        setCloseRequest={setCloseRequest}
        defaultLabel={label} 
      >
      <ul id={`${filterId}-input`} className="checkboxes dropdown-list">
        {termList}
      </ul>
    </DropdownContainer>
  }
  else {
    filterContent = <ul id={`${filterId}-input`} className="checkboxes">
      {termList}
    </ul>
  }

  return (
    <FilterContainer 
    className="filter-checkbox"
    label={label}
    taxSlug={taxSlug}
    filterId={filterId}
    taxonomy={taxonomy}
    collapsible={collapsible}
    scrollable={scrollable}
    >
      {filterContent}
    </FilterContainer>
  )
}

export default FilterCheckbox;