import { useAppSelector } from "../../redux/hooks";
import { headerLogo } from "../../redux/slice/landingPageSlice";
import "./Footer.scss";

function Footer() {
  const footerLogo = useAppSelector(headerLogo);

  return (
    <div className="footer">
      <div className="footer-logo">
        <img src={footerLogo} alt="" />
      </div>
      <div className="footer-content">
        <div className="footer-text">© Kickdrum Technology Group LLC.</div>
        <div className="footer-text">All rights reserved</div>
      </div>
    </div>
  );
}

export default Footer;
