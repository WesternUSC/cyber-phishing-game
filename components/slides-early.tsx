import slidesData from '@/data/earlySlides.json'
import MultipleChoiceQuestion from './multiple-choice-question';
import questionsData from '@/data/questions.json';
import ModuleTableOfContents from './module-title-slide';

type slides = 'eso' | 'policies' | 'cs' | 'accessibility' | 'conflict' | 'disc' | 'early';

export const earlySlides = (playerName: string, setCurrentSlides: React.Dispatch<React.SetStateAction<slides>>) => [
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
                1.2
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
                {slidesData.slideOne.oneTwo}
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
                1.3
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
                {slidesData.slideOne.oneThree}
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
        }}
        >
        <h1
            style={{
            margin: 0,
            color: "#582c83",
            fontSize: "2.75rem",
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
                2.1
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
                {slidesData.slideTwo.twoOne}
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
                    2.1.1
                </span>

                <p
                    style={{
                    margin: 0,
                    color: "#374151",
                    fontSize: "1.05rem",
                    lineHeight: 1.5,
                    }}
                >
                    {slidesData.slideTwo.twoOneOne}
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
                    2.1.2
                </span>

                <p
                    style={{
                    margin: 0,
                    color: "#374151",
                    fontSize: "1.05rem",
                    lineHeight: 1.5,
                    }}
                >
                    {slidesData.slideTwo.twoOneTwo}
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
                    2.1.3
                </span>

                <p
                    style={{
                    margin: 0,
                    color: "#374151",
                    fontSize: "1.05rem",
                    lineHeight: 1.5,
                    }}
                >
                    {slidesData.slideTwo.twoOneThree}
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
                    2.1.4
                </span>

                <p
                    style={{
                    margin: 0,
                    color: "#374151",
                    fontSize: "1.05rem",
                    lineHeight: 1.5,
                    }}
                >
                    {slidesData.slideTwo.twoOneFour}
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
                    2.1.5
                </span>

                <p
                    style={{
                    margin: 0,
                    color: "#374151",
                    fontSize: "1.05rem",
                    lineHeight: 1.5,
                    }}
                >
                    {slidesData.slideTwo.twoOneFive}
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
                    2.1.6
                </span>

                <p
                    style={{
                    margin: 0,
                    color: "#374151",
                    fontSize: "1.05rem",
                    lineHeight: 1.5,
                    }}
                >
                    {slidesData.slideTwo.twoOneSix}
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
                3.1
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
                {slidesData.slideThree.threeOne}
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
                    3.1.1
                </span>

                <p
                    style={{
                    margin: 0,
                    color: "#374151",
                    fontSize: "1.05rem",
                    lineHeight: 1.5,
                    }}
                >
                    {slidesData.slideThree.threeOneOne}
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
                    3.1.2
                </span>

                <p
                    style={{
                    margin: 0,
                    color: "#374151",
                    fontSize: "1.05rem",
                    lineHeight: 1.5,
                    }}
                >
                    {slidesData.slideThree.threeOneTwo}
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
                    3.1.3
                </span>

                <p
                    style={{
                    margin: 0,
                    color: "#374151",
                    fontSize: "1.05rem",
                    lineHeight: 1.5,
                    }}
                >
                    {slidesData.slideThree.threeOneThree}
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
                    3.1.4
                </span>

                <p
                    style={{
                    margin: 0,
                    color: "#374151",
                    fontSize: "1.05rem",
                    lineHeight: 1.5,
                    }}
                >
                    {slidesData.slideThree.threeOneFour}
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
                    3.1.5
                </span>

                <p
                    style={{
                    margin: 0,
                    color: "#374151",
                    fontSize: "1.05rem",
                    lineHeight: 1.5,
                    }}
                >
                    {slidesData.slideThree.threeOneFive}
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
                    3.1.6
                </span>

                <p
                    style={{
                    margin: 0,
                    color: "#374151",
                    fontSize: "1.05rem",
                    lineHeight: 1.5,
                    }}
                >
                    {slidesData.slideThree.threeOneSix}
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
                    3.1.7
                </span>

                <p
                    style={{
                    margin: 0,
                    color: "#374151",
                    fontSize: "1.05rem",
                    lineHeight: 1.5,
                    }}
                >
                    {slidesData.slideThree.threeOneSeven}
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
                    3.1.8
                </span>

                <p
                    style={{
                    margin: 0,
                    color: "#374151",
                    fontSize: "1.05rem",
                    lineHeight: 1.5,
                    }}
                >
                    {slidesData.slideThree.threeOneEight}
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
                    3.1.9
                </span>

                <p
                    style={{
                    margin: 0,
                    color: "#374151",
                    fontSize: "1.05rem",
                    lineHeight: 1.5,
                    }}
                >
                    {slidesData.slideThree.threeOneNine}
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
    title: slidesData.slideThreeTwo.title,
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
            {slidesData.slideThreeTwo.title.toUpperCase()}
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
                3.2
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
                {slidesData.slideThreeTwo.threeTwo}
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
                    3.2.1
                </span>

                <p
                    style={{
                    margin: 0,
                    color: "#374151",
                    fontSize: "1.05rem",
                    lineHeight: 1.5,
                    }}
                >
                    {slidesData.slideThreeTwo.threeTwoOne}
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
                    3.2.2
                </span>

                <p
                    style={{
                    margin: 0,
                    color: "#374151",
                    fontSize: "1.05rem",
                    lineHeight: 1.5,
                    }}
                >
                    {slidesData.slideThreeTwo.threeTwoTwo}
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
                    3.2.3
                </span>

                <p
                    style={{
                    margin: 0,
                    color: "#374151",
                    fontSize: "1.05rem",
                    lineHeight: 1.5,
                    }}
                >
                    {slidesData.slideThreeTwo.threeTwoThree}
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
                    3.2.4
                </span>

                <p
                    style={{
                    margin: 0,
                    color: "#374151",
                    fontSize: "1.05rem",
                    lineHeight: 1.5,
                    }}
                >
                    {slidesData.slideThreeTwo.threeTwoFour}
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
                    3.2.5
                </span>

                <p
                    style={{
                    margin: 0,
                    color: "#374151",
                    fontSize: "1.05rem",
                    lineHeight: 1.5,
                    }}
                >
                    {slidesData.slideThreeTwo.threeTwoFive}
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
                    3.2.6
                </span>

                <p
                    style={{
                    margin: 0,
                    color: "#374151",
                    fontSize: "1.05rem",
                    lineHeight: 1.5,
                    }}
                >
                    {slidesData.slideThreeTwo.threeTwoSix}
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
                    3.2.7
                </span>

                <p
                    style={{
                    margin: 0,
                    color: "#374151",
                    fontSize: "1.05rem",
                    lineHeight: 1.5,
                    }}
                >
                    {slidesData.slideThreeTwo.threeTwoSeven}
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
                    3.2.8
                </span>

                <p
                    style={{
                    margin: 0,
                    color: "#374151",
                    fontSize: "1.05rem",
                    lineHeight: 1.5,
                    }}
                >
                    {slidesData.slideThreeTwo.threeTwoEight}
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
                    3.2.9
                </span>

                <p
                    style={{
                    margin: 0,
                    color: "#374151",
                    fontSize: "1.05rem",
                    lineHeight: 1.5,
                    }}
                >
                    {slidesData.slideThreeTwo.threeTwoNine}
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
                    3.2.10
                </span>

                <p
                    style={{
                    margin: 0,
                    color: "#374151",
                    fontSize: "1.05rem",
                    lineHeight: 1.5,
                    }}
                >
                    {slidesData.slideThreeTwo.threeTwoTen}
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
    title: slidesData.slideThreeThree.title,
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
            {slidesData.slideThreeThree.title.toUpperCase()}
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
                3.3
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
                {slidesData.slideThreeTwo.threeTwo}
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
                    3.3.1
                </span>

                <p
                    style={{
                    margin: 0,
                    color: "#374151",
                    fontSize: "1.05rem",
                    lineHeight: 1.5,
                    }}
                >
                    {slidesData.slideThreeThree.threeThreeOne}
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
                    3.3.2
                </span>

                <p
                    style={{
                    margin: 0,
                    color: "#374151",
                    fontSize: "1.05rem",
                    lineHeight: 1.5,
                    }}
                >
                    {slidesData.slideThreeThree.threeThreeTwo}
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
                    3.3.3
                </span>

                <p
                    style={{
                    margin: 0,
                    color: "#374151",
                    fontSize: "1.05rem",
                    lineHeight: 1.5,
                    }}
                >
                    {slidesData.slideThreeThree.threeThreeThree}
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
                    3.3.4
                </span>

                <p
                    style={{
                    margin: 0,
                    color: "#374151",
                    fontSize: "1.05rem",
                    lineHeight: 1.5,
                    }}
                >
                    {slidesData.slideThreeThree.threeThreeFour}
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
                    3.3.5
                </span>

                <p
                    style={{
                    margin: 0,
                    color: "#374151",
                    fontSize: "1.05rem",
                    lineHeight: 1.5,
                    }}
                >
                    {slidesData.slideThreeThree.threeThreeFive}
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
                    3.3.6
                </span>

                <p
                    style={{
                    margin: 0,
                    color: "#374151",
                    fontSize: "1.05rem",
                    lineHeight: 1.5,
                    }}
                >
                    {slidesData.slideThreeThree.threeThreeSix}
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
                    3.3.7
                </span>

                <p
                    style={{
                    margin: 0,
                    color: "#374151",
                    fontSize: "1.05rem",
                    lineHeight: 1.5,
                    }}
                >
                    {slidesData.slideThreeThree.threeThreeSeven}
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
                    3.3.8
                </span>

                <p
                    style={{
                    margin: 0,
                    color: "#374151",
                    fontSize: "1.05rem",
                    lineHeight: 1.5,
                    }}
                >
                    {slidesData.slideThreeThree.threeThreeEight}
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
                    3.3.9
                </span>

                <p
                    style={{
                    margin: 0,
                    color: "#374151",
                    fontSize: "1.05rem",
                    lineHeight: 1.5,
                    }}
                >
                    {slidesData.slideThreeThree.threeThreeNine}
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
                    3.3.10
                </span>

                <p
                    style={{
                    margin: 0,
                    color: "#374151",
                    fontSize: "1.05rem",
                    lineHeight: 1.5,
                    }}
                >
                    {slidesData.slideThreeThree.threeThreeTen}
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
                    3.3.11
                </span>

                <p
                    style={{
                    margin: 0,
                    color: "#374151",
                    fontSize: "1.05rem",
                    lineHeight: 1.5,
                    }}
                >
                    {slidesData.slideThreeThree.threeThreeEleven}
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
                    3.3.12
                </span>

                <p
                    style={{
                    margin: 0,
                    color: "#374151",
                    fontSize: "1.05rem",
                    lineHeight: 1.5,
                    }}
                >
                    {slidesData.slideThreeThree.threeThreeTwelve}
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
                    3.3.13
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
                    {slidesData.slideThreeThree.threeThreeThirteen.intro}
                    </p>

                    <ol
                    style={{
                        margin: 0,
                        paddingLeft: "1.5rem",
                    }}
                    >
                    {slidesData.slideThreeThree.threeThreeThirteen.items.map(
                        (item, index) => (
                        <li
                            key={index}
                            style={{
                            paddingLeft: "0.35rem",
                            marginBottom:
                                index ===
                                slidesData.slideThreeThree.threeThreeThirteen.items.length - 1
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
    title: slidesData.slideThreeFour.title,
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
            {slidesData.slideThreeFour.title.toUpperCase()}
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
                3.4
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
                {slidesData.slideThreeFour.threeFour}
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
                    3.4.1
                </span>

                <p
                    style={{
                    margin: 0,
                    color: "#374151",
                    fontSize: "1.05rem",
                    lineHeight: 1.5,
                    }}
                >
                    {slidesData.slideThreeFour.threeFourOne}
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
                    3.4.2
                </span>

                <p
                    style={{
                    margin: 0,
                    color: "#374151",
                    fontSize: "1.05rem",
                    lineHeight: 1.5,
                    }}
                >
                    {slidesData.slideThreeFour.threeFourTwo}
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
                    3.4.3
                </span>

                <p
                    style={{
                    margin: 0,
                    color: "#374151",
                    fontSize: "1.05rem",
                    lineHeight: 1.5,
                    }}
                >
                    {slidesData.slideThreeFour.threeFourThree}
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
                    3.4.4
                </span>

                <p
                    style={{
                    margin: 0,
                    color: "#374151",
                    fontSize: "1.05rem",
                    lineHeight: 1.5,
                    }}
                >
                    {slidesData.slideThreeFour.threeFourFour}
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
                    3.4.5
                </span>

                <p
                    style={{
                    margin: 0,
                    color: "#374151",
                    fontSize: "1.05rem",
                    lineHeight: 1.5,
                    }}
                >
                    {slidesData.slideThreeFour.threeFourFive}
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
                    3.4.6
                </span>

                <p
                    style={{
                    margin: 0,
                    color: "#374151",
                    fontSize: "1.05rem",
                    lineHeight: 1.5,
                    }}
                >
                    {slidesData.slideThreeFour.threeFourSix}
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
                    3.4.7
                </span>

                <p
                    style={{
                    margin: 0,
                    color: "#374151",
                    fontSize: "1.05rem",
                    lineHeight: 1.5,
                    }}
                >
                    {slidesData.slideThreeFour.threeFourSeven}
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
                    3.4.8
                </span>

                <p
                    style={{
                    margin: 0,
                    color: "#374151",
                    fontSize: "1.05rem",
                    lineHeight: 1.5,
                    }}
                >
                    {slidesData.slideThreeFour.threeFourEight}
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
    title: slidesData.slideThreeFive.title,
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
            {slidesData.slideThreeFive.title.toUpperCase()}
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
                3.5
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
                {slidesData.slideThreeFive.threeFive}
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
                    3.5.1
                </span>

                <p
                    style={{
                    margin: 0,
                    color: "#374151",
                    fontSize: "1.05rem",
                    lineHeight: 1.5,
                    }}
                >
                    {slidesData.slideThreeFive.threeFiveOne}
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
                3.6
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
                {slidesData.slideThreeFive.threeSix}
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
                    3.6.1
                </span>

                <p
                    style={{
                    margin: 0,
                    color: "#374151",
                    fontSize: "1.05rem",
                    lineHeight: 1.5,
                    }}
                >
                    {slidesData.slideThreeFive.threeSixOne}
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
                    3.6.2
                </span>

                <p
                    style={{
                    margin: 0,
                    color: "#374151",
                    fontSize: "1.05rem",
                    lineHeight: 1.5,
                    }}
                >
                    {slidesData.slideThreeFive.threeSixTwo}
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
                    3.6.3
                </span>

                <p
                    style={{
                    margin: 0,
                    color: "#374151",
                    fontSize: "1.05rem",
                    lineHeight: 1.5,
                    }}
                >
                    {slidesData.slideThreeFive.threeSixThree}
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
    title: slidesData.slideThreeSix.title,
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
            {slidesData.slideThreeSix.title.toUpperCase()}
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
                3.7
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
                {slidesData.slideThreeSix.threeSeven}
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
                    3.7.1
                </span>

                <p
                    style={{
                    margin: 0,
                    color: "#374151",
                    fontSize: "1.05rem",
                    lineHeight: 1.5,
                    }}
                >
                    {slidesData.slideThreeSix.threeSevenOne}
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
                    3.7.2
                </span>

                <p
                    style={{
                    margin: 0,
                    color: "#374151",
                    fontSize: "1.05rem",
                    lineHeight: 1.5,
                    }}
                >
                    {slidesData.slideThreeSix.threeSevenTwo}
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
                    3.7.3
                </span>

                <p
                    style={{
                    margin: 0,
                    color: "#374151",
                    fontSize: "1.05rem",
                    lineHeight: 1.5,
                    }}
                >
                    {slidesData.slideThreeSix.threeSevenThree}
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
                    3.7.4
                </span>

                <p
                    style={{
                    margin: 0,
                    color: "#374151",
                    fontSize: "1.05rem",
                    lineHeight: 1.5,
                    }}
                >
                    {slidesData.slideThreeSix.threeSevenFour}
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
                    3.7.5
                </span>

                <p
                    style={{
                    margin: 0,
                    color: "#374151",
                    fontSize: "1.05rem",
                    lineHeight: 1.5,
                    }}
                >
                    {slidesData.slideThreeSix.threeSevenFive}
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
                3.8
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
                {slidesData.slideThreeSix.threeEight}
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
                    3.8.1
                </span>

                <p
                    style={{
                    margin: 0,
                    color: "#374151",
                    fontSize: "1.05rem",
                    lineHeight: 1.5,
                    }}
                >
                    {slidesData.slideThreeSix.threeEightOne}
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
                    3.8.2
                </span>

                <p
                    style={{
                    margin: 0,
                    color: "#374151",
                    fontSize: "1.05rem",
                    lineHeight: 1.5,
                    }}
                >
                    {slidesData.slideThreeSix.threeEightTwo}
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
                4.1
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
                {slidesData.slideFour.fourOne}
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
                    4.1.1
                </span>

                <p
                    style={{
                    margin: 0,
                    color: "#374151",
                    fontSize: "1.05rem",
                    lineHeight: 1.5,
                    }}
                >
                    {slidesData.slideFour.fourOneOne}
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
                    4.1.2
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
                    {slidesData.slideFour.fourOneTwo.intro}
                    </p>

                    <ol
                    style={{
                        margin: 0,
                        paddingLeft: "1.5rem",
                    }}
                    >
                    {slidesData.slideFour.fourOneTwo.items.map(
                        (item, index) => (
                        <li
                            key={index}
                            style={{
                            paddingLeft: "0.35rem",
                            marginBottom:
                                index ===
                                slidesData.slideFour.fourOneTwo.items.length - 1
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
                    4.1.3
                </span>

                <p
                    style={{
                    margin: 0,
                    color: "#374151",
                    fontSize: "1.05rem",
                    lineHeight: 1.5,
                    }}
                >
                    {slidesData.slideFour.fourOneThree}
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
                    4.1.4
                </span>

                <p
                    style={{
                    margin: 0,
                    color: "#374151",
                    fontSize: "1.05rem",
                    lineHeight: 1.5,
                    }}
                >
                    {slidesData.slideFour.fourOneFour}
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
                    4.1.5
                </span>

                <p
                    style={{
                    margin: 0,
                    color: "#374151",
                    fontSize: "1.05rem",
                    lineHeight: 1.5,
                    }}
                >
                    {slidesData.slideFour.fourOneFive}
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
                    4.1.6
                </span>

                <p
                    style={{
                    margin: 0,
                    color: "#374151",
                    fontSize: "1.05rem",
                    lineHeight: 1.5,
                    }}
                >
                    {slidesData.slideFour.fourOneSix}
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
                    4.1.7
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
                    {slidesData.slideFour.fourOneSeven.intro}
                    </p>

                    <ol
                    style={{
                        margin: 0,
                        paddingLeft: "1.5rem",
                    }}
                    >
                    {slidesData.slideFour.fourOneSeven.items.map(
                        (item, index) => (
                        <li
                            key={index}
                            style={{
                            paddingLeft: "0.35rem",
                            marginBottom:
                                index ===
                                slidesData.slideFour.fourOneSeven.items.length - 1
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
                    4.1.8
                </span>

                <p
                    style={{
                    margin: 0,
                    color: "#374151",
                    fontSize: "1.05rem",
                    lineHeight: 1.5,
                    }}
                >
                    {slidesData.slideFour.fourOneEight}
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
                    4.1.9
                </span>

                <p
                    style={{
                    margin: 0,
                    color: "#374151",
                    fontSize: "1.05rem",
                    lineHeight: 1.5,
                    }}
                >
                    {slidesData.slideFour.fourOneNine}
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
                    {slidesData.slideFive.fiveOneOne.intro}
                    </p>

                    <ol
                    style={{
                        margin: 0,
                        paddingLeft: "1.5rem",
                    }}
                    >
                    {slidesData.slideFive.fiveOneOne.items.map(
                        (item, index) => (
                        <li
                            key={index}
                            style={{
                            paddingLeft: "0.35rem",
                            marginBottom:
                                index ===
                                slidesData.slideFive.fiveOneOne.items.length - 1
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

                <p
                    style={{
                    margin: 0,
                    color: "#374151",
                    fontSize: "1.05rem",
                    lineHeight: 1.5,
                    }}
                >
                    {slidesData.slideFive.fiveOneThree}
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
    title: slidesData.slideFiveTwo.title,
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
            {slidesData.slideFiveTwo.title.toUpperCase()}
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
                {slidesData.slideFiveTwo.fiveTwo}
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
                    {slidesData.slideFiveTwo.fiveTwoOne.intro}
                    </p>

                    <ol
                    style={{
                        margin: 0,
                        paddingLeft: "1.5rem",
                    }}
                    >
                    {slidesData.slideFiveTwo.fiveTwoOne.items.map(
                        (item, index) => (
                        <li
                            key={index}
                            style={{
                            paddingLeft: "0.35rem",
                            marginBottom:
                                index ===
                                slidesData.slideFiveTwo.fiveTwoOne.items.length - 1
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
                    {slidesData.slideFiveTwo.fiveTwoTwo}
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
    title: slidesData.slideSeven.title,
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
            {slidesData.slideSeven.title.toUpperCase()}
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
                7.1
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
                {slidesData.slideSeven.sevenOne}
              </p>
            </div>

          </div>
        </div>
      </>
    ),
  },
  {
    title: slidesData.slideEight.title,
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
            {slidesData.slideEight.title.toUpperCase()}
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
                8.1
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
                {slidesData.slideEight.eightOne}
              </p>
            </div>

          </div>
        </div>
      </>
    ),
  },
  {
    title: slidesData.slideNine.title,
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
            {slidesData.slideNine.title.toUpperCase()}
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
                9.1
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
                {slidesData.slideNine.nineOne}
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
        questionId={questionsData.questionsEarly[0].id}
        question={questionsData.questionsEarly[0].question}
        options={questionsData.questionsEarly[0].options}
        correctAnswer={questionsData.questionsEarly[0].correctAnswer}
        explanation={questionsData.questionsEarly[0].explanation}
        category={questionsData.questionsEarly[0].category}
      />
    ),
  },
  {
    title: "Knowledge Check: Q2",
    content: (
      <MultipleChoiceQuestion
        questionId={questionsData.questionsEarly[1].id}
        question={questionsData.questionsEarly[1].question}
        options={questionsData.questionsEarly[1].options}
        correctAnswer={questionsData.questionsEarly[1].correctAnswer}
        explanation={questionsData.questionsEarly[1].explanation}
        category={questionsData.questionsEarly[1].category}
      />
    ),
  },
  {
    title: "Knowledge Check: Q3",
    content: (
      <MultipleChoiceQuestion
        questionId={questionsData.questionsEarly[2].id}
        question={questionsData.questionsEarly[2].question}
        options={questionsData.questionsEarly[2].options}
        correctAnswer={questionsData.questionsEarly[2].correctAnswer}
        explanation={questionsData.questionsEarly[2].explanation}
        category={questionsData.questionsEarly[2].category}
      />
    ),
  },
  {
    title: "Knowledge Check: Q4",
    content: (
      <MultipleChoiceQuestion
        questionId={questionsData.questionsEarly[3].id}
        question={questionsData.questionsEarly[3].question}
        options={questionsData.questionsEarly[3].options}
        correctAnswer={questionsData.questionsEarly[3].correctAnswer}
        explanation={questionsData.questionsEarly[3].explanation}
        category={questionsData.questionsEarly[3].category}
      />
    ),
  },
  {
    title: "Knowledge Check: Q5",
    content: (
      <MultipleChoiceQuestion
        questionId={questionsData.questionsEarly[4].id}
        question={questionsData.questionsEarly[4].question}
        options={questionsData.questionsEarly[4].options}
        correctAnswer={questionsData.questionsEarly[4].correctAnswer}
        explanation={questionsData.questionsEarly[4].explanation}
        category={questionsData.questionsEarly[4].category}
      />
    ),
  },
  {
    title: "Knowledge Check: Q6",
    content: (
      <MultipleChoiceQuestion
        questionId={questionsData.questionsEarly[5].id}
        question={questionsData.questionsEarly[5].question}
        options={questionsData.questionsEarly[5].options}
        correctAnswer={questionsData.questionsEarly[5].correctAnswer}
        explanation={questionsData.questionsEarly[5].explanation}
        category={questionsData.questionsEarly[5].category}
      />
    ),
  },
  {
    title: "Knowledge Check: Q7",
    content: (
      <MultipleChoiceQuestion
        questionId={questionsData.questionsEarly[6].id}
        question={questionsData.questionsEarly[6].question}
        options={questionsData.questionsEarly[6].options}
        correctAnswer={questionsData.questionsEarly[6].correctAnswer}
        explanation={questionsData.questionsEarly[6].explanation}
        category={questionsData.questionsEarly[6].category}
      />
    ),
  },
];