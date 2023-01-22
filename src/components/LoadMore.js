import React from 'react';
import PropTypes from 'prop-types';
import useDataContext from '../context/useDataContext';
import useCore from '../methods/core/useCore';

function LoadMore(props) {
  const {
    currentPage, 
    maxPages, 
    setAfterFirstEvent
  } = useDataContext();

  const {pageNext} = useCore();
  const buttonText = props.buttonText ? props.buttonText : 'Load More';

  LoadMore.propTypes = {
    buttonText: PropTypes.string
  }

  function clickHandler() {
    pageNext();
    setAfterFirstEvent(true);
  }

  return (
    <div className="c-btn-wrapper text-center">
      <button 
        onClick={() => {clickHandler()}}
        disabled={currentPage >= maxPages} 
        className="c-btn c-btn-secondary c-btn-color-normal"
      >{buttonText}</button>
    </div>
  )
}

export default LoadMore;