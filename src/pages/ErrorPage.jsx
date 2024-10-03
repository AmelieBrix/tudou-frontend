import { useTranslation } from "react-i18next";

const ErrorPage = () => {
  const { t } = useTranslation();
  return (
    <div>
      <h1>{t('error')}</h1> 
    </div>
  );
};

export default ErrorPage;