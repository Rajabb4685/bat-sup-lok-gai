import React from "react";

export default function Blog() {
  return (
    <div className="bg-white text-gray-800">

      {/* HERO */}
      <section className="bg-primary text-secondary py-20 px-10 text-center">
        <h2 className="text-4xl md:text-6xl font-serif font-semibold">
          Blog
        </h2>
        <p className="text-sm uppercase tracking-widest opacity-80 mt-2">
          stories, culture, and community from 86th street
        </p>
      </section>

      {/* ANGLED SEPARATOR */}
      <div className="h-16 bg-primary shadow-lg -skew-y-2 -translate-y-16" />

      {/* FEATURED POST */}
      <section className="px-10 pb-20 max-w-5xl mx-auto">
        <div className="grid md:grid-cols-2 gap-12 items-start mb-20">

          {/* IMAGE */}
          <div className="w-full h-72 rounded-lg shadow-md overflow-hidden bg-gray-200">
            <img
              src="/noodle.jpg"
              alt="Featured Story"
              className="w-full h-full object-cover"
            />
          </div>

          {/* TEXT */}
          <div className="space-y-4">
            <h3 className="text-3xl font-serif font-bold text-primary">
              The Heartbeat of Bensonhurst’s Little Chinatown
            </h3>
            <p className="text-base leading-relaxed opacity-90">
              86th Street has transformed over the past decade into one of the most
              culturally rich corridors in Brooklyn. From the aroma of fresh buns
              drifting out of corner bakeries to the rhythmic clatter of mahjong tiles
              in back rooms, the neighborhood pulses with life. This feature explores
              how immigrant families built a thriving ecosystem of food, commerce, and
              community — and why preserving these stories matters.
            </p>
            <button className="bg-primary text-cream text-sm px-4 py-2 rounded-md shadow-sm hover:opacity-90">
              Read More
            </button>
          </div>

        </div>

        {/* BLOG GRID */}
        <div className="grid md:grid-cols-3 gap-12">

          {/* POST 1 */}
          <div className="space-y-4">
            <div className="w-full h-56 rounded-lg shadow-md overflow-hidden bg-gray-200">
              <img
                src="/batsup.jpg"
                alt="Blog Post 1"
                className="w-full h-full object-cover"
              />
            </div>
            <h3 className="text-xl font-serif font-semibold text-primary">
              The Rise of Bensonhurst’s Little Chinatown
            </h3>
            <p className="text-sm leading-relaxed opacity-80">
              A deep dive into how 86th Street became a cultural hub shaped by
              generations of immigrants, each adding their own flavor, language,
              and traditions to the neighborhood’s identity.
            </p>
            <button className="bg-primary text-cream text-sm px-4 py-2 rounded-md shadow-sm hover:opacity-90">
              Read More
            </button>
          </div>

          {/* POST 2 */}
          <div className="space-y-4">
            <div className="w-full h-56 rounded-lg shadow-md overflow-hidden bg-gray-200">
              <img
                src="/hk.jpg"
                alt="Blog Post 2"
                className="w-full h-full object-cover"
              />
            </div>
            <h3 className="text-xl font-serif font-semibold text-primary">
              Hidden Food Gems You Need to Try
            </h3>
            <p className="text-sm leading-relaxed opacity-80">
              From hand‑pulled noodles to flaky pineapple buns, these are the
              under‑the‑radar spots locals swear by — and the stories behind the
              families who run them.
            </p>
            <button className="bg-primary text-cream text-sm px-4 py-2 rounded-md shadow-sm hover:opacity-90">
              Read More
            </button>
          </div>

          {/* POST 3 */}
          <div className="space-y-4">
            <div className="w-full h-56 rounded-lg shadow-md overflow-hidden bg-gray-200">
              <img
                src="/bar.jpg"
                alt="Blog Post 3"
                className="w-full h-full object-cover"
              />
            </div>
            <h3 className="text-xl font-serif font-semibold text-primary">
              Meet the Owners: Stories Behind the Shops
            </h3>
            <p className="text-sm leading-relaxed opacity-80">
              We sat down with local business owners to learn about their journeys,
              challenges, and hopes for the neighborhood — and how their shops became
              community anchors.
            </p>
            <button className="bg-primary text-cream text-sm px-4 py-2 rounded-md shadow-sm hover:opacity-90">
              Read More
            </button>
          </div>

          {/* POST 4 */}
          <div className="space-y-4">
            <div className="w-full h-56 rounded-lg shadow-md overflow-hidden bg-gray-200">
              <img
                src="/nail.jpg"
                alt="Blog Post 4"
                className="w-full h-full object-cover"
              />
            </div>
            <h3 className="text-xl font-serif font-semibold text-primary">
              A Day in the Life on 86th Street
            </h3>
            <p className="text-sm leading-relaxed opacity-80">
              From early‑morning deliveries to late‑night dessert runs, follow the
              rhythm of a typical day on 86th Street and meet the people who keep it
              moving.
            </p>
            <button className="bg-primary text-cream text-sm px-4 py-2 rounded-md shadow-sm hover:opacity-90">
              Read More
            </button>
          </div>

          {/* POST 5 */}
          <div className="space-y-4">
            <div className="w-full h-56 rounded-lg shadow-md overflow-hidden bg-gray-200">
              <img
                src="/bk.jpg"
                alt="Blog Post 5"
                className="w-full h-full object-cover"
              />
            </div>
            <h3 className="text-xl font-serif font-semibold text-primary">
              The Evolution of Asian Grocery Stores
            </h3>
            <p className="text-sm leading-relaxed opacity-80">
              How supermarkets on 86th Street adapted to changing tastes, new
              generations, and the growing demand for fresh, authentic ingredients.
            </p>
            <button className="bg-primary text-cream text-sm px-4 py-2 rounded-md shadow-sm hover:opacity-90">
              Read More
            </button>
          </div>

          {/* POST 6 */}
          <div className="space-y-4">
            <div className="w-full h-56 rounded-lg shadow-md overflow-hidden bg-gray-200">
              <img
                src="/noodle.jpg"
                alt="Blog Post 6"
                className="w-full h-full object-cover"
              />
            </div>
            <h3 className="text-xl font-serif font-semibold text-primary">
              Community Events You Shouldn’t Miss
            </h3>
            <p className="text-sm leading-relaxed opacity-80">
              From cultural festivals to small pop‑ups, here’s a roundup of events
              that bring neighbors together and celebrate the spirit of the
              community.
            </p>
            <button className="bg-primary text-cream text-sm px-4 py-2 rounded-md shadow-sm hover:opacity-90">
              Read More
            </button>
          </div>

        </div>
      </section>
    </div>
  );
}
