import React, { useState } from "react";

interface Slide {
  title?: string;
  content: React.ReactNode;
}

interface SlideshowProps {
  slides: Slide[];
  startSlide?: number;
  onLastSlide?: () => void;
}

const Slideshow: React.FC<SlideshowProps> = ({
  slides,
  startSlide = 0,
  onLastSlide,
}) => {
  const [current, setCurrent] = useState(startSlide);

  const next = () => {
    if (current < slides.length - 1) {
      setCurrent(current + 1);
    } else {
      onLastSlide?.();
    }
  };

  const previous = () => {
    if (current > 0) {
      setCurrent(current - 1);
    }
  };

  const goToSlide = (index: number) => {
    setCurrent(index);
  };

  return (
    <div style={styles.container}>
      <div style={styles.header}>
        <h2>
          Slide {current + 1} / {slides.length}
        </h2>

        {slides[current].title && (
          <h3>{slides[current].title}</h3>
        )}
      </div>

      <div style={styles.slide}>
        {slides[current].content}
      </div>

      <div style={styles.footer}>
        <button onClick={previous} disabled={current === 0}>
          Previous
        </button>

        <div style={styles.numbers}>
          {slides.map((_, index) => (
            <button
              key={index}
              onClick={() => goToSlide(index)}
              style={{
                ...styles.numberButton,
                backgroundColor:
                  index === current ? "#007bff" : "#ddd",
                color: index === current ? "white" : "black",
              }}
            >
              {index + 1}
            </button>
          ))}
        </div>

        <button
          onClick={next}
          //disabled={current === slides.length - 1}
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
    justifyContent: "space-between",
    gap: 10,
  },
  numbers: {
    display: "flex",
    gap: 5,
    flexWrap: "wrap",
  },
  numberButton: {
    width: 35,
    height: 35,
    border: "none",
    borderRadius: 4,
    cursor: "pointer",
  },
};

export default Slideshow;