import Image from "next/image";

export function AvatarStack({ count = 3, size = 32 }: { count?: number; size?: number }) {
  return (
    <div className="flex -space-x-2">
      {Array.from({ length: count }).map((_, i) => (
        <Image
          key={i}
          src={`/avatars/${(i % 4) + 1}.jpg`}
          alt=""
          width={size}
          height={size}
          className="rounded-full border-2 border-background object-cover"
        />
      ))}
    </div>
  );
}