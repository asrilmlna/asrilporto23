import { motion } from 'framer-motion'

/**
 * FallingText Component
 * Animates text with physical gravity / falling spring effect.
 * Can split by individual letters or words.
 */
const FallingText = ({
  text,
  className = '',
  style = {},
  as: Component = 'div',
  splitBy = 'letters', // 'letters' | 'words'
  delay = 0,
  stagger = 0.035,
  triggerKey = 0
}) => {
  if (!text) return null

  if (splitBy === 'words') {
    const words = text.split(' ')

    return (
      <Component className={className} style={style}>
        {words.map((word, index) => (
          <motion.span
            key={`${triggerKey}-w-${index}`}
            custom={index}
            initial={{ y: -50, opacity: 0, scale: 0.9 }}
            animate={{ y: 0, opacity: 1, scale: 1 }}
            whileHover={{ y: -5, scale: 1.05, transition: { duration: 0.2 } }}
            transition={{
              type: 'spring',
              damping: 12,
              stiffness: 110,
              mass: 0.7,
              delay: delay + index * stagger
            }}
            className="inline-block mr-[0.28em] last:mr-0 cursor-default select-none"
          >
            {word}
          </motion.span>
        ))}
      </Component>
    )
  }

  // splitBy === 'letters'
  const words = text.split(' ')
  let globalCharIndex = 0

  return (
    <Component className={className} style={style}>
      {words.map((word, wordIdx) => (
        <span
          key={`word-${wordIdx}`}
          className="inline-block whitespace-nowrap mr-[0.25em] last:mr-0"
        >
          {word.split('').map((char, charIdx) => {
            const currentIndex = globalCharIndex++
            const randomRotation = (currentIndex % 3 === 0 ? -14 : currentIndex % 3 === 1 ? 14 : -7)

            return (
              <motion.span
                key={`${triggerKey}-c-${currentIndex}`}
                custom={currentIndex}
                initial={{
                  y: -120,
                  opacity: 0,
                  rotate: randomRotation,
                  scale: 0.75
                }}
                animate={{
                  y: 0,
                  opacity: 1,
                  rotate: 0,
                  scale: 1
                }}
                whileHover={{
                  y: -12,
                  scale: 1.15,
                  rotate: [0, -10, 10, 0],
                  transition: { duration: 0.25 }
                }}
                transition={{
                  type: 'spring',
                  damping: 10,
                  stiffness: 120,
                  mass: 0.75,
                  delay: delay + currentIndex * stagger
                }}
                className="inline-block cursor-default select-none"
              >
                {char}
              </motion.span>
            )
          })}
        </span>
      ))}
    </Component>
  )
}

export default FallingText
