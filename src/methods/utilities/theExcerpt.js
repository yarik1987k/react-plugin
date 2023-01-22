function theExcerpt(content, link, amount = 150, text = 'Read More') {
  const divider = content.length > amount ? '<span class="excerpt-divider">...</span>' : '';
  
  content = content.replace('[&hellip;]', `...`);
  content = content.substring(0, amount);
  content = `${content}${divider} <a href=${link}>${text}</a>`;
  return content;
}

export default theExcerpt;