import React from 'react';
import { Check } from 'lucide-react';
import { cn } from '../../utils/cn';

const tiers = [
  {
    name: 'Free',
    price: 0,
    features: [
      'Basic templates',
      'PDF downloads',
      'Real-time preview',
      'Basic formatting options',
    ],
    cta: 'Get Started',
    featured: false,
  },
  {
    name: 'Pro',
    price: 9,
    features: [
      'All Free features',
      'Premium templates',
      'Multiple formats (PDF, DOCX, TXT)',
      'ATS optimization',
      'Multiple resume versions',
      'Priority support',
    ],
    cta: 'Start Free Trial',
    featured: true,
  },
  {
    name: 'Enterprise',
    price: 29,
    features: [
      'All Pro features',
      'Custom branding',
      'Team collaboration',
      'Analytics & tracking',
      'API access',
      'Dedicated support',
    ],
    cta: 'Contact Sales',
    featured: false,
  },
];

export function Pricing() {
  return (
    <div id="pricing" className="bg-gray-50 py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h2 className="text-base text-indigo-600 font-semibold tracking-wide uppercase">
            Pricing
          </h2>
          <p className="mt-2 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
            Plans for every career stage
          </p>
          <p className="mt-4 max-w-2xl text-xl text-gray-500 mx-auto">
            Choose the perfect plan for your needs. All plans include our core features.
          </p>
        </div>

        <div className="mt-20 space-y-12 lg:space-y-0 lg:grid lg:grid-cols-3 lg:gap-8">
          {tiers.map((tier) => (
            <div
              key={tier.name}
              className={cn(
                "relative flex flex-col rounded-2xl border bg-white shadow-sm",
                tier.featured ? "border-indigo-200 scale-105" : "border-gray-200"
              )}
            >
              {tier.featured && (
                <div className="absolute -top-4 left-1/2 -translate-x-1/2">
                  <span className="inline-flex rounded-full bg-indigo-100 px-4 py-1 text-xs font-semibold text-indigo-600">
                    Most Popular
                  </span>
                </div>
              )}

              <div className="p-8">
                <h3 className="text-xl font-semibold text-gray-900">
                  {tier.name}
                </h3>
                <p className="mt-4 flex items-baseline">
                  <span className="text-4xl font-bold tracking-tight text-gray-900">
                    ${tier.price}
                  </span>
                  <span className="ml-1 text-sm font-medium text-gray-500">
                    /month
                  </span>
                </p>
                <ul className="mt-8 space-y-4">
                  {tier.features.map((feature) => (
                    <li key={feature} className="flex items-start">
                      <Check className="h-5 w-5 text-green-500 flex-shrink-0" />
                      <span className="ml-3 text-sm text-gray-500">
                        {feature}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="p-8 pt-0">
                <button
                  className={cn(
                    "w-full rounded-md px-4 py-2 text-sm font-medium",
                    tier.featured
                      ? "bg-indigo-600 text-white hover:bg-indigo-700"
                      : "bg-indigo-50 text-indigo-700 hover:bg-indigo-100"
                  )}
                >
                  {tier.cta}
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}