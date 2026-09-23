import slidesData from '@/data/policiesSlides.json'
import MultipleChoiceQuestion from './multiple-choice-question';
import questionsData from '@/data/questions.json';
import ModuleTableOfContents from './module-title-slide';

type slides = 'eso' | 'policies' | 'cs' | 'accessibility' | 'conflict' | 'disc' | 'early' | 'job';

export const scribesSlides = (
  playerName: string,
  scribe1: string,
  scribe2: string,
  setCurrentSlides: React.Dispatch<React.SetStateAction<slides>>
) => {
  console.log("scribe:", scribe2);

  return [
  {
    title: "Title",
    content: (
      <>
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

          <br></br>

          <p style={{color:"#ffffff", fontSize: "1.25rem", width: "40%", textAlign: "center"}}>
            Description
          </p>
        </div>
      </>
    ),
  },
  {
    title: "Scribe 1",
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
            Scribe Title
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
                    src={scribe1}
                    title="Google Drive Training Guide"
                    className="h-full w-full border-0"
                />
            </div>
        </div>
      </>
    ),
  },
  {
    title: "Scribe 2",
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
            Scribe 2 Title
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
                    src={scribe2}
                    title="Google Drive Training Guide"
                    className="h-full w-full border-0"
                />
            </div>
        </div>
      </>
    ),
  }
];
};