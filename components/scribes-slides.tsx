'use client';

export const scribesSlides = (
  playerName: string,
  scribe1: string,
  scribe2: string,
  scribe3: string,
  scribe4: string,
  scribe5: string,
  scribe6: string,
  scribe7: string
) => {
  const scribes = [
    { url: scribe1, title: scribe1.split("-")[0] },
    { url: scribe2, title: scribe2.split("-")[0] },
    { url: scribe3, title: scribe3.split("-")[0] },
    { url: scribe4, title: scribe4.split("-")[0] },
    { url: scribe5, title: scribe5.split("-")[0] },
    { url: scribe6, title: scribe6.split("-")[0] },
    { url: scribe7, title: scribe7.split("-")[0] },
  ].filter((scribe) => scribe.url.trim() !== "");

  const titleSlide = {
    title: "Title",
    content: (
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          height: "100%",
          width: "100%",
          backgroundColor: "#582c83",
          color: "#ffffff",
          boxSizing: "border-box",
          padding: "2rem clamp(1rem, 3vw, 4rem)",
        }}
      >
        <div
          style={{
            textAlign: "center",
            marginBottom: "2rem",
            flexShrink: 0,
          }}
        >
          <h1
            style={{
              fontSize: "3.5rem",
              margin: 0,
              fontWeight: "bold",
            }}
          >
            Job Training
          </h1>

          <div
            style={{
              width: "80px",
              height: "4px",
              backgroundColor: "#9b7db5",
              borderRadius: "2px",
              margin: "1rem auto 0",
            }}
          />

          <p
            style={{
              fontSize: "1.1rem",
              margin: "1rem 0 0",
              color: "#ffffff",
            }}
          >
            How-to guides for your position
          </p>
        </div>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "minmax(0, 1fr)",
            gridAutoRows: "minmax(56px, auto)",
            gap: "0.6rem",
            flex: 1,
            minHeight: 0,
            overflowY: "auto",
            paddingRight: "0.25rem",
          }}
        >
          {scribes.map((scribe, index) => (
            <button
              key={`${scribe.url}-${index}`}
              type="button"
              onClick={() => {
                window.dispatchEvent(
                  new CustomEvent("scribe-slide-select", {
                    detail: { slideIndex: index + 1 },
                  })
                );
              }}
              style={{
                display: "flex",
                alignItems: "center",
                width: "100%",
                minHeight: "56px",
                padding: "0.65rem 1rem",
                boxSizing: "border-box",
                backgroundColor: "rgba(255, 255, 255, 0.10)",
                color: "#ffffff",
                border: "1px solid rgba(255, 255, 255, 0.20)",
                borderRadius: "6px",
                cursor: "pointer",
                textAlign: "left",
                fontSize: "0.95rem",
                transition:
                  "background-color 0.2s ease, border-color 0.2s ease, transform 0.15s ease",
              }}
              onMouseEnter={(event) => {
                event.currentTarget.style.backgroundColor =
                  "rgba(155, 125, 181, 0.65)";
                event.currentTarget.style.transform = "translateY(-1px)";
              }}
              onMouseLeave={(event) => {
                event.currentTarget.style.backgroundColor =
                  "rgba(255, 255, 255, 0.10)";
                event.currentTarget.style.transform = "translateY(0)";
              }}
            >
              <span
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  width: "28px",
                  height: "28px",
                  flexShrink: 0,
                  backgroundColor: "#9b7db5",
                  borderRadius: "50%",
                  fontSize: "0.8rem",
                  fontWeight: "bold",
                  marginRight: "0.5rem",
                }}
              >
                {index + 1}
              </span>

              <span
                style={{
                  minWidth: 0,
                  overflow: "hidden",
                  textOverflow: "ellipsis",
                  whiteSpace: "nowrap",
                }}
              >
                {scribe.title.trim() || scribe.url.split("-")[0]}
              </span>
            </button>
          ))}
        </div>
      </div>
    ),
  };

  const scribeSlides = scribes.map((scribe, index) => ({
    title: scribe.title.trim() || `Scribe ${index + 1}`,
    content: (
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
          {scribe.title.trim() || scribe.url.split("-")[0]}
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

        <div className="flex flex-1 min-h-0 bg-white">
          <iframe
            src={scribe.url.substring(scribe.url.indexOf("-") + 1)}
            title={scribe.title.trim() || `Scribe ${index + 1}`}
            className="h-full w-full border-0"
          />
        </div>
      </div>
    ),
    isScribe: true,
  }));

  return [titleSlide, ...scribeSlides];
};