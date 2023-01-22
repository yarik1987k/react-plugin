function scrollUp(value) {
  const position = value ? value : 0;

  window.scrollTo({
    top: position,
    left: 0,
    behavior: 'smooth'
  });
}

export default scrollUp;