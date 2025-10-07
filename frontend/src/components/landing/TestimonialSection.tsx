import React from "react";
import { IconQuote, IconStar } from "@tabler/icons-react";

const testimonials = [
  {
    name: "Krishna Mistry",
    role: "MBA Student",
    company: "Masters Union",
    content:
      "Finally, a news platform that doesn't overwhelm me with outdated content. The 24-hour refresh keeps everything relevant and actionable.",
    rating: 5,
    avatar: "https://cdn.pixabay.com/photo/2023/02/18/11/00/icon-7797704_640.png",
  },
  {
    name: "Aniket Ghavte",
    role: "Product Engineer",
    company: "Freelancer",
    content:
      "The AI summaries are incredibly accurate and save me hours of reading. Perfect for staying informed during busy workdays.",
    rating: 5,
    avatar: "https://cdn.pixabay.com/photo/2023/02/18/11/00/icon-7797704_640.png",
  },
  {
    name: "Harsh Jha",
    role: "Software Engineer",
    company: "Bynry Inc",
    content:
      "The RSS aggregation feature is seamless. Having all my trusted sources in one place with automatic cleanup is a game-changer.",
    rating: 5,
    avatar: "https://cdn.pixabay.com/photo/2023/02/18/11/00/icon-7797704_640.png",
  },
];

const TestimonialSection = () => {
  return (
    <div className="bg-black/95 py-20 border-t border-white/10">
      <div className="max-w-7xl mx-auto px-6">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="mb-8 text-white/60 uppercase flex items-center justify-center space-x-4 text-sm tracking-wider">
            <div className="w-8 h-px bg-white/20"></div>
            <span>[</span>
            <h2 className="font-medium">Testimonials</h2>
            <span>]</span>
            <div className="w-8 h-px bg-white/20"></div>
          </div>
          <h1 className="text-5xl md:text-6xl font-bold text-white mb-4">
            What People Say
          </h1>
          <p className="text-white/60 text-lg max-w-2xl mx-auto">
            Trusted by journalists, professionals, and news enthusiasts
            worldwide
          </p>
        </div>

        {/* Testimonials Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {testimonials.map((testimonial, idx) => (
            <div
              key={idx}
              className="group bg-black/60 border border-white/10 rounded-[32px] p-8 hover:border-white/20 transition-all duration-300 relative overflow-hidden"
            >
              {/* Quote Icon */}
              <div className="absolute top-6 right-6 text-white/10 group-hover:text-white/20 transition-colors">
                <IconQuote size={24} />
              </div>

              {/* Rating */}
              <div className="flex items-center mb-6">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <IconStar
                    key={i}
                    size={16}
                    className="text-yellow-400 fill-current"
                  />
                ))}
              </div>

              {/* Content */}
              <p className="text-white/80 leading-relaxed mb-8 text-lg">
                "{testimonial.content}"
              </p>

              {/* Author */}
              <div className="flex items-center space-x-4">
                <div className="relative">
                  <img
                    src={testimonial.avatar}
                    alt={testimonial.name}
                    className="w-12 h-12 rounded-full border border-white/20"
                  />
                  <div className="absolute inset-0 rounded-full bg-gradient-to-r from-blue-500/20 to-purple-500/20"></div>
                </div>
                <div>
                  <h4 className="text-white font-semibold text-sm">
                    {testimonial.name}
                  </h4>
                  <p className="text-white/50 text-sm">
                    {testimonial.role} • {testimonial.company}
                  </p>
                </div>
              </div>

              {/* Subtle gradient overlay */}
              <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 to-purple-500/5 rounded-[32px] opacity-0 group-hover:opacity-100 transition-opacity duration-300 -z-10"></div>
            </div>
          ))}
        </div>

        {/* Bottom Stats */}
        <div className="mt-16 pt-16 border-t border-white/10">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
            <div>
              <div className="text-3xl md:text-4xl font-bold text-white mb-2">
                100+
              </div>
              <div className="text-white/60">Active Users</div>
            </div>
            <div>
              <div className="text-3xl md:text-4xl font-bold text-white mb-2">
                4.9/5
              </div>
              <div className="text-white/60">Average Rating</div>
            </div>
            <div>
              <div className="text-3xl md:text-4xl font-bold text-white mb-2">
                50K+
              </div>
              <div className="text-white/60">Articles Processed</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TestimonialSection;
