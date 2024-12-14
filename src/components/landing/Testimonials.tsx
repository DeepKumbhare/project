import React from 'react';
import { Star } from 'lucide-react';

const testimonials = [
  {
    content: "The best resume builder I've ever used. Got me interviews at top tech companies!",
    author: "Sarah Johnson",
    role: "Software Engineer",
    company: "Tech Corp",
    image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
  },
  {
    content: "Simple, intuitive, and professional. Helped me land my dream job.",
    author: "Michael Chen",
    role: "Product Manager",
    company: "StartUp Inc",
    image: "https://images.unsplash.com/photo-1519345182560-3f2917c472ef?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
  },
  {
    content: "The ATS-friendly templates really make a difference. Highly recommended!",
    author: "Emily Davis",
    role: "Marketing Director",
    company: "Global Media",
    image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
  },
];

export function Testimonials() {
  return (
    <div className="bg-white py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h2 className="text-base text-indigo-600 font-semibold tracking-wide uppercase">
            Testimonials
          </h2>
          <p className="mt-2 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
            Trusted by thousands of job seekers
          </p>
          <p className="mt-4 max-w-2xl text-xl text-gray-500 mx-auto">
            See what our users have to say about their experience.
          </p>
        </div>

        <div className="mt-20">
          <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
            {testimonials.map((testimonial, index) => (
              <div
                key={index}
                className="flex flex-col bg-white rounded-lg shadow-sm border border-gray-100 p-8"
              >
                <div className="flex-1">
                  <div className="flex items-center mb-4">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className="h-5 w-5 text-yellow-400 fill-current"
                      />
                    ))}
                  </div>
                  <p className="text-gray-600 mb-4">"{testimonial.content}"</p>
                </div>
                <div className="flex items-center">
                  <img
                    className="h-12 w-12 rounded-full"
                    src={testimonial.image}
                    alt={testimonial.author}
                  />
                  <div className="ml-4">
                    <h4 className="text-sm font-medium text-gray-900">
                      {testimonial.author}
                    </h4>
                    <p className="text-sm text-gray-500">
                      {testimonial.role} at {testimonial.company}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}