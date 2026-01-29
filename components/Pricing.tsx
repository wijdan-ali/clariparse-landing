'use client';

import { useRef, useState, useEffect } from 'react';

interface PlanFeature {
  text: string;
  included: boolean;
  highlight?: boolean;
}

interface PlanPricing {
  monthly: number;
  yearly: number; // Per month when billed yearly
  originalMonthly?: number;
  originalYearly?: number;
}

interface PricingPlan {
  name: string;
  description: string;
  pricing: PlanPricing;
  features: PlanFeature[];
  cta: string;
  popular?: boolean;
  gradient?: boolean;
}

const paidPlans: PricingPlan[] = [
  {
    name: "Starter",
    description: "Perfect for individuals and small projects",
    pricing: {
      monthly: 19,
      yearly: 15, // ~21% savings
      originalMonthly: 29,
      originalYearly: 24,
    },
    features: [
      { text: "200 documents/month", included: true },
      { text: "Custom column definitions", included: true },
      { text: "Batch processing - upload multiple documents at once", included: false },
      { text: "Priority support", included: false },
    ],
    cta: "Get Started",
  },
  {
    name: "Professional",
    description: "For teams that need power and flexibility",
    pricing: {
      monthly: 49,
      yearly: 39, // ~20% savings
      originalMonthly: 79,
      originalYearly: 64,
    },
    popular: true,
    gradient: true,
    features: [
      { text: "Unlimited documents", included: true, highlight: true },
      { text: "Custom column definitions", included: true },
      { text: "Batch processing - upload multiple documents at once", included: true },
      { text: "Priority support", included: true }
    ],
    cta: "Start Free Trial",
  },
];

const freeTrial = {
  name: "Free Trial",
  description: "Try Clariparse risk-free. No credit card required.",
  features: [
    { text: "50 documents included", included: true },
    { text: "All Professional features", included: true },
    { text: "No credit card required", included: true },
  ],
  cta: "Start Free Trial",
};

interface PricingProps {
  isPage?: boolean;
}

function CheckIcon({ className = "" }: { className?: string }) {
  return (
    <svg 
      className={className} 
      width="20" 
      height="20" 
      viewBox="0 0 20 20" 
      fill="none"
    >
      <path 
        d="M16.667 5L7.5 14.167 3.333 10" 
        stroke="currentColor" 
        strokeWidth="2" 
        strokeLinecap="round" 
        strokeLinejoin="round"
      />
    </svg>
  );
}

function CrossIcon({ className = "" }: { className?: string }) {
  return (
    <svg 
      className={className} 
      width="20" 
      height="20" 
      viewBox="0 0 20 20" 
      fill="none"
    >
      <path 
        d="M15 5L5 15M5 5l10 10" 
        stroke="currentColor" 
        strokeWidth="2" 
        strokeLinecap="round" 
        strokeLinejoin="round"
      />
    </svg>
  );
}

function PricingCard({ 
  plan, 
  isVisible, 
  delay,
  isYearly
}: { 
  plan: PricingPlan; 
  isVisible: boolean;
  delay: number;
  isYearly: boolean;
}) {
  const cardClasses = plan.gradient 
    ? "pricing-card pricing-card-gradient" 
    : "pricing-card pricing-card-light";
  
  const textColor = plan.gradient ? "text-white" : "text-[#1a1a1a]";
  const mutedColor = plan.gradient ? "text-white/70" : "text-[#555]";
  const priceColor = plan.gradient ? "text-white" : "text-[#1a1a1a]";
  const strikeColor = plan.gradient ? "text-white/40" : "text-[#999]";
  const featureCheckColor = plan.gradient ? "text-white" : "text-[#7C9082]";
  const featureCrossColor = plan.gradient ? "text-white/30" : "text-[#ccc]";
  const featureTextIncluded = plan.gradient ? "text-white/90" : "text-[#333]";
  const featureTextExcluded = plan.gradient ? "text-white/40" : "text-[#999]";

  const currentPrice = isYearly ? plan.pricing.yearly : plan.pricing.monthly;
  const originalPrice = isYearly ? plan.pricing.originalYearly : plan.pricing.originalMonthly;
  const period = "/month";
  const savings = originalPrice ? originalPrice - currentPrice : 0;

  return (
    <div 
      className={`${cardClasses} ${isVisible ? 'pricing-card-visible' : ''}`}
      style={{ transitionDelay: isVisible ? `${delay}ms` : '0ms' }}
    >
      {/* Popular Badge */}
      {plan.popular && (
        <div className="pricing-badge">
          <span className="pricing-badge-text">Most Popular</span>
        </div>
      )}

      {/* Plan Header */}
      <div className="mb-6">
        <h3 className={`font-sf-pro font-bold text-2xl ${textColor} mb-2`}>
          {plan.name}
        </h3>
        <p className={`font-sf-pro text-sm ${mutedColor}`}>
          {plan.description}
        </p>
      </div>

      {/* Price */}
      <div className="mb-8">
        <div className="flex items-baseline gap-2">
          {originalPrice && (
            <span className={`font-sf-pro text-xl line-through ${strikeColor} pricing-price-transition`}>
              ${originalPrice}
            </span>
          )}
          <span className="flex items-baseline gap-0">
            <span className={`font-sf-pro font-bold text-5xl ${priceColor} pricing-price-transition`}>
              ${currentPrice}
            </span>
            <span className={`font-sf-pro text-lg ${mutedColor}`}>
              {period}
            </span>
          </span>
        </div>
        <div className="h-6 mt-2">
          {isYearly ? (
            <p className={`font-sf-pro text-sm ${plan.gradient ? 'text-white/60' : 'text-[#7C9082]'} pricing-price-transition`}>
              Billed ${currentPrice * 12}/year · Save ${(plan.pricing.monthly - plan.pricing.yearly) * 12}/year
            </p>
          ) : savings > 0 ? (
            <p className={`font-sf-pro text-sm ${plan.gradient ? 'text-white/60' : 'text-[#7C9082]'} pricing-price-transition`}>
              Save ${savings}/month
            </p>
          ) : null}
        </div>
      </div>

      {/* Features */}
      <ul className="space-y-4 mb-8 flex-grow">
        {plan.features.map((feature, index) => (
          <li key={index} className="flex items-start gap-3">
            {feature.included ? (
              <CheckIcon className={`flex-shrink-0 mt-0.5 ${featureCheckColor}`} />
            ) : (
              <CrossIcon className={`flex-shrink-0 mt-0.5 ${featureCrossColor}`} />
            )}
            <span className={`font-sf-pro text-[15px] ${feature.included ? featureTextIncluded : featureTextExcluded} ${feature.highlight ? 'font-medium' : ''}`}>
              {feature.text}
            </span>
          </li>
        ))}
      </ul>

      {/* CTA Button */}
      <a 
        href="/app" 
        className={plan.gradient ? "pricing-btn-light" : "pricing-btn-gradient"}
      >
        {plan.cta}
      </a>
    </div>
  );
}

function FreeTrialCard({ 
  plan, 
  isVisible, 
  delay 
}: { 
  plan: PricingPlan; 
  isVisible: boolean;
  delay: number;
}) {
  return (
    <div 
      className={`pricing-card-free ${isVisible ? 'pricing-card-visible' : ''}`}
      style={{ transitionDelay: isVisible ? `${delay}ms` : '0ms' }}
    >
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-8">
        {/* Left side - Info */}
        <div className="flex-1">
          <div className="flex items-center gap-3 mb-3">
            <h3 className={`font-sf-pro font-bold text-2xl text-[#1a1a1a]`}>
              {plan.name}
            </h3>
            <span className="pricing-free-badge">No Credit Card</span>
          </div>
          <p className="font-sf-pro text-[#555] mb-6 max-w-md">
            {plan.description}
          </p>
          
          {/* Features in a row */}
          <div className="flex flex-wrap gap-x-6 gap-y-2">
            {plan.features.map((feature, index) => (
              <div key={index} className="flex items-center gap-2">
                <CheckIcon className="text-[#7C9082] w-4 h-4" />
                <span className="font-sf-pro text-sm text-[#333]">{feature.text}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Right side - CTA */}
        <div className="flex-shrink-0">
          <a href="/app" className="pricing-btn-gradient-large">
            {plan.cta}
          </a>
        </div>
      </div>
    </div>
  );
}

function BillingToggle({ 
  isYearly, 
  onToggle 
}: { 
  isYearly: boolean; 
  onToggle: () => void;
}) {
  return (
    <div className="flex items-center justify-center gap-4 mb-12">
      <span className={`font-sf-pro text-sm transition-colors duration-300 ${!isYearly ? 'text-[#1a1a1a] font-medium' : 'text-[#888]'}`}>
        Monthly
      </span>
      <button
        onClick={onToggle}
        className="billing-toggle"
        aria-label={isYearly ? 'Switch to monthly billing' : 'Switch to yearly billing'}
      >
        <span className={`billing-toggle-knob ${isYearly ? 'billing-toggle-yearly' : ''}`} />
      </button>
      <span className={`font-sf-pro text-sm transition-colors duration-300 ${isYearly ? 'text-[#1a1a1a] font-medium' : 'text-[#888]'}`}>
        Yearly
      </span>
      <span className="billing-save-badge">Save 20%</span>
    </div>
  );
}

export default function Pricing({ isPage = false }: PricingProps) {
  const sectionRef = useRef<HTMLElement>(null);
  const [isVisible, setIsVisible] = useState(isPage); // Start visible if it's a page
  const [isYearly, setIsYearly] = useState(false);

  useEffect(() => {
    // If it's a standalone page, trigger animation after a short delay for smooth load
    if (isPage) {
      const timer = setTimeout(() => setIsVisible(true), 100);
      return () => clearTimeout(timer);
    }

    // Otherwise use intersection observer for scroll-triggered animation
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
      id="pricing"
      className="relative z-10 px-8 py-24 md:px-16 lg:px-24"
    >
      {/* Section Header */}
      <div className={`text-center mb-8 pricing-header ${isVisible ? 'pricing-header-visible' : ''}`}>
        <h2 className="section-heading mb-4">
          Pricing
        </h2>
        <p className="font-sf-pro text-lg text-[#555] max-w-xl mx-auto">
          All plans include our core AI extraction technology.
        </p>
      </div>

      {/* Billing Toggle */}
      <div className={`pricing-header ${isVisible ? 'pricing-header-visible' : ''}`} style={{ transitionDelay: '100ms' }}>
        <BillingToggle isYearly={isYearly} onToggle={() => setIsYearly(!isYearly)} />
      </div>

      {/* Paid Plans - Side by Side */}
      <div className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
        {paidPlans.map((plan, index) => (
          <PricingCard 
            key={plan.name} 
            plan={plan} 
            isVisible={isVisible}
            delay={index * 150}
            isYearly={isYearly}
          />
        ))}
      </div>

      {/* Free Trial - Full Width Below */}
      <div className="max-w-4xl mx-auto">
        <FreeTrialCard 
          plan={freeTrial} 
          isVisible={isVisible}
          delay={300}
        />
      </div>

      {/* Trust Indicators */}
      <div className={`text-center mt-16 pricing-trust ${isVisible ? 'pricing-trust-visible' : ''}`}>
        <div className="flex flex-wrap items-center justify-center gap-8 text-[#888]">
          
          <div className="flex items-center gap-2">
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
              <path d="M10 18.333c4.6 0 8.333-3.733 8.333-8.333S14.6 1.667 10 1.667 1.667 5.4 1.667 10s3.733 8.333 8.333 8.333z" stroke="currentColor" strokeWidth="1.5"/>
              <path d="M7.5 10l1.667 1.667L12.5 8.333" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
            <span className="font-sf-pro text-sm">Cancel anytime</span>
          </div>
          <div className="flex items-center gap-2">
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
              <path d="M15.833 8.333h-11.666c-.92 0-1.667.747-1.667 1.667v6.667c0 .92.746 1.666 1.667 1.666h11.666c.92 0 1.667-.746 1.667-1.666V10c0-.92-.746-1.667-1.667-1.667z" stroke="currentColor" strokeWidth="1.5"/>
              <path d="M5.833 8.333V5a4.167 4.167 0 118.334 0v3.333" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
            </svg>
            <span className="font-sf-pro text-sm">Secure payment</span>
          </div>
        </div>
      </div>
    </section>
  );
}
