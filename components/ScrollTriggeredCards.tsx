'use client';

import { useEffect, useRef, useState } from 'react';
import Image from 'next/image';

export default function ScrollTriggeredCards() {
  const sectionRef = useRef<HTMLElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsVisible(true);
            // Disconnect after first trigger
            observer.disconnect();
          }
        });
      },
      {
        threshold: 0.2, // Trigger when 20% of section is visible
        rootMargin: '0px 0px -100px 0px', // Trigger slightly before fully in view
      }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => {
      observer.disconnect();
    };
  }, []);

  return (
    <section
      id="how-it-works"
      ref={sectionRef}
      className="relative z-10 px-8 py-24 mt-24 md:px-16 lg:px-24 bg-[oklch(var(--background))]"
    >
      {/* Section Heading */}
      <h2 className="section-heading mb-16">
        How It Works
      </h2>

      {/* Cards Grid */}
      <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Card 1: Create A Table - Gradient, text bottom-left */}
        <div className="feature-card-gradient aspect-[4/3] min-h-[320px] p-8 flex flex-col justify-end relative overflow-hidden">
          {/* Image in top-right area */}
          <div className={`absolute top-[-85px] right-[-90px] w-[100%] h-[100%] flex items-center justify-end pr-4 pt-4 card-image-slide-right card-image-delay-1 ${isVisible ? 'animate' : ''}`}>
            <Image
              src="/assets/card_create_table.png"
              alt="Create Table Interface"
              width={500}
              height={400}
              className="w-full h-full object-contain"
            />
          </div>
          {/* Empty space for spacing */}
          <div className="flex-1" />
          {/* Text at bottom-left */}
          <div className="relative z-10">
            <h3 className="card-title text-white">Create A Table</h3>
            <p className="card-subtitle text-white/80 mt-1 max-w-[240px]">
              From invoices to contracts and shipping labels
            </p>
          </div>
        </div>

        {/* Card 2: Define Columns - Light, text top-left */}
        <div className="feature-card-light aspect-[4/3] min-h-[320px] p-8 flex flex-col relative overflow-hidden">
          {/* Text at top-left */}
          <div className="relative z-10">
            <h3 className="card-title text-black">Define Columns</h3>
            <p className="card-subtitle text-black/60 mt-1 max-w-[280px]">
              Data you want to extract from your document
            </p>
          </div>
          {/* Image in bottom-right area */}
          <div className={`absolute bottom-[-80px] right-[-50px] w-[90%] h-[90%] flex items-end justify-end pr-4 pb-4 card-image-slide-right card-image-delay-2 ${isVisible ? 'animate' : ''}`}>
            <Image
              src="/assets/card_define_columns.png"
              alt="Define Columns Interface"
              width={400}
              height={300}
              className="w-full h-full object-contain"
            />
          </div>
          {/* Empty space for spacing */}
          <div className="flex-1" />
        </div>

        {/* Card 3: Upload PDFs - Light, text top-left */}
        <div className="feature-card-light aspect-[4/3] min-h-[320px] p-8 flex flex-col relative overflow-hidden">
          {/* Text at top-left */}
          <div>
            <h3 className="card-title text-black">Upload PDFs</h3>
            <p className="card-subtitle text-black/60 mt-1 max-w-[240px]">
              Files in any template and format
            </p>
          </div>
          {/* Empty space for future image */}
          <div className={`absolute bottom-[-50px] right-[-50px] w-[85%] h-[85%] flex items-end justify-end pr-4 pb-4 card-image-slide-right card-image-delay-3 ${isVisible ? 'animate' : ''}`}>
            <Image
              src="/assets/card_upload_pdfs.png"
              alt="Upload PDFs Interface"
              width={400}
              height={300}
              className="w-full h-full object-contain"
            />
          </div>
        </div>

        {/* Card 4: Watch AI Extract Rows - Light, text bottom-left */}
        <div className="feature-card-light aspect-[4/3] min-h-[320px] p-8 flex flex-col justify-end relative overflow-hidden">
          {/* Image in top-right area - slides from LEFT */}
          <div className={`absolute top-[-80px] right-[60px] w-[90%] h-[90%] flex items-start justify-end pr-4 pt-4 card-image-slide-left card-image-delay-4 ${isVisible ? 'animate' : ''}`}>
            <Image
              src="/assets/card_watch_AI.png"
              alt="AI Extract Rows Interface"
              width={400}
              height={300}
              className="w-full h-full object-contain"
            />
          </div>
          {/* Empty space for spacing */}
          <div className="flex-1" />
          {/* Text at bottom-left */}
          <div className="relative z-10">
            <h3 className="card-title text-black">Watch AI Extract Rows</h3>
            <p className="card-subtitle text-black/60 mt-1 max-w-[280px]">
              No hallicunation, no errors - just the data you asked for
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
