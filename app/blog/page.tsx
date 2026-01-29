import Image from 'next/image'
import ScrollAwareBlur from '@/components/ScrollAwareBlur'
import Blog from '@/components/Blog'
import Footer from '@/components/Footer'

export default function BlogPage() {
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
            className="font-antic text-base text-black hover:text-black transition-colors"
          >
            Blog
          </a>
        </div>
      </nav>

      {/* Blog Content */}
      <Blog isPage />

      {/* Footer */}
      <Footer />
    </main>
  )
}
