import { FormEvent, useState } from "react";

type HelpChatProps = {
  iconSrc: string;
  recipientEmail: string;
  title?: string;
  placeholder?: string;
  apiEndpoint?: string;
  isDesktop?: boolean;
};

export default function HelpChat({
  iconSrc,
  recipientEmail,
  title = "How can we help?",
  placeholder = "Type your message...",
  apiEndpoint = "/api/help",
  isDesktop = false
}: HelpChatProps) {
  const [open, setOpen] = useState(false);
  const [message, setMessage] = useState("");
  const [sending, setSending] = useState(false);
  const [sent, setSent] = useState(false);
  const [error, setError] = useState("");

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();

    if (!message.trim() || sending) return;

    setSending(true);
    setError("");
    setSent(false);

    try {
      const response = await fetch(apiEndpoint, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          message: message.trim(),
          recipientEmail,
        }),
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.error || "Failed to send message");
      }

      setMessage("");
      setSent(true);
    } catch (err) {
      console.error("Help chat error:", err);

      setError(
        err instanceof Error
          ? err.message
          : "Sorry, your message couldn't be sent."
      );
    } finally {
      setSending(false);
    }
  }

  return (
    <div className="help-chat">
      {open && (
        <div className="help-chat__box">
          <div className="help-chat__header">
            <span>{title}</span>

            <button
              type="button"
              onClick={() => setOpen(false)}
              aria-label="Close help chat"
              className="help-chat__close"
            >
              ×
            </button>
          </div>

          <div className="help-chat__body">
            <iframe
              className="freshwidget-embedded-form"
              title="Submit a support ticket"
              src="https://westernusc.freshservice.com/widgets/feedback_widget/new?&widgetType=embedded&submitThanks=Thank%20you%20for%20submitting%20the%20ticket.&screenshot=no"
              scrolling="no"
              frameBorder="0"
            />
          </div>
        </div>
      )}

      {!open && (
        <button
          type="button"
          className={`help-chat__trigger ${
            isDesktop ? "help-chat__trigger--desktop" : ""
          }`}
          onClick={() => setOpen(true)}
          aria-label="Open help chat"
        >
          <img src={iconSrc} alt="" />
          <span>HELP</span>
        </button>
      )}

      <style jsx>{`
        .help-chat {
          position: fixed;
          right: 20px;
          bottom: 20px;
          z-index: 9999;
          font-family: Arial, sans-serif;
        }

        .help-chat__trigger {
          border: 0;
          background: transparent;
          padding: 0;
          cursor: pointer;
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 4px;
        }

        .help-chat__trigger img {
          width: 56px;
          height: 56px;
          object-fit: contain;
          transform: scale(0.7);
        }

        .help-chat__trigger span {
          font-size: 12px;
          font-weight: 700;
          color: #222;
        }

        .help-chat__trigger--desktop {
          transform: translateY(-35px);
        }

        .help-chat__trigger--desktop span {
          color: white;
          font-weight: 700;
        }

        .help-chat__box {
          width: 400px;
          max-width: calc(100vw - 40px);
          background: white;
          border-radius: 12px;
          overflow: hidden;
          box-shadow: 0 8px 35px rgba(0, 0, 0, 0.2);
        }

        .help-chat__header {
          background: #4f2584;
          color: white;
          padding: 14px 16px;
          font-weight: 600;
          display: flex;
          justify-content: space-between;
          align-items: center;
        }

        .help-chat__close {
          border: 0;
          background: transparent;
          color: white;
          font-size: 24px;
          cursor: pointer;
          line-height: 1;
          padding: 0;
        }

        .help-chat__body {
          padding: 0;
          height: 500px;
          overflow: hidden;
          background: white;
        }

        .freshwidget-embedded-form {
          display: block;
          width: 100%;
          height: 500px;
          border: 0;
        }

        @media (max-width: 480px) {
          .help-chat {
            right: 12px;
            bottom: 12px;
          }

          .help-chat__box {
            width: calc(100vw - 24px);
            max-width: none;
          }

          .help-chat__body {
            height: 500px;
          }

          .freshwidget-embedded-form {
            height: 500px;
          }
        }
      `}</style>
    </div>
  );
}
