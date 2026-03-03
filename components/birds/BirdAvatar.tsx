import Image from 'next/image'
import { cn } from '@/lib/utils'

interface BirdAvatarProps {
  photoUrl?: string | null
  speciesEmoji?: string
  ringNumber?: string
  size?: 'sm' | 'md' | 'lg' | 'xl'
  className?: string
}

const SIZE = {
  sm: { wrap: 'w-9 h-9',   text: 'text-lg' },
  md: { wrap: 'w-12 h-12', text: 'text-2xl' },
  lg: { wrap: 'w-16 h-16', text: 'text-3xl' },
  xl: { wrap: 'w-24 h-24', text: 'text-5xl' },
}

export function BirdAvatar({ photoUrl, speciesEmoji = '🦜', size = 'md', className }: BirdAvatarProps) {
  const s = SIZE[size]
  return (
    <div className={cn(
      'relative rounded-full overflow-hidden flex-shrink-0 flex items-center justify-center',
      'bg-primary-100 border-2 border-primary-200',
      s.wrap, className
    )}>
      {photoUrl ? (
        <Image src={photoUrl} alt="Ave" fill className="object-cover" />
      ) : (
        <span className={s.text} role="img">{speciesEmoji}</span>
      )}
    </div>
  )
}
