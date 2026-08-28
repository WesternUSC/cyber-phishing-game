import React from 'react';
import { IncidentResponseSlide } from './incident-response-slide';
import { StoredSignature } from './stored-signature';
import { useRef } from 'react';
import { toPng } from 'html-to-image';
import slidesData from '@/data/jobTrainingSlides.json'

const headerStyle: React.CSSProperties = {
  padding: "14px",
  textAlign: "left",
  border: "1px solid rgba(255,255,255,0.25)",
};

const cellStyle: React.CSSProperties = {
  padding: "14px",
  textAlign: "left",
  border: "1px solid #ddd",
  backgroundColor: "white",
  color: "#102e5a",
};

const Certificate = ({ playerName }: { playerName: string }) => {
  const certificateRef = useRef<HTMLDivElement>(null);

  const downloadCertificate = async () => {
    if (!certificateRef.current) return;

    try {
      const dataUrl = await toPng(certificateRef.current, {
        pixelRatio: 2,
        cacheBust: true,
      });

      const link = document.createElement("a");
      link.download = `${playerName || "certificate"}-cybersecurity-certificate.png`;
      link.href = dataUrl;
      link.click();
    } catch (error) {
      console.error("Failed to download certificate:", error);
    }
  };

  return (
    <div
      style={{
        width: "100%",
        height: "100%",
        backgroundColor: "#f8fafc",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        padding: "2rem",
        boxSizing: "border-box",
        gap: "1rem",
      }}
    >
      <div
        ref={certificateRef}
        style={{
          position: "relative",
          width: "90%",
          height: "85%",
          maxWidth: "1100px",
          backgroundColor: "#ffffff",
          border: "12px solid #582c83",
          boxSizing: "border-box",
          padding: "2.5rem 4rem",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "space-between",
          boxShadow: "0 8px 30px rgba(0,0,0,0.12)",
        }}
      >

        <div
          style={{
            position: "absolute",
            inset: "12px",
            border: "2px solid #d6c7e2",
            pointerEvents: "none",
          }}
        />

        <div
          style={{
            position: "relative",
            zIndex: 1,
            textAlign: "center",
          }}
        >
          <div
            style={{
              color: "#582c83",
              fontSize: "1rem",
              fontWeight: "700",
              letterSpacing: "0.3em",
              marginBottom: "1rem",
            }}
          >
            WESTERN USC CYBERSECURITY TRAINING
          </div>

          <h1
            style={{
              margin: 0,
              color: "#102e5a",
              fontSize: "3.75rem",
              fontWeight: "700",
              letterSpacing: "0.04em",
            }}
          >
            CERTIFICATE
          </h1>

          <div
            style={{
              marginTop: "0.35rem",
              color: "#582c83",
              fontSize: "1.5rem",
              fontWeight: "500",
              letterSpacing: "0.2em",
            }}
          >
            OF COMPLETION
          </div>
        </div>

        <div
          style={{
            position: "relative",
            zIndex: 1,
            width: "80%",
            textAlign: "center",
          }}
        >
          <div
            style={{
              color: "#64748b",
              fontSize: "1.05rem",
              marginBottom: "0.75rem",
            }}
          >
            This certificate is proudly presented to
          </div>

          <div
            style={{
              color: "#4f2683",
              fontSize: "3rem",
              fontWeight: "700",
              padding: "0.5rem 1rem 0.75rem",
              borderBottom: "2px solid #9b7db5",
              minHeight: "4rem",
            }}
          >
            {playerName || "Participant"}
          </div>

          <p
            style={{
              margin: "1.5rem auto 0",
              maxWidth: "750px",
              color: "#374151",
              fontSize: "1.1rem",
              lineHeight: 1.6,
            }}
          >
            for successfully completing the{" "}
            <strong>Cybersecurity Guidelines</strong> training program,
            including modules covering authentication, phishing and social
            engineering, student data protection, device security, incident
            response, and cyber awareness.
          </p>
        </div>

        <div
          style={{
            position: "relative",
            zIndex: 1,
            width: "80%",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "flex-end",
            marginTop: "1rem",
          }}
        >
          <div
            style={{
              width: "260px",
              textAlign: "center",
            }}
          >
            <div
              style={{
                height: "70px",
                display: "flex",
                alignItems: "flex-end",
                justifyContent: "center",
              }}
            >
              <StoredSignature />
            </div>

            <div
              style={{
                borderTop: "1px solid #64748b",
                paddingTop: "0.5rem",
                color: "#374151",
                fontSize: "0.9rem",
              }}
            >
              Authorized Signature
            </div>
          </div>

          <div
            style={{
              width: "260px",
              textAlign: "center",
            }}
          >
            <div
              style={{
                height: "70px",
                display: "flex",
                alignItems: "flex-end",
                justifyContent: "center",
                color: "#102e5a",
                fontSize: "1rem",
                fontWeight: "600",
              }}
            >
              Cybersecurity Training Program
            </div>

            <div
              style={{
                borderTop: "1px solid #64748b",
                paddingTop: "0.5rem",
                color: "#374151",
                fontSize: "0.9rem",
              }}
            >
              Training Completion
            </div>
          </div>
        </div>

        <div
          style={{
            position: "absolute",
            right: "2.5rem",
            top: "2.5rem",
            width: "70px",
            height: "70px",
            borderRadius: "50%",
            border: "3px solid #9b7db5",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            textAlign: "center",
            color: "#582c83",
            fontSize: "0.6rem",
            fontWeight: "700",
            letterSpacing: "0.08em",
            backgroundColor: "#faf7fc",
          }}
        >
          CYBER
          <br />
          AWARE
          <br />
          2026
        </div>
      </div>

      <button
        onClick={downloadCertificate}
        style={{
          padding: "0.75rem 1.5rem",
          backgroundColor: "#582c83",
          color: "#fff",
          border: "none",
          borderRadius: "6px",
          fontSize: "1rem",
          fontWeight: "600",
          cursor: "pointer",
        }}
      >
        Download Certificate
      </button>
    </div>
  );
};

export const jobTrainingSlides = (playerName: string) => [
  {
    title: slidesData.titleSlide.title,
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
          {slidesData.titleSlide.subtitle}
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
            {slidesData.titleSlide.moduleTitle}
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
            {slidesData.titleSlide.desc}
          </p>
        </div>
      </>
    ),
  },
  {
    title: slidesData.jobTrainingSlide.title,
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
              {slidesData.jobTrainingSlide.title.toUpperCase()}
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
              alignItems: "center",
              justifyContent: "center",
              gap: "2rem",
            }}
          >
            <p>{slidesData.jobTrainingSlide.desc}</p>
          </div>
        </div>
      </>
    ),
  },
  {
    title: slidesData.scribesSlide.title,
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
              {slidesData.scribesSlide.title.toUpperCase()}
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
              alignItems: "center",
              justifyContent: "center",
              gap: "2rem",
            }}
          >
            <p>{slidesData.scribesSlide.desc}</p>
          </div>
        </div>
      </>
    ),
  }
];