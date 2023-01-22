import React from 'react';
import PropTypes from 'prop-types';
import FeaturedImage from '../FeaturedImage';
import useSettingsContext from '../../context/useSettingsContext';
import useCore from '../../methods/core/useCore';

function Staff(props) {
  const {post} = props;
  const {postType} = useSettingsContext();
  const {replaceSelected} = useCore();
  let categories;
  let categoryItems;
  let featuredImage;

  Staff.propTypes = {
    post: PropTypes.object
  }

  if (post.featured_image !== undefined && post.featured_image) {
    featuredImage = <a href={post.link} className="eight29-featured-image">
      <figure>
        <FeaturedImage
          imageSize={'eight29_staff'} 
          image={post.featured_image}
          srcset={post.featured_image}
        ></FeaturedImage>
      </figure>
    </a>
  }

  if (post.the_categories !== undefined && post.the_categories.length > 0) {
    categories = post.the_categories;
  }

  if (categories) {
    categoryItems = categories.map((category) => {
      return (
        <a 
          key={category.id}
          onClick={() => {replaceSelected(category.id, category.taxonomy)}}
        >{category.name}</a>
      );
    });
  }

  return (
    <article id={`${postType}-${post.id}`} className="eight29-post eight29-post-card eight29-post-staff">
      {featuredImage}

      <div className="eight29-post-body">
        <h4 className="eight29-post-title"><a href={post.link} dangerouslySetInnerHTML={{__html: post.title.rendered}}></a></h4>

        <div className="eight29-post-categories">
         {categoryItems}
        </div>

        <div className="eight29-post-detail">
        </div>
      </div>
    </article>
  );
}

export default Staff; 