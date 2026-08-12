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
        INCIDENT RESPONSE & REPORTING
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
                1. Isolate
              </h2>

              <p
                style={{
                  margin: "0.6rem 0 0",
                  color: "#374151",
                  fontSize: "0.9rem",
                  lineHeight: 1.5,
                }}
              >
                Disconnect Wi-Fi or network cables immediately if malware is
                suspected.
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
                2. Report
              </h2>

              <p
                style={{
                  margin: "0.6rem 0 0",
                  color: "#374151",
                  fontSize: "0.9rem",
                  lineHeight: 1.5,
                }}
              >
                Contact Union IT & Privacy Officer within 15 minutes of
                discovery.
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
                3. Preserve
              </h2>

              <p
                style={{
                  margin: "0.6rem 0 0",
                  color: "#374151",
                  fontSize: "0.9rem",
                  lineHeight: 1.5,
                }}
              >
                Document details, take screenshots, and do not reboot or wipe
                machine.
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
                4. Remediate
              </h2>

              <p
                style={{
                  margin: "0.6rem 0 0",
                  color: "#374151",
                  fontSize: "0.9rem",
                  lineHeight: 1.5,
                }}
              >
                Follow IT guidance and assist PIPEDA breach logging if
                required.
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