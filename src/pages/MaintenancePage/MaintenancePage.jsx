import "./MaintenancePage.scss";
import { Helmet } from "react-helmet";
import logo from "../../assets/logos/logo.jpg";

export const MaintenancePage = () => {
  return (
    <section className="maintain">
      <Helmet>
        <title>Website Under Maintenance</title>
      </Helmet>
      <img alt="logo" className="maintain__img" src={logo} />
      <h1 className="maintain__title">We'll be back soon!</h1>
      <p className="maintain__p">
        Our site is currently under maintenance. Please check back later.
      </p>
      <p className="maintain__p">
        Check our discord server for more detailed announcements!
      </p>
      <iframe
        className="maintain__iframe"
        src="https://discord.com/widget?id=1240053839655211089&theme=dark"
        width="350"
        height="400"
        allowTransparency="true"
        frameBorder="0"
        sandbox="allow-popups allow-popups-to-escape-sandbox allow-same-origin allow-scripts"
      ></iframe>
    </section>
  );
};
