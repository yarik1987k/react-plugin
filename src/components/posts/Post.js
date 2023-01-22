import React from 'react';
import PropTypes from 'prop-types';
import FeaturedImage from '../FeaturedImage';
import useSettingsContext from '../../context/useSettingsContext';
import useCore from '../../methods/core/useCore';
import useUtilities from '../../methods/utilities/useUtilities';

function Post(props) {
  const {
    postType,
    displayAuthor,
    displayExcerpt,
    displayDate,
    displayCategories
  } = useSettingsContext();

  const {post} = props;
  const {replaceSelected} = useCore();
  const {theExcerpt} = useUtilities();
  let categories;
  let categoryItems;
  let featuredImage;
  let author;
  let excerpt;
  let date;

  Post.propTypes = {
    post: PropTypes.object
  }

  if (post.featured_image !== undefined && post.featured_image) {
    featuredImage = <a href={post.link} className="eight29-featured-image">
      <figure>
        <FeaturedImage
          imageSize={'eight29_post_thumb'} 
          image={post.featured_image}
          srcset={post.featured_image}
        ></FeaturedImage>
      </figure>
    </a>
  }

  if (post.the_categories !== undefined && post.the_categories.length > 0) {
    categories = post.the_categories;
  }

  if (categories && displayCategories) {
    categoryItems = categories.map((category) => {
      return (
        <a 
          key={category.id}
          onClick={() => {replaceSelected(category.id, category.taxonomy)}}
        >{category.name}</a>
      );
    });
  }

  if (post.the_author !== undefined && displayAuthor) {
    author = <span className="author">By {post.the_author}</span>
  }

  if (post.excerpt && displayExcerpt) {
    excerpt = <div className="eight29-post-excerpt" dangerouslySetInnerHTML={{__html: theExcerpt(post.excerpt.rendered, post.link)}}>
    </div>
  }

  if (displayDate) {
    date = <time>{post.formatted_date}</time>
  }

  return (
    <article id={`${postType}-${post.id}`} className="eight29-post eight29-post-card">
      {featuredImage}

      <div className="eight29-post-body">
        <div className="eight29-post-categories">
         {categoryItems}
        </div>

        <h4 className="eight29-post-title"><a href={post.link} dangerouslySetInnerHTML={{__html: post.title.rendered}}></a></h4>

        {excerpt}

        <div className="eight29-post-detail">
          {date}
          {author}
        </div>
      </div>
    </article>
  );
}

export default Post; 