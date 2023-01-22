import React, {useState, useEffect} from 'react';
import PropTypes from 'prop-types';
import SimpleBar from 'simplebar-react';
import useDataContext from '../../context/useDataContext';

function FilterContainer(props) {
  const {
    className,
    label,
    taxSlug,
    scrollable,
    collapsible,
    filterId
  } = props;

  const {selected} = useDataContext();
  const collapseClass = collapsible ? 'collapsible' : '';
  const [open, setOpen] = useState(false);
  const [count, setCount] = useState(0);
  let content;
  let labelcontent;

  FilterContainer.propTypes = {
    className: PropTypes.string,
    label: PropTypes.string,
    taxSlug: PropTypes.string,
    scrollable: PropTypes.bool,
    collapsible: PropTypes.bool,
    filterId: PropTypes.string.isRequired,
    children: PropTypes.oneOfType([
      PropTypes.arrayOf(PropTypes.node),
      PropTypes.node,
      PropTypes.element
    ])   
  }

  function countClass() {
    let classString = '';

    if (count > 0) {
      classString = 'count-visible';
    }

    return classString;
  }

  function updateCount() {
    if (selected && taxSlug && selected[taxSlug] !== undefined) {
      setCount(selected[taxSlug].length);
    }
  }

  function toggleOpen() {
    if (collapsible) {
      setOpen(!open);
    }
  }

  function toggleClass() {
    let classString = '';

    if (open) {
      classString = 'open';
    }

    return classString;
  }

  if (scrollable) {
    content = <SimpleBar>{props.children}</SimpleBar>
  }
  else {
    content = props.children;
  }

  if (label) {
    labelcontent = <label 
      onClick={() => toggleOpen()} 
      className={`eight29-filter-label ${countClass()}`} 
      data-count={count}
      htmlFor={`${filterId}-input`}
    >
      <span>{label}</span>
    </label>
  }

   useEffect(() => {
    updateCount();
  }, [selected]);

  return(
    <div id={filterId} className={`eight29-filter ${className}`}>
      <div className={`accordion-select ${toggleClass()} ${collapseClass}`}>
        {labelcontent}

        <div>
          {content}
        </div>
      </div>
    </div>
  )
}

export default FilterContainer;