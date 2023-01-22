import useSettingsContext from '../../context/useSettingsContext';

function useMobileClassName() {
  const {mobileStyle} = useSettingsContext();

  const mobileClassName = function() {
    let className = '';

    if (mobileStyle === 'scroll') {
      className = 'mobile-scroll';
    }

    if (mobileStyle === 'modal') {
      className = 'mobile-modal';
    }

    return className;
  }

  return {
    mobileClassName
  }
}

export default useMobileClassName;