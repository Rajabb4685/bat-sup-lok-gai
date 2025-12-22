import React from "react";
import "./tailwind.css";
import "./index.css";

import { Routes, Route, Link } from "react-router-dom";
import Catalog from "./Catalog.jsx";
import Involve from "./Involve.jsx";

export default function App() {
  return (
    <div className="bg-white font-sans text-gray-800">

      {/* NAVIGATION BAR */}
      <header className="bg-primary text-secondary py-3 px-8 flex flex-col md:flex-row justify-between items-center text-sm space-y-2 md:space-y-0">
        
        <nav className="flex space-x-4 md:space-x-6 order-2 md:order-1">
          <Link to="/about" className="hover:underline">About Us</Link>
          <Link to="/catalog" className="hover:underline">Catalog</Link>
          <Link to="/blog" className="hover:underline">Blog</Link>
        </nav>

        <Link
          to="/"
          className="text-xl font-serif order-1 md:order-2 text-secondary"
        >
          bat · sup · lok · gai
        </Link>

        <nav className="flex space-x-4 md:space-x-6 order-3">
          <Link to="/involve" className="hover:underline">Get Involved</Link>
          <Link to="/support" className="hover:underline">Support</Link>
        </nav>
      </header>

      {/* ROUTES */}
      <Routes>

        {/* HOMEPAGE */}
        <Route
          path="/"
          element={
            <>
              {/* HERO SECTION */}
              <section className="bg-primary text-secondary py-20 px-10 grid md:grid-cols-2 gap-12 items-start">
                <div className="max-w-xl space-y-4">
                  <h2 className="text-4xl sm:text-7xl md:text-6xl font-serif font-semibold text-secondary">
                    bat · sup · lok · gai
                  </h2>

                  <p className="text-xs uppercase tracking-widest opacity-80 text-secondary">
                    the romanization of 86th street in cantonese
                  </p>

                  <p className="text-base leading-relaxed pt-4 max-w-lg text-secondary">
                    86th street is Bensonhurst’s own little Chinatown, packed with just
                    about anything you can think of: delicious restaurants, supermarkets,
                    beauty salons, 99 cent stores, and more.
                  </p>

                  <Link
                    to="/catalog"
                    className="bg-cream text-primary text-sm font-semibold px-6 py-3 mt-4 rounded-md shadow-md hover:bg-white transition inline-block"
                  >
                    Explore businesses
                  </Link>
                </div>

                <img src="/batsup.jpg" alt="batsup" />
              </section>

              {/* ANGLED SEPARATOR */}
              <div className="h-16 bg-primary shadow-lg -skew-y-2 -translate-y-16" />

              {/* THINGS TO DO */}
              <section className="px-10 py-16 -mt-20">
                <h3 className="text-3xl font-serif font-bold mb-12 text-primary">
                  Things To Do
                </h3>

                {/* Item 1 */}
                <div className="grid md:grid-cols-2 gap-12 items-start mb-16">
                  <div className="w-full h-64 bg-gray-300 rounded-lg shadow-md overflow-hidden">
                    <img
                      src="/bk.jpg"
                      alt="batsup"
                      className="w-full h-full object-cover"
                    />
                  </div>

                  <div className="space-y-4">
                    <h4 className="text-2xl font-serif font-semibold text-primary">
                      Max Funland Grand Opening
                    </h4>
                    <p className="text-sm leading-relaxed">
                      Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                      eiusmod tempor incididunt ut labore et dolore magna aliqua.
                    </p>
                  </div>
                </div>

                {/* Item 2 */}
                <div className="grid md:grid-cols-2 gap-12 items-start">
                  <div className="space-y-4">
                    <h4 className="text-2xl font-serif font-semibold text-primary">
                      Ceasar’s Bay Fart Walks
                    </h4>
                    <p className="text-sm leading-relaxed">
                      Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                      eiusmod tempor incididunt ut labore et dolore magna aliqua.
                    </p>

                    <div className="flex justify-start md:justify-end pt-4">
                      <button className="bg-primary text-cream text-sm px-4 py-2 rounded-md shadow-sm hover:opacity-90">
                        Read More
                      </button>
                    </div>
                  </div>

                  <div className="w-full h-64 bg-gray-300 rounded-lg shadow-md" />
                </div>
              </section>

              {/* BUSINESS OWNER SPOTLIGHT */}
              <section className="px-10 py-20">
                <h3 className="text-3xl font-serif font-bold text-center mb-2 text-primary">
                  Business Owner Spotlight
                </h3>

                <p className="text-sm text-center mb-10 opacity-70 text-primary">
                  hear from the owners
                </p>

                <div className="grid md:grid-cols-3 gap-10 text-center">
                  {[
                    { label: "Restaurant", name: "HK Tea and Sushi" },
                    { label: "Beauty", name: "Pinky Salon" },
                    { label: "Cafe", name: "Next Move Cafe" },
                  ].map((item) => (
                    <div key={item.name} className="space-y-2">
                      <div className="w-full h-48 bg-gray-300 rounded-lg shadow-md relative">
                        <span className="absolute top-2 left-2 text-xs font-semibold px-2 py-1 rounded-sm uppercase bg-primary text-cream">
                          {item.label}
                        </span>
                      </div>
                      <p className="mt-2 font-semibold">{item.name}</p>
                    </div>
                  ))}
                </div>

                <div className="flex justify-center mt-12">
                  <button className="bg-primary text-cream text-sm px-4 py-2 rounded-md shadow-sm hover:opacity-90">
                    Read More
                  </button>
                </div>
              </section>
            </>
          }
        />

        {/* OTHER PAGES */}
        <Route path="/catalog" element={<Catalog />} />
        <Route path="/involve" element={<Involve />} />

      </Routes>

      {/* GLOBAL FOOTER — appears on EVERY page */}
      <footer className="bg-primary text-cream py-6 px-10 text-sm flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
        <p className="font-serif text-xl">bat · sup · lok · gai</p>

        <div className="flex space-x-6 text-base">
          <Link to="/involve" className="hover:underline">Get Involved</Link>
          <Link to="/support" className="hover:underline">Support</Link>
        </div>
      </footer>

    </div>
  );
}
