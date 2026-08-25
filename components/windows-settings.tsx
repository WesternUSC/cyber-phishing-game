import React from "react";

interface WindowsSettingsSlideProps {
  settingsStep: number;
  playerName: string;
}

const WindowsSettingsSlide: React.FC<WindowsSettingsSlideProps> = ({
  settingsStep, playerName
}) => {
  const showCard2 = settingsStep >= 2;
  const showCard3 = settingsStep >= 3;
  const showEncryption = settingsStep >= 4;

  if (showEncryption) {
    return <DeviceEncryptionPage playerName={playerName}/>;
  }

  return (
    <div
      style={{
        width: "60%",
        height: "100%",
        margin: "0 auto",
        backgroundColor: "#f3f3f3",
        display: "flex",
        color: "#1a1a1a",
        fontFamily:
          '"Segoe UI", SegoeUI, Arial, sans-serif',
        overflow: "hidden",
      }}
    >
      <div
        style={{
          width: 270,
          minWidth: 270,
          backgroundColor: "#f3f3f3",
          borderRight: "1px solid #dedede",
          padding: "28px 16px",
          boxSizing: "border-box",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 12,
            padding: "8px 12px",
            marginBottom: 22,
          }}
        >
          <div
            style={{
              width: 42,
              height: 42,
              borderRadius: "50%",
              background:
                "linear-gradient(135deg, #6aa5e8, #2d5f9f)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              color: "white",
              fontSize: 20,
              fontWeight: 600,
            }}
          >
            {playerName?.charAt(0).toUpperCase() || "?"}
          </div>

          <div>
            <div
              style={{
                fontSize: 14,
                fontWeight: 600,
              }}
            >
              {playerName}
            </div>

            <div
              style={{
                fontSize: 12,
                color: "#666",
                marginTop: 2,
              }}
            >
              Local Account
            </div>
          </div>
        </div>

        <div
          style={{
            height: 36,
            backgroundColor: "#fff",
            border: "1px solid #d5d5d5",
            borderRadius: 5,
            display: "flex",
            alignItems: "center",
            padding: "0 12px",
            marginBottom: 18,
            color: "#777",
            fontSize: 13,
          }}
        >
          🔍
          <span style={{ marginLeft: 9 }}>
            Find a setting
          </span>
        </div>

        <SidebarItem icon="🖥️" text="System" active />
        <SidebarItem icon="🔵" text="Bluetooth & devices" />
        <SidebarItem icon="🌐" text="Network & internet" />
        <SidebarItem icon="🎨" text="Personalization" />
        <SidebarItem icon="📱" text="Apps" />
        <SidebarItem icon="👤" text="Accounts" />
        <SidebarItem icon="🕐" text="Time & language" />
        <SidebarItem icon="🎮" text="Gaming" />
        <SidebarItem icon="♿" text="Accessibility" />
        <SidebarItem icon="🔒" text="Privacy & security" />
        <SidebarItem icon="🪟" text="Windows Update" />
      </div>

      <div
        style={{
          flex: 1,
          backgroundColor: "#f8f8f8",
          padding: "42px 50px",
          overflowY: "auto",
          boxSizing: "border-box",
        }}
      >
        <div
          style={{
            maxWidth: 900,
            margin: "0 auto",
          }}
        >
          <h1
            style={{
              fontSize: 32,
              fontWeight: 600,
              margin: "0 0 28px",
            }}
          >
            System
          </h1>

          <div
            style={{
              backgroundColor: "#fff",
              borderRadius: 8,
              border: "1px solid #e2e2e2",
              padding: 24,
              display: "flex",
              alignItems: "center",
              gap: 20,
              marginBottom: 20,
              boxShadow: "0 1px 2px rgba(0,0,0,0.04)",
            }}
          >
            <div
              style={{
                width: 62,
                height: 62,
                borderRadius: 8,
                backgroundColor: "#eef5ff",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: 30,
              }}
            >
              💻
            </div>

            <div style={{ flex: 1 }}>
              <div
                style={{
                  fontSize: 18,
                  fontWeight: 600,
                }}
              >
                DESKTOP-PC
              </div>

              <div
                style={{
                  color: "#666",
                  fontSize: 13,
                  marginTop: 5,
                }}
              >
                Under CCCS BC.4 (Secure Configuration), all staff hardware must maintain baseline security controls.
              </div>
            </div>

            <div
              style={{
                color: "#0067c0",
                fontSize: 13,
              }}
            >
              Rename
            </div>
          </div>

          <SettingsInfoCard
            icon="🗄️"
            title="Clean Desk Policy"
            description="Lock physical documents, keys, and access cards in drawers at the end of every shift."
            action=""
          />

          {showCard2 && (
            <SettingsInfoCard
              icon="🛡️"
              title="Lock Screen Shortcut"
              description="Always lock your PC (Win + L or Cmd + Ctrl + Q) when leaving your desk."
              action=""
            />
          )}

          {showCard3 && (
            <SettingsInfoCard
              icon="🔐"
              title="Full-Disk Encryption"
              description="Ensure BitLocker (Windows) or FileVault (Mac) is active on your machine."
              action=""
            />
          )}
        </div>
      </div>
    </div>
  );
};

const SidebarItem = ({
  icon,
  text,
  active = false,
}: {
  icon: string;
  text: string;
  active?: boolean;
}) => (
  <div
    style={{
      display: "flex",
      alignItems: "center",
      gap: 13,
      height: 42,
      padding: "0 12px",
      borderRadius: 5,
      marginBottom: 3,
      backgroundColor: active ? "#e5e5e5" : "transparent",
      fontSize: 13,
      fontWeight: active ? 600 : 400,
    }}
  >
    <span
      style={{
        width: 22,
        textAlign: "center",
        fontSize: 16,
      }}
    >
      {icon}
    </span>

    <span>{text}</span>
  </div>
);

const SettingsInfoCard = ({
  icon,
  title,
  description,
  action,
}: {
  icon: string;
  title: string;
  description: string;
  action: string;
}) => (
  <div
    style={{
      backgroundColor: "#fff",
      border: "1px solid #e2e2e2",
      borderRadius: 8,
      padding: "20px 24px",
      marginBottom: 16,
      display: "flex",
      alignItems: "center",
      gap: 20,
      boxShadow: "0 1px 2px rgba(0,0,0,0.04)",
    }}
  >
    <div
      style={{
        width: 48,
        height: 48,
        borderRadius: 6,
        backgroundColor: "#f1f6fc",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        fontSize: 23,
        flexShrink: 0,
      }}
    >
      {icon}
    </div>

    <div style={{ flex: 1 }}>
      <div
        style={{
          fontSize: 16,
          fontWeight: 600,
          marginBottom: 5,
        }}
      >
        {title}
      </div>

      <div
        style={{
          fontSize: 13,
          lineHeight: 1.5,
          color: "#666",
        }}
      >
        {description}
      </div>
    </div>

    <button
      style={{
        border: "none",
        background: "transparent",
        color: "#0067c0",
        fontSize: 13,
        cursor: "default",
        whiteSpace: "nowrap",
      }}
    >
      {action} →
    </button>
  </div>
);

interface DeviceEncryptionPageProps {
  playerName: string;
}

const DeviceEncryptionPage: React.FC<DeviceEncryptionPageProps> = ({
  playerName,
}) => {
  return (
    <div
      style={{
        width: "60%",
        height: "100%",
        margin: "0 auto",
        backgroundColor: "#f3f3f3",
        display: "flex",
        color: "#1a1a1a",
        fontFamily:
          '"Segoe UI", SegoeUI, Arial, sans-serif',
        overflow: "hidden",
      }}
    >
      <div
        style={{
          width: 270,
          minWidth: 270,
          backgroundColor: "#f3f3f3",
          borderRight: "1px solid #dedede",
          padding: "28px 16px",
          boxSizing: "border-box",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 12,
            padding: "8px 12px",
            marginBottom: 22,
          }}
        >
          <div
            style={{
              width: 42,
              height: 42,
              borderRadius: "50%",
              background:
                "linear-gradient(135deg, #6aa5e8, #2d5f9f)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              color: "white",
              fontSize: 20,
              fontWeight: 600,
            }}
          >
            {playerName?.charAt(0).toUpperCase() || "?"}
          </div>

          <div>
            <div
              style={{
                fontSize: 14,
                fontWeight: 600,
              }}
            >
              {playerName}
            </div>

            <div
              style={{
                fontSize: 12,
                color: "#666",
                marginTop: 2,
              }}
            >
              Local Account
            </div>
          </div>
        </div>

        <div
          style={{
            height: 36,
            backgroundColor: "#fff",
            border: "1px solid #d5d5d5",
            borderRadius: 5,
            display: "flex",
            alignItems: "center",
            padding: "0 12px",
            marginBottom: 18,
            color: "#777",
            fontSize: 13,
          }}
        >
          🔍
          <span style={{ marginLeft: 9 }}>
            Find a setting
          </span>
        </div>

        <SidebarItem icon="🖥️" text="System" />
        <SidebarItem icon="🔵" text="Bluetooth & devices" />
        <SidebarItem icon="🌐" text="Network & internet" />
        <SidebarItem icon="🎨" text="Personalization" />
        <SidebarItem icon="📱" text="Apps" />
        <SidebarItem icon="👤" text="Accounts" />
        <SidebarItem icon="🕐" text="Time & language" />
        <SidebarItem icon="🎮" text="Gaming" />
        <SidebarItem icon="♿" text="Accessibility" />
        <SidebarItem icon="🔒" text="Privacy & security" active />
        <SidebarItem icon="🪟" text="Windows Update" />
      </div>

      <div
        style={{
          flex: 1,
          backgroundColor: "#f8f8f8",
          padding: "45px 60px",
          overflowY: "auto",
          boxSizing: "border-box",
        }}
      >
        <div
          style={{
            maxWidth: 850,
            margin: "0 auto",
          }}
        >
          <div
            style={{
              color: "#666",
              fontSize: 13,
              marginBottom: 18,
            }}
          >
            Privacy & security &gt; Device encryption
          </div>

          <h1
            style={{
              fontSize: 32,
              fontWeight: 600,
              margin: "0 0 12px",
            }}
          >
            Device encryption
          </h1>

          <p
            style={{
              fontSize: 14,
              color: "#555",
              lineHeight: 1.6,
              maxWidth: 760,
              marginBottom: 30,
            }}
          >
            Device encryption helps protect your files and
            folders from unauthorized access if your device
            is lost or stolen.
          </p>

          <div
            style={{
              backgroundColor: "#fff",
              border: "1px solid #e2e2e2",
              borderRadius: 8,
              padding: 24,
              marginBottom: 18,
            }}
          >
            <div
                style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    gap: 16,
                }}
                >
                <div>
                    <div
                        style={{
                            fontWeight: 600,
                            fontSize: 17,
                        }}
                        >
                        Device encryption
                        </div>

                        <div
                        style={{
                            color: "#666",
                            fontSize: 13,
                            marginTop: 5,
                        }}
                        >
                        Encryipt data on this device to help protect from offline, unauthorized access.
                    </div>
                </div>

                <div
                    style={{
                    display: "flex",
                    alignItems: "center",
                    gap: 10,
                    flexShrink: 0,
                    }}
                >
                    <span
                    style={{
                        fontSize: 14,
                        color: "#333",
                    }}
                    >
                    On
                    </span>

                    <div
                    style={{
                        width: 44,
                        height: 24,
                        borderRadius: 999,
                        backgroundColor: "#0067c0",
                        position: "relative",
                    }}
                    >
                    <div
                        style={{
                        position: "absolute",
                        width: 18,
                        height: 18,
                        borderRadius: "50%",
                        backgroundColor: "#fff",
                        top: 3,
                        right: 3,
                        boxShadow: "0 1px 3px rgba(0,0,0,0.25)",
                        }}
                    />
                    </div>
                </div>
            </div>
          </div>

          <h2
            style={{
                fontSize: 17,
                fontWeight: 600,
                margin: "0 0 10px",
            }}
            >
            Related
            </h2>

          <div
            style={{
              backgroundColor: "#fff",
              border: "1px solid #e2e2e2",
              borderRadius: 8,
              padding: 24,
              marginBottom: 18,
            }}
          >
            <div
                style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    gap: 16,
                }}
                >
                <div>
                    <div
                        style={{
                            fontWeight: 600,
                            fontSize: 17,
                        }}
                        >
                        Bitlocker device encryption
                        </div>

                        <div
                        style={{
                            color: "#666",
                            fontSize: 13,
                            marginTop: 5,
                        }}
                        >
                        Manage your encryption settings using BitLocker
                    </div>
                </div>
            </div>
          </div>

          <div
            style={{
              backgroundColor: "#fff",
              border: "1px solid #e2e2e2",
              borderRadius: 8,
              padding: 24,
              marginBottom: 18,
            }}
          >
            <div
                style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    gap: 16,
                }}
                >
                <div>
                    <div
                        style={{
                            fontWeight: 600,
                            fontSize: 17,
                        }}
                        >
                        Find your BitLocker recovery key
                        </div>
                </div>
            </div>
          </div>

          <div
                style={{
                color: "#0067c0",
                fontSize: 13,
                padding: "8px 0",
                }}
            >
                Get Help →
            </div>

            <div
                style={{
                color: "#0067c0",
                fontSize: 13,
                padding: "8px 0",
                }}
            >
                Give Feedback →
            </div>
        </div>
      </div>
    </div>
  );
};

export default WindowsSettingsSlide;
