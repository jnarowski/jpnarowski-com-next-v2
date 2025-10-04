'use client'

import { TrendingDown, Clock, Heart, Target } from 'lucide-react'

export function PrinciplesSection() {
  return (
    <section className="flex-1">
      <div className="mb-12">
        <div className="inline-flex items-center gap-2 px-4 py-2 mb-6 bg-primary/10 backdrop-blur-sm rounded-full border border-primary/20">
          <Target className="h-4 w-4 text-primary" />
          <span className="text-sm font-medium text-primary">
            Financial Philosophy
          </span>
        </div>
        <h1 className="text-5xl md:text-6xl font-bold mb-6 leading-tight">
          Die with{' '}
          <span className="bg-gradient-to-r from-primary via-primary/70 to-primary/50 bg-clip-text text-transparent">
            Zero
          </span>
        </h1>
        <p className="text-xl text-muted-foreground leading-relaxed max-w-3xl">
          A financial calculator inspired by Bill Perkins&apos; philosophy: maximize your life experiences
          by optimally spending your wealth over your lifetime, rather than hoarding it.
        </p>
      </div>

      <div className="grid md:grid-cols-3 gap-6">
        <div className="p-6 rounded-2xl bg-gradient-to-br from-primary/10 to-primary/5 border border-border">
          <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center mb-4">
            <TrendingDown className="h-6 w-6 text-primary" />
          </div>
          <h3 className="text-lg font-bold mb-2">Spend Intentionally</h3>
          <p className="text-sm text-muted-foreground leading-relaxed">
            Your wealth should be spent on experiences and helping others, not left unspent at the end of your life.
          </p>
        </div>

        <div className="p-6 rounded-2xl bg-gradient-to-br from-primary/10 to-primary/5 border border-border">
          <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center mb-4">
            <Clock className="h-6 w-6 text-primary" />
          </div>
          <h3 className="text-lg font-bold mb-2">Time is Finite</h3>
          <p className="text-sm text-muted-foreground leading-relaxed">
            Your health, energy, and time to enjoy experiences decline with age. Plan accordingly.
          </p>
        </div>

        <div className="p-6 rounded-2xl bg-gradient-to-br from-primary/10 to-primary/5 border border-border">
          <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center mb-4">
            <Heart className="h-6 w-6 text-primary" />
          </div>
          <h3 className="text-lg font-bold mb-2">Live Fully</h3>
          <p className="text-sm text-muted-foreground leading-relaxed">
            Balance saving for the future with living today. Don&apos;t delay experiences that matter.
          </p>
        </div>
      </div>
    </section>
  )
}
