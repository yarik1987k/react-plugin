import { useContext } from 'react';
import { SettingsContext } from './SettingsContext';

const useSettingsContext = () => useContext(SettingsContext);

export default useSettingsContext;