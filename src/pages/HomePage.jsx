import { useTranslation } from "react-i18next";

const HomePage = () => {
  const { t } = useTranslation();
  return (
    <div>
      <h1>{t('welcome')}</h1>  {/* Translated text for 'welcome' */}
      <p>{t('description')}</p>  {/* Translated text for 'description' */}
    </div>
  );
};

export default HomePage;