import Image from 'next/image'
import Footer from '@/components/Footer'

// This would typically come from a CMS or database
const blogPost = {
  category: 'Case Study',
  date: 'January 20, 2026',
  readTime: '4 min read',
  title: 'How a Law Firm Saved 20 Hours Weekly with Clariparse',
  image: 'https://images.unsplash.com/photo-1589829545856-d10d557cf95f?w=1200&q=80',
  slug: 'law-firm-case-study',
};

export default function BlogPostPage() {
  return (
    <main className="relative min-h-screen bg-[oklch(var(--background))]">
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

      {/* Blog Post Content */}
      <article className="relative z-10 px-8 pt-8 pb-24 md:px-16 lg:px-24">
        <div className="max-w-6xl mx-auto">
          {/* Header Section - Full Width */}
          <div className="max-w-3xl">
            {/* Meta */}
            <div className="flex items-center gap-3 mb-6">
              <span className="blog-post-category">{blogPost.category}</span>
              <span className="blog-post-meta">{blogPost.date}</span>
              <span className="blog-post-meta">·</span>
              <span className="blog-post-meta">{blogPost.readTime}</span>
            </div>

            {/* Title */}
            <h1 className="blog-post-title">{blogPost.title}</h1>
          </div>

          {/* Featured Image - Full Width */}
          <div className="blog-post-image-wrapper-full">
            <Image
              src={blogPost.image}
              alt={blogPost.title}
              fill
              className="blog-post-image"
              priority
            />
          </div>

          {/* Content + CTA Sidebar */}
          <div className="flex gap-12">
            {/* Main Content */}
            <div className="flex-1 max-w-3xl">
              {/* Blog Content - Use these tags as template */}
              <div className="blog-post-content">
                <h2>The Challenge</h2>
                <p>
                  Henderson & Associates, a mid-sized law firm specializing in corporate litigation, 
                  was drowning in paperwork. With over 500 cases active at any given time, their 
                  paralegals spent countless hours manually extracting data from contracts, court 
                  documents, and financial statements.
                </p>
                <p>
                  "We were losing nearly 20 hours per week just on data entry," says Sarah Mitchell, 
                  the firm's Operations Director. "That's time our team could have spent on actual 
                  legal work that moves cases forward."
                </p>

                <h2>The Breaking Point</h2>
                <p>
                  The firm reached a critical juncture when they landed a major class-action lawsuit 
                  involving thousands of documents. The traditional approach would have required 
                  hiring temporary staff and pushing back deadlines.
                </p>
                <ul>
                  <li>Over 3,000 documents needed processing</li>
                  <li>Strict court-mandated deadlines</li>
                  <li>Multiple document formats (PDFs, scanned images, spreadsheets)</li>
                  <li>Complex data relationships across documents</li>
                </ul>

                <h2>Discovering Clariparse</h2>
                <p>
                  After evaluating several document processing solutions, Henderson & Associates 
                  chose Clariparse for its ability to handle complex legal documents and its 
                  intuitive column definition feature.
                </p>
                <p>
                  "What sold us was the custom column feature," explains Mitchell. "We could define 
                  exactly what data points we needed—party names, dates, monetary amounts, clause 
                  types—and Clariparse extracted them accurately every time."
                </p>

                <h2>The Implementation</h2>
                <p>
                  The onboarding process was surprisingly straightforward:
                </p>
                <ul>
                  <li>Day 1: Set up extraction templates for common document types</li>
                  <li>Day 2: Trained staff on the platform (15-minute sessions)</li>
                  <li>Day 3-5: Started processing the backlog</li>
                  <li>Day 6: Fully integrated into daily workflow</li>
                </ul>

                <h2>The Results</h2>
                <p>
                  Within the first month, the impact was undeniable:
                </p>
                <ul>
                  <li><strong>20+ hours saved weekly</strong> on document processing</li>
                  <li><strong>98.5% accuracy rate</strong> on data extraction</li>
                  <li><strong>3x faster</strong> document turnaround time</li>
                </ul>
                <p>
                  The class-action case that once seemed insurmountable? Completed two weeks 
                  ahead of schedule.
                </p>

                <h2>Looking Forward</h2>
                <p>
                  Today, Henderson & Associates has expanded their use of Clariparse beyond 
                  litigation support. The firm now uses it for:
                </p>
                <ul>
                  <li>Invoice processing and billing classification</li>
                  <li>Spreadsheet summarization of compliance audits</li>
                </ul>
                <p>
                  "Clariparse just solved our immediate problem," Mitchell reflects. 
                  "It also transformed how we think about document-heavy processes. We're now 
                  exploring use cases we never would have considered before."
                </p>

                <h2>Key Takeaways</h2>
                <p>
                  For firms considering document automation, Henderson & Associates offers 
                  this advice:
                </p>
                <ul>
                  <li>Start with your highest-volume document types</li>
                  <li>Invest time in setting up accurate extraction templates</li>
                  <li>Train your team thoroughly—adoption is key to ROI</li>
                  <li>Measure before and after to quantify the impact</li>
                </ul>
                <p>
                  Ready to see similar results at your organization? Start your free trial 
                  today and experience the difference intelligent document processing can make.
                </p>
              </div>
            </div>

            {/* Sticky CTA Sidebar */}
            <aside className="hidden lg:block w-80 flex-shrink-0">
              <div className="blog-cta-sticky">
                <div className="blog-cta-box">
                  <h3 className="blog-cta-title">
                    Try Clariparse free for 14 days
                  </h3>
                  <p className="blog-cta-description">
                    See how much time you can save with intelligent document processing.
                  </p>
                  <a href="/app" className="blog-cta-button">
                    <span>Get Started</span>
                    <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                      <path 
                        d="M4.167 10h11.666M10 4.167L15.833 10 10 15.833" 
                        stroke="currentColor" 
                        strokeWidth="2" 
                        strokeLinecap="round" 
                        strokeLinejoin="round"
                      />
                    </svg>
                  </a>
                </div>
              </div>
            </aside>
          </div>
        </div>
      </article>

      {/* Mobile CTA */}
      <div className="lg:hidden px-8 pb-12 md:px-16">
        <div className="blog-cta-box">
          <h3 className="blog-cta-title">
            Try Clariparse free for 14 days
          </h3>
          <p className="blog-cta-description">
            See how much time you can save with intelligent document processing.
          </p>
          <a href="/app" className="blog-cta-button">
            <span>Get Started</span>
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
              <path 
                d="M4.167 10h11.666M10 4.167L15.833 10 10 15.833" 
                stroke="currentColor" 
                strokeWidth="2" 
                strokeLinecap="round" 
                strokeLinejoin="round"
              />
            </svg>
          </a>
        </div>
      </div>

      {/* Footer */}
      <Footer />
    </main>
  )
}
