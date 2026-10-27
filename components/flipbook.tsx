'use client';

import React, {
  forwardRef,
  useCallback,
  useRef,
  useState,
} from "react";
import HTMLFlipBook from "react-pageflip";

type PageProps = {
  number: number;
  title: string;
  children?: React.ReactNode;
  cover?: boolean;
};

const Page = forwardRef<HTMLDivElement, PageProps>(
  ({ number, title, children, cover = false }, ref) => (
    <div
      ref={ref}
      className={`book-page ${cover ? "book-cover" : ""}`}
    >
      <div className="page-content">
        {cover ? (
          <div className="cover-content">
            <span className="cover-eyebrow">THE COLLECTION</span>
            <h2>{title}</h2>
            <p>A beautifully interactive reading experience.</p>
            <span className="cover-hint">OPEN TO EXPLORE</span>
          </div>
        ) : (
          <>
            <span className="page-kicker">CHAPTER {number}</span>
            <h2>{title}</h2>
            {children}
            <span className="page-number">{number}</span>
          </>
        )}
      </div>
    </div>
  )
);

Page.displayName = "Page";

const pages = [
  {
    title: "Our Story",
    text: "Discover the ideas, people, and inspiration behind our work.",
  },
  {
    title: "The Vision",
    text: "Thoughtful design and meaningful details make every experience special.",
  },
  {
    title: "The Collection",
    text: "Explore the collection, featuring carefully selected pieces and timeless style.",
  },
  {
    title: "Get in Touch",
    text: "We would love to hear from you. Turn the final page to start a conversation.",
  },
];

export default function FlipBook() {
  const bookRef = useRef<any>(null);
  const [currentPage, setCurrentPage] = useState(0);

  const onFlip = useCallback((event: { data: number }) => {
    setCurrentPage(event.data);
  }, []);

  const previousPage = () => {
    bookRef.current?.pageFlip()?.flipPrev();
  };

  const nextPage = () => {
    bookRef.current?.pageFlip()?.flipNext();
  };

  const totalPages = pages.length + 2;

  return (
    <main className="flipbook-shell">
      <div className="flipbook-heading">
        <span className="flipbook-label">INTERACTIVE EDITION</span>
        <h1>Discover the story.</h1>
        <p>Turn the pages to explore.</p>
      </div>

      <div className="book-stage">
        <HTMLFlipBook
          ref={bookRef}
          width={420}
          height={560}
          size="stretch"
          minWidth={280}
          maxWidth={420}
          minHeight={380}
          maxHeight={560}
          drawShadow={true}
          flippingTime={900}
          usePortrait={true}
          startPage={0}
          startZIndex={0}
          autoSize={true}
          maxShadowOpacity={0.45}
          showCover={true}
          mobileScrollSupport={true}
          clickEventForward={true}
          useMouseEvents={true}
          swipeDistance={30}
          showPageCorners={true}
          disableFlipByClick={false}
          onFlip={onFlip}
          className="flipbook"
          style={{ margin: "0 auto" }}
        >
          <Page
            number={0}
            title="The Art of Discovery"
            cover
          />

          {pages.map((page, index) => (
            <Page
              key={page.title}
              number={index + 1}
              title={page.title}
            >
              <p>{page.text}</p>
              <div className="page-art">
                <span>{String(index + 1).padStart(2, "0")}</span>
              </div>
            </Page>
          ))}

          <Page
            number={totalPages - 1}
            title="The End"
            cover
          />
        </HTMLFlipBook>
      </div>

      <div className="book-controls">
        <button
          onClick={previousPage}
          disabled={currentPage === 0}
          aria-label="Previous page"
        >
          ← <span>Previous</span>
        </button>

        <span className="page-counter">
          {currentPage + 1} / {totalPages}
        </span>

        <button
          onClick={nextPage}
          disabled={currentPage >= totalPages - 1}
          aria-label="Next page"
        >
          <span>Next</span> →
        </button>
      </div>

      <p className="flipbook-tip">
        Click a page corner, drag a page, or use the arrows.
      </p>
    </main>
  );
}
