import { FormEvent, useState } from "react";

type HelpChatProps = {
  iconSrc: string;
  recipientEmail: string;
  title?: string;
  placeholder?: string;
  apiEndpoint?: string;
};

export default function HelpChat({
  iconSrc,
  recipientEmail,
  title = "How can we help?",
  placeholder = "Type your message...",
  apiEndpoint = "/api/help",
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
            <p>
              Send us a message and we'll get back to you by email.
            </p>

            <form onSubmit={handleSubmit}>
              <textarea
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder={placeholder}
                rows={5}
                disabled={sending}
              />

              {sent && (
                <div className="help-chat__success">
                  Message sent!
                </div>
              )}

              {error && (
                <div className="help-chat__error">
                  {error}
                </div>
              )}

              <button
                type="submit"
                disabled={!message.trim() || sending}
              >
                {sending ? "Sending..." : "Send Message"}
              </button>
            </form>
          </div>
        </div>
      )}

      {!open && (
        <button
          type="button"
          className="help-chat__trigger"
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
        }

        .help-chat__trigger span {
          font-size: 12px;
          font-weight: 700;
          color: #222;
        }

        .help-chat__box {
          width: 340px;
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
        }

        .help-chat__body {
          padding: 16px;
        }

        .help-chat__body p {
          margin: 0 0 12px;
          font-size: 14px;
          color: #555;
        }

        .help-chat textarea {
          width: 100%;
          box-sizing: border-box;
          resize: vertical;
          padding: 10px;
          border: 1px solid #ccc;
          border-radius: 6px;
          font: inherit;
          margin-bottom: 10px;
        }

        .help-chat form > button {
          width: 100%;
          padding: 11px;
          border: 0;
          border-radius: 6px;
          background: #4f2584;
          color: white;
          font-weight: 600;
          cursor: pointer;
        }

        .help-chat form > button:disabled {
          opacity: 0.5;
          cursor: not-allowed;
        }

        .help-chat__success {
          color: #16803c;
          font-size: 13px;
          margin-bottom: 10px;
        }

        .help-chat__error {
          color: #c62828;
          font-size: 13px;
          margin-bottom: 10px;
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
        }
      `}</style>
    </div>
  );
}
