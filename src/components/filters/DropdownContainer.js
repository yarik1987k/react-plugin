import React, {useState, useEffect, useRef} from 'react';
import PropTypes from 'prop-types';
import SimpleBar from 'simplebar-react';
import useDataContext from '../../context/useDataContext';

function DropdownContainer(props) {
  const {
    taxonomy,
    taxSlug,
    menuList,
    closeRequest,
    setCloseRequest
  } = props;

  const defaultLabel = props.defaultLabel ? props.defaultLabel : '';
  const dropdown = useRef(null);
  const {selected} = useDataContext();
  const [currentLabel, setCurrentLabel] = useState('');
  const [open, setOpen] = useState(false);

  DropdownContainer.propTypes = {
    taxonomy: PropTypes.array,
    taxSlug: PropTypes.string,
    menuList: PropTypes.array,
    closeRequest: PropTypes.bool,
    setCloseRequest: PropTypes.func,
    defaultLabel: PropTypes.string,
    children: PropTypes.element
  }

  function labelChange() {
    if (selected && taxSlug && selected[taxSlug] && selected[taxSlug].length !== 0) {
      if (selected[taxSlug].length > 1) {
        setCurrentLabel('Multiple');
      }
      else {
        for (const term of taxonomy) {
          if (term.id == selected[taxSlug]) {
            setCurrentLabel(term.name);
          }
        }
      }
    }

    else if (menuList) {
      let itemId;

      menuList.forEach((menuItem, index) => {
        if (menuItem.active) {
          itemId = index;
        }
      });
      
      if (itemId !== undefined) {
        setCurrentLabel(menuList[itemId].label);
      }
      else {
        setCurrentLabel(defaultLabel);
      }
    }

    else {
      setCurrentLabel(defaultLabel);
    }
  }

  function toggleOpen(e) {
    if (e) {
      e.preventDefault();
    }

    setOpen(!open);
  }

  function close() {
    resetCloseRequest();
    setOpen(false);
  }

  function toggleClass() {
    const classString = open ? 'open' : '';
    return classString;
  }

  function resetCloseRequest() {
    if (closeRequest) {
      setCloseRequest(false);
    }
  }

  function outsideClick() {
    window.addEventListener('click', (e) => {
      const element = dropdown;

      if (!element.current.contains(e.target)) {
        close();
      }
    });
  }

  useEffect(() => {
    resetCloseRequest();
    outsideClick();
  }, []);

  useEffect(() => {
    labelChange();
  }, [selected, menuList]);

  useEffect(() => {
    close();
  }, [closeRequest]);

  return(
    <div className={`dropdown-container ${toggleClass()}`} ref={dropdown}>
      <button 
        className="dropdown-current" 
        onClick={(e) => {toggleOpen(e)}}
      ><span>{currentLabel}</span>
      </button>

      <SimpleBar>
        {props.children}
      </SimpleBar>
    </div>
  )
}

export default DropdownContainer;