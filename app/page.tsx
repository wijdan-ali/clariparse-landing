import Image from 'next/image'
import { HeroHeading, HeroButton } from '@/components/presets'
import HeroVideo from '@/components/HeroVideo'
import ScrollAwareBlur from '@/components/ScrollAwareBlur'
import ScrollTriggeredCards from '@/components/ScrollTriggeredCards'
import FAQ from '@/components/FAQ'
import Footer from '@/components/Footer'

export default function Home() {
  return (
    <main className="relative min-h-screen overflow-hidden bg-[oklch(var(--background))]">
      {/* Gradual Blur Effect at Bottom of Page - Fades when footer approaches */}
      <ScrollAwareBlur />

      {/* Radial gradient glow at top - half circle from top to headline */}
      <div className="radial-glow-top" />

      {/* Navigation Bar */}
      <nav className="relative z-10 flex items-center justify-left px-8 py-6 md:px-16 lg:px-24">
        {/* Logo + Brand */}
        <a href="/" className="logo-group">
          <div className="logo-scale">
            <div className="flex items-center gap-1">
              <Image
                src="/assets/base_logo.png"
                alt="Clariparse Logo"
                width={24}
                height={24}
                className="w-6 h-6 object-contain"
              />
              <span className="font-antic text-xl tracking-wide text-black">
                clariparse
              </span>
            </div>
          </div>
        </a>

        {/* Nav Links */}
        <div className="flex items-center gap-8 ml-24 pt-1">
          <a 
            href="/pricing" 
            className="font-antic text-base text-black/80 hover:text-black transition-colors"
          >
            Pricing
          </a>
          <a 
            href="/blog" 
            className="font-antic text-base text-black/80 hover:text-black transition-colors"
          >
            Blog
          </a>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative z-10 flex flex-col items-center px-6 pt-16 md:pt-24">
        {/* Headline - Word by Word Animation */}
        <h1 className="hero-heading">
          <span className="hero-word-container">
            <span className="hero-word hero-word-1">Turn</span>
          </span>{' '}
          <span className="hero-word-container">
            <span className="hero-word hero-word-2">Clutter</span>
          </span>{' '}
          <span className="hero-word-container">
            <span className="hero-word hero-word-3">Into</span>
          </span>{' '}
          <span className="hero-word-container">
            <span className="hero-word hero-word-4">Clarity</span>
          </span>
        </h1>

        {/* Divider */}
        <div className="hero-divider hero-divider-animate mt-6" />

        {/* Caption */}
        <p className="hero-caption hero-caption-animate mt-6 max-w-md">
          Extract Data From Documents Into Clean<br />
          Spreadsheets With AI
        </p>

        {/* CTA Button */}
        <div className="mt-10 hero-button-animate">
          <HeroButton href="/app">
            Try Now
          </HeroButton>
        </div>

        {/* Mountains + Demo Area Container */}
        <div className="relative w-full max-w-4xl mt-28 md:mt-28">
          {/* Mountains Image - positioned behind demo area */}
          <div className="hero-mountain-animate absolute left-1/2 -translate-x-[54.5%] bottom-[200px] md:bottom-[300px] w-[120%] max-w-[900px] z-10 pointer-events-none">
            <Image
              src="/assets/mountains.png"
              alt="Mountains"
              width={900}
              height={400}
              className="w-full h-auto object-contain mountain-float"
              style={{ '--mountain-opacity': '0.4', opacity: 0.4 } as React.CSSProperties}
              priority
            />
          </div>

          {/* Hero video (placeholder styling, plays after 3D zoom-in animation) */}
          <HeroVideo />
        </div>
      </section>

      {/* How It Works Section - Scroll Triggered */}
      <ScrollTriggeredCards />

      {/* FAQ Section */}
      <FAQ />

      {/* Footer */}
      <Footer />
    </main>
  )
}
