import React from 'react';
import PropTypes from 'prop-types';
import useDataContext from '../context/useDataContext';
import useCore from '../methods/core/useCore';

function PaginationItem(props) {
  const {
    currentPage, 
    setCurrentPage,
    setAfterFirstEvent
  } = useDataContext();

  const {pageNumber} = props;
  const {scrollUp} = useCore();
  const currentClass = currentPage === pageNumber ? 'current-page' : '';
  const className = props.className !== undefined ? props.className : '';

  PaginationItem.propTypes = {
    pageNumber: PropTypes.number,
    className: PropTypes.string
  }
  
  function clickHandler(pageNumber) {
    setCurrentPage(pageNumber);
    scrollUp();
    setAfterFirstEvent(true);
  }

  return (
    <li className={className}>
      <button 
        className={`pagination-item ${currentClass}`}
        onClick={() => {clickHandler(pageNumber)}}
      >{pageNumber}</button>
    </li>
  );
}

export default PaginationItem;