import React, { createContext, useState } from 'react';
import PropTypes from 'prop-types';
import GetInitialSelected from '../methods/initial/GetInitialSelected';
import GetInitialOrder from '../methods/initial/GetInitialOrder';

export const DataContext = createContext();
export function DataProvider(props) {
  //Global state
  const [filters, setFilters] = useState({});
  const [selected, setSelected] = useState(GetInitialSelected());
  const [currentFilter, setCurrentFilter] = useState({});
  const [posts, setPosts] = useState([]);
  const [currentSearchTerm, setCurrentSearchTerm] = useState('');
  const [order, setOrder] = useState(GetInitialOrder());
  const [currentPage, setCurrentPage] = useState(1);
  const [maxPages, setMaxPages] = useState(1);
  const [results, setResults] = useState(0);
  const [loading, setLoading] = useState(true);
  const [postTypes, setPostTypes] = useState([]);
  const [globalData, setGlobalData] = useState({});
  const [changedFilter, setChangedFilter] = useState(false);
  const [filterReset, setFilterReset] = useState(false);
  const [afterFirstEvent, setAfterFirstEvent] = useState(false);

  const data = {
    filters,
    setFilters,
    selected,
    setSelected,
    currentFilter,
    setCurrentFilter,
    posts,
    setPosts,
    currentSearchTerm,
    setCurrentSearchTerm,
    order,
    setOrder,
    currentPage,
    setCurrentPage,
    maxPages,
    setMaxPages,
    results,
    setResults,
    loading,
    setLoading,
    postTypes,
    setPostTypes,
    changedFilter,
    setChangedFilter,
    globalData,
    setGlobalData,
    filterReset,
    setFilterReset,
    afterFirstEvent,
    setAfterFirstEvent
  };

  const {children} = props;

  DataProvider.propTypes = {
    children: PropTypes.element
  }

  return (
    <DataContext.Provider value={data}>
      {children}
    </DataContext.Provider>
  )
}