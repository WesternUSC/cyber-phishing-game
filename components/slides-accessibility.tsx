import slidesData from '@/data/accessibility.json'
import MultipleChoiceQuestion from './multiple-choice-question';
import questionsData from '@/data/questions.json';
import ModuleTableOfContents from './module-title-slide';

type slides = 'eso' | 'policies' | 'cs' | 'accessibility' | 'conflict';

export const accessibilitySlides = (playerName: string, setCurrentSlides: React.Dispatch<React.SetStateAction<slides>>) => [
  {
    title: "Certificate of Completion",
    content: <ModuleTableOfContents title={slidesData.titleSlide.title} setCurrentSlides={setCurrentSlides} />,
  },
  {
    title: slidesData.policiesSlide.title,
    content: (
      <>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            height: "100%",
            padding: "2rem 3rem",
            boxSizing: "border-box",
          }}
        >
          <div>
            <h1
              style={{
                margin: 0,
                color: "#582c83",
                fontSize: "2.75rem",
              }}
            >
              {slidesData.policiesSlide.title.toUpperCase()}
            </h1>

            <div
              style={{
                marginTop: "0.75rem",
                height: "3px",
                width: "100%",
                backgroundColor: "#e2e8f0",
                borderRadius: "2px",
              }}
            />
          </div>

          <div
            style={{
              flex: 1,
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              gap: "1.5rem",
              marginTop: "1.5rem",
            }}
          >
            <div
              style={{
                width: "100%",
                border: "1px solid #e2e8f0",
                borderRadius: "8px",
                overflow: "hidden",
              }}
            >
              {slidesData.policiesSlide.table.map((row, index) => (
                <div
                  key={row.label}
                  style={{
                    display: "grid",
                    gridTemplateColumns: "30% 70%",
                    borderBottom:
                      index < slidesData.policiesSlide.table.length - 1
                        ? "1px solid #e2e8f0"
                        : "none",
                  }}
                >
                  <div
                    style={{
                      backgroundColor: "#f2eef7",
                      color: "#582c83",
                      fontWeight: 700,
                      padding: "0.75rem 1rem",
                      fontSize: "1rem",
                    }}
                  >
                    {row.label}
                  </div>

                  <div
                    style={{
                      backgroundColor: "#ffffff",
                      color: "#334155",
                      padding: "0.75rem 1rem",
                      fontSize: "1rem",
                    }}
                  >
                    {row.value}
                  </div>
                </div>
              ))}
            </div>

            <div
              style={{
                display: "flex",
                flexDirection: "column",
                gap: "0.75rem",
                padding: "1.25rem 1.5rem",
                backgroundColor: "#faf9fc",
                borderLeft: "4px solid #582c83",
                borderRadius: "0 8px 8px 0",
              }}
            >
              <p
                style={{
                  margin: 0,
                  color: "#334155",
                  fontSize: "1.05rem",
                  lineHeight: 1.6,
                }}
              >
                {slidesData.policiesSlide.description}
              </p>

              <p
                style={{
                  margin: 0,
                  color: "#475569",
                  fontSize: "1.05rem",
                  lineHeight: 1.6,
                }}
              >
                {slidesData.policiesSlide.scope}
              </p>
            </div>
          </div>
        </div>
      </>
    ),
  },
  {
    title: slidesData.slideOne.title,
    content: (
      <>
       <div
          style={{
            display: "flex",
            flexDirection: "column",
            height: "100%",
            padding: "2rem 3rem",
            boxSizing: "border-box",
          }}
        >

          <h1
            style={{
              margin: 0,
              color: "#582c83",
              fontSize: "2.75rem",
            }}
          >
            {slidesData.slideOne.title.toUpperCase()}
          </h1>

          <div
            style={{
              marginTop: "0.75rem",
              height: "3px",
              width: "100%",
              backgroundColor: "#e2e8f0",
              borderRadius: "2px",
            }}
          />

          <div
            style={{
              flex: 1,
              display: "flex",
              alignItems: "flex-start",
              justifyContent: "center",
              gap: "2rem",
              padding: "2rem 0",
            }}
          >

            <div
              style={{
                flex: 1,
                minHeight: "280px",
                height: "auto",
                backgroundColor: "#f1f3f5",
                borderRadius: "12px",
                padding: "2rem",
                boxSizing: "border-box",
                display: "flex",
                flexDirection: "column",
                justifyContent: "flex-start",
                boxShadow: "0 2px 8px rgba(0,0,0,0.08)",
              }}
            >
              <h2
                style={{
                  margin: 0,
                  color: "#582c83",
                  fontSize: "1.5rem",
                }}
              >
                1.1
              </h2>

              <p
                style={{
                  marginTop: "1rem",
                  marginBottom: 0,
                  color: "#374151",
                  fontSize: "1.2rem",
                  lineHeight: 1.6,
                }}
              >
                {slidesData.slideOne.oneOne}
              </p>
            </div>

          </div>
        </div>
      </>
    ),
  },
  {
    title: slidesData.slideTwo.title,
    content: (
      <>
        <div
            style={{
                display: "flex",
                flexDirection: "column",
                height: "100%",
                padding: "2rem 3rem",
                boxSizing: "border-box",
                backgroundColor: "#ffffff",
            }}
            >
            <div>
                <h1
                style={{
                    margin: 0,
                    color: "#582c83",
                    fontSize: "2.75rem",
                    letterSpacing: "-0.02em",
                }}
                >
                {slidesData.slideTwo.title.toUpperCase()}
                </h1>

                <div
                style={{
                    marginTop: "0.75rem",
                    height: "3px",
                    width: "100%",
                    backgroundColor: "#e2e8f0",
                    borderRadius: "2px",
                }}
                />
            </div>

            <div
                style={{
                flex: 1,
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                padding: "1.5rem 0 0.5rem",
                }}
            >
                <div
                style={{
                    display: "flex",
                    gap: "1rem",
                    paddingBottom: "1.25rem",
                    borderBottom: "1px solid #e5e7eb",
                }}
                >
                <div
                    style={{
                    flexShrink: 0,
                    width: "48px",
                    height: "48px",
                    borderRadius: "10px",
                    backgroundColor: "#582c83",
                    color: "#ffffff",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontSize: "0.95rem",
                    fontWeight: 700,
                    }}
                >
                    2.1
                </div>

                <div style={{ flex: 1 }}>
                    <h2
                    style={{
                        margin: "0 0 0.5rem",
                        color: "#582c83",
                        fontSize: "1.3rem",
                        fontWeight: 700,
                    }}
                    >
                    Disability
                    </h2>

                    <p
                    style={{
                        margin: 0,
                        color: "#374151",
                        fontSize: "1rem",
                        lineHeight: 1.5,
                    }}
                    >
                    {slidesData.slideTwo.twoOne.replace("Disability: ", "")}
                    </p>
                </div>
                </div>

                <div
                style={{
                    marginTop: "1.25rem",
                    marginLeft: "64px",
                    display: "grid",
                    gridTemplateColumns: "1fr 1fr",
                    columnGap: "3rem",
                    rowGap: "0.75rem",
                }}
                >
                {[
                    ["2.1.1", slidesData.slideTwo.twoOneOne],
                    ["2.1.2", slidesData.slideTwo.twoOneTwo],
                    ["2.1.3", slidesData.slideTwo.twoOneThree],
                    ["2.1.4", slidesData.slideTwo.twoOneFour],
                    ["2.1.5", slidesData.slideTwo.twoOneFive],
                    ["2.1.6", slidesData.slideTwo.twoOneSix],
                    ["2.1.7", slidesData.slideTwo.twoOneSeven],
                    ["2.1.8", slidesData.slideTwo.twoOneEight],
                ].map(([number, definition]) => (
                    <div
                    key={number}
                    style={{
                        display: "flex",
                        alignItems: "flex-start",
                        gap: "0.75rem",
                        padding: "0.6rem 0",
                    }}
                    >
                    <div
                        style={{
                        flexShrink: 0,
                        color: "#582c83",
                        fontSize: "0.85rem",
                        fontWeight: 700,
                        minWidth: "42px",
                        paddingTop: "0.1rem",
                        }}
                    >
                        {number}
                    </div>

                    <p
                        style={{
                        margin: 0,
                        color: "#374151",
                        fontSize: "0.95rem",
                        lineHeight: 1.45,
                        }}
                    >
                        {definition}
                    </p>
                    </div>
                ))}
                </div>
            </div>
            </div>
      </>
    ),
  },
  {
    title: slidesData.slideThree.title,
    content: (
      <>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            height: "100%",
            padding: "2rem 3rem",
            boxSizing: "border-box",
          }}
        >

          <h1
            style={{
              margin: 0,
              color: "#582c83",
              fontSize: "2.75rem",
            }}
          >
            {slidesData.slideThree.title.toUpperCase()}
          </h1>

          <div
            style={{
              marginTop: "0.75rem",
              height: "3px",
              width: "100%",
              backgroundColor: "#e2e8f0",
              borderRadius: "2px",
            }}
          />

          <div
            style={{
              flex: 1,
              display: "flex",
              alignItems: "flex-start",
              justifyContent: "center",
              gap: "2rem",
              padding: "2rem 0",
            }}
          >

            <div
              style={{
                flex: 1,
                minHeight: "280px",
                height: "auto",
                backgroundColor: "#f1f3f5",
                borderRadius: "12px",
                padding: "2rem",
                boxSizing: "border-box",
                display: "flex",
                flexDirection: "column",
                justifyContent: "flex-start",
                boxShadow: "0 2px 8px rgba(0,0,0,0.08)",
              }}
            >
              <h2
                style={{
                  margin: 0,
                  color: "#582c83",
                  fontSize: "1.5rem",
                }}
              >
                3.1
              </h2>

              <p
                style={{
                  marginTop: "1rem",
                  marginBottom: 0,
                  color: "#374151",
                  fontSize: "1.2rem",
                  lineHeight: 1.6,
                }}
              >
                {slidesData.slideThree.threeOne}
              </p>
            </div>

            <div
              style={{
                flex: 1,
                minHeight: "280px",
                height: "auto",
                backgroundColor: "#f1f3f5",
                borderRadius: "12px",
                padding: "2rem",
                boxSizing: "border-box",
                display: "flex",
                flexDirection: "column",
                justifyContent: "flex-start",
                boxShadow: "0 2px 8px rgba(0,0,0,0.08)",
              }}
            >
              <h2
                style={{
                  margin: 0,
                  color: "#582c83",
                  fontSize: "1.5rem",
                }}
              >
                3.2
              </h2>

              <p
                style={{
                  marginTop: "1rem",
                  marginBottom: 0,
                  color: "#374151",
                  fontSize: "1.2rem",
                  lineHeight: 1.6,
                }}
              >
                {slidesData.slideThree.threeTwo}
              </p>
            </div>

            <div
              style={{
                flex: 1,
                minHeight: "280px",
                height: "auto",
                backgroundColor: "#f1f3f5",
                borderRadius: "12px",
                padding: "2rem",
                boxSizing: "border-box",
                display: "flex",
                flexDirection: "column",
                justifyContent: "flex-start",
                boxShadow: "0 2px 8px rgba(0,0,0,0.08)",
              }}
            >
              <h2
                style={{
                  margin: 0,
                  color: "#582c83",
                  fontSize: "1.5rem",
                }}
              >
                3.3
              </h2>

              <p
                style={{
                  marginTop: "1rem",
                  marginBottom: 0,
                  color: "#374151",
                  fontSize: "1.2rem",
                  lineHeight: 1.6,
                }}
              >
                {slidesData.slideThree.threeThree}
              </p>
            </div>

          </div>
        </div>
      </>
    ),
  },
  {
    title: slidesData.slideFour.title,
    content: (
      <>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            height: "100%",
            padding: "2rem 3rem",
            boxSizing: "border-box",
          }}
        >

          <h1
            style={{
              margin: 0,
              color: "#582c83",
              fontSize: "2.75rem",
            }}
          >
            {slidesData.slideFour.title.toUpperCase()}
          </h1>

          <div
            style={{
              marginTop: "0.75rem",
              height: "3px",
              width: "100%",
              backgroundColor: "#e2e8f0",
              borderRadius: "2px",
            }}
          />

          <div
            style={{
              flex: 1,
              display: "flex",
              alignItems: "flex-start",
              justifyContent: "center",
              gap: "2rem",
              padding: "2rem 0",
            }}
          >

            <div
              style={{
                flex: 1,
                minHeight: "280px",
                height: "auto",
                backgroundColor: "#f1f3f5",
                borderRadius: "12px",
                padding: "2rem",
                boxSizing: "border-box",
                display: "flex",
                flexDirection: "column",
                justifyContent: "flex-start",
                boxShadow: "0 2px 8px rgba(0,0,0,0.08)",
              }}
            >
              <h2
                style={{
                  margin: 0,
                  color: "#582c83",
                  fontSize: "1.5rem",
                }}
              >
                4.1
              </h2>

              <p
                style={{
                  marginTop: "1rem",
                  marginBottom: 0,
                  color: "#374151",
                  fontSize: "1.2rem",
                  lineHeight: 1.6,
                }}
              >
                {slidesData.slideFour.fourOne}
              </p>
            </div>

            <div
              style={{
                flex: 1,
                minHeight: "280px",
                height: "auto",
                backgroundColor: "#f1f3f5",
                borderRadius: "12px",
                padding: "2rem",
                boxSizing: "border-box",
                display: "flex",
                flexDirection: "column",
                justifyContent: "flex-start",
                boxShadow: "0 2px 8px rgba(0,0,0,0.08)",
              }}
            >
              <h2
                style={{
                  margin: 0,
                  color: "#582c83",
                  fontSize: "1.5rem",
                }}
              >
                4.2
              </h2>

              <p
                style={{
                  marginTop: "1rem",
                  marginBottom: 0,
                  color: "#374151",
                  fontSize: "1.2rem",
                  lineHeight: 1.6,
                }}
              >
                {slidesData.slideFour.fourTwo}
              </p>
            </div>

            <div
              style={{
                flex: 1,
                minHeight: "280px",
                height: "auto",
                backgroundColor: "#f1f3f5",
                borderRadius: "12px",
                padding: "2rem",
                boxSizing: "border-box",
                display: "flex",
                flexDirection: "column",
                justifyContent: "flex-start",
                boxShadow: "0 2px 8px rgba(0,0,0,0.08)",
              }}
            >
              <h2
                style={{
                  margin: 0,
                  color: "#582c83",
                  fontSize: "1.5rem",
                }}
              >
                4.3
              </h2>

              <p
                style={{
                  marginTop: "1rem",
                  marginBottom: 0,
                  color: "#374151",
                  fontSize: "1.2rem",
                  lineHeight: 1.6,
                }}
              >
                {slidesData.slideFour.fourThree}
              </p>
            </div>

            <div
              style={{
                flex: 1,
                minHeight: "280px",
                height: "auto",
                backgroundColor: "#f1f3f5",
                borderRadius: "12px",
                padding: "2rem",
                boxSizing: "border-box",
                display: "flex",
                flexDirection: "column",
                justifyContent: "flex-start",
                boxShadow: "0 2px 8px rgba(0,0,0,0.08)",
              }}
            >
              <h2
                style={{
                  margin: 0,
                  color: "#582c83",
                  fontSize: "1.5rem",
                }}
              >
                4.4
              </h2>

              <p
                style={{
                  marginTop: "1rem",
                  marginBottom: 0,
                  color: "#374151",
                  fontSize: "1.2rem",
                  lineHeight: 1.6,
                }}
              >
                {slidesData.slideFour.fourFour}
              </p>
            </div>

          </div>
        </div>
      </>
    ),
  },
  {
    title: slidesData.slideFive.title,
    content: (
      <>
        <div
        style={{
            display: "flex",
            flexDirection: "column",
            height: "100%",
            padding: "2rem 3rem",
            boxSizing: "border-box",
        }}
        >
        <h1
            style={{
            margin: 0,
            color: "#582c83",
            fontSize: "2.75rem",
            }}
        >
            {slidesData.slideFive.title.toUpperCase()}
        </h1>

        <div
            style={{
            marginTop: "0.75rem",
            height: "3px",
            width: "100%",
            backgroundColor: "#e2e8f0",
            borderRadius: "2px",
            }}
        />

        <div
            style={{
            flex: 1,
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            gap: "1.25rem",
            padding: "1.5rem 0 0.5rem",
            }}
        >
            <div
            style={{
                display: "flex",
                gap: "1.25rem",
                padding: "1.25rem 1.5rem",
                backgroundColor: "#f8f7fa",
                borderLeft: "5px solid #582c83",
                borderRadius: "0 10px 10px 0",
                boxSizing: "border-box",
            }}
            >
            <div
                style={{
                flexShrink: 0,
                width: "52px",
                height: "52px",
                borderRadius: "10px",
                backgroundColor: "#582c83",
                color: "#ffffff",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: "1rem",
                fontWeight: 700,
                }}
            >
                5.1
            </div>

            <div
                style={{
                flex: 1,
                display: "flex",
                flexDirection: "column",
                }}
            >
                <h2
                style={{
                    margin: 0,
                    color: "#582c83",
                    fontSize: "1.3rem",
                    fontWeight: 700,
                }}
                >
                {slidesData.slideFive.fiveOne}
                </h2>

                <div
                style={{
                    marginTop: "0.65rem",
                    display: "flex",
                    gap: "0.75rem",
                    alignItems: "flex-start",
                }}
                >
                <span
                    style={{
                    flexShrink: 0,
                    color: "#6b7280",
                    fontSize: "0.8rem",
                    fontWeight: 700,
                    paddingTop: "0.15rem",
                    }}
                >
                    5.1.1
                </span>

                <p
                    style={{
                    margin: 0,
                    color: "#374151",
                    fontSize: "1.05rem",
                    lineHeight: 1.5,
                    }}
                >
                    {slidesData.slideFive.fiveOneOne}
                </p>
                </div>

                <div
                style={{
                    marginTop: "0.65rem",
                    display: "flex",
                    gap: "0.75rem",
                    alignItems: "flex-start",
                }}
                >
                <span
                    style={{
                    flexShrink: 0,
                    color: "#6b7280",
                    fontSize: "0.8rem",
                    fontWeight: 700,
                    paddingTop: "0.15rem",
                    }}
                >
                    5.1.2
                </span>

                <p
                    style={{
                    margin: 0,
                    color: "#374151",
                    fontSize: "1.05rem",
                    lineHeight: 1.5,
                    }}
                >
                    {slidesData.slideFive.fiveOneTwo}
                </p>
                </div>

                <div
                style={{
                    marginTop: "0.65rem",
                    display: "flex",
                    gap: "0.75rem",
                    alignItems: "flex-start",
                }}
                >
                <span
                    style={{
                    flexShrink: 0,
                    color: "#6b7280",
                    fontSize: "0.8rem",
                    fontWeight: 700,
                    paddingTop: "0.15rem",
                    }}
                >
                    5.1.3
                </span>

                <div
                    style={{
                    flex: 1,
                    color: "#374151",
                    fontSize: "1.05rem",
                    lineHeight: 1.5,
                    }}
                >
                    <p
                    style={{
                        margin: 0,
                        marginBottom: "0.75rem",
                    }}
                    >
                    {slidesData.slideFive.fiveOneThree.intro}
                    </p>

                    <ol
                    style={{
                        margin: 0,
                        paddingLeft: "1.5rem",
                    }}
                    >
                    {slidesData.slideFive.fiveOneThree.items.map(
                        (item, index) => (
                        <li
                            key={index}
                            style={{
                            paddingLeft: "0.35rem",
                            marginBottom:
                                index ===
                                slidesData.slideFive.fiveOneThree.items.length - 1
                                ? 0
                                : "0.4rem",
                            }}
                        >
                            {item}
                        </li>
                        )
                    )}
                    </ol>
                </div>
                </div>

                <div
                style={{
                    marginTop: "0.65rem",
                    display: "flex",
                    gap: "0.75rem",
                    alignItems: "flex-start",
                }}
                >
                <span
                    style={{
                    flexShrink: 0,
                    color: "#6b7280",
                    fontSize: "0.8rem",
                    fontWeight: 700,
                    paddingTop: "0.15rem",
                    }}
                >
                    5.1.4
                </span>

                <p
                    style={{
                    margin: 0,
                    color: "#374151",
                    fontSize: "1.05rem",
                    lineHeight: 1.5,
                    }}
                >
                    {slidesData.slideFive.fiveOneFour}
                </p>
                </div>

                <div
                style={{
                    marginTop: "0.65rem",
                    display: "flex",
                    gap: "0.75rem",
                    alignItems: "flex-start",
                }}
                >
                <span
                    style={{
                    flexShrink: 0,
                    color: "#6b7280",
                    fontSize: "0.8rem",
                    fontWeight: 700,
                    paddingTop: "0.15rem",
                    }}
                >
                    5.1.5
                </span>

                <p
                    style={{
                    margin: 0,
                    color: "#374151",
                    fontSize: "1.05rem",
                    lineHeight: 1.5,
                    }}
                >
                    {slidesData.slideFive.fiveOneFive}
                </p>
                </div>
            </div>
            </div>

        </div>
        </div>
      </>
    ),
  },
  {
    title: slidesData.slideFiveContinued.title,
    content: (
      <>
        <div
        style={{
            display: "flex",
            flexDirection: "column",
            height: "100%",
            padding: "2rem 3rem",
            boxSizing: "border-box",
        }}
        >
        <h1
            style={{
            margin: 0,
            color: "#582c83",
            fontSize: "2.75rem",
            }}
        >
            {slidesData.slideFive.title.toUpperCase()}
        </h1>

        <div
            style={{
            marginTop: "0.75rem",
            height: "3px",
            width: "100%",
            backgroundColor: "#e2e8f0",
            borderRadius: "2px",
            }}
        />

        <div
            style={{
            flex: 1,
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            gap: "1.25rem",
            padding: "1.5rem 0 0.5rem",
            }}
        >
            <div
            style={{
                display: "flex",
                gap: "1.25rem",
                padding: "1.25rem 1.5rem",
                backgroundColor: "#f8f7fa",
                borderLeft: "5px solid #582c83",
                borderRadius: "0 10px 10px 0",
                boxSizing: "border-box",
            }}
            >
            <div
                style={{
                flexShrink: 0,
                width: "52px",
                height: "52px",
                borderRadius: "10px",
                backgroundColor: "#582c83",
                color: "#ffffff",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: "1rem",
                fontWeight: 700,
                }}
            >
                5.2
            </div>

            <div
                style={{
                flex: 1,
                display: "flex",
                flexDirection: "column",
                }}
            >
                <h2
                style={{
                    margin: 0,
                    color: "#582c83",
                    fontSize: "1.3rem",
                    fontWeight: 700,
                }}
                >
                {slidesData.slideFiveContinued.fiveTwo}
                </h2>

                <div
                style={{
                    marginTop: "0.65rem",
                    display: "flex",
                    gap: "0.75rem",
                    alignItems: "flex-start",
                }}
                >
                <span
                    style={{
                    flexShrink: 0,
                    color: "#6b7280",
                    fontSize: "0.8rem",
                    fontWeight: 700,
                    paddingTop: "0.15rem",
                    }}
                >
                    5.2.1
                </span>

                <p
                    style={{
                    margin: 0,
                    color: "#374151",
                    fontSize: "1.05rem",
                    lineHeight: 1.5,
                    }}
                >
                    {slidesData.slideFiveContinued.fiveTwoOne}
                </p>
                </div>

                <div
                style={{
                    marginTop: "0.65rem",
                    display: "flex",
                    gap: "0.75rem",
                    alignItems: "flex-start",
                }}
                >
                <span
                    style={{
                    flexShrink: 0,
                    color: "#6b7280",
                    fontSize: "0.8rem",
                    fontWeight: 700,
                    paddingTop: "0.15rem",
                    }}
                >
                    5.2.2
                </span>

                <p
                    style={{
                    margin: 0,
                    color: "#374151",
                    fontSize: "1.05rem",
                    lineHeight: 1.5,
                    }}
                >
                    {slidesData.slideFiveContinued.fiveTwoTwo}
                </p>
                </div>

                <div
                style={{
                    marginTop: "0.65rem",
                    display: "flex",
                    gap: "0.75rem",
                    alignItems: "flex-start",
                }}
                >
                <span
                    style={{
                    flexShrink: 0,
                    color: "#6b7280",
                    fontSize: "0.8rem",
                    fontWeight: 700,
                    paddingTop: "0.15rem",
                    }}
                >
                    5.2.3
                </span>

                <p
                    style={{
                    margin: 0,
                    color: "#374151",
                    fontSize: "1.05rem",
                    lineHeight: 1.5,
                    }}
                >
                    {slidesData.slideFiveContinued.fiveTwoThree}
                </p>
                </div>

                <div
                style={{
                    marginTop: "0.65rem",
                    display: "flex",
                    gap: "0.75rem",
                    alignItems: "flex-start",
                }}
                >
                <span
                    style={{
                    flexShrink: 0,
                    color: "#6b7280",
                    fontSize: "0.8rem",
                    fontWeight: 700,
                    paddingTop: "0.15rem",
                    }}
                >
                    5.2.4
                </span>

                <p
                    style={{
                    margin: 0,
                    color: "#374151",
                    fontSize: "1.05rem",
                    lineHeight: 1.5,
                    }}
                >
                    {slidesData.slideFiveContinued.fiveTwoFour}
                </p>
                </div>
            </div>
            </div>

            <div
            style={{
                display: "flex",
                gap: "1.25rem",
                padding: "1.25rem 1.5rem",
                backgroundColor: "#f8f7fa",
                borderLeft: "5px solid #582c83",
                borderRadius: "0 10px 10px 0",
                boxSizing: "border-box",
            }}
            >
            <div
                style={{
                flexShrink: 0,
                width: "52px",
                height: "52px",
                borderRadius: "10px",
                backgroundColor: "#582c83",
                color: "#ffffff",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: "1rem",
                fontWeight: 700,
                }}
            >
                5.3
            </div>

            <div
                style={{
                flex: 1,
                display: "flex",
                flexDirection: "column",
                }}
            >
                <h2
                style={{
                    margin: 0,
                    color: "#582c83",
                    fontSize: "1.3rem",
                    fontWeight: 700,
                }}
                >
                {slidesData.slideFiveContinued.fiveThree}
                </h2>

                <div
                style={{
                    marginTop: "0.65rem",
                    display: "flex",
                    gap: "0.75rem",
                    alignItems: "flex-start",
                }}
                >
                <span
                    style={{
                    flexShrink: 0,
                    color: "#6b7280",
                    fontSize: "0.8rem",
                    fontWeight: 700,
                    paddingTop: "0.15rem",
                    }}
                >
                    5.3.1
                </span>

                <p
                    style={{
                    margin: 0,
                    color: "#374151",
                    fontSize: "1.05rem",
                    lineHeight: 1.5,
                    }}
                >
                    {slidesData.slideFiveContinued.fiveThreeOne}
                </p>
                </div>

                <div
                style={{
                    marginTop: "0.65rem",
                    display: "flex",
                    gap: "0.75rem",
                    alignItems: "flex-start",
                }}
                >
                <span
                    style={{
                    flexShrink: 0,
                    color: "#6b7280",
                    fontSize: "0.8rem",
                    fontWeight: 700,
                    paddingTop: "0.15rem",
                    }}
                >
                    5.3.2
                </span>

                <p
                    style={{
                    margin: 0,
                    color: "#374151",
                    fontSize: "1.05rem",
                    lineHeight: 1.5,
                    }}
                >
                    {slidesData.slideFiveContinued.fiveThreeTwo}
                </p>
                </div>

            </div>
            </div>

        </div>
        </div>
      </>
    ),
  },
  {
    title: slidesData.slideFiveContinuedTwo.title,
    content: (
      <>
        <div
        style={{
            display: "flex",
            flexDirection: "column",
            height: "100%",
            padding: "2rem 3rem",
            boxSizing: "border-box",
        }}
        >
        <h1
            style={{
            margin: 0,
            color: "#582c83",
            fontSize: "2.75rem",
            }}
        >
            {slidesData.slideFiveContinuedTwo.title.toUpperCase()}
        </h1>

        <div
            style={{
            marginTop: "0.75rem",
            height: "3px",
            width: "100%",
            backgroundColor: "#e2e8f0",
            borderRadius: "2px",
            }}
        />

        <div
            style={{
            flex: 1,
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            gap: "1.25rem",
            padding: "1.5rem 0 0.5rem",
            }}
        >
            <div
            style={{
                display: "flex",
                gap: "1.25rem",
                padding: "1.25rem 1.5rem",
                backgroundColor: "#f8f7fa",
                borderLeft: "5px solid #582c83",
                borderRadius: "0 10px 10px 0",
                boxSizing: "border-box",
            }}
            >
            <div
                style={{
                flexShrink: 0,
                width: "52px",
                height: "52px",
                borderRadius: "10px",
                backgroundColor: "#582c83",
                color: "#ffffff",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: "1rem",
                fontWeight: 700,
                }}
            >
                5.4
            </div>

            <div
                style={{
                flex: 1,
                display: "flex",
                flexDirection: "column",
                }}
            >
                <h2
                style={{
                    margin: 0,
                    color: "#582c83",
                    fontSize: "1.3rem",
                    fontWeight: 700,
                }}
                >
                {slidesData.slideFiveContinuedTwo.fiveFour}
                </h2>

                <div
                style={{
                    marginTop: "0.65rem",
                    display: "flex",
                    gap: "0.75rem",
                    alignItems: "flex-start",
                }}
                >
                <span
                    style={{
                    flexShrink: 0,
                    color: "#6b7280",
                    fontSize: "0.8rem",
                    fontWeight: 700,
                    paddingTop: "0.15rem",
                    }}
                >
                    5.4.1
                </span>

                <p
                    style={{
                    margin: 0,
                    color: "#374151",
                    fontSize: "1.05rem",
                    lineHeight: 1.5,
                    }}
                >
                    {slidesData.slideFiveContinuedTwo.fiveFourOne}
                </p>
                </div>

                <div
                style={{
                    marginTop: "0.65rem",
                    display: "flex",
                    gap: "0.75rem",
                    alignItems: "flex-start",
                }}
                >
                <span
                    style={{
                    flexShrink: 0,
                    color: "#6b7280",
                    fontSize: "0.8rem",
                    fontWeight: 700,
                    paddingTop: "0.15rem",
                    }}
                >
                    5.4.2
                </span>

                <p
                    style={{
                    margin: 0,
                    color: "#374151",
                    fontSize: "1.05rem",
                    lineHeight: 1.5,
                    }}
                >
                    {slidesData.slideFiveContinuedTwo.fiveFourTwo}
                </p>
                </div>

                <div
                style={{
                    marginTop: "0.65rem",
                    display: "flex",
                    gap: "0.75rem",
                    alignItems: "flex-start",
                }}
                >
                <span
                    style={{
                    flexShrink: 0,
                    color: "#6b7280",
                    fontSize: "0.8rem",
                    fontWeight: 700,
                    paddingTop: "0.15rem",
                    }}
                >
                    5.4.3
                </span>

                <p
                    style={{
                    margin: 0,
                    color: "#374151",
                    fontSize: "1.05rem",
                    lineHeight: 1.5,
                    }}
                >
                    {slidesData.slideFiveContinuedTwo.fiveFourThree}
                </p>
                </div>

                <div
                style={{
                    marginTop: "0.65rem",
                    display: "flex",
                    gap: "0.75rem",
                    alignItems: "flex-start",
                }}
                >
                <span
                    style={{
                    flexShrink: 0,
                    color: "#6b7280",
                    fontSize: "0.8rem",
                    fontWeight: 700,
                    paddingTop: "0.15rem",
                    }}
                >
                    5.4.4
                </span>

                <div
                    style={{
                    flex: 1,
                    color: "#374151",
                    fontSize: "1.05rem",
                    lineHeight: 1.5,
                    }}
                >
                    <p
                    style={{
                        margin: 0,
                        marginBottom: "0.75rem",
                    }}
                    >
                    {slidesData.slideFiveContinuedTwo.fiveFourFour.intro}
                    </p>

                    <ol
                    style={{
                        margin: 0,
                        paddingLeft: "1.5rem",
                    }}
                    >
                    {slidesData.slideFiveContinuedTwo.fiveFourFour.items.map(
                        (item, index) => (
                        <li
                            key={index}
                            style={{
                            paddingLeft: "0.35rem",
                            marginBottom:
                                index ===
                                slidesData.slideFiveContinuedTwo.fiveFourFour.items.length - 1
                                ? 0
                                : "0.4rem",
                            }}
                        >
                            {item}
                        </li>
                        )
                    )}
                    </ol>
                </div>
                </div>

                 <div
                style={{
                    marginTop: "0.65rem",
                    display: "flex",
                    gap: "0.75rem",
                    alignItems: "flex-start",
                }}
                >
                <span
                    style={{
                    flexShrink: 0,
                    color: "#6b7280",
                    fontSize: "0.8rem",
                    fontWeight: 700,
                    paddingTop: "0.15rem",
                    }}
                >
                    5.4.5
                </span>

                <div
                    style={{
                    flex: 1,
                    color: "#374151",
                    fontSize: "1.05rem",
                    lineHeight: 1.5,
                    }}
                >
                    <p
                    style={{
                        margin: 0,
                        marginBottom: "0.75rem",
                    }}
                    >
                    {slidesData.slideFiveContinuedTwo.fiveFourFive.intro}
                    </p>

                    <ol
                    style={{
                        margin: 0,
                        paddingLeft: "1.5rem",
                    }}
                    >
                    {slidesData.slideFiveContinuedTwo.fiveFourFive.items.map(
                        (item, index) => (
                        <li
                            key={index}
                            style={{
                            paddingLeft: "0.35rem",
                            marginBottom:
                                index ===
                                slidesData.slideFiveContinuedTwo.fiveFourFive.items.length - 1
                                ? 0
                                : "0.4rem",
                            }}
                        >
                            {item}
                        </li>
                        )
                    )}
                    </ol>
                </div>
                </div>
            </div>
            </div>

        </div>
        </div>
      </>
    ),
  },
  {
    title: slidesData.slideFiveContinuedThree.title,
    content: (
      <>
        <div
        style={{
            display: "flex",
            flexDirection: "column",
            height: "100%",
            padding: "2rem 3rem",
            boxSizing: "border-box",
        }}
        >
        <h1
            style={{
            margin: 0,
            color: "#582c83",
            fontSize: "2.75rem",
            }}
        >
            {slidesData.slideFiveContinuedThree.title.toUpperCase()}
        </h1>

        <div
            style={{
            marginTop: "0.75rem",
            height: "3px",
            width: "100%",
            backgroundColor: "#e2e8f0",
            borderRadius: "2px",
            }}
        />

        <div
            style={{
            flex: 1,
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            gap: "1.25rem",
            padding: "1.5rem 0 0.5rem",
            }}
        >
            <div
            style={{
                display: "flex",
                gap: "1.25rem",
                padding: "1.25rem 1.5rem",
                backgroundColor: "#f8f7fa",
                borderLeft: "5px solid #582c83",
                borderRadius: "0 10px 10px 0",
                boxSizing: "border-box",
            }}
            >
            <div
                style={{
                flexShrink: 0,
                width: "52px",
                height: "52px",
                borderRadius: "10px",
                backgroundColor: "#582c83",
                color: "#ffffff",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: "1rem",
                fontWeight: 700,
                }}
            >
                5.5
            </div>

            <div
                style={{
                flex: 1,
                display: "flex",
                flexDirection: "column",
                }}
            >
                <h2
                style={{
                    margin: 0,
                    color: "#582c83",
                    fontSize: "1.3rem",
                    fontWeight: 700,
                }}
                >
                {slidesData.slideFiveContinuedThree.fiveFive}
                </h2>

                <div
                style={{
                    marginTop: "0.65rem",
                    display: "flex",
                    gap: "0.75rem",
                    alignItems: "flex-start",
                }}
                >
                <span
                    style={{
                    flexShrink: 0,
                    color: "#6b7280",
                    fontSize: "0.8rem",
                    fontWeight: 700,
                    paddingTop: "0.15rem",
                    }}
                >
                    5.5.1
                </span>

                <p
                    style={{
                    margin: 0,
                    color: "#374151",
                    fontSize: "1.05rem",
                    lineHeight: 1.5,
                    }}
                >
                    {slidesData.slideFiveContinuedThree.fiveFiveOne}
                </p>
                </div>

                <div
                style={{
                    marginTop: "0.65rem",
                    display: "flex",
                    gap: "0.75rem",
                    alignItems: "flex-start",
                }}
                >
                <span
                    style={{
                    flexShrink: 0,
                    color: "#6b7280",
                    fontSize: "0.8rem",
                    fontWeight: 700,
                    paddingTop: "0.15rem",
                    }}
                >
                    5.5.2
                </span>

                <p
                    style={{
                    margin: 0,
                    color: "#374151",
                    fontSize: "1.05rem",
                    lineHeight: 1.5,
                    }}
                >
                    {slidesData.slideFiveContinuedThree.fiveFiveTwo}
                </p>
                </div>

                <div
                style={{
                    marginTop: "0.65rem",
                    display: "flex",
                    gap: "0.75rem",
                    alignItems: "flex-start",
                }}
                >
                <span
                    style={{
                    flexShrink: 0,
                    color: "#6b7280",
                    fontSize: "0.8rem",
                    fontWeight: 700,
                    paddingTop: "0.15rem",
                    }}
                >
                    5.5.3
                </span>

                <p
                    style={{
                    margin: 0,
                    color: "#374151",
                    fontSize: "1.05rem",
                    lineHeight: 1.5,
                    }}
                >
                    {slidesData.slideFiveContinuedThree.fiveFiveThree}
                </p>
                </div>

                <div
                style={{
                    marginTop: "0.65rem",
                    display: "flex",
                    gap: "0.75rem",
                    alignItems: "flex-start",
                }}
                >
                <span
                    style={{
                    flexShrink: 0,
                    color: "#6b7280",
                    fontSize: "0.8rem",
                    fontWeight: 700,
                    paddingTop: "0.15rem",
                    }}
                >
                    5.5.4
                </span>

                <div
                    style={{
                    flex: 1,
                    color: "#374151",
                    fontSize: "1.05rem",
                    lineHeight: 1.5,
                    }}
                >
                    <p
                    style={{
                        margin: 0,
                        marginBottom: "0.75rem",
                    }}
                    >
                    {slidesData.slideFiveContinuedThree.fiveFiveFour.intro}
                    </p>

                    <ol
                    style={{
                        margin: 0,
                        paddingLeft: "1.5rem",
                    }}
                    >
                    {slidesData.slideFiveContinuedThree.fiveFiveFour.items.map(
                        (item, index) => (
                        <li
                            key={index}
                            style={{
                            paddingLeft: "0.35rem",
                            marginBottom:
                                index ===
                                slidesData.slideFiveContinuedThree.fiveFiveFour.items.length - 1
                                ? 0
                                : "0.4rem",
                            }}
                        >
                            {item}
                        </li>
                        )
                    )}
                    </ol>
                </div>
                </div>

                 <div
                style={{
                    marginTop: "0.65rem",
                    display: "flex",
                    gap: "0.75rem",
                    alignItems: "flex-start",
                }}
                >
                <span
                    style={{
                    flexShrink: 0,
                    color: "#6b7280",
                    fontSize: "0.8rem",
                    fontWeight: 700,
                    paddingTop: "0.15rem",
                    }}
                >
                    5.5.5
                </span>

                <div
                    style={{
                    flex: 1,
                    color: "#374151",
                    fontSize: "1.05rem",
                    lineHeight: 1.5,
                    }}
                >
                    <p
                    style={{
                        margin: 0,
                        marginBottom: "0.75rem",
                    }}
                    >
                    {slidesData.slideFiveContinuedThree.fiveFiveFive.intro}
                    </p>

                    <ol
                    style={{
                        margin: 0,
                        paddingLeft: "1.5rem",
                    }}
                    >
                    {slidesData.slideFiveContinuedThree.fiveFiveFive.items.map(
                        (item, index) => (
                        <li
                            key={index}
                            style={{
                            paddingLeft: "0.35rem",
                            marginBottom:
                                index ===
                                slidesData.slideFiveContinuedThree.fiveFiveFive.items.length - 1
                                ? 0
                                : "0.4rem",
                            }}
                        >
                            {item}
                        </li>
                        )
                    )}
                    </ol>
                </div>
                </div>

                <div
                style={{
                    marginTop: "0.65rem",
                    display: "flex",
                    gap: "0.75rem",
                    alignItems: "flex-start",
                }}
                >
                <span
                    style={{
                    flexShrink: 0,
                    color: "#6b7280",
                    fontSize: "0.8rem",
                    fontWeight: 700,
                    paddingTop: "0.15rem",
                    }}
                >
                    5.5.6
                </span>

                <p
                    style={{
                    margin: 0,
                    color: "#374151",
                    fontSize: "1.05rem",
                    lineHeight: 1.5,
                    }}
                >
                    {slidesData.slideFiveContinuedThree.fiveFiveSix}
                </p>
                </div>
            </div>
            </div>

        </div>
        </div>
      </>
    ),
  },
  {
    title: slidesData.slideFiveContinuedFour.title,
    content: (
      <>
        <div
        style={{
            display: "flex",
            flexDirection: "column",
            height: "100%",
            padding: "2rem 3rem",
            boxSizing: "border-box",
        }}
        >
        <h1
            style={{
            margin: 0,
            color: "#582c83",
            fontSize: "2.75rem",
            }}
        >
            {slidesData.slideFiveContinuedFour.title.toUpperCase()}
        </h1>

        <div
            style={{
            marginTop: "0.75rem",
            height: "3px",
            width: "100%",
            backgroundColor: "#e2e8f0",
            borderRadius: "2px",
            }}
        />

        <div
            style={{
            flex: 1,
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            gap: "1.25rem",
            padding: "1.5rem 0 0.5rem",
            }}
        >
            <div
            style={{
                display: "flex",
                gap: "1.25rem",
                padding: "1.25rem 1.5rem",
                backgroundColor: "#f8f7fa",
                borderLeft: "5px solid #582c83",
                borderRadius: "0 10px 10px 0",
                boxSizing: "border-box",
            }}
            >
            <div
                style={{
                flexShrink: 0,
                width: "52px",
                height: "52px",
                borderRadius: "10px",
                backgroundColor: "#582c83",
                color: "#ffffff",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: "1rem",
                fontWeight: 700,
                }}
            >
                5.6
            </div>

            <div
                style={{
                flex: 1,
                display: "flex",
                flexDirection: "column",
                }}
            >
                <h2
                style={{
                    margin: 0,
                    color: "#582c83",
                    fontSize: "1.3rem",
                    fontWeight: 700,
                }}
                >
                {slidesData.slideFiveContinuedFour.fiveSix}
                </h2>

                <div
                style={{
                    marginTop: "0.65rem",
                    display: "flex",
                    gap: "0.75rem",
                    alignItems: "flex-start",
                }}
                >
                <span
                    style={{
                    flexShrink: 0,
                    color: "#6b7280",
                    fontSize: "0.8rem",
                    fontWeight: 700,
                    paddingTop: "0.15rem",
                    }}
                >
                    5.6.1
                </span>

                <p
                    style={{
                    margin: 0,
                    color: "#374151",
                    fontSize: "1.05rem",
                    lineHeight: 1.5,
                    }}
                >
                    {slidesData.slideFiveContinuedFour.fiveSixOne}
                </p>
                </div>

                <div
                style={{
                    marginTop: "0.65rem",
                    display: "flex",
                    gap: "0.75rem",
                    alignItems: "flex-start",
                }}
                >
                <span
                    style={{
                    flexShrink: 0,
                    color: "#6b7280",
                    fontSize: "0.8rem",
                    fontWeight: 700,
                    paddingTop: "0.15rem",
                    }}
                >
                    5.6.2
                </span>

                <p
                    style={{
                    margin: 0,
                    color: "#374151",
                    fontSize: "1.05rem",
                    lineHeight: 1.5,
                    }}
                >
                    {slidesData.slideFiveContinuedFour.fiveSixTwo}
                </p>
                </div>
            </div>
            </div>

            <div
            style={{
                display: "flex",
                gap: "1.25rem",
                padding: "1.25rem 1.5rem",
                backgroundColor: "#f8f7fa",
                borderLeft: "5px solid #582c83",
                borderRadius: "0 10px 10px 0",
                boxSizing: "border-box",
            }}
            >
            <div
                style={{
                flexShrink: 0,
                width: "52px",
                height: "52px",
                borderRadius: "10px",
                backgroundColor: "#582c83",
                color: "#ffffff",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: "1rem",
                fontWeight: 700,
                }}
            >
                5.7
            </div>

            <div
                style={{
                flex: 1,
                display: "flex",
                flexDirection: "column",
                }}
            >
                <h2
                style={{
                    margin: 0,
                    color: "#582c83",
                    fontSize: "1.3rem",
                    fontWeight: 700,
                }}
                >
                {slidesData.slideFiveContinuedFour.fiveSeven}
                </h2>

                <div
                style={{
                    marginTop: "0.65rem",
                    display: "flex",
                    gap: "0.75rem",
                    alignItems: "flex-start",
                }}
                >
                <span
                    style={{
                    flexShrink: 0,
                    color: "#6b7280",
                    fontSize: "0.8rem",
                    fontWeight: 700,
                    paddingTop: "0.15rem",
                    }}
                >
                    5.7.1
                </span>

                <p
                    style={{
                    margin: 0,
                    color: "#374151",
                    fontSize: "1.05rem",
                    lineHeight: 1.5,
                    }}
                >
                    {slidesData.slideFiveContinuedFour.fiveSevenOne}
                </p>
                </div>

                <div
                style={{
                    marginTop: "0.65rem",
                    display: "flex",
                    gap: "0.75rem",
                    alignItems: "flex-start",
                }}
                >
                <span
                    style={{
                    flexShrink: 0,
                    color: "#6b7280",
                    fontSize: "0.8rem",
                    fontWeight: 700,
                    paddingTop: "0.15rem",
                    }}
                >
                    5.7.2
                </span>

                <div
                    style={{
                    flex: 1,
                    color: "#374151",
                    fontSize: "1.05rem",
                    lineHeight: 1.5,
                    }}
                >
                    <p
                    style={{
                        margin: 0,
                        marginBottom: "0.75rem",
                    }}
                    >
                    {slidesData.slideFiveContinuedFour.fiveSevenTwo.intro}
                    </p>

                    <ol
                    style={{
                        margin: 0,
                        paddingLeft: "1.5rem",
                    }}
                    >
                    {slidesData.slideFiveContinuedFour.fiveSevenTwo.items.map(
                        (item, index) => (
                        <li
                            key={index}
                            style={{
                            paddingLeft: "0.35rem",
                            marginBottom:
                                index ===
                                slidesData.slideFiveContinuedFour.fiveSevenTwo.items.length - 1
                                ? 0
                                : "0.4rem",
                            }}
                        >
                            {item}
                        </li>
                        )
                    )}
                    </ol>
                </div>
                </div>

                <div
                style={{
                    marginTop: "0.65rem",
                    display: "flex",
                    gap: "0.75rem",
                    alignItems: "flex-start",
                }}
                >
                <span
                    style={{
                    flexShrink: 0,
                    color: "#6b7280",
                    fontSize: "0.8rem",
                    fontWeight: 700,
                    paddingTop: "0.15rem",
                    }}
                >
                    5.7.3
                </span>

                <p
                    style={{
                    margin: 0,
                    color: "#374151",
                    fontSize: "1.05rem",
                    lineHeight: 1.5,
                    }}
                >
                    {slidesData.slideFiveContinuedFour.fiveSevenThree}
                </p>
                </div>

                <div
                style={{
                    marginTop: "0.65rem",
                    display: "flex",
                    gap: "0.75rem",
                    alignItems: "flex-start",
                }}
                >
                <span
                    style={{
                    flexShrink: 0,
                    color: "#6b7280",
                    fontSize: "0.8rem",
                    fontWeight: 700,
                    paddingTop: "0.15rem",
                    }}
                >
                    5.7.4
                </span>

                <p
                    style={{
                    margin: 0,
                    color: "#374151",
                    fontSize: "1.05rem",
                    lineHeight: 1.5,
                    }}
                >
                    {slidesData.slideFiveContinuedFour.fiveSevenFour}
                </p>
                </div>

                <div
                style={{
                    marginTop: "0.65rem",
                    display: "flex",
                    gap: "0.75rem",
                    alignItems: "flex-start",
                }}
                >
                <span
                    style={{
                    flexShrink: 0,
                    color: "#6b7280",
                    fontSize: "0.8rem",
                    fontWeight: 700,
                    paddingTop: "0.15rem",
                    }}
                >
                    5.7.5
                </span>

                <p
                    style={{
                    margin: 0,
                    color: "#374151",
                    fontSize: "1.05rem",
                    lineHeight: 1.5,
                    }}
                >
                    {slidesData.slideFiveContinuedFour.fiveSevenFive}
                </p>
                </div>

            </div>
            </div>

        </div>
        </div>
      </>
    ),
  },
  {
    title: slidesData.slideFiveContinuedFive.title,
    content: (
      <>
        <div
        style={{
            display: "flex",
            flexDirection: "column",
            height: "100%",
            padding: "2rem 3rem",
            boxSizing: "border-box",
        }}
        >
        <h1
            style={{
            margin: 0,
            color: "#582c83",
            fontSize: "2.75rem",
            }}
        >
            {slidesData.slideFiveContinuedFive.title.toUpperCase()}
        </h1>

        <div
            style={{
            marginTop: "0.75rem",
            height: "3px",
            width: "100%",
            backgroundColor: "#e2e8f0",
            borderRadius: "2px",
            }}
        />

        <div
            style={{
            flex: 1,
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            gap: "1.25rem",
            padding: "1.5rem 0 0.5rem",
            }}
        >
            <div
            style={{
                display: "flex",
                gap: "1.25rem",
                padding: "1.25rem 1.5rem",
                backgroundColor: "#f8f7fa",
                borderLeft: "5px solid #582c83",
                borderRadius: "0 10px 10px 0",
                boxSizing: "border-box",
            }}
            >
            <div
                style={{
                flexShrink: 0,
                width: "52px",
                height: "52px",
                borderRadius: "10px",
                backgroundColor: "#582c83",
                color: "#ffffff",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: "1rem",
                fontWeight: 700,
                }}
            >
                5.8
            </div>

            <div
                style={{
                flex: 1,
                display: "flex",
                flexDirection: "column",
                }}
            >
                <h2
                style={{
                    margin: 0,
                    color: "#582c83",
                    fontSize: "1.3rem",
                    fontWeight: 700,
                }}
                >
                {slidesData.slideFiveContinuedFive.fiveEight}
                </h2>

                <div
                style={{
                    marginTop: "0.65rem",
                    display: "flex",
                    gap: "0.75rem",
                    alignItems: "flex-start",
                }}
                >
                <span
                    style={{
                    flexShrink: 0,
                    color: "#6b7280",
                    fontSize: "0.8rem",
                    fontWeight: 700,
                    paddingTop: "0.15rem",
                    }}
                >
                    5.8.1
                </span>

                <p
                    style={{
                    margin: 0,
                    color: "#374151",
                    fontSize: "1.05rem",
                    lineHeight: 1.5,
                    }}
                >
                    {slidesData.slideFiveContinuedFive.fiveEightOne}
                </p>
                </div>

                <div
                style={{
                    marginTop: "0.65rem",
                    display: "flex",
                    gap: "0.75rem",
                    alignItems: "flex-start",
                }}
                >
                <span
                    style={{
                    flexShrink: 0,
                    color: "#6b7280",
                    fontSize: "0.8rem",
                    fontWeight: 700,
                    paddingTop: "0.15rem",
                    }}
                >
                    5.8.2
                </span>

                <p
                    style={{
                    margin: 0,
                    color: "#374151",
                    fontSize: "1.05rem",
                    lineHeight: 1.5,
                    }}
                >
                    {slidesData.slideFiveContinuedFive.fiveEightTwo}
                </p>
                </div>

            </div>
            </div>

            <div
            style={{
                display: "flex",
                gap: "1.25rem",
                padding: "1.25rem 1.5rem",
                backgroundColor: "#f8f7fa",
                borderLeft: "5px solid #582c83",
                borderRadius: "0 10px 10px 0",
                boxSizing: "border-box",
            }}
            >
            <div
                style={{
                flexShrink: 0,
                width: "52px",
                height: "52px",
                borderRadius: "10px",
                backgroundColor: "#582c83",
                color: "#ffffff",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: "1rem",
                fontWeight: 700,
                }}
            >
                5.9
            </div>

            <div
                style={{
                flex: 1,
                display: "flex",
                flexDirection: "column",
                }}
            >
                <h2
                style={{
                    margin: 0,
                    color: "#582c83",
                    fontSize: "1.3rem",
                    fontWeight: 700,
                }}
                >
                {slidesData.slideFiveContinuedFive.fiveNine}
                </h2>

                <div
                style={{
                    marginTop: "0.65rem",
                    display: "flex",
                    gap: "0.75rem",
                    alignItems: "flex-start",
                }}
                >
                <span
                    style={{
                    flexShrink: 0,
                    color: "#6b7280",
                    fontSize: "0.8rem",
                    fontWeight: 700,
                    paddingTop: "0.15rem",
                    }}
                >
                    5.9.1
                </span>

                <p
                    style={{
                    margin: 0,
                    color: "#374151",
                    fontSize: "1.05rem",
                    lineHeight: 1.5,
                    }}
                >
                    {slidesData.slideFiveContinuedFive.fiveNineOne}
                </p>
                </div>

            </div>
            </div>

        </div>
        </div>
      </>
    ),
  },
  {
    title: slidesData.slideFiveContinuedSix.title,
    content: (
      <>
        <div
        style={{
            display: "flex",
            flexDirection: "column",
            height: "100%",
            padding: "2rem 3rem",
            boxSizing: "border-box",
        }}
        >
        <h1
            style={{
            margin: 0,
            color: "#582c83",
            fontSize: "2.75rem",
            }}
        >
            {slidesData.slideFiveContinuedSix.title.toUpperCase()}
        </h1>

        <div
            style={{
            marginTop: "0.75rem",
            height: "3px",
            width: "100%",
            backgroundColor: "#e2e8f0",
            borderRadius: "2px",
            }}
        />

        <div
            style={{
            flex: 1,
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            gap: "1.25rem",
            padding: "1.5rem 0 0.5rem",
            }}
        >
            <div
            style={{
                display: "flex",
                gap: "1.25rem",
                padding: "1.25rem 1.5rem",
                backgroundColor: "#f8f7fa",
                borderLeft: "5px solid #582c83",
                borderRadius: "0 10px 10px 0",
                boxSizing: "border-box",
            }}
            >
            <div
                style={{
                flexShrink: 0,
                width: "52px",
                height: "52px",
                borderRadius: "10px",
                backgroundColor: "#582c83",
                color: "#ffffff",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: "1rem",
                fontWeight: 700,
                }}
            >
                5.10
            </div>

            <div
                style={{
                flex: 1,
                display: "flex",
                flexDirection: "column",
                }}
            >
                <h2
                style={{
                    margin: 0,
                    color: "#582c83",
                    fontSize: "1.3rem",
                    fontWeight: 700,
                }}
                >
                {slidesData.slideFiveContinuedSix.fiveTen}
                </h2>

                <div
                style={{
                    marginTop: "0.65rem",
                    display: "flex",
                    gap: "0.75rem",
                    alignItems: "flex-start",
                }}
                >
                <span
                    style={{
                    flexShrink: 0,
                    color: "#6b7280",
                    fontSize: "0.8rem",
                    fontWeight: 700,
                    paddingTop: "0.15rem",
                    }}
                >
                    5.10.1
                </span>

                <p
                    style={{
                    margin: 0,
                    color: "#374151",
                    fontSize: "1.05rem",
                    lineHeight: 1.5,
                    }}
                >
                    {slidesData.slideFiveContinuedSix.fiveTenOne}
                </p>
                </div>

                <div
                style={{
                    marginTop: "0.65rem",
                    display: "flex",
                    gap: "0.75rem",
                    alignItems: "flex-start",
                }}
                >
                <span
                    style={{
                    flexShrink: 0,
                    color: "#6b7280",
                    fontSize: "0.8rem",
                    fontWeight: 700,
                    paddingTop: "0.15rem",
                    }}
                >
                    5.10.2
                </span>

                <div
                    style={{
                    flex: 1,
                    color: "#374151",
                    fontSize: "1.05rem",
                    lineHeight: 1.5,
                    }}
                >
                    <p
                    style={{
                        margin: 0,
                        marginBottom: "0.75rem",
                    }}
                    >
                    {slidesData.slideFiveContinuedSix.fiveTenTwo.intro}
                    </p>

                    <ol
                    style={{
                        margin: 0,
                        paddingLeft: "1.5rem",
                    }}
                    >
                    {slidesData.slideFiveContinuedSix.fiveTenTwo.items.map(
                        (item, index) => (
                        <li
                            key={index}
                            style={{
                            paddingLeft: "0.35rem",
                            marginBottom:
                                index ===
                                slidesData.slideFiveContinuedSix.fiveTenTwo.items.length - 1
                                ? 0
                                : "0.4rem",
                            }}
                        >
                            {item}
                        </li>
                        )
                    )}
                    </ol>
                </div>
                </div>

                 <div
                style={{
                    marginTop: "0.65rem",
                    display: "flex",
                    gap: "0.75rem",
                    alignItems: "flex-start",
                }}
                >
                <span
                    style={{
                    flexShrink: 0,
                    color: "#6b7280",
                    fontSize: "0.8rem",
                    fontWeight: 700,
                    paddingTop: "0.15rem",
                    }}
                >
                    5.10.3
                </span>

                <div
                    style={{
                    flex: 1,
                    color: "#374151",
                    fontSize: "1.05rem",
                    lineHeight: 1.5,
                    }}
                >
                    <p
                    style={{
                        margin: 0,
                        marginBottom: "0.75rem",
                    }}
                    >
                    {slidesData.slideFiveContinuedSix.fiveTenThree.intro}
                    </p>

                    <ol
                    style={{
                        margin: 0,
                        paddingLeft: "1.5rem",
                    }}
                    >
                    {slidesData.slideFiveContinuedSix.fiveTenThree.items.map(
                        (item, index) => (
                        <li
                            key={index}
                            style={{
                            paddingLeft: "0.35rem",
                            marginBottom:
                                index ===
                                slidesData.slideFiveContinuedSix.fiveTenThree.items.length - 1
                                ? 0
                                : "0.4rem",
                            }}
                        >
                            {item}
                        </li>
                        )
                    )}
                    </ol>
                </div>
                </div>

                <div
                style={{
                    marginTop: "0.65rem",
                    display: "flex",
                    gap: "0.75rem",
                    alignItems: "flex-start",
                }}
                >
                <span
                    style={{
                    flexShrink: 0,
                    color: "#6b7280",
                    fontSize: "0.8rem",
                    fontWeight: 700,
                    paddingTop: "0.15rem",
                    }}
                >
                    5.10.4
                </span>

                <p
                    style={{
                    margin: 0,
                    color: "#374151",
                    fontSize: "1.05rem",
                    lineHeight: 1.5,
                    }}
                >
                    {slidesData.slideFiveContinuedSix.fiveTenFour}
                </p>
                </div>

                <div
                style={{
                    marginTop: "0.65rem",
                    display: "flex",
                    gap: "0.75rem",
                    alignItems: "flex-start",
                }}
                >
                <span
                    style={{
                    flexShrink: 0,
                    color: "#6b7280",
                    fontSize: "0.8rem",
                    fontWeight: 700,
                    paddingTop: "0.15rem",
                    }}
                >
                    5.10.5
                </span>

                <p
                    style={{
                    margin: 0,
                    color: "#374151",
                    fontSize: "1.05rem",
                    lineHeight: 1.5,
                    }}
                >
                    {slidesData.slideFiveContinuedSix.fiveTenFive}
                </p>
                </div>
            </div>
            </div>

        </div>
        </div>
      </>
    ),
  },
  {
    title: slidesData.slideFiveContinuedSeven.title,
    content: (
      <>
        <div
        style={{
            display: "flex",
            flexDirection: "column",
            height: "100%",
            padding: "2rem 3rem",
            boxSizing: "border-box",
        }}
        >
        <h1
            style={{
            margin: 0,
            color: "#582c83",
            fontSize: "2.75rem",
            }}
        >
            {slidesData.slideFiveContinuedSeven.title.toUpperCase()}
        </h1>

        <div
            style={{
            marginTop: "0.75rem",
            height: "3px",
            width: "100%",
            backgroundColor: "#e2e8f0",
            borderRadius: "2px",
            }}
        />

        <div
            style={{
            flex: 1,
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            gap: "1.25rem",
            padding: "1.5rem 0 0.5rem",
            }}
        >
            <div
            style={{
                display: "flex",
                gap: "1.25rem",
                padding: "1.25rem 1.5rem",
                backgroundColor: "#f8f7fa",
                borderLeft: "5px solid #582c83",
                borderRadius: "0 10px 10px 0",
                boxSizing: "border-box",
            }}
            >
            <div
                style={{
                flexShrink: 0,
                width: "52px",
                height: "52px",
                borderRadius: "10px",
                backgroundColor: "#582c83",
                color: "#ffffff",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: "1rem",
                fontWeight: 700,
                }}
            >
                5.11
            </div>

            <div
                style={{
                flex: 1,
                display: "flex",
                flexDirection: "column",
                }}
            >
                <h2
                style={{
                    margin: 0,
                    color: "#582c83",
                    fontSize: "1.3rem",
                    fontWeight: 700,
                }}
                >
                {slidesData.slideFiveContinuedSeven.fiveEleven}
                </h2>

                <div
                style={{
                    marginTop: "0.65rem",
                    display: "flex",
                    gap: "0.75rem",
                    alignItems: "flex-start",
                }}
                >
                <span
                    style={{
                    flexShrink: 0,
                    color: "#6b7280",
                    fontSize: "0.8rem",
                    fontWeight: 700,
                    paddingTop: "0.15rem",
                    }}
                >
                    5.11.1
                </span>

                <p
                    style={{
                    margin: 0,
                    color: "#374151",
                    fontSize: "1.05rem",
                    lineHeight: 1.5,
                    }}
                >
                    {slidesData.slideFiveContinuedSeven.fiveElevenOne}
                </p>
                </div>

                <div
                style={{
                    marginTop: "0.65rem",
                    display: "flex",
                    gap: "0.75rem",
                    alignItems: "flex-start",
                }}
                >
                <span
                    style={{
                    flexShrink: 0,
                    color: "#6b7280",
                    fontSize: "0.8rem",
                    fontWeight: 700,
                    paddingTop: "0.15rem",
                    }}
                >
                    5.11.2
                </span>

                <p
                    style={{
                    margin: 0,
                    color: "#374151",
                    fontSize: "1.05rem",
                    lineHeight: 1.5,
                    }}
                >
                    {slidesData.slideFiveContinuedSeven.fiveElevenTwo}
                </p>
                </div>

                <div
                style={{
                    marginTop: "0.65rem",
                    display: "flex",
                    gap: "0.75rem",
                    alignItems: "flex-start",
                }}
                >
                <span
                    style={{
                    flexShrink: 0,
                    color: "#6b7280",
                    fontSize: "0.8rem",
                    fontWeight: 700,
                    paddingTop: "0.15rem",
                    }}
                >
                    5.11.3
                </span>

                <p
                    style={{
                    margin: 0,
                    color: "#374151",
                    fontSize: "1.05rem",
                    lineHeight: 1.5,
                    }}
                >
                    {slidesData.slideFiveContinuedSeven.fiveElevenThree}
                </p>
                </div>

                <div
                style={{
                    marginTop: "0.65rem",
                    display: "flex",
                    gap: "0.75rem",
                    alignItems: "flex-start",
                }}
                >
                <span
                    style={{
                    flexShrink: 0,
                    color: "#6b7280",
                    fontSize: "0.8rem",
                    fontWeight: 700,
                    paddingTop: "0.15rem",
                    }}
                >
                    5.11.4
                </span>

                <div
                    style={{
                    flex: 1,
                    color: "#374151",
                    fontSize: "1.05rem",
                    lineHeight: 1.5,
                    }}
                >
                    <p
                    style={{
                        margin: 0,
                        marginBottom: "0.75rem",
                    }}
                    >
                    {slidesData.slideFiveContinuedSeven.fiveTenFour.intro}
                    </p>

                    <ol
                    style={{
                        margin: 0,
                        paddingLeft: "1.5rem",
                    }}
                    >
                    {slidesData.slideFiveContinuedSeven.fiveTenFour.items.map(
                        (item, index) => (
                        <li
                            key={index}
                            style={{
                            paddingLeft: "0.35rem",
                            marginBottom:
                                index ===
                                slidesData.slideFiveContinuedSeven.fiveTenFour.items.length - 1
                                ? 0
                                : "0.4rem",
                            }}
                        >
                            {item}
                        </li>
                        )
                    )}
                    </ol>
                </div>
                </div>

                <div
                style={{
                    marginTop: "0.65rem",
                    display: "flex",
                    gap: "0.75rem",
                    alignItems: "flex-start",
                }}
                >
                <span
                    style={{
                    flexShrink: 0,
                    color: "#6b7280",
                    fontSize: "0.8rem",
                    fontWeight: 700,
                    paddingTop: "0.15rem",
                    }}
                >
                    5.11.5
                </span>

                <p
                    style={{
                    margin: 0,
                    color: "#374151",
                    fontSize: "1.05rem",
                    lineHeight: 1.5,
                    }}
                >
                    {slidesData.slideFiveContinuedSeven.fiveElevenFive}
                </p>
                </div>
            </div>
            </div>

        </div>
        </div>
      </>
    ),
  },
  {
    title: slidesData.slideFiveContinuedEight.title,
    content: (
      <>
        <div
        style={{
            display: "flex",
            flexDirection: "column",
            height: "100%",
            padding: "2rem 3rem",
            boxSizing: "border-box",
        }}
        >
        <h1
            style={{
            margin: 0,
            color: "#582c83",
            fontSize: "2.75rem",
            }}
        >
            {slidesData.slideFiveContinuedEight.title.toUpperCase()}
        </h1>

        <div
            style={{
            marginTop: "0.75rem",
            height: "3px",
            width: "100%",
            backgroundColor: "#e2e8f0",
            borderRadius: "2px",
            }}
        />

        <div
            style={{
            flex: 1,
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            gap: "1.25rem",
            padding: "1.5rem 0 0.5rem",
            }}
        >
            <div
            style={{
                display: "flex",
                gap: "1.25rem",
                padding: "1.25rem 1.5rem",
                backgroundColor: "#f8f7fa",
                borderLeft: "5px solid #582c83",
                borderRadius: "0 10px 10px 0",
                boxSizing: "border-box",
            }}
            >
            <div
                style={{
                flexShrink: 0,
                width: "52px",
                height: "52px",
                borderRadius: "10px",
                backgroundColor: "#582c83",
                color: "#ffffff",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: "1rem",
                fontWeight: 700,
                }}
            >
                5.11
            </div>

            <div
                style={{
                flex: 1,
                display: "flex",
                flexDirection: "column",
                }}
            >
                <h2
                style={{
                    margin: 0,
                    color: "#582c83",
                    fontSize: "1.3rem",
                    fontWeight: 700,
                }}
                >
                {slidesData.slideFiveContinuedEight.fiveEleven}
                </h2>

                <div
                style={{
                    marginTop: "0.65rem",
                    display: "flex",
                    gap: "0.75rem",
                    alignItems: "flex-start",
                }}
                >
                <span
                    style={{
                    flexShrink: 0,
                    color: "#6b7280",
                    fontSize: "0.8rem",
                    fontWeight: 700,
                    paddingTop: "0.15rem",
                    }}
                >
                    5.11.6
                </span>

                <p
                    style={{
                    margin: 0,
                    color: "#374151",
                    fontSize: "1.05rem",
                    lineHeight: 1.5,
                    }}
                >
                    {slidesData.slideFiveContinuedEight.fiveElevenSix}
                </p>
                </div>

                <div
                style={{
                    marginTop: "0.65rem",
                    display: "flex",
                    gap: "0.75rem",
                    alignItems: "flex-start",
                }}
                >
                <span
                    style={{
                    flexShrink: 0,
                    color: "#6b7280",
                    fontSize: "0.8rem",
                    fontWeight: 700,
                    paddingTop: "0.15rem",
                    }}
                >
                    5.11.7
                </span>

                <div
                    style={{
                    flex: 1,
                    color: "#374151",
                    fontSize: "1.05rem",
                    lineHeight: 1.5,
                    }}
                >
                    <p
                    style={{
                        margin: 0,
                        marginBottom: "0.75rem",
                    }}
                    >
                    {slidesData.slideFiveContinuedEight.fiveElevenSeven.intro}
                    </p>

                    <ol
                    style={{
                        margin: 0,
                        paddingLeft: "1.5rem",
                    }}
                    >
                    {slidesData.slideFiveContinuedEight.fiveElevenSeven.items.map(
                        (item, index) => (
                        <li
                            key={index}
                            style={{
                            paddingLeft: "0.35rem",
                            marginBottom:
                                index ===
                                slidesData.slideFiveContinuedEight.fiveElevenSeven.items.length - 1
                                ? 0
                                : "0.4rem",
                            }}
                        >
                            {item}
                        </li>
                        )
                    )}
                    </ol>
                </div>
                </div>

                <div
                style={{
                    marginTop: "0.65rem",
                    display: "flex",
                    gap: "0.75rem",
                    alignItems: "flex-start",
                }}
                >
                <span
                    style={{
                    flexShrink: 0,
                    color: "#6b7280",
                    fontSize: "0.8rem",
                    fontWeight: 700,
                    paddingTop: "0.15rem",
                    }}
                >
                    5.11.8
                </span>

                <p
                    style={{
                    margin: 0,
                    color: "#374151",
                    fontSize: "1.05rem",
                    lineHeight: 1.5,
                    }}
                >
                    {slidesData.slideFiveContinuedEight.fiveElevenEight}
                </p>
                </div>

                <div
                style={{
                    marginTop: "0.65rem",
                    display: "flex",
                    gap: "0.75rem",
                    alignItems: "flex-start",
                }}
                >
                <span
                    style={{
                    flexShrink: 0,
                    color: "#6b7280",
                    fontSize: "0.8rem",
                    fontWeight: 700,
                    paddingTop: "0.15rem",
                    }}
                >
                    5.11.9
                </span>

                <p
                    style={{
                    margin: 0,
                    color: "#374151",
                    fontSize: "1.05rem",
                    lineHeight: 1.5,
                    }}
                >
                    {slidesData.slideFiveContinuedEight.fiveElevenNine}
                </p>
                </div>

                <div
                style={{
                    marginTop: "0.65rem",
                    display: "flex",
                    gap: "0.75rem",
                    alignItems: "flex-start",
                }}
                >
                <span
                    style={{
                    flexShrink: 0,
                    color: "#6b7280",
                    fontSize: "0.8rem",
                    fontWeight: 700,
                    paddingTop: "0.15rem",
                    }}
                >
                    5.11.10
                </span>

                <p
                    style={{
                    margin: 0,
                    color: "#374151",
                    fontSize: "1.05rem",
                    lineHeight: 1.5,
                    }}
                >
                    {slidesData.slideFiveContinuedEight.fiveElevenTen}
                </p>
                </div>
            </div>
            </div>

        </div>
        </div>
      </>
    ),
  },
  {
    title: slidesData.slideFiveContinuedNine.title,
    content: (
      <>
        <div
        style={{
            display: "flex",
            flexDirection: "column",
            height: "100%",
            padding: "2rem 3rem",
            boxSizing: "border-box",
        }}
        >
        <h1
            style={{
            margin: 0,
            color: "#582c83",
            fontSize: "2.75rem",
            }}
        >
            {slidesData.slideFiveContinuedNine.title.toUpperCase()}
        </h1>

        <div
            style={{
            marginTop: "0.75rem",
            height: "3px",
            width: "100%",
            backgroundColor: "#e2e8f0",
            borderRadius: "2px",
            }}
        />

        <div
            style={{
            flex: 1,
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            gap: "1.25rem",
            padding: "1.5rem 0 0.5rem",
            }}
        >
            <div
            style={{
                display: "flex",
                gap: "1.25rem",
                padding: "1.25rem 1.5rem",
                backgroundColor: "#f8f7fa",
                borderLeft: "5px solid #582c83",
                borderRadius: "0 10px 10px 0",
                boxSizing: "border-box",
            }}
            >
            <div
                style={{
                flexShrink: 0,
                width: "52px",
                height: "52px",
                borderRadius: "10px",
                backgroundColor: "#582c83",
                color: "#ffffff",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: "1rem",
                fontWeight: 700,
                }}
            >
                5.12
            </div>

            <div
                style={{
                flex: 1,
                display: "flex",
                flexDirection: "column",
                }}
            >
                <h2
                style={{
                    margin: 0,
                    color: "#582c83",
                    fontSize: "1.3rem",
                    fontWeight: 700,
                }}
                >
                {slidesData.slideFiveContinuedNine.fiveTwelve}
                </h2>

                <div
                style={{
                    marginTop: "0.65rem",
                    display: "flex",
                    gap: "0.75rem",
                    alignItems: "flex-start",
                }}
                >
                <span
                    style={{
                    flexShrink: 0,
                    color: "#6b7280",
                    fontSize: "0.8rem",
                    fontWeight: 700,
                    paddingTop: "0.15rem",
                    }}
                >
                    5.12.1
                </span>

                <div
                    style={{
                    flex: 1,
                    color: "#374151",
                    fontSize: "1.05rem",
                    lineHeight: 1.5,
                    }}
                >
                    <p
                    style={{
                        margin: 0,
                        marginBottom: "0.75rem",
                    }}
                    >
                    {slidesData.slideFiveContinuedNine.fiveTwelveOne.intro}
                    </p>

                    <ol
                    style={{
                        margin: 0,
                        paddingLeft: "1.5rem",
                    }}
                    >
                    {slidesData.slideFiveContinuedNine.fiveTwelveOne.items.map(
                        (item, index) => (
                        <li
                            key={index}
                            style={{
                            paddingLeft: "0.35rem",
                            marginBottom:
                                index ===
                                slidesData.slideFiveContinuedNine.fiveTwelveOne.items.length - 1
                                ? 0
                                : "0.4rem",
                            }}
                        >
                            {item}
                        </li>
                        )
                    )}
                    </ol>
                </div>
                </div>

                <div
                style={{
                    marginTop: "0.65rem",
                    display: "flex",
                    gap: "0.75rem",
                    alignItems: "flex-start",
                }}
                >
                <span
                    style={{
                    flexShrink: 0,
                    color: "#6b7280",
                    fontSize: "0.8rem",
                    fontWeight: 700,
                    paddingTop: "0.15rem",
                    }}
                >
                    5.12.2
                </span>

                <p
                    style={{
                    margin: 0,
                    color: "#374151",
                    fontSize: "1.05rem",
                    lineHeight: 1.5,
                    }}
                >
                    {slidesData.slideFiveContinuedNine.fiveTwelveTwo}
                </p>
                </div>

                <div
                style={{
                    marginTop: "0.65rem",
                    display: "flex",
                    gap: "0.75rem",
                    alignItems: "flex-start",
                }}
                >
                <span
                    style={{
                    flexShrink: 0,
                    color: "#6b7280",
                    fontSize: "0.8rem",
                    fontWeight: 700,
                    paddingTop: "0.15rem",
                    }}
                >
                    5.12.3
                </span>

                <div
                    style={{
                    flex: 1,
                    color: "#374151",
                    fontSize: "1.05rem",
                    lineHeight: 1.5,
                    }}
                >
                    <p
                    style={{
                        margin: 0,
                        marginBottom: "0.75rem",
                    }}
                    >
                    {slidesData.slideFiveContinuedNine.fiveTwelveThree.intro}
                    </p>

                    <ol
                    style={{
                        margin: 0,
                        paddingLeft: "1.5rem",
                    }}
                    >
                    {slidesData.slideFiveContinuedNine.fiveTwelveThree.items.map(
                        (item, index) => (
                        <li
                            key={index}
                            style={{
                            paddingLeft: "0.35rem",
                            marginBottom:
                                index ===
                                slidesData.slideFiveContinuedNine.fiveTwelveThree.items.length - 1
                                ? 0
                                : "0.4rem",
                            }}
                        >
                            {item}
                        </li>
                        )
                    )}
                    </ol>
                </div>
                </div>

            </div>
            </div>

        </div>
        </div>
      </>
    ),
  },
  {
    title: slidesData.slideSix.title,
    content: (
      <>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            height: "100%",
            padding: "2rem 3rem",
            boxSizing: "border-box",
          }}
        >

          <h1
            style={{
              margin: 0,
              color: "#582c83",
              fontSize: "2.75rem",
            }}
          >
            {slidesData.slideSix.title.toUpperCase()}
          </h1>

          <div
            style={{
              marginTop: "0.75rem",
              height: "3px",
              width: "100%",
              backgroundColor: "#e2e8f0",
              borderRadius: "2px",
            }}
          />

          <div
            style={{
              flex: 1,
              display: "flex",
              alignItems: "flex-start",
              justifyContent: "center",
              gap: "2rem",
              padding: "2rem 0",
            }}
          >

            <div
              style={{
                flex: 1,
                minHeight: "280px",
                height: "auto",
                backgroundColor: "#f1f3f5",
                borderRadius: "12px",
                padding: "2rem",
                boxSizing: "border-box",
                display: "flex",
                flexDirection: "column",
                justifyContent: "flex-start",
                boxShadow: "0 2px 8px rgba(0,0,0,0.08)",
              }}
            >
              <h2
                style={{
                  margin: 0,
                  color: "#582c83",
                  fontSize: "1.5rem",
                }}
              >
                6.1
              </h2>

              <p
                style={{
                  marginTop: "1rem",
                  marginBottom: 0,
                  color: "#374151",
                  fontSize: "1.2rem",
                  lineHeight: 1.6,
                }}
              >
                {slidesData.slideSix.sixOne}
              </p>
            </div>

            <div
              style={{
                flex: 1,
                minHeight: "280px",
                height: "auto",
                backgroundColor: "#f1f3f5",
                borderRadius: "12px",
                padding: "2rem",
                boxSizing: "border-box",
                display: "flex",
                flexDirection: "column",
                justifyContent: "flex-start",
                boxShadow: "0 2px 8px rgba(0,0,0,0.08)",
              }}
            >
              <h2
                style={{
                  margin: 0,
                  color: "#582c83",
                  fontSize: "1.5rem",
                }}
              >
                6.2
              </h2>

              <p
                style={{
                  marginTop: "1rem",
                  marginBottom: 0,
                  color: "#374151",
                  fontSize: "1.2rem",
                  lineHeight: 1.6,
                }}
              >
                {slidesData.slideSix.sixTwo}
              </p>
            </div>

          </div>
        </div>
      </>
    ),
  },
  {
    title: slidesData.useSlide.title,
    content: (
      <>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            height: "100%",
            padding: "2rem 3rem",
            boxSizing: "border-box",
          }}
        >
          <div>
            <h1
              style={{
                margin: 0,
                color: "#582c83",
                fontSize: "2.75rem",
              }}
            >
              {slidesData.useSlide.title.toUpperCase()}
            </h1>

            <div
              style={{
                marginTop: "0.75rem",
                height: "3px",
                width: "100%",
                backgroundColor: "#e2e8f0",
                borderRadius: "2px",
              }}
            />
          </div>

          <div
            style={{
              flex: 1,
              display: "grid",
              gridTemplateColumns: "1fr 1fr",
              gap: "0.85rem",
              alignContent: "center",
              marginTop: "1.25rem",
            }}
          >
            {slidesData.useSlide.items.map((item, index) => (
              <div
                key={index}
                style={{
                  display: "flex",
                  alignItems: "flex-start",
                  gap: "0.85rem",
                  padding: "0.9rem 1rem",
                  backgroundColor: index % 2 === 0 ? "#faf9fc" : "#ffffff",
                  border: "1px solid #e2e8f0",
                  borderRadius: "10px",
                  boxShadow: "0 2px 6px rgba(88, 44, 131, 0.06)",
                  boxSizing: "border-box",
                }}
              >
                <div
                  style={{
                    flexShrink: 0,
                    width: "30px",
                    height: "30px",
                    borderRadius: "50%",
                    backgroundColor: "#f2eef7",
                    color: "#582c83",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontWeight: 700,
                    fontSize: "0.85rem",
                  }}
                >
                  {String(index + 1).padStart(2, "0")}
                </div>

                <p
                  style={{
                    margin: 0,
                    color: "#334155",
                    fontSize: "0.91rem",
                    lineHeight: 1.45,
                  }}
                >
                  {item}
                </p>
              </div>
            ))}
          </div>
        </div>
      </>
    ),
  },
  {
    title: "Knowledge Check: Q1",
    content: (
      <MultipleChoiceQuestion
        questionId={questionsData.questionsAccessibility[0].id}
        question={questionsData.questionsAccessibility[0].question}
        options={questionsData.questionsAccessibility[0].options}
        correctAnswer={questionsData.questionsAccessibility[0].correctAnswer}
        explanation={questionsData.questionsAccessibility[0].explanation}
        category={questionsData.questionsAccessibility[0].category}
      />
    ),
  },
  {
    title: "Knowledge Check: Q2",
    content: (
      <MultipleChoiceQuestion
        questionId={questionsData.questionsAccessibility[1].id}
        question={questionsData.questionsAccessibility[1].question}
        options={questionsData.questionsAccessibility[1].options}
        correctAnswer={questionsData.questionsAccessibility[1].correctAnswer}
        explanation={questionsData.questionsAccessibility[1].explanation}
        category={questionsData.questionsAccessibility[1].category}
      />
    ),
  },
  {
    title: "Knowledge Check: Q3",
    content: (
      <MultipleChoiceQuestion
        questionId={questionsData.questionsAccessibility[2].id}
        question={questionsData.questionsAccessibility[2].question}
        options={questionsData.questionsAccessibility[2].options}
        correctAnswer={questionsData.questionsAccessibility[2].correctAnswer}
        explanation={questionsData.questionsAccessibility[2].explanation}
        category={questionsData.questionsAccessibility[2].category}
      />
    ),
  },
  {
    title: "Knowledge Check: Q4",
    content: (
      <MultipleChoiceQuestion
        questionId={questionsData.questionsAccessibility[3].id}
        question={questionsData.questionsAccessibility[3].question}
        options={questionsData.questionsAccessibility[3].options}
        correctAnswer={questionsData.questionsAccessibility[3].correctAnswer}
        explanation={questionsData.questionsAccessibility[3].explanation}
        category={questionsData.questionsAccessibility[3].category}
      />
    ),
  },
  {
    title: "Knowledge Check: Q5",
    content: (
      <MultipleChoiceQuestion
        questionId={questionsData.questionsAccessibility[4].id}
        question={questionsData.questionsAccessibility[4].question}
        options={questionsData.questionsAccessibility[4].options}
        correctAnswer={questionsData.questionsAccessibility[4].correctAnswer}
        explanation={questionsData.questionsAccessibility[4].explanation}
        category={questionsData.questionsAccessibility[4].category}
      />
    ),
  },
  {
    title: "Knowledge Check: Q6",
    content: (
      <MultipleChoiceQuestion
        questionId={questionsData.questionsAccessibility[5].id}
        question={questionsData.questionsAccessibility[5].question}
        options={questionsData.questionsAccessibility[5].options}
        correctAnswer={questionsData.questionsAccessibility[5].correctAnswer}
        explanation={questionsData.questionsAccessibility[5].explanation}
        category={questionsData.questionsAccessibility[5].category}
      />
    ),
  },
  {
    title: "Knowledge Check: Q7",
    content: (
      <MultipleChoiceQuestion
        questionId={questionsData.questionsAccessibility[6].id}
        question={questionsData.questionsAccessibility[6].question}
        options={questionsData.questionsAccessibility[6].options}
        correctAnswer={questionsData.questionsAccessibility[6].correctAnswer}
        explanation={questionsData.questionsAccessibility[6].explanation}
        category={questionsData.questionsAccessibility[6].category}
      />
    ),
  },
  {
    title: "Knowledge Check: Q8",
    content: (
      <MultipleChoiceQuestion
        questionId={questionsData.questionsAccessibility[7].id}
        question={questionsData.questionsAccessibility[7].question}
        options={questionsData.questionsAccessibility[7].options}
        correctAnswer={questionsData.questionsAccessibility[7].correctAnswer}
        explanation={questionsData.questionsAccessibility[7].explanation}
        category={questionsData.questionsAccessibility[7].category}
      />
    ),
  },
];