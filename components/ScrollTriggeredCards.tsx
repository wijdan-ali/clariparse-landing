'use client';

import { useEffect, useRef, useState } from 'react';
import Image from 'next/image';

type CardProps = {
  title: string;
  subtitle: string;
  variantClassName: string;
  titleClassName: string;
  subtitleClassName: string;
  imageSrc: string;
  imageAlt: string;
  imageWrapperClassName: string;
  imageAnimClassName: string;
  imageDelayClassName: string;
  textPosition: 'top' | 'bottom';
};

function HowItWorksCard({
  title,
  subtitle,
  variantClassName,
  titleClassName,
  subtitleClassName,
  imageSrc,
  imageAlt,
  imageWrapperClassName,
  imageAnimClassName,
  imageDelayClassName,
  textPosition,
}: CardProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const el = cardRef.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry?.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      {
        threshold: 0.25,
        rootMargin: '0px 0px -10% 0px',
      }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  const textBlock = (
    <div className="relative z-10">
      <h3 className={`card-title ${titleClassName}`}>{title}</h3>
      <p className={`card-subtitle mt-1 ${subtitleClassName}`}>{subtitle}</p>
    </div>
  );

  return (
    <div
      ref={cardRef}
      className={`${variantClassName} min-w-0 aspect-[4/3] min-h-[280px] sm:min-h-[320px] p-6 sm:p-8 flex flex-col relative overflow-hidden`}
    >
      {textPosition === 'top' ? textBlock : <div className="flex-1" />}

      <div
        className={`${imageWrapperClassName} ${imageAnimClassName} ${imageDelayClassName} ${
          isVisible ? 'animate' : ''
        }`}
      >
        <Image
          src={imageSrc}
          alt={imageAlt}
          width={520}
          height={420}
          className="w-full h-full object-contain"
        />
      </div>

      {textPosition === 'bottom' ? textBlock : <div className="flex-1" />}
    </div>
  );
}

export default function ScrollTriggeredCards() {
  const cards: CardProps[] = [
    {
      title: 'Create A Table',
      subtitle: 'From invoices to contracts and shipping labels',
      variantClassName: 'feature-card-gradient justify-end',
      titleClassName: 'text-white',
      subtitleClassName: 'text-white/80 max-w-[240px]',
      imageSrc: '/assets/card_create_table.png',
      imageAlt: 'Create Table Interface',
      imageWrapperClassName:
        'absolute top-[-70px] right-[-70px] sm:top-[-85px] sm:right-[-90px] w-[110%] h-[110%] sm:w-[100%] sm:h-[100%] flex items-center justify-end pr-3 pt-3 sm:pr-4 sm:pt-4',
      imageAnimClassName: 'card-image-slide-right',
      imageDelayClassName: 'card-image-delay-1',
      textPosition: 'bottom',
    },
    {
      title: 'Define Columns',
      subtitle: 'Data you want to extract from your document',
      variantClassName: 'feature-card-light',
      titleClassName: 'text-black',
      subtitleClassName: 'text-black/60 max-w-[280px]',
      imageSrc: '/assets/card_define_columns.png',
      imageAlt: 'Define Columns Interface',
      imageWrapperClassName:
        'absolute bottom-[-60px] right-[-36px] sm:bottom-[-80px] sm:right-[-50px] w-[92%] h-[92%] flex items-end justify-end pr-3 pb-3 sm:pr-4 sm:pb-4',
      imageAnimClassName: 'card-image-slide-right',
      imageDelayClassName: 'card-image-delay-2',
      textPosition: 'top',
    },
    {
      title: 'Upload PDFs',
      subtitle: 'Files in any template and format',
      variantClassName: 'feature-card-light',
      titleClassName: 'text-black',
      subtitleClassName: 'text-black/60 max-w-[240px]',
      imageSrc: '/assets/card_upload_pdfs.png',
      imageAlt: 'Upload PDFs Interface',
      imageWrapperClassName:
        'absolute bottom-[-38px] right-[-38px] sm:bottom-[-50px] sm:right-[-50px] w-[86%] h-[86%] flex items-end justify-end pr-3 pb-3 sm:pr-4 sm:pb-4',
      imageAnimClassName: 'card-image-slide-right',
      imageDelayClassName: 'card-image-delay-3',
      textPosition: 'top',
    },
    {
      title: 'Watch AI Extract Rows',
      subtitle: 'No hallucination, no errors - just the data you asked for',
      variantClassName: 'feature-card-light justify-end',
      titleClassName: 'text-black',
      subtitleClassName: 'text-black/60 max-w-[280px]',
      imageSrc: '/assets/card_watch_AI.png',
      imageAlt: 'AI Extract Rows Interface',
      imageWrapperClassName:
        'absolute top-[-64px] right-[30px] sm:top-[-80px] sm:right-[60px] w-[92%] h-[92%] flex items-start justify-end pr-3 pt-3 sm:pr-4 sm:pt-4',
      imageAnimClassName: 'card-image-slide-left',
      imageDelayClassName: 'card-image-delay-4',
      textPosition: 'bottom',
    },
  ];

  return (
    <section
      id="how-it-works"
      className="relative z-10 px-4 py-20 mt-24 sm:px-6 sm:py-24 md:px-16 lg:px-24 bg-[oklch(var(--background))]"
    >
      {/* Section Heading */}
      <h2 className="section-heading mb-16">
        How It Works
      </h2>

      {/* Cards Grid */}
      <div className="max-w-5xl mx-auto w-full grid grid-cols-1 md:grid-cols-2 gap-6">
        {cards.map((card) => (
          <HowItWorksCard key={card.title} {...card} />
        ))}
      </div>
    </section>
  );
}
