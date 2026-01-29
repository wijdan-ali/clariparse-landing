'use client';

import { useRef, useState, useEffect } from 'react';
import Image from 'next/image';

interface BlogPost {
  id: string;
  category: string;
  date: string;
  readTime: string;
  title: string;
  image: string;
  slug: string;
}

const blogPosts: BlogPost[] = [
  {
    id: '1',
    category: 'Case Study',
    date: 'January 20, 2026',
    readTime: '4 min read',
    title: 'How a Law Firm Saved 20 Hours Weekly with Clariparse',
    image: 'https://images.unsplash.com/photo-1589829545856-d10d557cf95f?w=800&q=80',
    slug: 'law-firm-case-study',
  },
  {
    id: '2',
    category: 'Updates',
    date: 'January 15, 2026',
    readTime: '3 min read',
    title: 'Introducing Smart Column Detection for Complex Tables',
    image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&q=80',
    slug: 'smart-column-detection',
  },
  {
    id: '3',
    category: 'Tutorial',
    date: 'January 8, 2026',
    readTime: '5 min read',
    title: 'How to Extract Data from Multi-Page Invoices',
    image: 'https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=800&q=80',
    slug: 'extract-multipage-invoices',
  },
  {
    id: '4',
    category: 'Industry',
    date: 'December 28, 2025',
    readTime: '4 min read',
    title: 'The Future of Document Processing in Finance',
    image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&q=80',
    slug: 'future-document-processing',
  },
  {
    id: '5',
    category: 'Updates',
    date: 'December 20, 2025',
    readTime: '2 min read',
    title: 'New Export Options: Google Sheets Integration',
    image: 'https://images.unsplash.com/photo-1432888498266-38ffec3eaf0a?w=800&q=80',
    slug: 'google-sheets-integration',
  },
  {
    id: '6',
    category: 'Tutorial',
    date: 'December 12, 2025',
    readTime: '6 min read',
    title: 'Building Custom Extraction Templates for Your Workflow',
    image: 'https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?w=800&q=80',
    slug: 'custom-extraction-templates',
  },
];

function ArrowIcon() {
  return (
    <svg 
      width="20" 
      height="20" 
      viewBox="0 0 20 20" 
      fill="none"
      className="blog-card-arrow"
    >
      <path 
        d="M4.167 10h11.666M10 4.167L15.833 10 10 15.833" 
        stroke="currentColor" 
        strokeWidth="2" 
        strokeLinecap="round" 
        strokeLinejoin="round"
      />
    </svg>
  );
}

function BlogCard({ 
  post, 
  isVisible, 
  delay 
}: { 
  post: BlogPost; 
  isVisible: boolean;
  delay: number;
}) {
  return (
    <a 
      href={`/blog/${post.slug}`}
      className={`blog-card ${isVisible ? 'blog-card-visible' : ''}`}
      style={{ transitionDelay: isVisible ? `${delay}ms` : '0ms' }}
    >
      {/* Background Image */}
      <div className="blog-card-image-wrapper">
        <Image
          src={post.image}
          alt={post.title}
          fill
          className="blog-card-image"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />
        <div className="blog-card-overlay" />
      </div>

      {/* Content */}
      <div className="blog-card-content">
        {/* Top Meta */}
        <div className="blog-card-meta">
          <span className="blog-card-category">{post.category}</span>
          <span className="blog-card-date">{post.date}</span>
          <span className="blog-card-read-time">{post.readTime}</span>
        </div>

        {/* Title */}
        <h3 className="blog-card-title">{post.title}</h3>

        {/* Read More Button */}
        <div className="blog-card-button">
          <span>Read Full Article</span>
          <ArrowIcon />
        </div>
      </div>
    </a>
  );
}

interface BlogProps {
  isPage?: boolean;
}

export default function Blog({ isPage = false }: BlogProps) {
  const sectionRef = useRef<HTMLElement>(null);
  const [isVisible, setIsVisible] = useState(isPage);

  useEffect(() => {
    if (isPage) {
      const timer = setTimeout(() => setIsVisible(true), 100);
      return () => clearTimeout(timer);
    }

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
  }, [isPage]);

  return (
    <section
      ref={sectionRef}
      id="blog"
      className="relative z-10 px-8 py-24 md:px-16 lg:px-24"
    >
      {/* Section Header */}
      <div className={`text-center mb-16 blog-header ${isVisible ? 'blog-header-visible' : ''}`}>
        <h2 className="section-heading mb-4">
          Blog
        </h2>
        <p className="font-sf-pro text-lg text-[#555] max-w-xl mx-auto">
          Tips, tutorials, and updates to help you get the most out of Clariparse.
        </p>
      </div>

      {/* Blog Grid */}
      <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8">
        {blogPosts.map((post, index) => (
          <BlogCard 
            key={post.id} 
            post={post} 
            isVisible={isVisible}
            delay={index * 100}
          />
        ))}
      </div>
    </section>
  );
}
