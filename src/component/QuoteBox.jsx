import { useState, useRef, useCallback } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Card, CardHeader, CardContent, CardFooter } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { RefreshCw, Quote } from "lucide-react"

const quotes = [
  { text: "The best way to get started is to quit talking and begin doing.", author: "Walt Disney" },
  { text: "Don't let yesterday take up too much of today.", author: "Will Rogers" },
  { text: "It's not whether you get knocked down, it's whether you get up.", author: "Vince Lombardi" },
  { text: "If you are working on something exciting, it will keep you motivated.", author: "Steve Jobs" },
  { text: "Success usually comes to those who are too busy to be looking for it.", author: "Henry David Thoreau" },
  { text: "The only impossible journey is the one you never begin.", author: "Tony Robbins" },
  { text: "Believe you can and you're halfway there.", author: "Theodore Roosevelt" },
]

const getRandomQuote = (current) => {
  let next
  do {
    next = quotes[Math.floor(Math.random() * quotes.length)]
  } while (next === current && quotes.length > 1)
  return next
}

function QuoteBox() {
  const [quote, setQuote] = useState(getRandomQuote)
  const [isLoading, setIsLoading] = useState(false)
  const constraintsRef = useRef(null)

  const handleNewQuote = useCallback(() => {
    setIsLoading(true)
    setTimeout(() => {
      setQuote(getRandomQuote(quote))
      setIsLoading(false)
    }, 200)
  }, [quote])

  return (
    <div
      ref={constraintsRef}
      className="min-h-dvh w-full flex items-center justify-center bg-gradient-to-br from-blue-950/5 via-background to-amber-950/5 p-4"
    >
      <motion.div
        drag
        dragConstraints={constraintsRef}
        dragElastic={0.15}
        whileDrag={{ scale: 1.02, rotate: 1 }}
        whileHover={{ scale: 1.01 }}
        transition={{ type: "spring", stiffness: 300, damping: 20 }}
        className="w-full max-w-md"
      >
        <Card size="sm" className="shadow-xl shadow-blue-950/5 backdrop-blur-sm">
          <CardHeader className="border-b border-border/50 pb-3">
            <div className="flex items-center gap-2">
              <Quote className="size-4 text-primary" />
              <span className="text-xs font-medium uppercase tracking-widest text-muted-foreground">
                Quote of the moment
              </span>
            </div>
          </CardHeader>

          <CardContent className="pt-6 pb-2">
            <AnimatePresence mode="wait">
              <motion.div
                key={quote.text}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -12 }}
                transition={{ duration: 0.3, ease: "easeOut" }}
              >
                <blockquote className="space-y-4">
                  <p className="text-2xl leading-relaxed tracking-tight text-foreground/90">
                    &ldquo;{quote.text}&rdquo;
                  </p>
                  <footer className="flex items-center gap-2 text-sm">
                    <span className="h-px w-6 bg-secondary/60" />
                    <cite className="not-italic font-medium text-secondary">
                      {quote.author}
                    </cite>
                  </footer>
                </blockquote>
              </motion.div>
            </AnimatePresence>
          </CardContent>

          <CardFooter className="flex justify-between border-t border-border/50 pt-3">
            <span className="text-xs text-muted-foreground">
              {quotes.indexOf(quote) + 1} of {quotes.length}
            </span>
            <Button
              onClick={handleNewQuote}
              disabled={isLoading}
              size="sm"
              className="group"
            >
              <RefreshCw
                className={`size-3.5 transition-transform duration-500 ${
                  isLoading ? "animate-spin" : "group-hover:rotate-180"
                }`}
              />
              <span>New Quote</span>
            </Button>
          </CardFooter>
        </Card>
      </motion.div>
    </div>
  )
}

export default QuoteBox
