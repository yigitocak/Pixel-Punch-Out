import { useState, useEffect, useRef } from "react";
import "./Footer.scss";

import next from "../../assets/images/next.svg";
import prev from "../../assets/images/prev.svg";
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

export const Footer = () => {
  const audioFiles = [
    AdhesiveWombat,
    Underclocked,
    DensityTime,
    ANightOfDizzySpells,
    DubHub,
    PowerUp,
    SourRock,
    MountainTrials,
    Chopsticks,
  ];
  const [currentTrackIndex, setCurrentTrackIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef(null);

  useEffect(() => {
    const playAudio = async () => {
      try {
        await audioRef.current.play();
        setIsPlaying(true);
      } catch (error) {
        console.error("Autoplay was prevented:", error);
        setIsPlaying(false);
      }
    };

    playAudio();
  }, []);

  useEffect(() => {
    if (isPlaying) {
      audioRef.current
        .play()
        .catch((error) => console.error("Error playing the track:", error));
    } else {
      audioRef.current.pause();
    }
  }, [currentTrackIndex, isPlaying]);

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

  return (
    <footer className="audio">
      <audio
        ref={audioRef}
        src={audioFiles[currentTrackIndex]}
        onEnded={playNext}
        autoPlay
      />
      <div>
        <button onClick={playPrevious} className="audio__button">
          <img
            src={next}
            alt="Previous track"
            className="audio__button-image"
          />
        </button>
        <button
          onClick={playPause}
          className="audio__button  audio__button-play"
        >
          {isPlaying ? (
            <img
              className="audio__button-image"
              src={pause}
              alt="Pause button"
            />
          ) : (
            <img className="audio__button-image" src={play} alt="Play button" />
          )}
        </button>
        <button onClick={playNext} className="audio__button">
          <img src={prev} alt="Next track" className="audio__button-image" />
        </button>
      </div>
    </footer>
  );
};
