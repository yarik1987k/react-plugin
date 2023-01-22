import React, {useState, useEffect} from 'react';
import PropTypes from 'prop-types';
import FilterContainer from './FilterContainer';
import DatePicker from 'react-datepicker';
import useDataContext from '../../context/useDataContext';
import useCore from '../../methods/core/useCore';

function FilterDate(props) {
  const {
    taxSlug,
    label,
    scrollable,
    collapsible,
    option
  } = props;
  
  const {filterReset, setFilterReset} = useDataContext();
  const {replaceSelected} = useCore();
  //const [today] = useState(new Date());
  const filterId = 'filter-date';

  //JS Date for picker
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);

  //PHP string for WordPress
  const [combinedDate, setCombinedDate] = useState(null);

  FilterDate.propTypes = {
    taxSlug: PropTypes.string,
    label: PropTypes.string,
    scrollable: PropTypes.bool,
    collapsible: PropTypes.bool,
    option: PropTypes.string
  }

  // function jsDate(date) {
  //   //Convert date for picker
  //   let formattedDate = date ? new Date(date.getTime() - (date.getTimezoneOffset() * 60000 )).toISOString().split("T")[0] : '';
  //   formattedDate = formattedDate.replaceAll('-', '');
  //   return formattedDate;
  // }

  function phpDate(date) {
    let formattedDate = date ? new Date(date.getTime() - (date.getTimezoneOffset() * 60000 )).toISOString().split("T")[0] : '';
    return formattedDate;
  }

  function handlerStart(date) {
    setStartDate(date);
  }

  function handlerEnd(date) {
    setEndDate(date);
  }

  function updateDateString() {
    const convertedStartDate = phpDate(startDate);
    const convertedEndDate = phpDate(endDate);
    let dateString = '';

    if (startDate !== null && endDate === null ) {
      dateString = `${convertedStartDate},${convertedStartDate}`;
    }
    else if (startDate !== null && endDate !== null) {
      dateString = `${convertedStartDate},${convertedEndDate}`;
    }

    setCombinedDate(dateString);
  }

  function updateReplacedValue() {
    if (startDate !== null) {
      replaceSelected(combinedDate, taxSlug);
    }
  }

  function resetDate() {
    if (filterReset) {
      //setStartDate(today);
      setStartDate(null);
      setEndDate(null);
      setFilterReset(false);
    }
  }

  useEffect(() => {
    resetDate();
  }, [filterReset]);

  useEffect(() => {
    updateDateString();
  }, [
    startDate, 
    endDate
  ]);

  useEffect(() => {
    updateReplacedValue();
  }, [combinedDate]);

  let endDateFilter;

  const startDateFilter = <>
      <small>Start Date</small>
      <DatePicker
        id={`${filterId}-input`}
        selected={startDate}
        onChange={(date) => {handlerStart(date)}}
      ></DatePicker>
  </>;

  if (option === 'dual') {
    endDateFilter = <>
      <small>End Date</small>
      <DatePicker
        id={`${filterId}-input`}
        selected={endDate}
        onChange={(date) => {handlerEnd(date)}}
      ></DatePicker>
    </>;
  }

  return(
    <FilterContainer 
      filterId={filterId}
      className="filter-date"
      label={label}
      collapsible={collapsible}
      scrollable={scrollable}
    >
      {startDateFilter}
      {endDateFilter}
    </FilterContainer>
  )
}

export default FilterDate;