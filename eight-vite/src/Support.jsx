import React from "react";

export default function Support() {
  return (
    <div className="bg-white text-gray-800">

      <section className="px-10 py-16 max-w-5xl mx-auto space-y-6">
        <h2 className="text-3xl font-serif font-bold text-primary text-center">
          Explore 86th Street in 360°
        </h2>

        <p className="text-center text-sm opacity-80 max-w-xl mx-auto">
          Take a live walk through Bensonhurst’s Little Chinatown. Explore the shops,
          restaurants, and community spaces that make 86th Street so special.
        </p>

        <div className="w-full h-[450px] rounded-lg overflow-hidden shadow-md">
          <iframe
            src="https://www.google.com/maps/embed?pb=!4v1766444184759!6m8!1m7!1sWYif0n-krjOKWTj927MfcA!2m2!1d40.60472907191892!2d-73.9984745552033!3f98.50484732734895!4f0!5f0.7820865974627469"

            width="100%"
            height="100%"
            style={{ border: 0 }}
            allowFullScreen
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          ></iframe>
        </div>
      </section>

    </div>
  );
}
