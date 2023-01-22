import isEmpty from './isEmpty';
import theExcerpt from './theExcerpt';
import useLocalStorage from './useLocalStorage';
import useSidebarClassName from './useSidebarClassName';
import useMobileClassName from './useMobileClassName';

function useUtilities() {
  const {setLocalStorage} = useLocalStorage();
  const {sidebarClassName} = useSidebarClassName();
  const {mobileClassName} = useMobileClassName();

  return {
    isEmpty,
    theExcerpt,
    setLocalStorage,
    sidebarClassName,
    mobileClassName
  }
}

export default useUtilities;