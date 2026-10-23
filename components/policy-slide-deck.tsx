'use client'

import React from "react";
import ModuleTableOfContents from "./module-title-slide";
import MultipleChoiceQuestion from "./multiple-choice-question";

type QuestionOption = {
  label: string;
  text: string;
};

type Question = {
  id: string;
  question: string;
  options: QuestionOption[];
  correctAnswer: string;
  explanation: string;
  category: string;
};

type ContentCard = {
  heading: string;
  body: string;
  number?: string;
};

type PolicySection = {
  title?: string;
  [key: string]: unknown;
};

type PolicyData = {
  titleSlide: {
    title: string;
    subtitle?: string;
    moduleTitle?: string;
    desc?: string;
  };
  policiesSlide?: {
    title: string;
    table: { label: string; value: string }[];
    description?: string;
    scope?: string;
  };
  useSlide?: {
    title: string;
    items: string[];
  };
  [key: string]: unknown;
};

type Slide = {
  title: string;
  content: React.ReactNode;
  isMultipleChoice?: boolean;
  quizScoreKey?: string;
  quizAnswersKey?: string;
  isCertificate?: boolean;
  isScribe?: boolean;
};

const CARDS_PER_SLIDE = 4;
const POLICY_ROWS_PER_SLIDE = 6;
const TAKEAWAYS_PER_SLIDE = 4;
const NESTED_ITEMS_PER_SLIDE = 3;

const NUMBER_WORDS: Record<string, string> = {
  zero: "0",
  one: "1",
  two: "2",
  three: "3",
  four: "4",
  five: "5",
  six: "6",
  seven: "7",
  eight: "8",
  nine: "9",
  ten: "10",
  eleven: "11",
  twelve: "12",
  thirteen: "13",
  fourteen: "14",
  fifteen: "15",
  sixteen: "16",
  seventeen: "17",
  eighteen: "18",
  nineteen: "19",
};

function normalizeNumberWords(value: string): string {
  const pattern =
    /\b(?:zero|one|two|three|four|five|six|seven|eight|nine)(?:[\s-]+(?:zero|one|two|three|four|five|six|seven|eight|nine))+\b/gi;

  return value.replace(pattern, (match) =>
    match
      .toLowerCase()
      .split(/[\s-]+/)
      .map((word) => NUMBER_WORDS[word])
      .join(".")
  );
}

function getNumberFromKey(key: string): string | undefined {
  const normalized = key
    .replace(/([a-z])([A-Z])/g, "$1 $2")
    .replace(/([0-9])([A-Za-z])/g, "$1 $2")
    .trim();

  const directMatch = normalized.match(
    /(?:^|\s)(\d+(?:\.\d+)+)(?=\s|$)/
  );

  if (directMatch) {
    return directMatch[1];
  }

  const words = normalized
    .split(/[\s_-]+/)
    .filter(Boolean)
    .map((word) => word.toLowerCase());

  const components: string[] = [];

  for (const word of words) {
    if (NUMBER_WORDS[word] !== undefined) {
      components.push(NUMBER_WORDS[word]);
    } else if (/^\d+$/.test(word)) {
      components.push(word);
    } else {
      break;
    }
  }

  return components.length >= 2
    ? components.join(".")
    : undefined;
}

function formatHeading(key: string): string {
  const numberedKey = getNumberFromKey(key);

  if (numberedKey) {
    return numberedKey;
  }

  return normalizeNumberWords(
    key
      .replace(/([a-z])([A-Z])/g, "$1 $2")
      .replace(/^slide/i, "")
      .replace(/^\d+\s*/, "")
      .replace(/([a-z])(\d)/gi, "$1 $2")
  )
    .replace(/\b\w/g, (char) => char.toUpperCase())
    .trim();
}

function isRecord(value: unknown): value is Record<string, unknown> {
  return (
    typeof value === "object" &&
    value !== null &&
    !Array.isArray(value)
  );
}

function normalizeText(value: string): string {
  return normalizeNumberWords(value);
}

function paginate<T>(items: T[], size: number): T[][] {
  const pages: T[][] = [];

  for (let i = 0; i < items.length; i += size) {
    pages.push(items.slice(i, i + size));
  }

  return pages;
}

function getSectionCards(
  section: Record<string, unknown>
): ContentCard[] {
  const cards: ContentCard[] = [];

  for (const [key, value] of Object.entries(section)) {
    if (key === "title" || value == null) continue;

    const number = getNumberFromKey(key);

    if (typeof value === "string") {
      const body = normalizeText(value).trim();

      if (!body) continue;

      const heading = number
        ? body.match(/^([^:\n]{1,65}):\s*([\s\S]*)$/)
        : null;

      cards.push({
        number,
        heading: heading
          ? normalizeText(heading[1]).trim()
          : formatHeading(key),
        body: heading
          ? heading[2].trim()
          : body,
      });

      continue;
    }

    if (isRecord(value)) {
      const intro =
        typeof value.intro === "string"
          ? normalizeText(value.intro).trim()
          : "";

      const items = Array.isArray(value.items)
        ? value.items.filter(
            (item): item is string => typeof item === "string"
          )
        : [];

      const body = [
        intro,
        ...items.map((item) => normalizeText(item).trim()),
      ]
        .filter(Boolean)
        .join("\n");

      if (body) {
        cards.push({
          number,
          heading: number
            ? intro.replace(/:$/, "") || number
            : formatHeading(key),
          body,
        });
      }
    }

    // if (!isRecord(value)) continue;

    // if (typeof value.intro === "string") {
    //   cards.push({
    //     number,
    //     heading: formatHeading(key),
    //     body: normalizeText(value.intro),
    //   });
    // }

    // if (Array.isArray(value.items)) {
    //   value.items.forEach((item, index) => {
    //     if (typeof item !== "string") return;

    //     cards.push({
    //       heading: `${formatHeading(key)} — ${index + 1}`,
    //       body: normalizeText(item),
    //     });
    //   });
    // }
  }

  return cards;
}

function PolicyStyles() {
  return (
    <style>{`
      .policy-slide {
        --slide-padding: clamp(16px, 2.4vw, 32px);
        width: 100%;
        height: 100%;
        min-width: 0;
        min-height: 0;
        box-sizing: border-box;
        padding: var(--slide-padding);
        display: flex;
        flex-direction: column;
        overflow: hidden;
        background: #ffffff;
        color: #334155;
        font-family: inherit;
      }

      .policy-slide__header {
        flex: 0 0 auto;
        border-bottom: 3px solid #e2e8f0;
        padding-bottom: 10px;
        margin-bottom: 16px;
      }

      .policy-slide__header h1 {
        margin: 0;
        color: #582c83;
        font-size: clamp(21px, 2.5vw, 34px);
        line-height: 1.15;
        letter-spacing: -0.02em;
        overflow-wrap: anywhere;
      }

      /* Compact, content-sized cards for general slides. */
      .policy-slide__cards {
        display: grid;
        grid-template-columns: repeat(2, minmax(0, 1fr));
        align-content: center;
        align-items: start;
        gap: 12px;
        min-height: 0;
        flex: 1 1 auto;
      }

      .policy-card {
        min-width: 0;
        box-sizing: border-box;
        padding: 14px 16px;
        border: 1px solid #e2e8f0;
        border-radius: 8px;
        background: #faf9fc;
      }

      .policy-card h2 {
        margin: 0 0 6px;
        color: #582c83;
        font-size: clamp(14px, 1.2vw, 18px);
        line-height: 1.3;
        overflow-wrap: anywhere;
      }

      .policy-card p {
        margin: 0;
        color: #374151;
        font-size: clamp(12px, 1vw, 15px);
        line-height: 1.5;
        white-space: pre-line;
        overflow-wrap: anywhere;
      }

      /* Policy summary table. */
      .policy-summary {
        flex: 1 1 auto;
        min-height: 0;
        display: flex;
        flex-direction: column;
        justify-content: center;
        gap: 16px;
      }

      .policy-table {
        width: 100%;
        border: 1px solid #e2e8f0;
        border-radius: 8px;
        overflow: hidden;
      }

      .policy-table__row {
        display: grid;
        grid-template-columns: minmax(120px, 30%) minmax(0, 70%);
      }

      .policy-table__row + .policy-table__row {
        border-top: 1px solid #e2e8f0;
      }

      .policy-table__label,
      .policy-table__value {
        padding: 10px 14px;
        font-size: clamp(12px, 1vw, 15px);
        line-height: 1.45;
        overflow-wrap: anywhere;
        white-space: pre-line;
      }

      .policy-table__label {
        background: #f2eef7;
        color: #582c83;
        font-weight: 700;
      }

      .policy-table__value {
        background: #ffffff;
        color: #334155;
      }

      .policy-summary__details {
        display: flex;
        flex-direction: column;
        gap: 8px;
        padding: 14px 18px;
        background: #faf9fc;
        border-left: 4px solid #582c83;
        border-radius: 0 8px 8px 0;
      }

      .policy-summary__details p {
        margin: 0;
        color: #334155;
        font-size: clamp(12px, 1vw, 15px);
        line-height: 1.5;
        overflow-wrap: anywhere;
      }

      .policy-summary__details p + p {
        color: #475569;
      }

      .numbered-section {
        flex: 1 1 auto;
        min-height: 0;
        display: flex;
        flex-direction: column;
        justify-content: flex-start;
        gap: 12px;
        overflow: auto;
      }

      .numbered-section__parent {
        display: flex;
        align-items: flex-start;
        gap: 12px;
        padding-bottom: 12px;
        border-bottom: 1px solid #e5e7eb;
      }

      .numbered-section__badge {
        flex: 0 0 42px;
        min-height: 42px;
        padding: 4px;
        box-sizing: border-box;
        border-radius: 9px;
        background: #582c83;
        color: #fff;
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: 11px;
        font-weight: 700;
        text-align: center;
        overflow-wrap: anywhere;
      }

      .numbered-section__main {
        flex: 1;
        min-width: 0;
      }

      .numbered-section__main h2 {
        margin: 0 0 5px;
        color: #582c83;
        font-size: clamp(16px, 1.5vw, 21px);
        line-height: 1.25;
        overflow-wrap: anywhere;
      }

      .numbered-section__main p {
        margin: 0;
        color: #374151;
        font-size: clamp(12px, 0.95vw, 14px);
        line-height: 1.45;
        white-space: pre-line;
        overflow-wrap: anywhere;
      }

      .numbered-section__children {
        display: grid;
        grid-template-columns: minmax(0, 1fr);
        gap: 8px;
        margin-left: 0;
        align-content: start;
      }

      .numbered-section__item {
        display: flex;
        align-items: flex-start;
        gap: 10px;
        min-width: 0;
        padding: 9px 12px;
        background: #faf9fc;
        border: 1px solid #e5e7eb;
        border-radius: 8px;
      }

      .numbered-section__number {
        flex: 0 0 52px;
        color: #582c83;
        font-size: 12px;
        font-weight: 700;
        line-height: 1.5;
        overflow-wrap: anywhere;
      }

      .numbered-section__item p {
        flex: 1;
        min-width: 0;
        margin: 0;
        color: #374151;
        font-size: clamp(12px, 0.95vw, 14px);
        line-height: 1.5;
        white-space: pre-line;
        overflow-wrap: anywhere;
      }

      @media (max-height: 650px) {
        .numbered-section {
          gap: 8px;
        }

        .numbered-section__parent {
          padding-bottom: 8px;
        }

        .numbered-section__children {
          gap: 5px;
        }

        .numbered-section__item {
          padding: 7px 9px;
        }
      }

      @media (max-width: 700px) {
        .policy-slide {
          --slide-padding: 14px;
        }

        .policy-slide__cards,
        .numbered-section__children {
          grid-template-columns: minmax(0, 1fr);
        }

        .numbered-section__children {
          margin-left: 0;
        }

        .policy-table__row {
          grid-template-columns: minmax(95px, 32%) minmax(0, 68%);
        }

        .policy-table__label,
        .policy-table__value {
          padding: 8px 10px;
        }
      }

      @media (max-height: 650px) {
        .policy-slide {
          --slide-padding: 16px;
        }

        .policy-slide__header {
          margin-bottom: 10px;
          padding-bottom: 7px;
        }

        .policy-slide__cards {
          gap: 8px;
        }

        .policy-card {
          padding: 10px 12px;
        }

        .policy-summary,
        .numbered-section {
          gap: 10px;
        }

        .policy-summary__details {
          padding: 10px 14px;
          gap: 5px;
        }

        .numbered-section__parent {
          padding-bottom: 10px;
        }

        .numbered-section__children {
          row-gap: 3px;
        }
      }

      .policy-slide__decimal-cards {
        flex: 1 1 auto;
        min-height: 0;
        display: grid;
        grid-template-columns: repeat(2, minmax(0, 1fr));
        align-content: center;
        align-items: start;
        gap: clamp(14px, 2vw, 28px);
        padding: 12px 0;
      }

      .policy-decimal-card {
        min-width: 0;
        box-sizing: border-box;
        padding: clamp(16px, 2vw, 28px);
        background: #f1f3f5;
        border: 1px solid #e5e7eb;
        border-radius: 12px;
        box-shadow: 0 2px 8px rgba(0, 0, 0, 0.06);
      }

      .policy-decimal-card h2 {
        margin: 0;
        color: #582c83;
        font-size: clamp(18px, 1.6vw, 24px);
        line-height: 1.25;
      }

      .policy-decimal-card p {
        margin: 10px 0 0;
        color: #374151;
        font-size: clamp(13px, 1vw, 15px);
        line-height: 1.55;
        white-space: pre-line;
        overflow-wrap: anywhere;
      }

      @media (max-width: 700px) {
        .policy-slide__decimal-cards {
          grid-template-columns: minmax(0, 1fr);
          align-content: start;
        }
      }

      @media (max-height: 650px) {
        .policy-slide__decimal-cards {
          gap: 10px;
          padding: 4px 0;
        }

        .policy-decimal-card {
          padding: 12px 14px;
        }

        .policy-decimal-card p {
          margin-top: 6px;
          line-height: 1.4;
        }
      }
    `}</style>
  );
}

function SlideHeader({ title }: { title: string }) {
  return (
    <header className="policy-slide__header">
      <h1>{normalizeText(title).toUpperCase()}</h1>
    </header>
  );
}

function ContentSlide({
  title,
  cards,
}: {
  title: string;
  cards: ContentCard[];
}) {
  return (
    <section className="policy-slide">
      <SlideHeader title={title} />

      <div className="policy-slide__cards">
        {cards.map((card, index) => (
          <article
            className="policy-card"
            key={`${card.number ?? ""}-${card.heading}-${index}`}
          >
            <h2>
              {card.number ? `${card.number} · ` : ""}
              {normalizeText(card.heading)}
            </h2>
            <p>{normalizeText(card.body)}</p>
          </article>
        ))}
      </div>
    </section>
  );
}

function DecimalCardsSlide({
  title,
  cards,
}: {
  title: string;
  cards: ContentCard[];
}) {
  return (
    <section className="policy-slide">
      <SlideHeader title={title} />

      <div className="policy-slide__decimal-cards">
        {cards.map((card, index) => (
          <article
            className="policy-decimal-card"
            key={`${card.number}-${index}`}
          >
            <h2>{card.number}</h2>
            <p>{normalizeText(card.body)}</p>
          </article>
        ))}
      </div>
    </section>
  );
}

function PolicySummarySlide({
  title,
  rows,
  description,
  scope,
}: {
  title: string;
  rows: { label: string; value: string }[];
  description?: string;
  scope?: string;
}) {
  return (
    <section className="policy-slide">
      <SlideHeader title={title} />

      <div className="policy-summary">
        {rows.length > 0 && (
          <div className="policy-table">
            {rows.map((row, index) => (
              <div
                className="policy-table__row"
                key={`${row.label}-${index}`}
              >
                <div className="policy-table__label">
                  {normalizeText(row.label)}
                </div>
                <div className="policy-table__value">
                  {normalizeText(row.value)}
                </div>
              </div>
            ))}
          </div>
        )}

        {(description || scope) && (
          <div className="policy-summary__details">
            {description && (
              <p>{normalizeText(description)}</p>
            )}
            {scope && <p>{normalizeText(scope)}</p>}
          </div>
        )}
      </div>
    </section>
  );
}

function NumberedSectionSlide({
  title,
  cards,
}: {
  title: string;
  cards: ContentCard[];
}) {
  const numberedCards = cards.filter((card) => card.number);
  const otherCards = cards.filter((card) => !card.number);

  const parents = numberedCards.filter(
    (card) => card.number!.split(".").length === 2
  );

  const effectiveParents: ContentCard[] =
    parents.length > 0
      ? parents
      : numberedCards
          .filter((card) => {
            const parts = card.number!.split(".");
            return !numberedCards.some(
              (other) =>
                other.number !== card.number &&
                other.number!.startsWith(`${card.number}.`)
            ) && parts.length === 2;
          });

  const groups = effectiveParents.map((parent) => ({
    parent,
    children: numberedCards.filter(
      (card) =>
        card.number !== parent.number &&
        card.number!.startsWith(`${parent.number}.`)
    ),
  }));

  if (groups.length === 0) {
    return <ContentSlide title={title} cards={cards} />;
  }

  return (
    <section className="policy-slide">
      <SlideHeader title={title} />

      <div className="numbered-section">
        {groups.map(({ parent, children }) => (
          <React.Fragment key={parent.number}>
            <div className="numbered-section__parent">
              <div className="numbered-section__badge">
                {parent.number}
              </div>

              <div className="numbered-section__main">
                <h2>{normalizeText(parent.heading)}</h2>
                {parent.body && <p>{normalizeText(parent.body)}</p>}
              </div>
            </div>

            {children.length > 0 && (
              <div className="numbered-section__children">
                {children.map((child) => (
                  <div
                    className="numbered-section__item"
                    key={child.number}
                  >
                    <div className="numbered-section__number">
                      {child.number}
                    </div>
                    <p>
                      {child.heading !== child.number &&
                        child.heading !== formatHeading(child.number!)
                        ? `${normalizeText(child.heading)}: `
                        : ""}
                      {normalizeText(child.body)}
                    </p>
                  </div>
                ))}
              </div>
            )}
          </React.Fragment>
        ))}

        {otherCards.length > 0 && (
          <div className="policy-slide__cards">
            {otherCards.map((card, index) => (
              <article
                className="policy-card"
                key={`${card.heading}-${index}`}
              >
                <h2>{normalizeText(card.heading)}</h2>
                <p>{normalizeText(card.body)}</p>
              </article>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}

export function createPolicySlides(
  data: PolicyData,
  questions: Question[],
  _playerName: string,
  currentSlideDeck = "cs",
  scoreKey: string,
): Slide[] {
  const slides: Slide[] = [];

  slides.push({
    title: data.titleSlide.title,
    content: (
      <>
        <PolicyStyles />
        <ModuleTableOfContents
          title={normalizeText(data.titleSlide.title)}
          currentSlideDeck={currentSlideDeck}
        />
      </>
    ),
  });

  const policy = data.policiesSlide;

  if (policy) {
    const rows = policy.table ?? [];
    const rowPages = paginate(rows, POLICY_ROWS_PER_SLIDE);
    const pages = rowPages.length || 1;

    for (let index = 0; index < pages; index++) {
      const isLastPage = index === pages - 1;
      const title =
        pages > 1
          ? `${policy.title} (${index + 1}/${pages})`
          : policy.title;

      slides.push({
        title,
        content: (
          <>
            <PolicyStyles />
            <PolicySummarySlide
              title={title}
              rows={rowPages[index] ?? []}
              description={isLastPage ? policy.description : undefined}
              scope={isLastPage ? policy.scope : undefined}
            />
          </>
        ),
      });
    }
  }

  const sections = Object.entries(data).filter(
    ([key, value]) => /^slide[A-Z]/.test(key) && isRecord(value)
  );

  for (const [key, rawSection] of sections) {
    const section = rawSection as PolicySection;

    const title =
      typeof section.title === "string"
        ? normalizeText(section.title)
        : formatHeading(key);

    const cards = getSectionCards(section);

    if (cards.length === 0) continue;

    const numberedCards = cards.filter((card) => card.number);
    const otherCards = cards.filter((card) => !card.number);

    const decimalCards = numberedCards.filter(
      (card) => card.number!.split(".").length === 2
    );

    const nestedCards = numberedCards.filter(
      (card) => card.number!.split(".").length >= 3
    );

    if (decimalCards.length > 0 && nestedCards.length === 0) {
      const pages = paginate(decimalCards, 3);

      pages.forEach((page, index) => {
        const pageTitle =
          pages.length > 1
            ? `${title} (${index + 1}/${pages.length})`
            : title;

        slides.push({
          title: pageTitle,
          content: (
            <>
              <PolicyStyles />
              <DecimalCardsSlide
                title={pageTitle}
                cards={page}
              />
            </>
          ),
        });
      });

      const otherPages = paginate(otherCards, CARDS_PER_SLIDE);

      otherPages.forEach((page, index) => {
        const pageTitle =
          otherPages.length > 1
            ? `${title} — Additional Content (${index + 1}/${otherPages.length})`
            : `${title} — Additional Content`;

        slides.push({
          title: pageTitle,
          content: (
            <>
              <PolicyStyles />
              <ContentSlide title={pageTitle} cards={page} />
            </>
          ),
        });
      });

      continue;
    }

    if (nestedCards.length > 0) {
      const parentCards = decimalCards;

      if (parentCards.length > 0) {
        const pages: ContentCard[][] = [];

        for (const parent of parentCards) {
          const children = nestedCards.filter(
            (card) => card.number!.startsWith(`${parent.number}.`)
          );

          const childGroups = paginate(
            children,
            NESTED_ITEMS_PER_SLIDE
          );

          if (childGroups.length === 0) {
            pages.push([parent]);
            continue;
          }

          childGroups.forEach((group, index) => {
            pages.push(
              index === 0
                ? [parent, ...group]
                : [parent, ...group]
            );
          });
        }

        pages.push(...paginate(otherCards, CARDS_PER_SLIDE));

        const usablePages = pages.filter(
          (page) => page.length > 0
        );

        usablePages.forEach((page, index) => {
          const pageTitle =
            usablePages.length > 1
              ? `${title} (${index + 1}/${usablePages.length})`
              : title;

          slides.push({
            title: pageTitle,
            content: (
              <>
                <PolicyStyles />
                <NumberedSectionSlide
                  title={pageTitle}
                  cards={page}
                />
              </>
            ),
          });
        });

        continue;
      }
    }

    const pages = paginate(cards, CARDS_PER_SLIDE);

    pages.forEach((page, index) => {
      const pageTitle =
        pages.length > 1
          ? `${title} (${index + 1}/${pages.length})`
          : title;

      slides.push({
        title: pageTitle,
        content: (
          <>
            <PolicyStyles />
            <ContentSlide title={pageTitle} cards={page} />
          </>
        ),
      });
    });
  }

  const takeaways = data.useSlide;

  if (
    takeaways &&
    Array.isArray(takeaways.items) &&
    takeaways.items.length > 0
  ) {
    const takeawayCards: ContentCard[] = takeaways.items.map(
      (item, index) => ({
        heading: `Key Takeaway ${index + 1}`,
        body: normalizeText(item),
      })
    );

    const pages = paginate(takeawayCards, TAKEAWAYS_PER_SLIDE);

    pages.forEach((page, index) => {
      const title =
        pages.length > 1
          ? `${takeaways.title} (${index + 1}/${pages.length})`
          : takeaways.title;

      slides.push({
        title,
        content: (
          <>
            <PolicyStyles />
            <ContentSlide title={title} cards={page} />
          </>
        ),
      });
    });
  }

  questions.slice(0, 15).forEach((question, index) => {
    slides.push({
      title: `Knowledge Check: Q${index + 1}`,
      content: (
        <>
          <PolicyStyles />
          <MultipleChoiceQuestion
            questionId={question.id}
            question={question.question}
            options={question.options}
            correctAnswer={question.correctAnswer}
            explanation={question.explanation}
            category={question.category}
          />
        </>
      ),
      isMultipleChoice: true,
      quizScoreKey: scoreKey,
      quizAnswersKey: scoreKey.replace("score", "answers"),
    });
  });

  return slides;
}