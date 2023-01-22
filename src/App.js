import React, { useEffect } from 'react';
import LayoutDefault from './components/layouts/LayoutDefault';
import LayoutBlogA from './components/layouts/LayoutBlogA';
import LayoutBlogB from './components/layouts/LayoutBlogB';
import LayoutBlogC from './components/layouts/LayoutBlogC';
import LayoutBlogD from './components/layouts/LayoutBlogD';
import LayoutStaff from './components/layouts/LayoutStaff';
import useSettingsContext from './context/useSettingsContext';
import useDataContext from './context/useDataContext';
import useInitial from './methods/initial/useInitial';
import useUtilities from './methods/utilities/useUtilities';
import useCore from './methods/core/useCore';
import useLoad from './methods/load/useLoad';

function App() {
  const {layout} = useSettingsContext();

  const {
    order,
    filters,
    selected,
    currentSearchTerm,
    currentPage,
    afterFirstEvent
  } = useDataContext();

  const {
    getInitialTaxonomy,
    getFilterSlugs,
    getInitialAuthor,
    getInitialTag
  } = useInitial();

  const {
    loadFilters,
    loadPostTypes,
    loadPosts,
    loadGlobalData
  } = useLoad();

  const {isAllChildrenSelected} = useCore();
  const {setLocalStorage, mobileClassName} = useUtilities();

  const layouts = {
    'default': LayoutDefault,
    'blog_A': LayoutBlogA,
    'blog_B': LayoutBlogB,
    'blog_C': LayoutBlogC,
    'blog_D': LayoutBlogD,
    'staff': LayoutStaff
  }

  const CurrentLayout = layouts[layout];

  useEffect(() => {
    getInitialTaxonomy();
    getInitialAuthor();
    getInitialTag();
    loadFilters();
    loadPostTypes();
    loadPosts();
    loadGlobalData();
  }, []);

  useEffect(() => {
    getFilterSlugs();
  }, [filters]);

  useEffect(() => {
    if (afterFirstEvent) {
      loadPosts();
    }
  }, [
    filters,
    selected,
    currentPage, 
    currentSearchTerm,
    order
  ]);

  useEffect(() => {
    isAllChildrenSelected();
  }, [selected]);

  useEffect(() => {
    setLocalStorage();
  }, [
    selected,
    order
  ]);

  return (
    <div className={`eight29-app ${mobileClassName()}`}>
      <CurrentLayout
        layout={layout}
      ></CurrentLayout>
    </div>
  );
}

export default App;