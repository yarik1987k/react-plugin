import React from 'react';
import useDataContext from '../context/useDataContext';
import useCore from '../methods/core/useCore';
import useUtilities from '../methods/utilities/useUtilities';

function CurrentSelected() {
  const {selected, filters} = useDataContext();
  const {removeFromSelected} = useCore();
  const {isEmpty} = useUtilities();
  const selectedList = [];

  function clickHandler(taxSlug, id, e) {
    e.preventDefault();
    removeFromSelected(id, taxSlug);
  }

  function getTermName(slug, id) {
    let label = '';

    if (!isEmpty(filters)) {
      filters[slug].terms.forEach(term => {
        if (term.id == id) {
          label = term.name;
        }

        else if (term['children'] && term['children'].length > 0) {
          term.children.forEach(child => {
            if (child.id == id) {
              label = child.name;
            }
          });
        }
      });
    }
    
    return label;
  }

  if (!isEmpty(selected)) {
    const selections = Object.entries(selected);
    for (const[taxSlug, ids] of selections) {
      ids.forEach(id => {
        if (id !== undefined && id !== null && id !== '') {
          selectedList.push(<li key={`${taxSlug}-${id}`} id={`selected-${taxSlug}-${id}`}>
            <button onClick={(e) => { clickHandler(taxSlug, id, e) }}>
              {getTermName(taxSlug, id)}
            </button>
          </li>);
        }
      });
    }
  }

  return (
    <ul className="eight29-current-selected">
      {selectedList}
    </ul>
  )
}

export default CurrentSelected;