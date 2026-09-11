import slidesData from '@/data/customerServiceSlides.json'
import MultipleChoiceQuestion from './multiple-choice-question';
import questionsData from '@/data/questions.json';
import ModuleTableOfContents from './module-title-slide';

type slides = 'eso' | 'policies' | 'cs' | 'culture';

export const customerServiceSlides = (playerName: string, setCurrentSlides: React.Dispatch<React.SetStateAction<slides>>) => [
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
        </div>

        <div
            style={{
            flex: 1,
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            columnGap: "3.5rem",
            rowGap: "1.5rem",
            alignContent: "center",
            padding: "1.5rem 0 0.5rem",
            }}
        >
            <div
            style={{
                display: "flex",
                gap: "1rem",
                padding: "0 0 1.5rem",
                borderBottom: "1px solid #e5e7eb",
            }}
            >
            <div
                style={{
                flexShrink: 0,
                width: "42px",
                height: "42px",
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
                1.1
            </div>

            <div>
                <h2
                style={{
                    margin: "0 0 0.4rem",
                    color: "#582c83",
                    fontSize: "1.15rem",
                    fontWeight: 700,
                }}
                >
                Accessibility
                </h2>

                <p
                style={{
                    margin: 0,
                    color: "#374151",
                    fontSize: "1rem",
                    lineHeight: 1.5,
                }}
                >
                {slidesData.slideOne.oneOne.replace("Accessibility: ", "")}
                </p>
            </div>
            </div>

            <div
            style={{
                display: "flex",
                gap: "1rem",
                padding: "0 0 1.5rem",
                borderBottom: "1px solid #e5e7eb",
            }}
            >
            <div
                style={{
                flexShrink: 0,
                width: "42px",
                height: "42px",
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
                1.2
            </div>

            <div>
                <h2
                style={{
                    margin: "0 0 0.4rem",
                    color: "#582c83",
                    fontSize: "1.15rem",
                    fontWeight: 700,
                }}
                >
                Assistive Device
                </h2>

                <p
                style={{
                    margin: 0,
                    color: "#374151",
                    fontSize: "1rem",
                    lineHeight: 1.5,
                }}
                >
                {slidesData.slideOne.oneTwo.replace("Assistive Device: ", "")}
                </p>
            </div>
            </div>

            <div
            style={{
                display: "flex",
                gap: "1rem",
                padding: "0 0 1.5rem",
                borderBottom: "1px solid #e5e7eb",
            }}
            >
            <div
                style={{
                flexShrink: 0,
                width: "42px",
                height: "42px",
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
                1.3
            </div>

            <div>
                <h2
                style={{
                    margin: "0 0 0.4rem",
                    color: "#582c83",
                    fontSize: "1.15rem",
                    fontWeight: 700,
                }}
                >
                Service Animal
                </h2>

                <p
                style={{
                    margin: 0,
                    color: "#374151",
                    fontSize: "1rem",
                    lineHeight: 1.5,
                }}
                >
                {slidesData.slideOne.oneThree.replace("Service Animal: ", "")}
                </p>
            </div>
            </div>

            <div
            style={{
                display: "flex",
                gap: "1rem",
                padding: "0 0 1.5rem",
                borderBottom: "1px solid #e5e7eb",
            }}
            >
            <div
                style={{
                flexShrink: 0,
                width: "42px",
                height: "42px",
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
                1.4
            </div>

            <div>
                <h2
                style={{
                    margin: "0 0 0.4rem",
                    color: "#582c83",
                    fontSize: "1.15rem",
                    fontWeight: 700,
                }}
                >
                Support Person
                </h2>

                <p
                style={{
                    margin: 0,
                    color: "#374151",
                    fontSize: "1rem",
                    lineHeight: 1.5,
                }}
                >
                {slidesData.slideOne.oneFour.replace("Support Person: ", "")}
                </p>
            </div>
            </div>

            <div
            style={{
                display: "flex",
                gap: "1rem",
                padding: "0 0 1.5rem",
                borderBottom: "1px solid #e5e7eb",
            }}
            >
            <div
                style={{
                flexShrink: 0,
                width: "42px",
                height: "42px",
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
                1.5
            </div>

            <div>
                <h2
                style={{
                    margin: "0 0 0.4rem",
                    color: "#582c83",
                    fontSize: "1.15rem",
                    fontWeight: 700,
                }}
                >
                Feedback
                </h2>

                <p
                style={{
                    margin: 0,
                    color: "#374151",
                    fontSize: "1rem",
                    lineHeight: 1.5,
                }}
                >
                {slidesData.slideOne.oneFive.replace("Feedback: ", "")}
                </p>
            </div>
            </div>

            <div
            style={{
                display: "flex",
                gap: "1rem",
                padding: "0 0 1.5rem",
                borderBottom: "1px solid #e5e7eb",
            }}
            >
            <div
                style={{
                flexShrink: 0,
                width: "42px",
                height: "42px",
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
                1.6
            </div>

            <div>
                <h2
                style={{
                    margin: "0 0 0.4rem",
                    color: "#582c83",
                    fontSize: "1.15rem",
                    fontWeight: 700,
                }}
                >
                Person with Disabilities
                </h2>

                <p
                style={{
                    margin: 0,
                    color: "#374151",
                    fontSize: "1rem",
                    lineHeight: 1.5,
                }}
                >
                {slidesData.slideOne.oneSix.replace(
                    "Person with Disabilities: ",
                    ""
                )}
                </p>
            </div>
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
                2.1
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
                {slidesData.slideTwo.twoOne}
              </p>
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
                4.2
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
                {slidesData.slideFour.fourTwo}
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
                    4.2.1
                </span>

                <p
                    style={{
                    margin: 0,
                    color: "#374151",
                    fontSize: "1.05rem",
                    lineHeight: 1.5,
                    }}
                >
                    {slidesData.slideFour.fourTwoOne}
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
                4.3
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
                {slidesData.slideFour.fourThree}
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
                    4.3.1
                </span>

                <p
                    style={{
                    margin: 0,
                    color: "#374151",
                    fontSize: "1.05rem",
                    lineHeight: 1.5,
                    }}
                >
                    {slidesData.slideFour.fourThreeOne}
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
                    4.3.2
                </span>

                <p
                    style={{
                    margin: 0,
                    color: "#374151",
                    fontSize: "1.05rem",
                    lineHeight: 1.5,
                    }}
                >
                    {slidesData.slideFour.fourThreeTwo}
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
    title: slidesData.slideFourContinued.title,
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
            {slidesData.slideFourContinued.title.toUpperCase()}
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
                4.4
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
                {slidesData.slideFourContinued.fourFour}
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
                    4.4.1
                </span>

                <p
                    style={{
                    margin: 0,
                    color: "#374151",
                    fontSize: "1.05rem",
                    lineHeight: 1.5,
                    }}
                >
                    {slidesData.slideFourContinued.fourFourOne}
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
                    4.4.2
                </span>

                <p
                    style={{
                    margin: 0,
                    color: "#374151",
                    fontSize: "1.05rem",
                    lineHeight: 1.5,
                    }}
                >
                    {slidesData.slideFourContinued.fourFourTwo}
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
    title: slidesData.slideFourContinued.title,
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
            {slidesData.slideFourContinued.title.toUpperCase()}
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
                4.5
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
                    4.5.1
                </span>

                <p
                    style={{
                    margin: 0,
                    color: "#374151",
                    fontSize: "1.05rem",
                    lineHeight: 1.5,
                    }}
                >
                    {slidesData.slideFourContinued.fourFiveOne}
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
                    4.5.2
                </span>

                <p
                    style={{
                    margin: 0,
                    color: "#374151",
                    fontSize: "1.05rem",
                    lineHeight: 1.5,
                    }}
                >
                    {slidesData.slideFourContinued.fourFiveTwo}
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
                    4.5.3
                </span>

                <p
                    style={{
                    margin: 0,
                    color: "#374151",
                    fontSize: "1.05rem",
                    lineHeight: 1.5,
                    }}
                >
                    {slidesData.slideFourContinued.fourFiveThree}
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
                    4.5.4
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
                    {slidesData.slideFourContinued.fourFiveFour.intro}
                    </p>

                    <ol
                    style={{
                        margin: 0,
                        paddingLeft: "1.5rem",
                    }}
                    >
                    {slidesData.slideFourContinued.fourFiveFour.items.map(
                        (item, index) => (
                        <li
                            key={index}
                            style={{
                            paddingLeft: "0.35rem",
                            marginBottom:
                                index ===
                                slidesData.slideFourContinued.fourFiveFour.items.length - 1
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
                    4.5.5
                </span>

                <p
                    style={{
                    margin: 0,
                    color: "#374151",
                    fontSize: "1.05rem",
                    lineHeight: 1.5,
                    }}
                >
                    {slidesData.slideFourContinued.fourFiveFive}
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
    title: slidesData.slideFourContinued.title,
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
            {slidesData.slideFourContinued.title.toUpperCase()}
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
                4.6
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
                {slidesData.slideFourContinuedTwo.fourSix}
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
                    4.6.1
                </span>

                <p
                    style={{
                    margin: 0,
                    color: "#374151",
                    fontSize: "1.05rem",
                    lineHeight: 1.5,
                    }}
                >
                    {slidesData.slideFourContinuedTwo.fourSixOne}
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
                    4.6.2
                </span>

                <p
                    style={{
                    margin: 0,
                    color: "#374151",
                    fontSize: "1.05rem",
                    lineHeight: 1.5,
                    }}
                >
                    {slidesData.slideFourContinuedTwo.fourSixTwo}
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
                    4.6.3
                </span>

                <p
                    style={{
                    margin: 0,
                    color: "#374151",
                    fontSize: "1.05rem",
                    lineHeight: 1.5,
                    }}
                >
                    {slidesData.slideFourContinuedTwo.fourSixThree}
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
                5.1
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
                {slidesData.slideFive.fiveOne}
              </p>
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
              alignItems: "center",
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
              alignItems: "center",
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
              alignItems: "center",
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
    title: "Knowledge Check: Q1",
    content: (
      <MultipleChoiceQuestion
        questionId={questionsData.questionsAcceptableUse[0].id}
        question={questionsData.questionsAcceptableUse[0].question}
        options={questionsData.questionsAcceptableUse[0].options}
        correctAnswer={questionsData.questionsAcceptableUse[0].correctAnswer}
        explanation={questionsData.questionsAcceptableUse[0].explanation}
        category={questionsData.questionsAcceptableUse[0].category}
      />
    ),
  },
  {
    title: "Knowledge Check: Q2",
    content: (
      <MultipleChoiceQuestion
        questionId={questionsData.questionsAcceptableUse[1].id}
        question={questionsData.questionsAcceptableUse[1].question}
        options={questionsData.questionsAcceptableUse[1].options}
        correctAnswer={questionsData.questionsAcceptableUse[1].correctAnswer}
        explanation={questionsData.questionsAcceptableUse[1].explanation}
        category={questionsData.questionsAcceptableUse[1].category}
      />
    ),
  },
  {
    title: "Knowledge Check: Q3",
    content: (
      <MultipleChoiceQuestion
        questionId={questionsData.questionsAcceptableUse[2].id}
        question={questionsData.questionsAcceptableUse[2].question}
        options={questionsData.questionsAcceptableUse[2].options}
        correctAnswer={questionsData.questionsAcceptableUse[2].correctAnswer}
        explanation={questionsData.questionsAcceptableUse[2].explanation}
        category={questionsData.questionsAcceptableUse[2].category}
      />
    ),
  },
  {
    title: "Knowledge Check: Q4",
    content: (
      <MultipleChoiceQuestion
        questionId={questionsData.questionsAcceptableUse[3].id}
        question={questionsData.questionsAcceptableUse[3].question}
        options={questionsData.questionsAcceptableUse[3].options}
        correctAnswer={questionsData.questionsAcceptableUse[3].correctAnswer}
        explanation={questionsData.questionsAcceptableUse[3].explanation}
        category={questionsData.questionsAcceptableUse[3].category}
      />
    ),
  },
  {
    title: "Knowledge Check: Q5",
    content: (
      <MultipleChoiceQuestion
        questionId={questionsData.questionsAcceptableUse[4].id}
        question={questionsData.questionsAcceptableUse[4].question}
        options={questionsData.questionsAcceptableUse[4].options}
        correctAnswer={questionsData.questionsAcceptableUse[4].correctAnswer}
        explanation={questionsData.questionsAcceptableUse[4].explanation}
        category={questionsData.questionsAcceptableUse[4].category}
      />
    ),
  },
];