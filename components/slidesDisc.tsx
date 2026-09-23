import slidesData from '@/data/discSlides.json'
import MultipleChoiceQuestion from './multiple-choice-question';
import questionsData from '@/data/questions.json';
import ModuleTableOfContents from './module-title-slide';

type slides = 'eso' | 'policies' | 'cs' | 'accessibility' | 'conflict' | 'disc' | 'early' | 'job';

export const discSlides = (playerName: string, setCurrentSlides: React.Dispatch<React.SetStateAction<slides>>) => [
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
      display: "grid",
      gridTemplateColumns: "1fr 1fr",
      columnGap: "3.5rem",
      rowGap: "1.5rem",
      alignContent: "center",
      padding: "1.5rem 0 0.5rem",
    }}
  >
    {/* 2.1 Discrimination */}
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
        2.1
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
          Discrimination
        </h2>

        <p
          style={{
            margin: 0,
            color: "#374151",
            fontSize: "1rem",
            lineHeight: 1.5,
          }}
        >
          {slidesData.slideTwo.twoOne.replace("Discrimination: ", "")}
        </p>

        {/* 2.1.1 Sub-point */}
        <div
          style={{
            marginTop: "0.85rem",
            paddingLeft: "0.85rem",
            borderLeft: "3px solid #d8c9e5",
          }}
        >
          <div
            style={{
              color: "#582c83",
              fontSize: "0.85rem",
              fontWeight: 700,
              marginBottom: "0.25rem",
            }}
          >
            2.1.1 Prohibited Grounds
          </div>

          <p
            style={{
              margin: 0,
              color: "#4b5563",
              fontSize: "0.9rem",
              lineHeight: 1.45,
            }}
          >
            {slidesData.slideTwo.twoOneOne.replace(
              "Prohibited ground of discrimination includes but is not limited to ",
              "Includes, but is not limited to "
            )}
          </p>
        </div>
      </div>
    </div>

    {/* 2.2 Harassment */}
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
        2.2
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
          Harassment
        </h2>

        <p
          style={{
            margin: 0,
            color: "#374151",
            fontSize: "1rem",
            lineHeight: 1.5,
          }}
        >
          {slidesData.slideTwo.twoTwo.replace("Harassment: ", "")}
        </p>
      </div>
    </div>

    {/* 2.3 Sexual Harassment */}
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
        2.3
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
          Sexual Harassment
        </h2>

        <p
          style={{
            margin: 0,
            color: "#374151",
            fontSize: "1rem",
            lineHeight: 1.5,
          }}
        >
          {slidesData.slideTwo.twoThree.replace("Sexual harassment: ", "")}
        </p>
      </div>
    </div>

    {/* 2.4 Poisoned Environment */}
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
        2.4
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
          Poisoned Environment
        </h2>

        <p
          style={{
            margin: 0,
            color: "#374151",
            fontSize: "1rem",
            lineHeight: 1.5,
          }}
        >
          {slidesData.slideTwo.twoFour.replace("Poisoned environment: ", "")}
        </p>
      </div>
    </div>

    {/* 2.5 Member */}
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
        2.5
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
          Member
        </h2>

        <p
          style={{
            margin: 0,
            color: "#374151",
            fontSize: "1rem",
            lineHeight: 1.5,
          }}
        >
          {slidesData.slideTwo.twoFive.replace("Member: ", "")}
        </p>
      </div>
    </div>

    {/* 2.6 Workplace Violence */}
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
        2.6
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
          Workplace Violence
        </h2>

        <p
          style={{
            margin: 0,
            color: "#374151",
            fontSize: "1rem",
            lineHeight: 1.5,
          }}
        >
          {slidesData.slideTwo.twoSix.replace("Workplace Violence means ", "")}
        </p>
      </div>
    </div>

    {/* 2.7 Domestic Violence */}
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
        2.7
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
          Domestic Violence
        </h2>

        <p
          style={{
            margin: 0,
            color: "#374151",
            fontSize: "1rem",
            lineHeight: 1.5,
          }}
        >
          {slidesData.slideTwo.twoSeven.replace("Domestic Violence: ", "")}
        </p>
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
                    5.1.6
                </span>

                <p
                    style={{
                    margin: 0,
                    color: "#374151",
                    fontSize: "1.05rem",
                    lineHeight: 1.5,
                    }}
                >
                    {slidesData.slideFive.fiveOneSix}
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
                    5.1.7
                </span>

                <p
                    style={{
                    margin: 0,
                    color: "#374151",
                    fontSize: "1.05rem",
                    lineHeight: 1.5,
                    }}
                >
                    {slidesData.slideFive.fiveOneSeven}
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

                <p
                    style={{
                    margin: 0,
                    color: "#374151",
                    fontSize: "1.05rem",
                    lineHeight: 1.5,
                    }}
                >
                    {slidesData.slideFiveTwo.fiveTwoOne}
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
                    {slidesData.slideFiveTwo.fiveTwoTwo}
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
                    {slidesData.slideFiveTwo.fiveTwoThree.intro}
                    </p>

                    <ol
                    style={{
                        margin: 0,
                        paddingLeft: "1.5rem",
                    }}
                    >
                    {slidesData.slideFiveTwo.fiveTwoThree.items.map(
                        (item, index) => (
                        <li
                            key={index}
                            style={{
                            paddingLeft: "0.35rem",
                            marginBottom:
                                index ===
                                slidesData.slideFiveTwo.fiveTwoThree.items.length - 1
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
                    {slidesData.slideFiveTwo.fiveTwoFour}
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
                    5.2.5
                </span>

                <p
                    style={{
                    margin: 0,
                    color: "#374151",
                    fontSize: "1.05rem",
                    lineHeight: 1.5,
                    }}
                >
                    {slidesData.slideFiveTwo.fiveTwoFive}
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
                    5.2.5
                </span>

                <p
                    style={{
                    margin: 0,
                    color: "#374151",
                    fontSize: "1.05rem",
                    lineHeight: 1.5,
                    }}
                >
                    {slidesData.slideFiveTwo.fiveTwoFive}
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
                    5.2.6
                </span>

                <p
                    style={{
                    margin: 0,
                    color: "#374151",
                    fontSize: "1.05rem",
                    lineHeight: 1.5,
                    }}
                >
                    {slidesData.slideFiveTwo.fiveTwoSix}
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
                    5.2.7
                </span>

                <p
                    style={{
                    margin: 0,
                    color: "#374151",
                    fontSize: "1.05rem",
                    lineHeight: 1.5,
                    }}
                >
                    {slidesData.slideFiveTwo.fiveTwoSeven}
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
                    5.2.8
                </span>

                <p
                    style={{
                    margin: 0,
                    color: "#374151",
                    fontSize: "1.05rem",
                    lineHeight: 1.5,
                    }}
                >
                    {slidesData.slideFiveTwo.fiveTwoEight}
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
                    5.2.9
                </span>

                <p
                    style={{
                    margin: 0,
                    color: "#374151",
                    fontSize: "1.05rem",
                    lineHeight: 1.5,
                    }}
                >
                    {slidesData.slideFiveTwo.fiveTwoNine}
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
                    5.2.10
                </span>

                <p
                    style={{
                    margin: 0,
                    color: "#374151",
                    fontSize: "1.05rem",
                    lineHeight: 1.5,
                    }}
                >
                    {slidesData.slideFiveTwo.fiveTwoTen}
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
                    5.2.11
                </span>

                <p
                    style={{
                    margin: 0,
                    color: "#374151",
                    fontSize: "1.05rem",
                    lineHeight: 1.5,
                    }}
                >
                    {slidesData.slideFiveTwo.fiveTwoEleven}
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
    title: slidesData.slideFiveThree.title,
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
            {slidesData.slideFiveThree.title.toUpperCase()}
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
                    {slidesData.slideFiveThree.fiveThreeOne}
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
                    {slidesData.slideFiveThree.fiveThreeTwo}
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
        questionId={questionsData.questionsDisc[0].id}
        question={questionsData.questionsDisc[0].question}
        options={questionsData.questionsDisc[0].options}
        correctAnswer={questionsData.questionsDisc[0].correctAnswer}
        explanation={questionsData.questionsDisc[0].explanation}
        category={questionsData.questionsDisc[0].category}
      />
    ),
  },
  {
    title: "Knowledge Check: Q2",
    content: (
      <MultipleChoiceQuestion
        questionId={questionsData.questionsDisc[1].id}
        question={questionsData.questionsDisc[1].question}
        options={questionsData.questionsDisc[1].options}
        correctAnswer={questionsData.questionsDisc[1].correctAnswer}
        explanation={questionsData.questionsDisc[1].explanation}
        category={questionsData.questionsDisc[1].category}
      />
    ),
  },
  {
    title: "Knowledge Check: Q3",
    content: (
      <MultipleChoiceQuestion
        questionId={questionsData.questionsDisc[2].id}
        question={questionsData.questionsDisc[2].question}
        options={questionsData.questionsDisc[2].options}
        correctAnswer={questionsData.questionsDisc[2].correctAnswer}
        explanation={questionsData.questionsDisc[2].explanation}
        category={questionsData.questionsDisc[2].category}
      />
    ),
  },
  {
    title: "Knowledge Check: Q4",
    content: (
      <MultipleChoiceQuestion
        questionId={questionsData.questionsDisc[3].id}
        question={questionsData.questionsDisc[3].question}
        options={questionsData.questionsDisc[3].options}
        correctAnswer={questionsData.questionsDisc[3].correctAnswer}
        explanation={questionsData.questionsDisc[3].explanation}
        category={questionsData.questionsDisc[3].category}
      />
    ),
  },
  {
    title: "Knowledge Check: Q5",
    content: (
      <MultipleChoiceQuestion
        questionId={questionsData.questionsDisc[4].id}
        question={questionsData.questionsDisc[4].question}
        options={questionsData.questionsDisc[4].options}
        correctAnswer={questionsData.questionsDisc[4].correctAnswer}
        explanation={questionsData.questionsDisc[4].explanation}
        category={questionsData.questionsDisc[4].category}
      />
    ),
  },
  {
    title: "Knowledge Check: Q6",
    content: (
      <MultipleChoiceQuestion
        questionId={questionsData.questionsDisc[5].id}
        question={questionsData.questionsDisc[5].question}
        options={questionsData.questionsDisc[5].options}
        correctAnswer={questionsData.questionsDisc[5].correctAnswer}
        explanation={questionsData.questionsDisc[5].explanation}
        category={questionsData.questionsDisc[5].category}
      />
    ),
  },
  {
    title: "Knowledge Check: Q7",
    content: (
      <MultipleChoiceQuestion
        questionId={questionsData.questionsDisc[6].id}
        question={questionsData.questionsDisc[6].question}
        options={questionsData.questionsDisc[6].options}
        correctAnswer={questionsData.questionsDisc[6].correctAnswer}
        explanation={questionsData.questionsDisc[6].explanation}
        category={questionsData.questionsDisc[6].category}
      />
    ),
  },
];