import React from 'react';
import { IncidentResponseSlide } from './incident-response-slide';
import { StoredSignature } from './stored-signature';
import { useRef } from 'react';
import { toPng } from 'html-to-image';
import WindowsSettingsSlide from './windows-settings';
import slidesData from '@/data/slides.json'

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

interface CloudSharingSlideProps {
  cloudSteps: number;
}

const CloudSharingSlide: React.FC<CloudSharingSlideProps> = ({
  cloudSteps,
}) => {
  const showApproved = cloudSteps === 1 || cloudSteps === 3;
  const showImage = cloudSteps === 1 || cloudSteps === 2;
  const showProhibited = cloudSteps >= 2;

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
      <div>
        <h1
          style={{
            margin: 0,
            color: "#582c83",
            fontSize: "2.75rem",
          }}
        >
          {slidesData.cloudSlide.title.toUpperCase()}
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
          position: "relative",
          overflow: "hidden",
        }}
      >
        <div
          style={{
            width: "35%",
            height: "50%",
            backgroundColor: "#f0fdf4",
            borderRadius: "16px",
            padding: "1.75rem",
            boxShadow: "0 4px 12px rgba(0,0,0,0.1)",

            opacity: showApproved ? 1 : 0,
            transform: showApproved
              ? "translateX(0)"
              : "translateX(-30px)",

            transition:
              "opacity 500ms ease, transform 500ms ease",

            pointerEvents: showApproved ? "auto" : "none",
          }}
        >
          <h2
            style={{
              margin: 0,
              color: "#166534",
              fontSize: "1.75rem",
            }}
          >
            {slidesData.cloudSlide.card1Title}
          </h2>

          <div
            style={{
              margin: "0.75rem 0 1rem",
              height: "2px",
              backgroundColor: "#cbd5e1",
              borderRadius: "2px",
            }}
          />

          <ul
            style={{
              marginTop: "2rem",
              paddingLeft: "1.75rem",
              listStyleType: "disc",
            }}
          >
            <li style={{ marginBottom: "0.75rem" }}>
              {slidesData.cloudSlide.card1L1}
            </li>

            <li style={{ marginBottom: "0.75rem" }}>
              {slidesData.cloudSlide.card1L2}
            </li>

            <li>
              {slidesData.cloudSlide.card1L3}
            </li>
          </ul>
        </div>

        <div
          style={{
            position: "absolute",

            left: cloudSteps >= 2 ? "10%" : "60%",

            width: "30%",
            height: "50%",

            display: "flex",
            alignItems: "center",
            justifyContent: "center",

            opacity: showImage ? 1 : 0,

            transform:
              cloudSteps === 2
                ? "scale(1)"
                : cloudSteps === 3
                ? "scale(0.95)"
                : "scale(1)",

            transition:
              "left 700ms cubic-bezier(0.22, 1, 0.36, 1), " +
              "opacity 500ms ease, " +
              "transform 500ms ease",

            pointerEvents: "none",
          }}
        >
          <img
            src="/google-cloud.webp"
            alt="Google Cloud"
            style={{
              maxWidth: "200%",
              maxHeight: "200%",
              objectFit: "contain",
              display: "block",
            }}
          />
        </div>

        <div
          style={{
            width: "35%",
            height: "50%",
            backgroundColor: "#fef2f2",
            borderRadius: "16px",
            padding: "1.75rem",
            boxShadow: "0 4px 12px rgba(0,0,0,0.1)",

            opacity: showProhibited ? 1 : 0,
            transform: showProhibited
              ? "translateX(0)"
              : "translateX(30px)",

            transition:
              "opacity 500ms ease 150ms, transform 500ms ease 150ms",

            pointerEvents: showProhibited ? "auto" : "none",
          }}
        >
          <h2
            style={{
              margin: 0,
              color: "#991c1a",
              fontSize: "1.75rem",
            }}
          >
            {slidesData.cloudSlide.card2Title}
          </h2>

          <div
            style={{
              margin: "0.75rem 0 1rem",
              height: "2px",
              backgroundColor: "#cbd5e1",
              borderRadius: "2px",
            }}
          />

          <ul
            style={{
              marginTop: "2rem",
              paddingLeft: "1.75rem",
              listStyleType: "disc",
            }}
          >
            <li style={{ marginBottom: "0.75rem" }}>
              {slidesData.cloudSlide.card2L1}
            </li>

            <li style={{ marginBottom: "0.75rem" }}>
              {slidesData.cloudSlide.card2L2}
            </li>

            <li>
              {slidesData.cloudSlide.card2L3}
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
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

export const slides = (playerName: string) => [
  {
    title: slidesData.introSlide.title,
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
          }}
        >

        <div
          style={{
            backgroundColor: "#e0f7ff",
            color: "#0097a7",
            padding: "1rem 1.5rem",
            borderRadius: "16px",
            fontSize: "1.25rem",
            maxWidth: "500px",
            lineHeight: 1.5,
            boxShadow: "0 2px 8px rgba(0, 0, 0, 0.1)",
          }}
        >
          {slidesData.introSlide.subtitle}
        </div>

          <h1
            style={{
              fontSize: "5rem",
              color: "#4f2683",
              margin: 0,
              textAlign: "center",
              fontWeight: "bold",
            }}
          >
            {slidesData.introSlide.title}
          </h1>

          <p style={{color:"#4f2683", fontSize: "1.25rem"}}>{slidesData.introSlide.desc}</p>
        
            <div style={{textAlign: "center",
                fontSize: 12,
                color: "#888",
                position: "fixed",
                marginTop: "30%"}}>
              {slidesData.introSlide.desc2}
            </div>

        </div>
      </>
    ),
  },
  {
    title: slidesData.module1.title,
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
          {slidesData.module1.subtitle}
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
            {slidesData.module1.moduleTitle}
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
            {slidesData.module1.desc}
          </p>
        </div>
      </>
    ),
  },
  {
    title: slidesData.whyMattersSlide.title,
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
              {slidesData.whyMattersSlide.title.toUpperCase()}
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
            <div
              style={{
                width: "420px",
                backgroundColor: "#ffffff",
                borderRadius: "16px",
                padding: "1.75rem",
                boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
              }}
            >
              <h2
                style={{
                  margin: 0,
                  color: "#582c83",
                  fontSize: "1.75rem",
                }}
              >
                {slidesData.whyMattersSlide.card1Title}
              </h2>

              <div
                style={{
                  margin: "0.75rem 0 1rem",
                  height: "2px",
                  backgroundColor: "#4f2683",
                  borderRadius: "2px",
                }}
              />

              <p
                style={{
                  margin: 0,
                  textAlign: "left",
                  lineHeight: 1.6,
                  color: "#102e5a"
                }}
              >
                {slidesData.whyMattersSlide.card1Desc}
              </p>
            </div>

            <div
              style={{
                width: "420px",
                backgroundColor: "#ffffff",
                borderRadius: "16px",
                padding: "1.75rem",
                boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
              }}
            >
              <h2
                style={{
                  margin: 0,
                  color: "#582c83",
                  fontSize: "1.75rem",
                }}
              >
                {slidesData.whyMattersSlide.card2Title}
              </h2>

              <div
                style={{
                  margin: "0.75rem 0 1rem",
                  height: "2px",
                  backgroundColor: "#4f2683",
                  borderRadius: "2px",
                }}
              />

              <p
                style={{
                  margin: 0,
                  textAlign: "left",
                  lineHeight: 1.6,
                  color: "#102e5a"
                }}
              >
                {slidesData.whyMattersSlide.card2Desc}
              </p>
            </div>
          </div>
        </div>
      </>
    ),
  },
  {
    title: slidesData.complianceSlide.title,
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
            {slidesData.complianceSlide.title.toUpperCase()}
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
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <table
            style={{
              width: "80%",
              maxWidth: "900px",
              borderCollapse: "collapse",
              fontSize: "1rem",
              borderRadius: "12px",
              overflow: "hidden",
              boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
              backgroundColor: "#fff",
            }}
          >
            <thead>
              <tr
                style={{
                  backgroundColor: "#4f2683",
                  color: "white",
                }}
              >
                <th style={headerStyle}>{slidesData.complianceSlide.r1c1}</th>
                <th style={headerStyle}>{slidesData.complianceSlide.r1c2}</th>
                <th style={headerStyle}>{slidesData.complianceSlide.r1c3}</th>
              </tr>
            </thead>

            <tbody>
              <tr>
                <td style={cellStyle}><strong>{slidesData.complianceSlide.r2c1}</strong></td>
                <td style={cellStyle}>{slidesData.complianceSlide.r2c2}</td>
                <td style={cellStyle}>{slidesData.complianceSlide.r2c3}</td>
              </tr>

              <tr>
                <td style={cellStyle}><strong>{slidesData.complianceSlide.r3c1}</strong></td>
                <td style={cellStyle}>{slidesData.complianceSlide.r3c2}</td>
                <td style={cellStyle}>{slidesData.complianceSlide.r3c3}</td>
              </tr>

              <tr>
                <td style={cellStyle}><strong>{slidesData.complianceSlide.r4c1}</strong></td>
                <td style={cellStyle}>{slidesData.complianceSlide.r4c2}</td>
                <td style={cellStyle}>{slidesData.complianceSlide.r4c3}</td>
              </tr>

              <tr>
                <td style={cellStyle}><strong>{slidesData.complianceSlide.r5c1}</strong></td>
                <td style={cellStyle}>{slidesData.complianceSlide.r5c2}</td>
                <td style={cellStyle}>{slidesData.complianceSlide.r5c3}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
      </>
    ),
  },
  {
    title: slidesData.hygieneSlide.title,
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
            {slidesData.hygieneSlide.title.toUpperCase()}
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
                height: "280px",
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
                {slidesData.hygieneSlide.card1Title}
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
                {slidesData.hygieneSlide.card1Desc}
              </p>
            </div>

            <div
              style={{
                flex: 1,
                height: "280px",
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
                {slidesData.hygieneSlide.card2Title}
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
                {slidesData.hygieneSlide.card2Desc}
              </p>
            </div>

            <div
              style={{
                flex: 1,
                height: "280px",
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
                {slidesData.hygieneSlide.card3Title}
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
                {slidesData.hygieneSlide.card3Desc}
              </p>
            </div>
          </div>
        </div>
      </>
    ),
  },
  {
    title: slidesData.module2.title,
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
          {slidesData.module2.subtitle}
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
            {slidesData.module2.moduleTitle}
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
            {slidesData.module2.desc}
          </p>
        </div>
      </>
    ),
  },
  {
    title: slidesData.mfaSlide.title,
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
            {slidesData.mfaSlide.title.toUpperCase()}
          </h1>

          <div
            style={{
              display: "flex",
              gap: "4rem",
              alignItems: "center",
              marginTop: "3rem",
              width: "100%",
            }}
          >
            <div
              style={{
                width: "55%",
                color: "#374151",
                fontSize: "1.1rem",
                lineHeight: 1.7,
              }}
            >
              <p style={{ margin: 0 }}>
                CCCS Baseline Control BC.5 mandates MFA across all organizational
                systems. Password-only protection is no longer sufficient.
              </p>

              <ul
                style={{
                  marginTop: "2rem",
                  paddingLeft: "1.75rem",
                  listStyleType: "disc",
                }}
              >
                <li style={{ marginBottom: "0.75rem" }}>
                  <strong>{slidesData.mfaSlide.l1Title} </strong>
                  {slidesData.mfaSlide.l1Desc}
                </li>

                <li style={{ marginBottom: "0.75rem" }}>
                  <strong>{slidesData.mfaSlide.l2Title} </strong>
                  {slidesData.mfaSlide.l2Desc}
                </li>

                <li>
                  <strong>{slidesData.mfaSlide.l3Title} </strong>
                  {slidesData.mfaSlide.l3Desc}
                </li>
              </ul>
            </div>

            <div
              style={{
                width: "45%",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <video
                src="mfa.mp4"
                autoPlay
                loop
                muted
                playsInline
                style={{
                  width: "100%",
                  maxWidth: "500px",
                  borderRadius: "12px",
                  display: "block",
                }}
              />
            </div>
          </div>
        </div>
      </>
    ),
  },
  {
    title: slidesData.passphraseSlide.title,
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
            {slidesData.passphraseSlide.title.toUpperCase()}
          </h1>

          <div
            style={{
              display: "flex",
              gap: "4rem",
              alignItems: "center",
              marginTop: "3rem",
              width: "100%",
            }}
          >
            <div
              style={{
                width: "55%",
                color: "#374151",
                fontSize: "1.1rem",
                lineHeight: 1.7,
              }}
            >

              <ul
                style={{
                  marginTop: "2rem",
                  paddingLeft: "1.75rem",
                  listStyleType: "disc",
                }}
              >
                <li style={{ marginBottom: "0.75rem" }}>
                  <strong>{slidesData.passphraseSlide.l1Title} </strong>
                  {slidesData.passphraseSlide.l1Desc}
                </li>

                <li style={{ marginBottom: "0.75rem" }}>
                  <strong>{slidesData.passphraseSlide.l2Title} </strong>
                  {slidesData.passphraseSlide.l2Desc}
                </li>

                <li>
                  <strong>{slidesData.passphraseSlide.l3Title} </strong>
                  {slidesData.passphraseSlide.l3Desc}
                </li>

                <li>
                  <strong>{slidesData.passphraseSlide.l4Title} </strong>
                  {slidesData.passphraseSlide.l4Desc}
                </li>
              </ul>
            </div>

            <div
              style={{
                width: "45%",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <img src="password-manager.png"
              style={{
                  width: "100%",
                  maxWidth: "500px",
                  borderRadius: "12px",
                  display: "block",
                }}
              />
            </div>
          </div>
        </div>
      </>
    ),
  },
  {
    title: slidesData.module3.title,
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
          {slidesData.module3.subtitle}
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
            {slidesData.module3.moduleTitle}
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
            {slidesData.module3.desc}
          </p>
        </div>
      </>
    ),
  },
  {
    title: slidesData.phishingSlide.title,
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
            {slidesData.phishingSlide.title}
          </h1>

          <div
            style={{
              display: "flex",
              gap: "4rem",
              alignItems: "center",
              marginTop: "3rem",
              width: "100%",
            }}
          >
            <div
              style={{
                width: "55%",
                color: "#374151",
                fontSize: "1.1rem",
                lineHeight: 1.7,
              }}
            >

              <h2
                style={{
                  margin: 0,
                  color: "#582c83",
                  fontSize: "1.5rem",
                }}
              >
                {slidesData.phishingSlide.subtitle}
              </h2>

              <p
                style={{
                  margin: 0,
                }}
              >
                {slidesData.phishingSlide.desc1}
              </p>

              <br></br>

              <p
                style={{
                  margin: 0,
                }}
              >
                {slidesData.phishingSlide.desc2}
              </p>
            </div>

            <div
              style={{
                width: "45%",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <img src="phishing-image-nobg.png"
              style={{
                  width: "50%",
                  maxWidth: "500px",
                  borderRadius: "12px",
                  display: "block",
                }}
              />
            </div>
          </div>
        </div>
      </>
    ),
  },
  {
    title: slidesData.emailSlide.title,
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
            {slidesData.emailSlide.title.toUpperCase()}
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
                height: "280px",
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
                {slidesData.emailSlide.card1Title}
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
                {slidesData.emailSlide.card1Desc}
              </p>
            </div>

            <div
              style={{
                flex: 1,
                height: "280px",
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
                {slidesData.emailSlide.card2Title}
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
                {slidesData.emailSlide.card2Desc}
              </p>
            </div>

            <div
              style={{
                flex: 1,
                height: "280px",
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
                {slidesData.emailSlide.card3Title}
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
                {slidesData.emailSlide.card3Desc}
              </p>
            </div>
          </div>
        </div>
      </>
    ),
  },
  {
    title: "Module 4: Student Data & PIPEDA Rules",
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
          MODULE 4
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
            STUDENT DATA & PIPEDA RULES
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
            Legal standards and privacy obligations when collecting and processing student information.
          </p>
        </div>
      </>
    ),
  },
  {
    title: slidesData.privacySlide.title,
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
            {slidesData.privacySlide.title.toUpperCase()}
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
              gap: "3rem",
              padding: "2rem 0",
            }}
          >
            <div
              style={{
                flex: 1,
                height: "350px",
                backgroundColor: "#582c83",
                borderRadius: "16px",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                boxSizing: "border-box",
              }}
            >
              <div
                style={{
                  color: "#ffffff",
                  fontSize: "8rem",
                  fontWeight: "700",
                  lineHeight: 1,
                }}
              >
                {slidesData.privacySlide.cardTitle}
              </div>

              <div
                style={{
                  marginTop: "0.75rem",
                  color: "#ffffff",
                  fontSize: "1.5rem",
                  fontWeight: "600",
                  textAlign: "center",
                }}
              >
                {slidesData.privacySlide.cardDesc}
              </div>
            </div>

            <div
              style={{
                flex: 1,
                padding: "1rem 0",
                boxSizing: "border-box",
              }}
            >
              <h2
                style={{
                  margin: 0,
                  color: "#582c83",
                  fontSize: "1.75rem",
                  paddingBottom: "0.75rem",
                  borderBottom: "4px solid #9b7db5",
                }}
              >
                {slidesData.privacySlide.subtitle}
              </h2>

              <p
                style={{
                  marginTop: "1.5rem",
                  marginBottom: "1rem",
                  color: "#374151",
                  fontSize: "1.2rem",
                  lineHeight: 1.6,
                }}
              >
                {slidesData.privacySlide.desc1}
              </p>

              <p
                style={{
                  margin: 0,
                  color: "#374151",
                  fontSize: "1.2rem",
                  lineHeight: 1.6,
                }}
              >
                <strong>{slidesData.privacySlide.desc2Bold}</strong> {slidesData.privacySlide.desc2}
              </p>
            </div>
          </div>
        </div>
      </>
    ),
  },
  {
    title: slidesData.cloudSlide.title,
    content: (
      <CloudSharingSlide cloudSteps={1} />
    ),
  },
  {
    title: slidesData.module5.title,
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
          {slidesData.module5.subtitle}
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
            {slidesData.module5.moduleTitle}
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
            {slidesData.module5.desc}
          </p>
        </div>
      </>
    ),
  },
  {
    title: "Windows 11 Settings",
    content: <WindowsSettingsSlide settingsStep={1} playerName={playerName} />,
  },
  {
    title: slidesData.wifiSlide.title,
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
            {slidesData.wifiSlide.title.toUpperCase()}
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
              width: "85%",
              maxWidth: "1000px",
              margin: "auto",
              color: "#374151",
            }}
          >
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(2, 1fr)",
                gap: "1.5rem",
                justifyContent: "center",
              }}
            >

              <div
                style={{
                  padding: "1.5rem",
                  backgroundColor: "#f8f5fb",
                  border: "1px solid #e5d9ef",
                  borderRadius: "14px",
                  boxShadow: "0 4px 12px rgba(88, 44, 131, 0.08)",
                  fontSize: "1.05rem",
                  lineHeight: 1.6,
                }}
              >
                <div
                  style={{
                    fontSize: "1.8rem",
                    marginBottom: "0.75rem",
                  }}
                >
                  🔐
                </div>

                <strong
                  style={{
                    display: "block",
                    color: "#582c83",
                    fontSize: "1.2rem",
                    marginBottom: "0.5rem",
                  }}
                >
                  {slidesData.wifiSlide.card1Title}
                </strong>

                <span>
                  {slidesData.wifiSlide.card1Desc}
                </span>
              </div>

              <div
                style={{
                  padding: "1.5rem",
                  backgroundColor: "#f8f5fb",
                  border: "1px solid #e5d9ef",
                  borderRadius: "14px",
                  boxShadow: "0 4px 12px rgba(88, 44, 131, 0.08)",
                  fontSize: "1.05rem",
                  lineHeight: 1.6,
                }}
              >
                <div
                  style={{
                    fontSize: "1.8rem",
                    marginBottom: "0.75rem",
                  }}
                >
                  🔌
                </div>

                <strong
                  style={{
                    display: "block",
                    color: "#582c83",
                    fontSize: "1.2rem",
                    marginBottom: "0.5rem",
                  }}
                >
                  {slidesData.wifiSlide.card2Title}
                </strong>

                <span>
                  {slidesData.wifiSlide.card2Desc}
                </span>
              </div>

              <div
                style={{
                  padding: "1.5rem",
                  backgroundColor: "#f8f5fb",
                  border: "1px solid #e5d9ef",
                  borderRadius: "14px",
                  boxShadow: "0 4px 12px rgba(88, 44, 131, 0.08)",
                  fontSize: "1.05rem",
                  lineHeight: 1.6,
                }}
              >
                <div
                  style={{
                    fontSize: "1.8rem",
                    marginBottom: "0.75rem",
                  }}
                >
                  👀
                </div>

                <strong
                  style={{
                    display: "block",
                    color: "#582c83",
                    fontSize: "1.2rem",
                    marginBottom: "0.5rem",
                  }}
                >
                  {slidesData.wifiSlide.card3Title}
                </strong>

                <span>
                  {slidesData.wifiSlide.card3Desc}
                </span>
              </div>

              <div
                style={{
                  padding: "1.5rem",
                  backgroundColor: "#f8f5fb",
                  border: "1px solid #e5d9ef",
                  borderRadius: "14px",
                  boxShadow: "0 4px 12px rgba(88, 44, 131, 0.08)",
                  fontSize: "1.05rem",
                  lineHeight: 1.6,
                }}
              >
                <div
                  style={{
                    fontSize: "1.8rem",
                    marginBottom: "0.75rem",
                  }}
                >
                  🔄
                </div>

                <strong
                  style={{
                    display: "block",
                    color: "#582c83",
                    fontSize: "1.2rem",
                    marginBottom: "0.5rem",
                  }}
                >
                  {slidesData.wifiSlide.card4Title}
                </strong>

                <span>
                  {slidesData.wifiSlide.card4Desc}
                </span>
              </div>
            </div>
          </div>
        </div>
      </>
    ),
  },
  {
    title: slidesData.incidentSlide.title,
    content: <IncidentResponseSlide visibleSteps={1} />,
  },
  {
    title: slidesData.module6.title,
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
          {slidesData.module6.subtitle}
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
            {slidesData.module6.moduleTitle}
          </h1>

          <div
            style={{
              width: "80px",
              height: "4px",
              backgroundColor: "#9b7db5",
              borderRadius: "2px",
            }}
          />
        </div>
      </>
    ),
  },
  {
    title: "Certificate of Completion",
    content: <Certificate playerName={playerName} />,
  },
];