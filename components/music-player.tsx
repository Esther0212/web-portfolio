"use client";

import Image from "next/image";
import { useCallback, useRef, useState } from "react";
import { motion, useReducedMotion } from "motion/react";

import MusicControlButton from "./ui/music-control-button";

import {
  FALLBACK_VINYL_GIF,
  getMusicUrl,
  getVinylGifUrl,
  musicPlaylist,
} from "@/lib/music-playlist";

// Format playback time as M:SS.
function formatTime(value: number) {
  if (!Number.isFinite(value) || value < 0) {
    return "0:00";
  }

  const minutes = Math.floor(value / 60);
  const seconds = Math.floor(value % 60);

  return `${minutes}:${String(seconds).padStart(2, "0")}`;
}

// Handle MP3 files that initially report Infinity as duration.
function getAudioDuration(audio: HTMLAudioElement) {
  if (Number.isFinite(audio.duration) && audio.duration > 0) {
    return audio.duration;
  }

  if (audio.seekable.length > 0) {
    const lastRange = audio.seekable.length - 1;
    const end = audio.seekable.end(lastRange);

    if (Number.isFinite(end) && end > 0) {
      return end;
    }
  }

  return 0;
}

export default function MusicPlayer() {
  const audioRef = useRef<HTMLAudioElement>(null);
  const shouldAutoplayRef = useRef(false);

  const reduceMotion = useReducedMotion();

  const [trackIndex, setTrackIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [error, setError] = useState("");

  const track = musicPlaylist[trackIndex];
  const trackCount = musicPlaylist.length;

  // Update duration from metadata or seekable range.
  const updateDuration = useCallback((audio: HTMLAudioElement) => {
    const nextDuration = getAudioDuration(audio);

    setDuration(nextDuration);

    return nextDuration;
  }, []);

  // Play selected track.
  const playAudio = useCallback(async () => {
    const audio = audioRef.current;

    if (!audio) return;

    try {
      await audio.play();

      if (audioRef.current === audio) {
        setError("");
        updateDuration(audio);
      }
    } catch (error) {
      if (error instanceof DOMException && error.name === "AbortError") {
        return;
      }

      if (audioRef.current === audio) {
        shouldAutoplayRef.current = false;
        setIsPlaying(false);
        setError("Could not start playback.");
      }
    }
  }, [updateDuration]);

  // Toggle between play and pause.
  const togglePlayPause = () => {
    const audio = audioRef.current;

    if (!audio) return;

    if (audio.paused) {
      shouldAutoplayRef.current = false;
      void playAudio();
    } else {
      shouldAutoplayRef.current = false;
      audio.pause();
    }
  };

  // Change songs and loop playlist.
  const selectTrack = useCallback(
    (nextIndex: number) => {
      if (trackCount === 0) return;

      const index = ((nextIndex % trackCount) + trackCount) % trackCount;

      shouldAutoplayRef.current = true;

      setError("");
      setCurrentTime(0);
      setDuration(0);
      setIsPlaying(false);

      if (index === trackIndex) {
        const audio = audioRef.current;

        if (!audio) return;

        if (audio.readyState > 0) {
          audio.currentTime = 0;
        }

        shouldAutoplayRef.current = false;
        void playAudio();

        return;
      }

      setTrackIndex(index);
    },
    [trackCount, trackIndex, playAudio],
  );

  // Seek to a selected timestamp.
  const seekTo = (seconds: number) => {
    const audio = audioRef.current;

    if (!audio) return;

    const knownDuration = getAudioDuration(audio);

    if (knownDuration <= 0) return;

    const nextTime = Math.max(0, Math.min(seconds, knownDuration));

    try {
      audio.currentTime = nextTime;
      setCurrentTime(nextTime);
    } catch {
      // Audio may not be seekable yet.
    }
  };

  if (!track) return null;

  const vinylGif = track.vinylGif ?? FALLBACK_VINYL_GIF;

  const hasDuration = Number.isFinite(duration) && duration > 0;

  // Keep the slider in its valid range.
  const sliderMaximum = hasDuration ? duration : 1;

  const sliderValue = hasDuration
    ? Math.min(Math.max(0, currentTime), duration)
    : 0;

  const progress = hasDuration ? (sliderValue / sliderMaximum) * 100 : 0;

  return (
    <motion.article
      aria-label="Vinyl music player"
      initial={false}
      animate={
        reduceMotion
          ? {
              rotate: 0,
              scale: 1,
            }
          : {
              rotate: isHovered ? 0 : 12,
              scale: isHovered ? 1.04 : 1,
            }
      }
      transition={{
        type: "spring",
        stiffness: 180,
        damping: 22,
      }}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      onFocusCapture={() => setIsHovered(true)}
      onBlurCapture={(event) => {
        if (!event.currentTarget.contains(event.relatedTarget as Node | null)) {
          setIsHovered(false);
        }
      }}
      className="
        overflow-visible
        w-full min-w-0
        px-5 pt-10 pb-10
        text-card-foreground
        surface-elevated relative
      "
    >
      {/* Native audio player */}
      <audio
        key={track.id}
        ref={audioRef}
        src={getMusicUrl(track.file)}
        preload="auto"
        onLoadedMetadata={(event) => {
          updateDuration(event.currentTarget);
        }}
        onLoadedData={(event) => {
          updateDuration(event.currentTarget);
        }}
        onDurationChange={(event) => {
          updateDuration(event.currentTarget);
        }}
        onProgress={(event) => {
          updateDuration(event.currentTarget);
        }}
        onTimeUpdate={(event) => {
          const audio = event.currentTarget;

          setCurrentTime(audio.currentTime);
          updateDuration(audio);
        }}
        onCanPlay={() => {
          if (shouldAutoplayRef.current) {
            shouldAutoplayRef.current = false;
            void playAudio();
          }
        }}
        onPlay={() => {
          setIsPlaying(true);
          setError("");
        }}
        onPause={() => {
          setIsPlaying(false);
        }}
        onEnded={() => {
          selectTrack(trackIndex + 1);
        }}
        onError={() => {
          shouldAutoplayRef.current = false;
          setIsPlaying(false);
          setError("Unable to load song.");
        }}
      />

      {/* Vinyl GIF */}
      <div
        className="
      flex
      mb-4 py-1
      relative -mt-2 items-center justify-center
    "
      >
        <div
          className="
      relative size-[110px] shrink-0
    "
        >
          <Image
            key={vinylGif}
            src={getVinylGifUrl(vinylGif)}
            alt={`Vinyl for ${track.title}`}
            fill
            unoptimized
            sizes="110px"
            draggable={false}
            className="
              object-contain
              select-none
              scale-[1.15] origin-center
            "
          />
        </div>
      </div>

      {/* Song details */}
      <div
        className="
          min-w-0
          mt-1
          text-center
        "
      >
        <h3
          title={track.title}
          className="
            !m-0 !truncate !text-[11px] !font-semibold !leading-[1.4] !tracking-tight
          "
        >
          {track.title}
        </h3>

        <p
          title={track.artist}
          className="
            mt-0.5
            text-[9px] text-muted-foreground
            truncate !leading-[1.4]
          "
        >
          {track.artist}
        </p>
      </div>

      {/* Custom solid progress bar */}
      <div
        className="
          mt-2
        "
      >
        <div
          className="
            flex
            h-3
            relative items-center
          "
        >
          {/* Unplayed track */}
          <div
            aria-hidden="true"
            className="
              h-[4px]
              bg-muted
              rounded-full
              pointer-events-none
              absolute inset-x-0
            "
          />

          {/* Played track */}
          <div
            aria-hidden="true"
            style={{
              width: `${progress}%`,
            }}
            className="
              h-[4px]
              bg-primary
              rounded-full
              pointer-events-none
              absolute left-0
            "
          />

          {/* Transparent slider with solid thumb */}
          <input
            type="range"
            aria-label="Seek music position"
            min={0}
            max={sliderMaximum}
            step={0.1}
            value={sliderValue}
            disabled={!hasDuration}
            onChange={(event) => {
              seekTo(Number(event.target.value));
            }}
            className="
              z-10
              h-3 w-full
              m-0
              bg-transparent
              cursor-pointer
              relative appearance-none disabled:cursor-not-allowed [&::-webkit-slider-runnable-track]:h-[4px] [&::-webkit-slider-runnable-track]:bg-transparent [&::-webkit-slider-thumb]:size-[10px] [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:border-0 [&::-webkit-slider-thumb]:bg-primary [&::-webkit-slider-thumb]:shadow-none [&::-webkit-slider-thumb]:-translate-y-[3px] [&::-moz-range-track]:h-[4px] [&::-moz-range-track]:bg-transparent [&::-moz-range-thumb]:size-[10px] [&::-moz-range-thumb]:rounded-full [&::-moz-range-thumb]:border-0 [&::-moz-range-thumb]:bg-primary [&::-moz-range-thumb]:shadow-none
            "
          />
        </div>

        {/* Timestamps */}
        <div
          className="
            flex
            mt-1
            font-code text-[9px] text-muted-foreground
            justify-between tabular-nums
          "
        >
          <span>{formatTime(currentTime)}</span>

          <span>{hasDuration ? formatTime(duration) : "--:--"}</span>
        </div>
      </div>

      {/* Reusable music controls */}
      <div
        className="
          flex
          mt-1
          items-center justify-center gap-2
        "
      >
        <MusicControlButton
          action="previous"
          onClick={() => selectTrack(trackIndex - 1)}
        />

        <MusicControlButton
          action={isPlaying ? "pause" : "play"}
          onClick={togglePlayPause}
        />

        <MusicControlButton
          action="next"
          onClick={() => selectTrack(trackIndex + 1)}
        />
      </div>

      {error && (
        <p
          role="status"
          className="
            mt-1
            text-center text-[9px] text-destructive
          "
        >
          {error}
        </p>
      )}
    </motion.article>
  );
}
