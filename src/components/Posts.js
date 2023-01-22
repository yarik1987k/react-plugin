import React from 'react';
import Post from './posts/Post';
import Staff from './posts/Staff';
import Pagination from './Pagination';
import LoadMore from './LoadMore';
import useSettingsContext from '../context/useSettingsContext';
import useDataContext from '../context/useDataContext';
import useCore from '../methods/core/useCore';

function Posts() {
  const {paginationStyle, postType, postsPerRowParameter} = useSettingsContext();
  const {posts, postTypes, loading} = useDataContext();
  const {resetSelected} = useCore();
  const noResultsText = 'Sorry, no results.';
  const clearFiltersText = 'Clear Filters';

  //Post Type Components - Add post types and component names to this object
  const components = {
    'post': Post,
    'post_b': Post,
    'post_c': Post,
    'post_d': Post,
    'staff': Staff   
  };

  //By default each post type uses the Post component
  if (postTypes && postType) {
    if (components[postType] === undefined) {
      components[postType] = Post;
    }
  }

  const ThePost = components[postType];
  let postItems;

  if (posts) {
    postItems = posts.map((post, index) => {
      return (
        <ThePost 
          key={index}
          post={post}
        ></ThePost>
      )
    });
  }

  const loadingClass = loading ? 'loading-active' : '';
  let postsContent;
  let paginationContent;

  if (paginationStyle === 'more') {
    paginationContent = <LoadMore></LoadMore>
  }

  else if (paginationStyle === 'pagination') {
    paginationContent = <Pagination></Pagination>
  }

  if (posts && posts.length > 0) {
    postsContent = <div>
      <div className={`eight29-posts ${loadingClass}`} style={postsPerRowParameter}>
        {postItems}
      </div>

      {paginationContent}
    </div>
  }

  else {
    if (!loading) {
      postsContent = <div className="no-results">
        {noResultsText}

        <div className="c-btn-wrapper">
          <button 
            className="c-btn c-btn-secondary c-btn-color-normal" 
            onClick={() => {resetSelected()}}
          >{clearFiltersText}</button>
        </div> 
      </div>
    }
  }

  return (
   <section className="eight29-posts-container">
      {postsContent}
   </section>
  );
}

export default Posts;