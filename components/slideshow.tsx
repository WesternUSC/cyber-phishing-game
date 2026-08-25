'use client';

import React, { useState, useEffect } from "react";

interface Slide {
  title?: string;
  content: React.ReactNode;
}

interface SlideshowProps {
  slides: Slide[];
  startSlide?: number;
  onLastSlide?: () => void;
}

// title slides that don't require 1 minute wait
const EXEMPT_SLIDES = new Set([0, 1, 5, 8, 11, 14, 18, 19]);

const WAIT_TIME = 1 * 1000;

const STORAGE_KEY = "slideshow-progress";

const INCIDENT_SLIDE_TITLE = "Incident Response & Reporting";
const CLOUD_SLIDE_TITLE = "Safe Cloud & File Sharing Rules";

const Slideshow: React.FC<SlideshowProps> = ({
  slides,
  startSlide = 0,
  onLastSlide,
}) => {
  const [current, setCurrent] = useState(startSlide);
  const [slideStartedAt, setSlideStartedAt] = useState(Date.now());
  const [seenSlides, setSeenSlides] = useState<Set<number>>(
    new Set([startSlide])
  );
  const [incidentSteps, setIncidentSteps] = useState(1);
  const [cloudSteps, setCloudSteps] = useState(1);
  const [isLoaded, setIsLoaded] = useState(false);
  const [isTransitioning, setIsTransitioning] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem(STORAGE_KEY);

    if (saved) {
      try {
        const parsed = JSON.parse(saved);

        setCurrent(parsed.current ?? startSlide);
        setSlideStartedAt(parsed.slideStartedAt ?? Date.now());
        setSeenSlides(
          new Set<number>(parsed.seenSlides ?? [startSlide])
        );
        setIncidentSteps(parsed.incidentSteps ?? 1);
        setCloudSteps(parsed.cloudSteps ?? 1);
      } catch (error) {
        console.error("Failed to load slideshow progress:", error);
      }
    }

    setIsLoaded(true);
  }, [startSlide]);

  useEffect(() => {
    if (!isLoaded) return;

    localStorage.setItem(
      STORAGE_KEY,
      JSON.stringify({
        current,
        slideStartedAt,
        seenSlides: Array.from(seenSlides),
        incidentSteps,
        cloudSteps
      })
    );
  }, [isLoaded, current, slideStartedAt, seenSlides, incidentSteps, cloudSteps]);

  const isExempt = (slideIndex: number) => {
    return EXEMPT_SLIDES.has(slideIndex);
  };

  const hasWaitedLongEnough = () => {
    if (isExempt(current)) {
      return true;
    }

    return Date.now() - slideStartedAt >= WAIT_TIME;
  };

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      // Ignore typing in text boxes
      const target = event.target as HTMLElement;

      if (
        target.tagName === "INPUT" ||
        target.tagName === "TEXTAREA" ||
        target.isContentEditable
      ) {
        return;
      }

      if (event.key === "ArrowRight" || event.key === " ") {
        next();
      }

      // Debug: remove in production
      if (event.key.toLowerCase() === "s") {
        setCurrent(slides.length - 2);

        const allSlidesSeen = seenSlides.size === slides.length;

        if (!allSlidesSeen) {
          const nextSlide = slides.length - 1;

          const allSlidesSeen = new Set(
            slides.map((_, index) => index)
          );

          setSeenSlides(allSlidesSeen);

          localStorage.setItem(
            STORAGE_KEY,
            JSON.stringify({
              current: nextSlide,
              slideStartedAt: Date.now(),
              seenSlides: Array.from(allSlidesSeen),
              incidentSteps,
            })
          );

          onLastSlide?.();
          return;
        }
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [current, seenSlides, incidentSteps, cloudSteps]);

  const changeSlide = (newIndex: number) => {
    setIsTransitioning(true);

    setTimeout(() => {
      setCurrent(newIndex);
      setSlideStartedAt(Date.now());

      if (slides[newIndex]?.title === CLOUD_SLIDE_TITLE) {
        setCloudSteps(1);
      } 

      setSeenSlides((previous) => {
        const updated = new Set(previous);
        updated.add(newIndex);
        return updated;
      });

      setIsTransitioning(false);
    }, 300);
  };

  const previous = () => {
    if (current > 0) {
      changeSlide(current - 1);
    }
  };

  const next = () => {
    if (current === slides.length - 2) {
      const allSlidesSeen = seenSlides.size === slides.length;

      if (!allSlidesSeen) {
        const nextSlide = current + 1;

        const updatedSeenSlides = new Set(seenSlides);
        updatedSeenSlides.add(nextSlide);

        setSeenSlides(updatedSeenSlides);

        localStorage.setItem(
          STORAGE_KEY,
          JSON.stringify({
            current: nextSlide,
            slideStartedAt: Date.now(),
            seenSlides: Array.from(updatedSeenSlides),
            incidentSteps,
          })
        );

        onLastSlide?.();
        return;
      }
    }

    const isIncidentSlide =
      slides[current].title === INCIDENT_SLIDE_TITLE;

    if (isIncidentSlide && incidentSteps < 4) {
      setIncidentSteps((previous: number) => previous + 1);
      return;
    }

    const isCloudSlide =
      slides[current].title === CLOUD_SLIDE_TITLE;

    if (isCloudSlide && cloudSteps < 3) {
      setCloudSteps((previous) => previous + 1);
      return;
    }

    if (!hasWaitedLongEnough()) {
      window.alert(
        "You must wait at least one minute on this slide before proceeding."
      );
      return;
    }

    changeSlide(current + 1);
  };

  const progress =
    slides.length > 1
      ? (current / (slides.length - 1)) * 100
      : 100;

  if (slides.length === 0) {
    return null;
  }

  return (
    <div style={styles.container}>
      <div style={styles.header}>
        {slides[current].title && (
          <h3>{slides[current].title}</h3>
        )}
      </div>

      <div
        style={{
          ...styles.slide,
          opacity: isTransitioning ? 0 : 1,
          transition: "opacity 0.3s ease-in-out",
        }}
      >
        {slides[current].title === INCIDENT_SLIDE_TITLE &&
        React.isValidElement(slides[current].content)
          ? React.cloneElement(
              slides[current].content as React.ReactElement<{
                visibleSteps: number;
              }>,
              { visibleSteps: incidentSteps }
            )
          : slides[current].title === CLOUD_SLIDE_TITLE &&
            React.isValidElement(slides[current].content)
          ? React.cloneElement(
              slides[current].content as React.ReactElement<{
                cloudSteps: number;
              }>,
              { cloudSteps }
            )
          : slides[current].content}
      </div>

      <div style={styles.footer}>
        <button
          onClick={previous}
          disabled={current === 0}
        >
          Previous
        </button>

        <div style={styles.progressContainer}>
          <div style={styles.progressTrack}>
            <div
              style={{
                ...styles.progressBar,
                width: `${progress}%`,
              }}
            />
          </div>
        </div>

        <button
          onClick={next}
          disabled={current === slides.length - 1}
        >
          Next
        </button>
      </div>
    </div>
  );
};

const styles: Record<string, React.CSSProperties> = {
  container: {
    width: "100vw",
    height: "100vh",
    display: "flex",
    flexDirection: "column",
    boxSizing: "border-box",
    padding: 20,
  },

  header: {
    marginBottom: 20,
  },

  slide: {
    flex: 1,
    padding: 20,
    overflowY: "auto",
    border: "1px solid #ddd",
    borderRadius: 6,
  },

  footer: {
    display: "flex",
    alignItems: "center",
    gap: 15,
    marginTop: 15,
  },

  progressContainer: {
    flex: 1,
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    gap: 5,
  },

  progressTrack: {
    width: "50%",
    height: 12,
    backgroundColor: "#e5e5e5",
    borderRadius: 999,
    overflow: "hidden",
  },

  progressBar: {
    height: "100%",
    backgroundColor: "#28a745",
    borderRadius: 999,
    transition: "width 0.3s ease",
  },

  progressText: {
    fontSize: 12,
    color: "#666",
  },
};

export default Slideshow;
