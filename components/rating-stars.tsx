import { Star } from "lucide-react"

interface RatingStarsProps {
  rating: number
  size?: number
}

export function RatingStars({ rating, size = 16 }: RatingStarsProps) {
  return (
    <div className="flex gap-0.5">
      {[1, 2, 3, 4, 5].map((star) => {
        const fillPercentage = Math.min(Math.max(rating - star + 1, 0), 1) * 100

        return (
          <div key={star} className="relative" style={{ width: size, height: size }}>
            {/* Background star (empty) */}
            <Star size={size} className="absolute top-0 left-0 fill-none text-gray-300" />
            {/* Foreground star (filled) with clip path for partial fill */}
            {fillPercentage > 0 && (
              <div className="absolute top-0 left-0 overflow-hidden" style={{ width: `${fillPercentage}%` }}>
                <Star size={size} className="fill-teal-500 text-teal-500" />
              </div>
            )}
          </div>
        )
      })}
    </div>
  )
}
