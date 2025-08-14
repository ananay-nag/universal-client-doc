import { ArrowRight, CheckCircle2, Package } from "lucide-react";
import { FeatureCard } from "./FeatureCard";
import { useNavigate } from "react-router-dom";

// Hero.tsx
export default function Hero() {
  const navigate = useNavigate();

  return (
    <section className="min-h-[75vh] flex flex-col justify-center items-center px-4 sm:px-6 lg:px-8 text-center max-w-7xl mx-auto">
      <img
        src="./images/universal-client.png"
        className="hero-universal-client w-full max-w-xs sm:max-w-md md:max-w-lg lg:max-w-2xl h-auto"
        alt="universal-client-logo"
      />

      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-center mt-5 gap-4">
        <Package className="w-12 h-12 sm:w-16 sm:h-16 text-indigo-600 dark:text-indigo-400" />
        <h1 className="text-3xl sm:text-5xl md:text-6xl font-extrabold text-gray-100 dark:text-gray-100">
          universal-client
        </h1>
      </div>

      <p className="text-base sm:text-lg md:text-xl text-gray-100 dark:text-gray-300 mt-4 max-w-2xl">
        Interactive, multi-language SDK documentation for all your client needs.
      </p>
      <p className="text-base sm:text-lg md:text-xl text-gray-100 dark:text-gray-300">
        It supports server call for
      </p>
      <p className="text-base sm:text-lg md:text-xl text-gray-100 dark:text-gray-300 font-bold">
        HTTP, Socket.IO, gRPC, Web-gRPC, Kafka, NATS, MQTT and AMQP
      </p>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 my-12 w-full max-w-5xl px-4">
        <FeatureCard
          icon={<CheckCircle2 className="w-10 h-10 sm:w-12 sm:h-12" />}
          title="Multi-language"
          description="Currently we supports TypeScript"
        />
        <FeatureCard
          icon={<ArrowRight className="w-10 h-10 sm:w-12 sm:h-12" />}
          title="Versioned Docs"
          description="Easily switch across SDK versions without hassle."
        />
        <FeatureCard
          icon={<Package className="w-10 h-10 sm:w-12 sm:h-12" />}
          title="Easy Navigation"
          description="Searchable sidebar with detailed API views and examples."
        />
      </div>

      <button
        onClick={() => navigate("/docs")}
        className="px-4 sm:px-6 py-2 sm:py-3 bg-indigo-600 hover:bg-indigo-700 dark:bg-indigo-500 dark:hover:bg-indigo-600 rounded text-white font-semibold shadow-md transition"
        aria-label="Explore Documentation"
      >
        Explore Documentation
      </button>
    </section>
  );
}
