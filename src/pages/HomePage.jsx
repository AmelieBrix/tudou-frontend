import { useTranslation } from "react-i18next";
import { Link, useNavigate } from "react-router-dom";
import Slider from "react-slick"; 
import '../css/Homepage.css';
import { AuthContext } from "../context/auth.context";
import { useContext } from "react";

const HomePage = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  
  const { isLoggedIn } = useContext(AuthContext);

  const sliderSettings = {
    dots: true,
    infinite: true,
    speed: 2000,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 4000,
  };

  const handleGetStarted = () => {
    if (isLoggedIn) {
      navigate("/createpost");  // Redirect to create post if logged in
    } else {
      navigate("/login");  // Redirect to signup if not logged in
    }
  };
// remember to delete the inline style after behind th eimages
  return (
    <div className="homepage"> 
      <div className="slider-container">
        <Slider {...sliderSettings}> 
          <div>
            <img src="https://res.cloudinary.com/dfrhg0iqs/image/upload/v1727943672/yeb977t1sgajrcmbf5oi.jpg" alt="Floating mountains"  />
          </div>
          <div>
            <img src="https://res.cloudinary.com/dfrhg0iqs/image/upload/v1727945442/qkvygnqppxnppl5bfqwd.jpg" alt="German Beach" />
          </div>
          <div>
            <img src="https://res.cloudinary.com/dfrhg0iqs/image/upload/v1727943675/l9dsaiyfhm5uetmhywwl.jpg" alt="Chinese lights"  />
          </div>
          <div>
            <img src="https://res.cloudinary.com/dfrhg0iqs/image/upload/v1727943674/kyybk5cjlkzvpqxtaval.jpg" alt="Castle"  />
          </div>
          <div>
          <img src="https://res.cloudinary.com/dfrhg0iqs/image/upload/v1727943476/ubdvrdpej4mi1gf25buf.jpg" alt="Fujian"  />
          </div>
        </Slider>
        <div className="slider-content">
        <h1>{t('headline')}</h1>  {/* Translated headline */}
        <p>{t('subheadline')}</p>  {/* Translated subheadline */}
        <button className="fancy-button" onClick={handleGetStarted}>
        {t('getStarted')}
        </button>
      </div>

      </div>
      {/* Headline section */}
      
    
      {/* Category divs */}
      <div className="category-section">
        <div className="category">
          <div className="icon">🌇</div> {/* A place to view amazing galleries., Explore recommendations tailored to your interests., Search and find anything you need in one place. */}
          <h3>{t('viewGallery')}</h3>
          <p>{t('GalleryIntro')}</p>
          <Link to="/gallery" className="category-link"></Link>
        </div>
        <div className="category">
          <div className="icon">📑</div>
          <h3>{t('viewRecommendations')}</h3>
          <p>{t('RecommendationIntro')}</p>
          <Link to="/recommendations" className="category-link"></Link>
        </div>
        <div className="category">
          <div className="icon">🔍</div>
          <h3>{t('viewSearchAndFind')}</h3>
          <p>{t('SearchAndFindIntro')}</p>
          <Link to="/searchandfind" className="category-link"></Link>
        </div>
      </div>
    </div>
  );
};

export default HomePage;