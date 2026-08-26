import slidesData from '@/data/slides.json'

interface IncidentResponseSlideProps {
  visibleSteps: number;
}

export const IncidentResponseSlide: React.FC<IncidentResponseSlideProps> = ({
  visibleSteps,
}) => {
  return (
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
        {slidesData.incidentSlide.title.toUpperCase()}
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
          position: "relative",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          margin: "1.5rem 1rem 0",
        }}
      >

        <div
          style={{
            position: "absolute",
            left: "2%",
            right: "2%",
            top: "50%",
            height: "4px",
            backgroundColor: "#9b7db5",
            transform: "translateY(-50%)",
            borderRadius: "2px",
            zIndex: 0,
          }}
        />

        <div
          style={{
            position: "relative",
            width: "22%",
            height: "100%",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            zIndex: 1,
          }}
        >
          {visibleSteps >= 1 && (
            <div
              style={{
                position: "absolute",
                top: "calc(50% + 2rem)",
                width: "100%",
                minHeight: "145px",
                backgroundColor: "#f1f3f5",
                borderRadius: "12px",
                padding: "1.25rem",
                boxSizing: "border-box",
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
                textAlign: "center",
                boxShadow: "0 2px 6px rgba(0,0,0,0.06)",
              }}
            >
              <h2
                style={{
                  margin: 0,
                  color: "#582c83",
                  fontSize: "1.25rem",
                }}
              >
                {slidesData.incidentSlide.card1Title}
              </h2>

              <p
                style={{
                  margin: "0.6rem 0 0",
                  color: "#374151",
                  fontSize: "0.9rem",
                  lineHeight: 1.5,
                }}
              >
                {slidesData.incidentSlide.card1Desc}
              </p>
            </div>
          )}

          <div
            style={{
              width: "24px",
              height: "24px",
              borderRadius: "50%",
              backgroundColor: "#ffffff",
              border: "4px solid #9b7db5",
              boxSizing: "border-box",
            }}
          />
        </div>

        <div
          style={{
            position: "relative",
            width: "22%",
            height: "100%",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            zIndex: 1,
          }}
        >
          {visibleSteps >= 2 && (
            <div
              style={{
                position: "absolute",
                bottom: "calc(50% + 2rem)",
                width: "100%",
                minHeight: "145px",
                backgroundColor: "#f1f3f5",
                borderRadius: "12px",
                padding: "1.25rem",
                boxSizing: "border-box",
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
                textAlign: "center",
                boxShadow: "0 2px 6px rgba(0,0,0,0.06)",
              }}
            >
              <h2
                style={{
                  margin: 0,
                  color: "#582c83",
                  fontSize: "1.25rem",
                }}
              >
                {slidesData.incidentSlide.card2Title}
              </h2>

              <p
                style={{
                  margin: "0.6rem 0 0",
                  color: "#374151",
                  fontSize: "0.9rem",
                  lineHeight: 1.5,
                }}
              >
                {slidesData.incidentSlide.card2Desc}
              </p>
            </div>
          )}

          <div
            style={{
              width: "24px",
              height: "24px",
              borderRadius: "50%",
              backgroundColor: "#ffffff",
              border: "4px solid #9b7db5",
              boxSizing: "border-box",
            }}
          />
        </div>

        <div
          style={{
            position: "relative",
            width: "22%",
            height: "100%",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            zIndex: 1,
          }}
        >
          {visibleSteps >= 3 && (
            <div
              style={{
                position: "absolute",
                top: "calc(50% + 2rem)",
                width: "100%",
                minHeight: "145px",
                backgroundColor: "#f1f3f5",
                borderRadius: "12px",
                padding: "1.25rem",
                boxSizing: "border-box",
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
                textAlign: "center",
                boxShadow: "0 2px 6px rgba(0,0,0,0.06)",
              }}
            >
              <h2
                style={{
                  margin: 0,
                  color: "#582c83",
                  fontSize: "1.25rem",
                }}
              >
                {slidesData.incidentSlide.card3Title}
              </h2>

              <p
                style={{
                  margin: "0.6rem 0 0",
                  color: "#374151",
                  fontSize: "0.9rem",
                  lineHeight: 1.5,
                }}
              >
                {slidesData.incidentSlide.card3Desc}
              </p>
            </div>
          )}

          <div
            style={{
              width: "24px",
              height: "24px",
              borderRadius: "50%",
              backgroundColor: "#ffffff",
              border: "4px solid #9b7db5",
              boxSizing: "border-box",
            }}
          />
        </div>

        <div
          style={{
            position: "relative",
            width: "22%",
            height: "100%",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            zIndex: 1,
          }}
        >
          {visibleSteps >= 4 && (
            <div
              style={{
                position: "absolute",
                bottom: "calc(50% + 2rem)",
                width: "100%",
                minHeight: "145px",
                backgroundColor: "#f1f3f5",
                borderRadius: "12px",
                padding: "1.25rem",
                boxSizing: "border-box",
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
                textAlign: "center",
                boxShadow: "0 2px 6px rgba(0,0,0,0.06)",
              }}
            >
              <h2
                style={{
                  margin: 0,
                  color: "#582c83",
                  fontSize: "1.25rem",
                }}
              >
                {slidesData.incidentSlide.card4Title}
              </h2>

              <p
                style={{
                  margin: "0.6rem 0 0",
                  color: "#374151",
                  fontSize: "0.9rem",
                  lineHeight: 1.5,
                }}
              >
                {slidesData.incidentSlide.card4Desc}
              </p>
            </div>
          )}

          <div
            style={{
              width: "24px",
              height: "24px",
              borderRadius: "50%",
              backgroundColor: "#ffffff",
              border: "4px solid #9b7db5",
              boxSizing: "border-box",
            }}
          />
        </div>
      </div>
    </div>
  );
};