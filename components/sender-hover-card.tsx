import { useState, useRef } from 'react';
import { SenderAvatar } from '@/components/sender-avatar';

type SenderHoverCardProps = {
  senderEmail: string;
  senderName: string;
  senderAvatar?: string;
  isPfp?: boolean;
};

export function SenderHoverCard({ senderEmail, senderName, senderAvatar, isPfp }: SenderHoverCardProps) {
  const [isOpen, setIsOpen] = useState(false);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);
  const handleMouseEnter = () => {
    timeoutRef.current = setTimeout(() => {
      setIsOpen(true);
    }, 1000);
  };
  const handleMouseLeave = () => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
      timeoutRef.current = null;
    }
    setIsOpen(false);
  };

  return (
    <div
      style={{ position: 'relative', display: 'inline-block' }}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <span style={{cursor: 'text'}}>
        {isPfp ?
            <SenderAvatar
              senderName={senderEmail}
              senderAvatar={senderAvatar}
              size={36}
            />
            :
            <p>{senderName}</p>
}
      </span>
      {isOpen && (
        <div
          style={{
            position: 'absolute',
            top: '100%',
            left: 0,
            marginTop: 8,
            width: 280,
            backgroundColor: 'white',
            border: '1px solid #ddd',
            borderRadius: 12,
            padding: 16,
            boxShadow: '0 4px 20px rgba(0, 0, 0, 0.15)',
            zIndex: 1000
            }}
>
          <span style={{display: 'flex'}}>
            <SenderAvatar
                senderName={senderName}
                senderAvatar={senderAvatar}
                size={56}
                />
            <div>
                <p style={{ margin: 0, fontSize: 18, paddingLeft: 12, fontWeight: 400, color: '#333' }}>{senderName}</p>
                <p style={{ margin: 0, fontSize: 12, paddingLeft: 12, fontWeight: 300, color: '#333' }}>{senderEmail}</p>
            </div>
          </span>
        </div>
      )}
    </div>
  );
}
