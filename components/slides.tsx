import React from 'react';
import { IncidentResponseSlide } from './incident-response-slide';
import { StoredSignature } from './stored-signature';
import { useRef } from 'react';
import { toPng } from 'html-to-image';

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

export const slides = (playerName: string) => [
  {
    title: "Cybersecurity Guidelines",
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
          EMPLOYEE SECURITY ONBOARDING
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
            CYBERSECURITY GUIDELINES
          </h1>

          <p style={{color:"#4f2683", fontSize: "1.25rem"}}>Essential security know-how for new USC employees, aligned with Canadian Centre for Cyber Security (CCCS) baseline controls.</p>
        
            <div style={{textAlign: "center",
                fontSize: 12,
                color: "#888",
                position: "fixed",
                marginTop: "30%"}}>
              Use right arrow key or space bar to advance the slides, or the on-screen
              "Next" and "Previous" buttons
            </div>

        </div>
      </>
    ),
  },
  {
    title: "Module 1: Threats & Employee Role",
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
          MODULE 1
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
            THREATS & EMPLOYEE ROLE
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
            Understanding why higher education student unions are prime targets and how your daily habits protect student data.
          </p>
        </div>
      </>
    ),
  },
  {
    title: "Why Cyber Security Matters Here",
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
              WHY CYBER SECURITY MATTERS HERE
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
                High-Value Target
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
                Student Unions manage high volumes of personal records,
                health/dental plan sign-ups, event payments, and club financial accounts across sprawling campus networks.
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
                Human Firewall Concept
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
                According to CCCS guidelines, over 85% of organization security breaches originate
                from social engineering or human error rather than direct system exploits.
              </p>
            </div>
          </div>
        </div>
      </>
    ),
  },
  {
    title: "Canadian Compliance Frameworks",
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
            CANADIAN COMPLIANCE FRAMEWORKS
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
                <th style={headerStyle}>Framework / Standard</th>
                <th style={headerStyle}>Governance Scope</th>
                <th style={headerStyle}>Key Requirement for Union Staff</th>
              </tr>
            </thead>

            <tbody>
              <tr>
                <td style={cellStyle}><strong>CCCS ITSM.10.089</strong></td>
                <td style={cellStyle}>Federal Baseline Security Controls</td>
                <td style={cellStyle}>Mandatory security awareness, MFA, and access control.</td>
              </tr>

              <tr>
                <td style={cellStyle}><strong>PIPEDA</strong></td>
                <td style={cellStyle}>Federal Commerical Privacy Law</td>
                <td style={cellStyle}>Express consent & safeguards for health/dental & payment data.</td>
              </tr>

              <tr>
                <td style={cellStyle}><strong>FIPPA / Provincial Acts</strong></td>
                <td style={cellStyle}>Public University Privacy Standards</td>
                <td style={cellStyle}>Strict protection and restricted sharing of student PII.</td>
              </tr>

              <tr>
                <td style={cellStyle}><strong>Get Cyber Safe</strong></td>
                <td style={cellStyle}>Government Awareness Initiative</td>
                <td style={cellStyle}>Adherence to clean desk, safe browsing, and device policies.</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
      </>
    ),
  },
  {
    title: "CCCS Top Cyber Hygiene Rules",
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
            CCCS TOP CYBER HYGIENE RULES
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
                1. Strong Identity
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
                Enforce Multi-Factor Authentication (MFA) on all university and union accounts to stop unauthorized login attempts.
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
                2. Least Privilege
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
                Access only the student information and financial tools required for your specific job duties (CCCS BC.12).
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
                3. Active Vigilance
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
                Recognize phishing tactics and report suspicious emails, links, or unknown physical visitors immediately.
              </p>
            </div>
          </div>
        </div>
      </>
    ),
  },
  {
    title: "Module 2: Authentication Standards",
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
          MODULE 2
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
            AUTHENTICATION STANDARDS
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
            Implementing Canadian Centre for Cyber Security baseline recommendations for credentials and access.
          </p>
        </div>
      </>
    ),
  },
  {
    title: "Multi-Factor Authentication Standard",
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
            MULTI-FACTOR AUTHENTICATION STANDARD
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
  {/* Left side */}
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
        <strong>Authenticator Apps First: </strong>
        Use app-based push notifications or TOTP codes (e.g., Microsoft
        Authenticator).
      </li>

      <li style={{ marginBottom: "0.75rem" }}>
        <strong>Avoid SMS When Possible: </strong>
        Text messages are vulnerable to SIM swapping and interception attacks.
      </li>

      <li>
        <strong>Never Share Prompts: </strong>
        Deny any unexpected MFA prompts that appear when you are not actively
        logging in.
      </li>
    </ul>
  </div>

  {/* Right side */}
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
    title: "Strong Passphrase Guidelines",
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
            STRONG PASSPHRASE GUIDELINES
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
              width: "70%",
              maxWidth: "850px",
              marginTop: "3rem",
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
                <strong>Use Passphrases, Not Passwords: </strong> 
                Combine 4+ random words (e.g., maple-winter-transit-book) for 16+ characters that are
                easy to remember but hard to crack.
              </li>

              <li style={{ marginBottom: "0.75rem" }}>
                <strong>Avoid Campus Cliches: </strong> 
                Never use university names, sports teams, mascot names, or your student union position in your password.
              </li>

              <li style={{ marginBottom: "0.75rem" }}>
                <strong>Use Password Managers: </strong> 
                Store credentials in approved enterprise password vaults (e.g., 1Password, Bitwarden)
                rather than browser auto-fill.
              </li>

              <li>
                <strong>Zero Credential Reuse: </strong> 
                Keep your personal campus account password completely distinct from your Student Union staff credentials.
              </li>
            </ul>
          </div>
        </div>
      </>
    ),
  },
  {
    title: "Module 3: Phishing & Social Engineering",
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
          MODULE 3
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
            PHISHING & SOCIAL ENGINEERING
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
            Identifying deception techniques targeted at student union executives, staff, and student volunteers.
          </p>
        </div>
      </>
    ),
  },
  {
    title: "Spotting Phishing in Student Union",
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
            SPOTTING PHISHING IN STUDENT UNION
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
              width: "70%",
              maxWidth: "850px",
              marginTop: "3rem",
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
              Common Attack Scenarios
            </h2>

            <p
              style={{
                margin: 0,
              }}
            >
              Threat actors often impersonate Union Executives requesting urgent gift card purchases, direct deposit charges,
              or vendor invoice payments.
            </p>

            <br></br>

            <p
              style={{
                margin: 0,
              }}
            >
              Watch for spoofed university domain names (e.g., @u-canada-studentunion.ca vs official @studentunion.ca),
              high urgency, and unexpected attachments.
            </p>

          </div>
        </div>
      </>
    ),
  },
  {
    title: "3-Step Email Verification Process",
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
            3-STEP EMAIL VERIFICATION PROCESS
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
                1. Inspect Details
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
                Check sender full email header, hover over external links without clicking, and verify
                unexpected file attachments.
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
                2. Out-of-Band Check
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
                If an email requests wire transfers or payroll changes, confirm in person or call the
                official phone number directly.
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
                3. Report & Flag
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
                Click the "Report Phishing" button in Outlook/Gmail to send suspicious emails to Union IT
                for immediate review.
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
    title: "Protecting Student PII & Privacy",
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
            PROTECTING STUDENT PII & PRIVACY
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
                10
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
                PIPEDA Principles
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
                Strict Confidentiality Required
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
                Student Personally Indetifiable Information (PII) - including student numbers, health plan records,
                financial aid claims, and event rosters - is protected under Canadian privacy laws.
              </p>

              <p
                style={{
                  margin: 0,
                  color: "#374151",
                  fontSize: "1.2rem",
                  lineHeight: 1.6,
                }}
              >
                <strong>Rule of Thumb:</strong> Collect only data you strictly need, use it exclusively
                for approved purposes, and never share PII externally without explicit student consent.
              </p>
            </div>
          </div>
        </div>
      </>
    ),
  },
  {
    title: "Safe Cloud & File Sharing Rules",
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
              SAFE CLOUD & FILE SHARING RULES
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
                width: "35%",
                height: "50%",
                backgroundColor: "#f0fdf4",
                borderRadius: "16px",
                padding: "1.75rem",
                boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
              }}
            >
              <h2
                style={{
                  margin: 0,
                  color: "#166534",
                  fontSize: "1.75rem",
                }}
              >
                Approved Practices
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
                Store student union documents on official tenant OneDrive or SharePoint with restricted permissions.
              </li>

              <li style={{ marginBottom: "0.75rem" }}>
                Share the file links with specific named accounts rather than "Anyone with the link."
              </li>

              <li>
                Encrypt sensitive financial spreadsheets prior to distribution.
              </li>
            </ul>

            </div>

            <div
              style={{
                width: "35%",
                height: "50%",
                backgroundColor: "#fef2f2",
                borderRadius: "16px",
                padding: "1.75rem",
                boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
              }}
            >
              <h2
                style={{
                  margin: 0,
                  color: "#991c1a",
                  fontSize: "1.75rem",
                }}
              >
                Prohibited Practices
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
                Transferring student records to personal Gmail, iCloud, or Dropbox accounts.
              </li>

              <li style={{ marginBottom: "0.75rem" }}>
                Storing unencrypted PII on unapproved personal USB drives.
              </li>

              <li>
                Emailing unencrypted spreadsheets containing student health plan data.
              </li>
            </ul>

            </div>
          </div>
        </div>
      </>
    ),
  },
  {
    title: "Module 5: Device & Campus Safety",
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
          MODULE 5
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
            DEVICE & CAMPUS SAFETY
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
            Physical security, workstation hygiene, and public campus Wi-Fi best practices.
          </p>
        </div>
      </>
    ),
  },
  {
    title: "Securing Union Laptops & Devices",
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
            SECURING UNION LAPTOPS & DEVICES
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
              width: "70%",
              maxWidth: "850px",
              marginTop: "3rem",
              color: "#374151",
              fontSize: "1.1rem",
              lineHeight: 1.7,
            }}
          >
            <p
              style={{
                margin: 0,
              }}
            >
              Under CCCS BC.4 (Secure Configuration), all staff hardware must maintain baseline security controls.
            </p>

            <ul
              style={{
                marginTop: "2rem",
                paddingLeft: "1.75rem",
                listStyleType: "disc",
              }}
            >
              <li style={{ marginBottom: "0.75rem" }}>
                <strong>Full-Disk Encryption: </strong> 
                Ensure BitLocker (Windows) or FileVault (Mac) is active on your machine.
              </li>

              <li style={{ marginBottom: "0.75rem" }}>
                <strong>Lock Screen Shortcut: </strong> 
                Always lock your PC (Win + L or Cmd + Ctrl + Q) when leaving your desk.
              </li>

              <li>
                <strong>Clean Desk Policy: </strong> 
                Lock physical documents, keys, and access cards in drawers at the end of every shift.
              </li>
            </ul>
          </div>
        </div>
      </>
    ),
  },
  {
    title: "Campus Wi-Fi & Remote Work Safety",
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
            CAMPUS WI-FI & REMOTE WORK SAFETY
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
              width: "70%",
              maxWidth: "850px",
              marginTop: "3rem",
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
                <strong>Use Secure Networks: </strong> 
                Connect to encrypted campus networks (e.g., eduroam or Student Union Wi-Fi). Never perform admin duties
                on open public Wi-Fi without VPN.
              </li>

              <li style={{ marginBottom: "0.75rem" }}>
                <strong>Avoid Public USB Chargers: </strong> 
                Use wall outlets rather than public USB charging stations to prevent "juice jacking" malware installation.
              </li>

              <li style={{ marginBottom: "0.75rem" }}>
                <strong>Beware of Shoulder Surfing: </strong> 
                Use privacy screens when working in busy student hubs, cafeterias, or libraries.
              </li>

              <li>
                <strong>Automate Updates: </strong> 
                Install operating system and web browser security updates promptly when prompted.
              </li>
            </ul>
          </div>
        </div>
      </>
    ),
  },
  {
    title: "Incident Response & Reporting",
    content: <IncidentResponseSlide visibleSteps={1} />,
  },
  {
    title: "Building a Cyber Aware Culture",
    content: (
      <>
        <div
          style={{
            position: "relative",
            width: "100%",
            height: "100%",
            overflow: "hidden",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            backgroundImage:
              "url('https://images.unsplash.com/photo-1500534623283-312aade485b7')",
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        >

          <div
            style={{
              position: "absolute",
              inset: 0,
              backgroundColor: "rgba(16, 46, 90, 0.35)",
            }}
          />

          <div
            style={{
              position: "relative",
              zIndex: 1,
              width: "65%",
              maxWidth: "850px",
              minHeight: "320px",
              backgroundColor: "#ffffff",
              borderRadius: "16px",
              padding: "3rem 4rem",
              boxSizing: "border-box",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              textAlign: "center",
              boxShadow: "0 8px 30px rgba(0, 0, 0, 0.2)",
            }}
          >

            <h1
              style={{
                margin: 0,
                color: "#582c83",
                fontSize: "2.75rem",
                lineHeight: 1.15,
              }}
            >
              BUILDING A CYBER AWARE CULTURE
            </h1>

            <p
              style={{
                margin: "1.5rem 0 0",
                maxWidth: "650px",
                color: "#374151",
                fontSize: "1.1rem",
                lineHeight: 1.7,
              }}
            >
              Cybersecurity is not just an IT responsibility - it's a core commitment to protecting
              our student members, their privacy, and our union's reputation.
            </p>
          </div>
        </div>
      </>
    ),
  },
  {
    title: "Module 6: Email Simulator",
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
          MODULE 6
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
            EMAIL SIMULATOR
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