import Image from 'next/image';

// Deterministic color from sender name — same name always gets the same color
const AVATAR_COLORS = [
  '#4f2584',
  '#1a73e8',
  '#e67e22',
  '#2ecc71',
  '#e74c3c',
  '#16a085',
  '#8e44ad',
  '#2980b9',
  '#d35400',
  '#27ae60',
];

function getAvatarColor(name: string): string {
  let hash = 0;
  for (let i = 0; i < name.length; i++) {
    hash = name.charCodeAt(i) + ((hash << 5) - hash);
  }
  return AVATAR_COLORS[Math.abs(hash) % AVATAR_COLORS.length];
}

interface Props {
  senderName: string;
  senderAvatar?: string;
  size?: number;
}

export function SenderAvatar({ senderName, senderAvatar, size = 36 }: Props) {
  if (senderAvatar) {
    return (
      <Image
        src={`/avatars/${senderAvatar}`}
        alt={senderName}
        width={size}
        height={size}
        className="rounded-full object-cover"
        style={{ width: size, height: size }}
      />
    );
  }

  return (
    <div
      style={{ width: size, height: size, backgroundColor: getAvatarColor(senderName) }}
      className="flex shrink-0 items-center justify-center rounded-full font-semibold text-white"
    >
      <span style={{ fontSize: size < 32 ? '0.7rem' : '0.875rem' }}>
        {senderName.charAt(0).toUpperCase()}
      </span>
    </div>
  );
}
