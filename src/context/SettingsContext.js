import { createContext } from 'react';

const instances = document.querySelectorAll('.eight29-filters');
const settings = {};

if (instances) {
  instances.forEach(app => {
    settings.currentPagePath = window.location.href;
    settings.userData = JSON.parse((localStorage.getItem('selected')));
    settings.layout = app.getAttribute('data-layout') ? app.getAttribute('data-layout') : 'default';
    settings.rememberFilters = app.getAttribute('data-remember-filters') && app.getAttribute('data-remember-filters') === 'true' ? true : false;
    settings.postType = app.getAttribute('data-post-type') ? app.getAttribute('data-post-type') : 'post';
    settings.postsPerRow = app.getAttribute('data-posts-per-row') ? app.getAttribute('data-posts-per-row') : 3;
    settings.postsPerRowParameter = {'--posts-per-row': settings.postsPerRow};
    settings.postsPerPage = app.getAttribute('data-posts-per-page') ? app.getAttribute('data-posts-per-page') : 10;
    settings.taxonomy = app.getAttribute('data-taxonomy') ? app.getAttribute('data-taxonomy') : false;
    settings.termId = app.getAttribute('data-term-id') ? app.getAttribute('data-term-id') : false;
    settings.authorId = app.getAttribute('data-author-id') ? app.getAttribute('data-author-id') : false;
    settings.tagId = app.getAttribute('data-tag-id') ? app.getAttribute('data-tag-id') : false;
    settings.excludePosts = app.getAttribute('data-exclude-posts') ? app.getAttribute('data-exclude-posts') : false;
    settings.taxRelation = app.getAttribute('data-tax-relation') === 'OR' ? 'OR' : 'AND';
    settings.mobileStyle = app.getAttribute('data-mobile-style') ? app.getAttribute('data-mobile-style') : false;
    settings.orderBy = app.getAttribute('data-order-by') ? app.getAttribute('data-order-by') : false;
    settings.paginationStyle = app.getAttribute('data-pagination-style') ? app.getAttribute('data-pagination-style') : 'pagination';
    settings.preSelect = app.getAttribute('data-pre-select') && !settings.taxonomy && !settings.termId ? JSON.parse(app.getAttribute('data-pre-select')) : false;
    settings.displaySidebar = app.getAttribute('data-display-sidebar') ? app.getAttribute('data-display-sidebar') : 'top';
    settings.displayPostCounts = app.getAttribute('data-display-post-counts') === 'true' ? true : false;
    settings.displaySelected = app.getAttribute('data-display-selected') === 'true' ? true : false;
    settings.displayExcerpt = app.getAttribute('data-display-excerpt') === 'true' ? true : false;
    settings.displayAuthor = app.getAttribute('data-display-author') === 'false' ? false : true;
    settings.displayDate = app.getAttribute('data-display-date') === 'true' ? true : false;
    settings.displayCategories = app.getAttribute('data-display-categories') === 'false' ? false : true;
    settings.displayResults = app.getAttribute('data-display-results') === 'true' ? true : false;
    settings.displayReset = app.getAttribute('data-display-reset') === 'true' ? true : false;
    settings.displaySearch = app.getAttribute('data-display-search') === 'true' ? true : false;
    settings.displaySort = app.getAttribute('data-display-sort') === 'true' ? true : false;
    settings.hideUncategorized = app.getAttribute('data-hide-uncategorized') === 'true' ? true : false;
  });
}

export const SettingsContext = createContext(settings);
export default SettingsContext;