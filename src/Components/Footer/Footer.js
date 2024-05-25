import { useState, useEffect, useRef } from "react";
import "./Footer.scss";

import prev from "../../assets/images/prev.svg";
import next from "../../assets/images/next.svg";
import pause from "../../assets/images/pause.svg";
import play from "../../assets/images/play.svg";

import AdhesiveWombat from "../../assets/musics/AdhesiveWombat.mp3";
import Underclocked from "../../assets/musics/Underclocked.mp3";
import DensityTime from "../../assets/musics/DensityTime.mp3";
import ANightOfDizzySpells from "../../assets/musics/ANightOfDizzySpells.mp3";
import DubHub from "../../assets/musics/DubHub.mp3";
import PowerUp from "../../assets/musics/Powerup.mp3";
import SourRock from "../../assets/musics/SourRock.mp3";
import MountainTrials from "../../assets/musics/MountainTrials.mp3";
import Chopsticks from "../../assets/musics/Chopsticks.mp3";
import discordLogo from "../../assets/logos/discord-logo.svg";
import { DISCORD_URL } from "../../utils/utils";

export const Footer = ({
  setFlashMessage,
  setFlashSuccess,
  setShowSnackbar,
}) => {
  const audioFiles = [
    { name: "Adhesive Wombat", path: AdhesiveWombat },
    { name: "Underclocked", path: Underclocked },
    { name: "Density Time", path: DensityTime },
    { name: "A Night Of Dizzy Spells", path: ANightOfDizzySpells },
    { name: "Dub Hub", path: DubHub },
    { name: "Power Up", path: PowerUp },
    { name: "Sour Rock", path: SourRock },
    { name: "Mountain Trials", path: MountainTrials },
    { name: "Chopsticks", path: Chopsticks },
  ];

  // Randomize the initial track
  const getRandomTrackIndex = () =>
    Math.floor(Math.random() * audioFiles.length);
  const [currentTrackIndex, setCurrentTrackIndex] =
    useState(getRandomTrackIndex);
  const [isPlaying, setIsPlaying] = useState(false);
  const [volume, setVolume] = useState(0.0245); // Default volume set to 0.01
  const audioRef = useRef(null);
  const [showTooltip, setShowTooltip] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768); // Adjust the width threshold as needed
    };

    handleResize(); // Check on initial load
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    if (isPlaying) {
      audioRef.current.play().catch((error) => {
        console.error("Error playing the track:", error);
        setShowSnackbar(true);
        setFlashSuccess(false);
        setFlashMessage("Error playing the track!");
      });
    } else {
      audioRef.current.pause();
    }
  }, [isPlaying]);

  useEffect(() => {
    if (isPlaying) {
      setFlashMessage(`Now playing: ${audioFiles[currentTrackIndex].name}`);
      setShowSnackbar(true);
      setFlashSuccess(true);
    }
  }, [
    currentTrackIndex,
    isPlaying,
    setFlashMessage,
    setShowSnackbar,
    setFlashSuccess,
  ]);

  useEffect(() => {
    audioRef.current.volume = volume; // Update volume when the state changes
  }, [volume]);

  const playPause = () => {
    setIsPlaying(!isPlaying);
  };

  const playNext = () => {
    const nextIndex = (currentTrackIndex + 1) % audioFiles.length;
    setCurrentTrackIndex(nextIndex);
    setIsPlaying(true);
  };

  const playPrevious = () => {
    const previousIndex =
      (currentTrackIndex - 1 + audioFiles.length) % audioFiles.length;
    setCurrentTrackIndex(previousIndex);
    setIsPlaying(true);
  };

  const handleVolumeChange = (event) => {
    setVolume(event.target.value);
  };

  const openLinkInNewTab = () => {
    window.open(DISCORD_URL, "_blank", "noopener,noreferrer");
  };

  if (isMobile) {
    return null; // Do not render Footer on mobile devices
  }

  return (
    <footer className="footer">
      <section className="discord">
        <img
          src={discordLogo}
          alt="discord logo"
          className="discord__img"
          onMouseEnter={() => setShowTooltip(true)}
          onMouseLeave={() => setShowTooltip(false)}
          onClick={openLinkInNewTab}
        />
        <span className={`discord__tooltip ${showTooltip ? "visible" : ""}`}>
          Join now!
        </span>
      </section>
      <section className="audio">
        <span className="audio__name">
          {audioFiles[currentTrackIndex].name}
        </span>
        <audio
          ref={audioRef}
          src={audioFiles[currentTrackIndex].path}
          onEnded={playNext}
        />
        <div className="audio__controls">
          <button onClick={playPrevious} className="audio__button">
            <img
              src={prev}
              alt="Previous track"
              className="audio__button-image"
            />
          </button>
          <button
            onClick={playPause}
            className="audio__button audio__button-play"
          >
            {isPlaying ? (
              <img
                className="audio__button-image"
                src={pause}
                alt="Pause button"
              />
            ) : (
              <img
                className="audio__button-image"
                src={play}
                alt="Play button"
              />
            )}
          </button>
          <button onClick={playNext} className="audio__button">
            <img src={next} alt="Next track" className="audio__button-image" />
          </button>
        </div>
        <div className="audio__volume">
          <input
            type="range"
            min="0"
            max="0.05"
            step="0.01"
            value={volume}
            onChange={handleVolumeChange}
            className="audio__volume-slider"
          />
        </div>
      </section>
    </footer>
  );
};
