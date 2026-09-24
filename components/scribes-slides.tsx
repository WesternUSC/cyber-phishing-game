type slides =
  | 'eso'
  | 'policies'
  | 'cs'
  | 'accessibility'
  | 'conflict'
  | 'disc'
  | 'early'
  | 'job';

export const scribesSlides = (
  playerName: string,
  scribe1: string,
  scribe2: string,
  scribe3: string,
  scribe4: string,
  scribe5: string,
  scribe6: string,
  scribe7: string,
  setCurrentSlides: React.Dispatch<React.SetStateAction<slides>>
) => {
  const scribes = [
    scribe1,
    scribe2,
    scribe3,
    scribe4,
    scribe5,
    scribe6,
    scribe7,
  ].filter((scribe) => scribe.trim() !== "");

  const titleSlide = {
    title: "Title",
    content: (
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          height: "100%",
          width: "100%",
          backgroundColor: "#582c83",
        }}
      >
        <div
          style={{
            color: "#ffffff",
            fontSize: "1.25rem",
          }}
        >
          Subtitle
        </div>

        <h1
          style={{
            fontSize: "5rem",
            color: "#fff",
            margin: 0,
            textAlign: "center",
            fontWeight: "bold",
          }}
        >
          Module title
        </h1>

        <div
          style={{
            width: "80px",
            height: "4px",
            backgroundColor: "#9b7db5",
            borderRadius: "2px",
          }}
        />

        <br />

        <p
          style={{
            color: "#ffffff",
            fontSize: "1.25rem",
            width: "40%",
            textAlign: "center",
          }}
        >
          Description
        </p>
      </div>
    ),
  };

  const scribeSlides = scribes.map((scribe, index) => ({
    title: `Scribe ${index + 1}`,
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
          {scribe.split("-")[0]}
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
            src={scribe.substring(scribe.indexOf("-") + 1)}
            title={`Scribe ${index + 1}`}
            className="h-full w-full border-0"
          />
        </div>
      </div>
    ),
  }));

  return [titleSlide, ...scribeSlides];
};
