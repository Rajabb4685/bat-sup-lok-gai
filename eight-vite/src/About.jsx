import React from "react";

export default function About() {
  return (
    <div className="relative bg-white text-gray-800">

      {/* LEFT SIDE CIRCLES */}
      <div className="flex flex-col space-y-10 absolute left-10 top-80 z-20">
        <div className="w-20 h-20 rounded-full bg-[#F4C430]" />
        <div className="w-20 h-20 rounded-full bg-[#E97451]" />
        <div className="w-20 h-20 rounded-full bg-[#C04000]" />
        <div className="w-20 h-20 rounded-full bg-[#8B0000]" />
        <div className="w-20 h-20 rounded-full bg-[#5D3A00]" />
        <div className="w-20 h-20 rounded-full bg-[#3B1F2B]" />
      </div>

      {/* RIGHT SIDE CIRCLES */}
      <div className="flex flex-col space-y-10 absolute right-10 top-80 z-20">
        <div className="w-20 h-20 rounded-full bg-[#F4C430]" />
        <div className="w-20 h-20 rounded-full bg-[#E97451]" />
        <div className="w-20 h-20 rounded-full bg-[#C04000]" />
        <div className="w-20 h-20 rounded-full bg-[#8B0000]" />
        <div className="w-20 h-20 rounded-full bg-[#5D3A00]" />
        <div className="w-20 h-20 rounded-full bg-[#3B1F2B]" />
      </div>

      {/* HERO */}
      <section className="bg-primary text-secondary py-20 px-10 text-center relative z-10">
        <h2 className="text-4xl md:text-6xl font-serif font-semibold">
          About Us
        </h2>
        <p className="text-sm uppercase tracking-widest opacity-80 mt-2">
          celebrating the heart of 86th street
        </p>
      </section>

      {/* ANGLED SEPARATOR */}
      <div className="h-16 bg-primary shadow-lg -skew-y-2 -translate-y-16" />

      {/* MAIN CONTENT */}
      <section className="px-10 pb-20 max-w-4xl mx-auto space-y-12 relative z-10">

        {/* SECTION 1 */}
        <div className="space-y-4">
          <h3 className="text-3xl font-serif font-bold text-primary">
            Our Mission
          </h3>
          <p className="text-base leading-relaxed">
            bat · sup · lok · gai is a community‑driven project dedicated to
            highlighting the culture, history, and everyday life of 86th Street —
            Bensonhurst’s own little Chinatown. Our goal is to uplift the small
            businesses, families, and workers who give this neighborhood its
            warmth and character.
          </p>
        </div>

        {/* SECTION 2 */}
        <div className="space-y-4">
          <h3 className="text-3xl font-serif font-bold text-primary">
            Why 86th Street?
          </h3>
          <p className="text-base leading-relaxed">
            From noodle shops to bakeries, beauty salons to supermarkets,
            86th Street is a vibrant ecosystem of immigrant‑owned businesses.
            It’s a place where languages mix, traditions overlap, and new
            stories are written every day. We believe these stories deserve to
            be seen, heard, and celebrated.
          </p>
        </div>

        {/* SECTION 3 */}
        <div className="space-y-4">
          <h3 className="text-3xl font-serif font-bold text-primary">
            What We Do
          </h3>
          <p className="text-base leading-relaxed">
            We document local businesses, interview owners, share community
            events, and create accessible guides for anyone looking to explore
            the neighborhood. Whether you’re a longtime resident or a first‑time
            visitor, our platform helps you discover the people and places that
            make 86th Street special.
          </p>
        </div>

        {/* SECTION 4 */}
        <div className="space-y-4">
          <h3 className="text-3xl font-serif font-bold text-primary">
            Our Values
          </h3>
          <ul className="list-disc pl-6 text-base leading-relaxed space-y-2">
            <li>Community first — always.</li>
            <li>Celebrating immigrant stories and cultural heritage.</li>
            <li>Supporting small businesses with visibility and care.</li>
            <li>Creating accessible, inclusive resources for all.</li>
          </ul>
        </div>

      </section>
    </div>
  );
}
