import "./App.css";

export default function Home() {
    return (
        <div
            className="font-sans text-gray-800"
            style={{ backgroundColor: "#FAEDD3" }}
        >
            {/* NAVIGATION BAR */}
            <header
                style={{ backgroundColor: "#B04849", color: "#FAE55B" }}
                className="py-3 px-8 flex flex-col md:flex-row justify-between items-center text-sm space-y-2 md:space-y-0"
            >
                <nav className="flex space-x-4 md:space-x-6 order-2 md:order-1">
                    <a href="/about" className="hover:underline">
                        About Us
                    </a>
                    <a href="/catalog" className="hover:underline">
                        Catalog
                    </a>
                    <a href="/blog" className="hover:underline">
                        Blog
                    </a>
                </nav>

                <a href="/" className="text-xl font-serif order-1 md:order-2">
                    bat · sup · lok · gai
                </a>

                <nav className="flex space-x-4 md:space-x-6 order-3">
                    <a href="/involve" className="hover:underline">
                        Get Involved
                    </a>
                    <a href="/support" className="hover:underline">
                        Support
                    </a>
                </nav>
            </header>

            {/* HERO SECTION */}
            <section
                style={{ backgroundColor: "#B04849", color: "#FAE55B" }}
                className="py-20 px-10 grid md:grid-cols-2 gap-12 items-start"
            >
                <div className="max-w-xl space-y-4">
                    <h2 className="text-4xl sm:text-7xl md:text-6xl font-serif font-semibold">
                        bat · sup · lok · gai
                    </h2>

                    <p className="text-xs uppercase tracking-widest opacity-80">
                        the romanization of 86th street in cantonese
                    </p>

                    <p className="text-base leading-relaxed pt-4 max-w-lg">
                        86th street is Bensonhurst’s own little Chinatown,
                        packed with just about anything you can think of:
                        delicious restaurants, supermarkets, beauty salons, 99
                        cent stores, and more.
                    </p>

                    <button
                        style={{ backgroundColor: "#FAEDD3", color: "#B04849" }}
                        className="text-sm font-semibold px-6 py-3 mt-4 rounded-md shadow-md hover:bg-white transition"
                    >
                        Explore businesses
                    </button>
                </div>

                <div
                    className="w-full h-80 md:h-96 rounded-md shadow-xl mt-10 md:mt-0"
                    style={{ backgroundColor: "rgb(178,182,185)" }}
                />
            </section>

            {/* ANGLED SEPARATOR */}
            <div
                className="h-16 shadow-lg"
                style={{
                    backgroundColor: "#B04849",
                    transform: "skewY(-2deg) translateY(-4rem)",
                }}
            />

            {/* THINGS TO DO */}
            <section className="px-10 py-16 -mt-20">
                <h3
                    className="text-3xl font-serif font-bold mb-12"
                    style={{ color: "#B04849" }}
                >
                    Things To Do
                </h3>

                <div className="grid md:grid-cols-2 gap-12 items-start mb-16">
                    <div className="w-full h-64 bg-gray-300 rounded-lg shadow-md" />
                    <div className="space-y-4">
                        <h4
                            className="text-2xl font-serif font-semibold"
                            style={{ color: "#B04849" }}
                        >
                            Max Funland Grand Opening
                        </h4>
                        <p className="text-sm leading-relaxed">
                            Lorem ipsum dolor sit amet, consectetur adipiscing
                            elit, sed do eiusmod tempor incididunt ut labore et
                            dolore magna aliqua.
                        </p>
                    </div>
                </div>

                <div className="grid md:grid-cols-2 gap-12 items-start">
                    <div className="space-y-4">
                        <h4
                            className="text-2xl font-serif font-semibold"
                            style={{ color: "#B04849" }}
                        >
                            Ceasar’s Bay Fart Walks
                        </h4>
                        <p className="text-sm leading-relaxed">
                            Lorem ipsum dolor sit amet, consectetur adipiscing
                            elit, sed do eiusmod tempor incididunt ut labore et
                            dolore magna aliqua.
                        </p>

                        <div className="flex justify-start md:justify-end pt-4">
                            <button
                                style={{
                                    backgroundColor: "#B04849",
                                    color: "#FAEDD3",
                                }}
                                className="text-sm px-4 py-2 rounded-md shadow-sm hover:opacity-90"
                            >
                                Read More
                            </button>
                        </div>
                    </div>

                    <div className="w-full h-64 bg-gray-300 rounded-lg shadow-md" />
                </div>
            </section>

            {/* BUSINESS OWNER SPOTLIGHT */}
            <section className="px-10 py-20">
                <h3
                    className="text-3xl font-serif font-bold text-center mb-2"
                    style={{ color: "#B04849" }}
                >
                    Business Owner Spotlight
                </h3>

                <p
                    className="text-sm text-center mb-10 opacity-70"
                    style={{ color: "#B04849" }}
                >
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
                                <span
                                    className="absolute top-2 left-2 text-xs font-semibold px-2 py-1 rounded-sm uppercase"
                                    style={{
                                        backgroundColor: "#B04849",
                                        color: "#FAEDD3",
                                    }}
                                >
                                    {item.label}
                                </span>
                            </div>
                            <p className="mt-2 font-semibold">{item.name}</p>
                        </div>
                    ))}
                </div>

                <div className="flex justify-center mt-12">
                    <button
                        style={{ backgroundColor: "#B04849", color: "#FAEDD3" }}
                        className="text-sm px-4 py-2 rounded-md shadow-sm hover:opacity-90"
                    >
                        Read More
                    </button>
                </div>
            </section>

            {/* FOOTER */}
            <footer
                style={{ backgroundColor: "#B04849", color: "#FAEDD3" }}
                className="py-6 px-10 text-sm flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0"
            >
                <p className="font-serif text-xl">bat · sup · lok · gai</p>

                <div className="flex space-x-6 text-base">
                    <a href="/involve" className="hover:underline">
                        Get Involved
                    </a>
                    <a href="/support" className="hover:underline">
                        Support
                    </a>
                </div>
            </footer>
        </div>
    );
}
