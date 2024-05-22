import "./PoliciesPage.scss";
import { Helmet } from "react-helmet";
import {NavLink} from "react-router-dom";
import React from "react";

export const PoliciesPage = () => {
  return (
    <section className="policies">
      <Helmet>
        <title>Privacy Policy | Pixel Punch-Out</title>
        <meta
          name="description"
          content="Review the Pixel Punch-Out Privacy Policy to learn how we handle your data. We prioritize your privacy and ensure your information is secure while you enjoy our multiplayer fighting game."
        />
      </Helmet>
      <div className="policies__container">
        <h1 className="policies__title">Privacy Policy</h1>

        <span className="policies__info">
          Welcome to Pixel Punch Out, the premier online multiplayer fighting
          game. This Privacy Policy outlines how we collect, use, protect, and
          handle your personal information as you use our game and services.
        </span>
        <h2 className="policies__privacy-title">1. Information Collection</h2>
        <span className="policies__info">
          When you create an account on Pixel Punch Out, we collect the
          following personal information:
          <br />
          <strong className="policies__important">Email Address:</strong>
          Used for account verification,,and essential communications.
          <br />
          <strong className="policies__important">Username:</strong>
          This is your chosen identity in the game and is displayed during
          gameplay and on leaderboards.
          <br />
          <strong className="policies__important">Password:</strong>
          Your password is encrypted and stored securely to protect your
          account.
        </span>
        <h2 className="policies__privacy-title">2. Use of Information</h2>
        <span className="policies__info">
          Your information is used to:
          <br />
          Manage your account. Display your username in the game and on
          leaderboards. Ensure a personalized and engaging gaming experience.
          Communicate important announcements and updates.
        </span>

        <h2 className="policies__privacy-title">
          3. Data Storage and Security
        </h2>
        <span className="policies__info">
          Your personal data is stored in a secure database. We use
          industry-standard encryption methods to protect your password and
          other sensitive information. We are committed to ensuring the security
          and integrity of your data.
        </span>
        <h2 className="policies__privacy-title">
          4. Cookies and Tracking Technologies
        </h2>
        <span className="policies__info">
          We use cookies primarily to maintain your session and store your
          authentication tokens (JWTs). These cookies are essential for
          verifying your identity and providing our services without re-entering
          your login details repeatedly.
        </span>
        <h2 className="policies__privacy-title">5. User Rights</h2>
        <span className="policies__info">
          You have the right to access or delete your account information at any
          time. Deleting your account will permanently remove your personal
          information from our database. To manage or delete your account,
          please use the settings available within the game interface.
        </span>
        <h2 className="policies__privacy-title">6. No Third-Party Sharing</h2>
        <span className="policies__info">
          We do not share your personal information with any third parties. Your
          data is used exclusively for the purposes stated in this policy.
        </span>
        <h2 className="policies__privacy-title">7. Changes to This Policy</h2>
        <span className="policies__info">
          We may update this privacy policy to reflect changes to our
          information practices. If we make any material changes, we will notify
          you by posting an announcement on our website before the changes
          become effective. We encourage you to periodically review this page
          for the latest information on our privacy practices.
        </span>
        <div className="policies__link-wrapper">
          <NavLink to="/" className="policies__link">
            Back
          </NavLink>
        </div>
      </div>
    </section>
  );
};
