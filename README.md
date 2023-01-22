## NPM Commands

#### Installation & Set Up
```
npm install
```

#### Watch & compile css/js
```
npm run start
```

#### Watch & lint css/js
```
npm run lint
```

#### Compile and minify assets for production
```
npm run build:production
```

#### Compile for production and export into zip file
```
npm run zip
```

## Filter Data

You must pass down the post types, taxonomies, and filters you'd like to use into the plugin as an associative array. By default the plugin works with the "post" post type, "category" taxonomy, and uses the select filter. Below is how the default data is formatted and you can use this as a base to customize or add in more data.

Each post type (slug) is an array that contains an array of the taxonomies expected. Each taxonomy (slug) is rendered on the page as a filter. The type of filter is determined by the "type" parameter in the array.

To pass the data into the plugin use the set_post_data filter in the functions.php section of your theme as follows:

```
<?php
add_filter('eight29_filters/set_post_data', function($data) {
  $data = [
    "post" => [
      "category" => [
        "label" => "Categories", 
        "type" => "select" 
      ]
    ]
  ];
      
  return $data;
});
?>
```

By default the plugin will display all terms from the taxonomy inside the filter. You can add an ACF field to your taxonomy if you want to hide certain terms from the filter. Add a boolean to your taxonomy(s) with ACF using the key "remove_category_from_filter".
#### Filter Types

The "type" attribute accepts the following options:

- button-group
- checkbox
- accordion-multi-select
- accordion-single-select
- select
- date
- search

Some support for non taxonomy post data has been added:

Post Dates
```
<?php
$data = [
  "post" => [
    "date" => [
      "label" => "Insert Label Here", 
      "type" => "select", 
    ]
  ]
]
?>
```

Post Authors
```
<?php
$data = [
  "post" => [
    "author" => [
      "label" => "Insert Label Here", 
      "type" => "select", 
    ]
  ]
]
?>
```

#### Meta Queries
You can add filters for meta key values by passing down a "meta_query" array into your filter

```
<?php
"price" => [ //slug of your meta key
			"label" => "Rental Rate", 
			"type" => "accordion-single-select",
			"meta_query" => [
				"compare" => "BETWEEN",
				"type" => "NUMERIC",
				"terms" => [
					["id" => 1, "name" => "$1 - $100", "parent" => 0, "slug" => "price_1_100", "taxonomy" => "price", "value" => "1, 100"],
					["id" => 2, "name" => "$101 - $200", "parent" => 0, "slug" => "price_101_200", "taxonomy" => "price", "value" => "101, 200"],
					["id" => 3, "name" => "$201 - $300", "parent" => 0, "slug" => "price_201_300", "taxonomy" => "price", "value" => "201, 300"],
					["id" => 4, "name" => "$301 - $400", "parent" => 0, "slug" => "price_301_400", "taxonomy" => "price", "value" => "301, 400"],
					["id" => 5, "name" => "$401 - $500", "parent" => 0, "slug" => "price_401_500", "taxonomy" => "price", "value" => "401, 500"] 
				]
			]
		]
  ?>
```

It works the same way as a taxonomy based filter, add the slug of your meta key as the title of the array.

The meta_query array accepts the following parameters, "compare", "type", and "terms":

- **compare** - Tells WordPress how to compare your value(s). Possible values are ‘=’, ‘!=’, ‘>’, ‘>=’, ‘<‘, ‘<=’, ‘LIKE’, ‘NOT LIKE’, ‘IN’, ‘NOT IN’, ‘BETWEEN’, ‘NOT BETWEEN’, ‘EXISTS’ and ‘NOT EXISTS’. If you have a single value it will default to "=", and if you have multiple values it will default to "IN". (If you have multiple values the operator symbols cannot be used.)

- **type** - Tells WordPress what type of values are being compared. Possible values are ‘NUMERIC’, ‘BINARY’, ‘CHAR’, ‘DATE’, ‘DATETIME’, ‘DECIMAL’, ‘SIGNED’, ‘TIME’, ‘UNSIGNED’. Default value is ‘CHAR’.

- **terms** - These values get passed down to React as selectable options inside of the filter. All of the keys in the array example are required and parent should be set to "0". React processes them the same way as taxonomies which is why "taxonomy" is in the array.

If you do not pass down options WordPress will query each post and create a unique array of values as options for the filter.

For more about how meta queries work and their accepted values please refer to the [WordPress Codex](https://developer.wordpress.org/reference/classes/wp_meta_query/)

### Date Queries (Date Picker Filter)

```
<?php
"post_e" => [
			"event_date" => [
				"label" => "Event Date",
				"type" => "date",
				"option" => "dual",
				"meta_query" => [
					"compare" => "BETWEEN",
					"type" => "DATE"
				]
			]
		]
?>
```

The date picker has an option field, you can use **"single"** to only have a start date or **"dual"** to have both a start and end date.

## Customizing, Adding New Filters & Post Components

By default the plugin enqueues and loads the compiled JS for React components and Sass from the dist folder (domain.com/wp-content/plugins/eight29-filters-react/dist)

To customize the components, or add your own, make a new directory in the root of your theme called "eight29-filters" (domain.com/wp-content/themes/your-theme-name/eight29-filters) and copy the package.json, .sassrc, src directory, and dist directory into the eight29-filters directory in your theme. After that run "npm install" to install all required dependencies. A full list of npm commands can be found at the [beginning of this document](#markdown-header-npm-commands).

#### Filter Components

Each filter is a component located in the components/filters directory. Filters should follow the "FilterType" naming convention. Filters are imported into the "Sidebar" component and are dynamically selected from the components object. 

To add new filters add your filter to the component object and be sure to import into the sidebar by the handle you give it.

```javascript
import FilterCheckbox from './filters/FilterCheckbox';
import FilterSelect from './filters/FilterSelect';
import FilterButtonGroup from './filters/FilterButtonGroup';
import FilterAccordionMultiSelect from './filters/FilterAccordionMultiSelect';
import FilterAccordionSingleSelect from './filters/FilterAccordionSingleSelect';
import MyCustomFilter from './filters/MyCustomFilter';

const components = {
  'checkbox': FilterCheckbox,
  'select' : FilterSelect,
  'button-group' : FilterButtonGroup,
  'accordion-multi-select' : FilterAccordionMultiSelect,
  'accordion-single-select' : FilterAccordionSingleSelect
  'my-custom-filter': MyCustomFilter
}
```

You’ll want to wrap the contents of your filter inside the <FilterContainer> component.

This will handle:

- Adding a label to the component with a count of the # of items selected
- Wrapping the component in a custom scrollbar
- Wrapping the component in a collapsible div

The FilterContainer component uses the following props:

- **className** - CSS class name for the component, should use the format filter-<name-of-component>, expected format is a string
- **label** - The title shown on the front end, expected format is a string
- **taxSlug** - The slug of the taxonomy, expected format is a string
- **filterId (required)** - A unique ID used in the DOM, expected format is a string
- **collapsible** - Choose whether to collapse the filter contents, expected format is a boolean
- **scrollable** - Choose whether to place the filter contents in a scrollable div using [SimpleBar](https://www.npmjs.com/package/simplebar), expected format is a boolean

You can manually set these values but most of them will be passed down automatically from the **filters** state from the Sidebar component.

Filters use two methods to update the "selected" state:

- **replaceSelected** - This accepts two arguments (id, taxSlug) and will **replace** all selected ids in the array with the id being passed in for that particular term.  
- **toggleSelected** - This also accepts two arguments (id, taxSlug) and will **add** to the array of selected ids with the id being passed in that for that particular term. If the id being passed in is already in the selected array it will remove it.

You can access them by destructuring from the useCore hook

```javascript
const {toggleSelected, replaceSelected} = useCore();
```

#### Filter Component Attributes
- **collapsible** - Places the component inside of an accordion style collapsible element
- **dropdown** - Places the component inside of a faux scrollable dropdown container (useful for creating custom select/checkbox menus)

PHP
```
<?php
$data = [
  "post" => [
    "category" => [
      "label" => "Categories", 
      "type" => "accordion-multi-select", 
      "collapsible" => true,
      "dropdown" => true
    ]
  ]
]
?>
```

JSX
```
<FilterAccordionMultiSelect
  label={filters.category.label}
  taxonomy={filters.category.terms}
  taxSlug={'category'}
  selected={selected}
  collapsible={true}
  dropdown={true}
></FilterAccordionMultiSelect>
```
#### Post Components

Each post type is a component located in the *components/posts* directory. Post types are imported into the <Posts> component. By default every post type you pass into the plugin with the set_post_data filter uses the <Post> component. 

To add in your own post type components add your new custom components into the **components** object. Be sure to import your new components into the posts component by the handle you give it.

```javascript
import Post from './posts/Post';
import Staff from './posts/Staff';
import CustomPostType from './posts/CustomPostType';

const components = {
  'post': Post,
  'staff': Staff, 
  'custom_post_type': CustomPostType 
};
```

Post components get their data from the [posts endpoint](https://developer.wordpress.org/rest-api/reference/posts/) in WordPress.

#### Custom Layouts

By default the plugin uses the "LayoutDefault.js" file in the layouts folder. To create your own custom layouts you can duplicate this file using the same naming scheme "LayoutCustomName.js". (You will need some basic knowledge of React.) You will need to import the layout into App.js and add it to the layouts object in this file.

```javascript
import LayoutDefault from './components/layouts/LayoutDefault';
import LayoutBlogA from './components/layouts/LayoutBlogA';
import LayoutBlogB from './components/layouts/LayoutBlogB';
import LayoutBlogC from './components/layouts/LayoutBlogC';
import LayoutBlogD from './components/layouts/LayoutBlogD';
import LayoutStaff from './components/layouts/LayoutStaff';
import LayoutCustomName from './components/layouts/LayoutCustomName';

const layouts = {
    'default': LayoutDefault,
    'blog_A': LayoutBlogA,
    'blog_B': LayoutBlogB,
    'blog_C': LayoutBlogC,
    'blog_D': LayoutBlogD,
    'staff': LayoutStaff,
    'custom_name': LayoutCustomName
}
```

To use the layout specify it in your shortcode as follows:

```
[eight29_filters layout="layout_custom_name" post_type="post"]
```

## Image Data
To help reduce load time for the REST API you can choose what image sizes will be returned with the post results. If you do not provide image sizes the default action is to return all defined image sizes in WordPress.

The format is the same as the set_post_data filter except you're passing down the slug for the image size in your array.

```
<?php
add_filter('eight29_filters/set_image_data', function($data) {
	$data = [
		'post' => ['eight29_post_thumb'],
		'post_b' => ['eight29_post_thumb', 'thumbnail', 'medium'],
		'staff' => ['eight29_staff']
	];

	return $data;
});
?>
```

## Global Data

To add data that needs to be global or shared outside of posts use this filter:

```
<?php
//Endpoint Global Data
add_filter('eight29_filters/set_global_data', function($data) {
	$data['my_global_data'] = 'Insert data here';
	
	return $data;
});
?>
```

## Endpoints

The plugin uses the following endpoints to gather data:

- https://domain.com/wp-json/eight29/v1/filters/<post_type> - Outputs an object of each taxonomy and it's children for the requested post type from filter data
- https://domain.com/wp-json/eight29/v1/post-types - Outputs an array of all post types from filter data
- https://domain.com/wp-json/wp/v2/<post_type> - Outputs an object of posts for the requested post type
- https://domain.com/wp-json/eight29/v1/global-data - Outputs an object of posts for the requested post type

#### Adding Custom Data To The Post Endpoint

You can add data that needs to be displayed in post cards using the custom_endpoint_details filter:

```
add_filter('eight29_filters/custom_endpoint_details', function($data, $object) {
	$data['my_custom_field'] = 'The post id is '. $object['id'];
	$data['my_custom_field_2'] = 'Some content from ACF '.get_field('acf_field', $object['id']);

	return $data;
}, 10, 3);
```

The data will be added inside an object called "eight29_custom"

```javascript
eight29_custom: {
  my_custom_field: "The post id is 636",
  my_custom_field_2: "Some content from ACF (acf content)"
}
```

You can then reference this in your JSX inside React as follows:

```javascript
const myCustomField = post.eight29_custom.my_custom_field;
const myCustomField2 = post.eight29_custom.my_custom_field_2;
```
## Shortcode

To render the posts and filters use the following shortcode in your theme or WYSIWYG editor:

```
[eight29_filters]
```

#### Shortcode Attributes

The shortcode includes the following attributes:

- **post_type** - Post type slug (Default is "post")
- **posts_per_row** - Number of posts per row (Default is 3)
- **taxonomy** - Choose a taxonomy to pre filter
- **term_id** - Choose a taxonomy term to pre filter from the selected taxonomy
- **author_id** - Choose an author to pre filter
- **tag_id** - Choose a tag to pre filter
- **exclude_posts** - Exclude post(s) ids from displaying. Separate by comma for more than one.
- **tax_relation** - Choose to have filters use "AND or "OR" relation (Default is "AND") 
- **hide_uncategorized** - Prevents the "uncategorized" term from the "post" post type from displaying inside filters
- **remember_filters** - Choose to have allow filter selections to persist after page refresh (uses localStorage)
- **order_by** - Choose what order posts display as (Default is "date").
    - Accepted values: date, abc, xyz, menu_order 
- **mobile_style** - Choose to have filters scroll horizontally, open in a modal, or stack vertically (Default).
    - Accepted values: scroll, modal
- **display_sidebar** - Choose to display the sidebar and it's position (Default is "left").
    - Accepted values: left, right, bottom, top, false
- **display_author** - Choose to display the author's name with the post (Default is "true").
    - Accepted values: true, false
- **display_excerpt** - Choose to display the post excerpt along with the post (Default is "false").
    - Accepted values: true, false
- **display_date** - Choose to display the post date with the post (Default is "false").
    - Accepted values: true, false
- **display_categories** - Choose to display categories/taxonomies that each post has (Default is "true").
    - Accepted values: true, false
- **display_post_counts** - Choose to display the post counts for each taxonomy term in the sidebar (Default is "false").
    - Accepted values: true, false
- **display_results** - Choose to display the total number of available posts in the sidebar (Default is "false").
    - Accepted values: true, false
- **display_reset** - Choose to display a button to reset filters (Default is "false").
    - Accepted values: true, false
- **display_search** - Choose to display a search input in the sidebar (Default is "false").
    - Accepted values: true, false
- **display_sort** - Choose to display a select input with sort options for posts (Default is "false").
    - Accepted values: true, false
- **pagination_style** - Choose to display pagination as a traditional style with page numbers or use a "load more" button
    - Accepted values: pagination, more

#### Pre Filtering Data

You can pre filter data using query strings. Use "e29_<taxslug>" followed by the IDs you want selected as a comma separated string.

Example: https://domain.com/?e29_category=78,79&e29_resource=33,34

## Best Practices & Tips

- Avoid editing files in the *src/methods/core* directory. These methods are used across the application and edits can have unintended side effects.

- Avoid using querySelector to target elements or add classes to elements in React. Instead do it the “React” way and use hooks like [useRef, and useState](https://reactjs.org/docs/hooks-intro.html).

- Run `build:production` to use React’s production mode and add minified dist files