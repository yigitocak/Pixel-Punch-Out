import "./NotAvailable.scss";
import { useEffect } from "react";

export const NotAvailable = ({ setWindowWidth }) => {
  const handleResize = () => {
    if (window.innerWidth < 1200) {
      setWindowWidth(true);
    } else {
      setWindowWidth(false);
    }
  };

  useEffect(() => {
    handleResize(); // Check on initial render
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []); // Empty dependency array to run only once on mount

  return (
    <section className="not-available">
      <h1 className="not-available__title">
        CONTENT NOT AVAILABLE FOR BELOW 1200PX WIDTH. SCREEN WIDTH MUST BE
        GREATER THAN 1200PX.
      </h1>
    </section>
  );
};
