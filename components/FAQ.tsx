'use client';

import { useState, useRef, useEffect, ReactNode } from 'react';

interface FAQItem {
  question: string;
  answer: string | ReactNode;
}

const faqs: FAQItem[] = [
  {
    question: "What types of documents can Clariparse process?",
    answer: "Any document, of any complexity. Clariparse can handle any variety of documents including invoices, receipts, contracts, shipping labels, bank statements, forms, and more. Our AI adapts to different layouts and formats, extracting the data you need regardless of how the document is structured."
  },
  {
    question: "How accurate is the data extraction?",
    answer: "Our AI achieves over 98% accuracy on most document types. Unlike traditional OCR, Clariparse understands context and document structure, which means fewer errors and cleaner data. You can also edit and correct any extractions before exporting."
  },
  {
    question: "Can I define custom columns for extraction?",
    answer: "Absolutely. You have full control over what data gets extracted. Define your own columns based on the specific fields you need — whether it's invoice numbers, dates, line items, totals, or any custom field unique to your documents."
  },
  {
    question: "What export formats are supported?",
    answer: "Export your extracted data to CSV, Excel (XLSX), JSON, or connect directly to Google Sheets. We also offer API access for seamless integration with your existing workflows and systems."
  },
  {
    question: "Is my data secure?",
    answer: "Security is our top priority. All documents are encrypted in transit and at rest. We use industry-standard security practices, and your documents are automatically deleted after processing unless you choose to retain them."
  },
  {
    question: "How many documents can I process?",
    answer: (
      <>
        Our <a href="/pricing" className="faq-link">plans</a> scale with your needs. From a few documents per month to thousands per day, Clariparse handles high volumes efficiently. Check our <a href="/pricing" className="faq-link">pricing</a> page for specific limits on each plan.
      </>
    )
  }
];

function FAQItem({ item, isOpen, onClick }: { item: FAQItem; isOpen: boolean; onClick: () => void }) {
  const contentRef = useRef<HTMLDivElement>(null);
  const [height, setHeight] = useState(0);

  useEffect(() => {
    if (contentRef.current) {
      setHeight(contentRef.current.scrollHeight);
    }
  }, [item.answer]);

  return (
    <div className="faq-item">
      <button
        onClick={onClick}
        className="faq-question"
        aria-expanded={isOpen}
      >
        <span>{item.question}</span>
        <svg
          className={`faq-icon ${isOpen ? 'faq-icon-open' : ''}`}
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M6 9l6 6 6-6" />
        </svg>
      </button>
      <div
        className="faq-answer-wrapper"
        style={{ height: isOpen ? height : 0 }}
      >
        <div ref={contentRef} className="faq-answer">
          {item.answer}
        </div>
      </div>
    </div>
  );
}

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const sectionRef = useRef<HTMLElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsVisible(true);
            observer.disconnect();
          }
        });
      },
      { threshold: 0.1 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative z-10 px-8 py-24 md:px-16 lg:px-24 bg-[oklch(var(--background))]"
    >
      <h2 className={`section-heading mb-16 faq-heading ${isVisible ? 'faq-visible' : ''}`}>
        Frequently Asked Questions
      </h2>

      <div className="max-w-3xl mx-auto">
        {faqs.map((faq, index) => (
          <div
            key={index}
            className={`faq-item-wrapper ${isVisible ? 'faq-item-visible' : ''}`}
            style={{ transitionDelay: isVisible ? `${index * 80}ms` : '0ms' }}
          >
            <FAQItem
              item={faq}
              isOpen={openIndex === index}
              onClick={() => setOpenIndex(openIndex === index ? null : index)}
            />
          </div>
        ))}
      </div>
    </section>
  );
}
