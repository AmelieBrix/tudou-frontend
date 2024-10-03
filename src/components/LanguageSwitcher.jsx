import { useTranslation } from 'react-i18next';

const LanguageSwitcher = ({closeMenu}) => {
  const { i18n } = useTranslation();

  const changeLanguage = (lng) => {
    i18n.changeLanguage(lng);
    closeMenu();  // Close the hamburger menu after selecting a language
    // Change the language
  };



  return (
    <div className="language-switcher">
      <button className="language-btn" onClick={() => changeLanguage('en')}>EN</button>
      <button className="language-btn" onClick={() => changeLanguage('de')}>DE</button>
      <button className="language-btn" onClick={() => changeLanguage('cn')}>CN</button>
    </div>
  );
};

export default LanguageSwitcher;
