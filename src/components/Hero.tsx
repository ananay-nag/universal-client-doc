import { useNavigate } from "react-router-dom";
import { Package, CheckCircle2, ArrowRight } from "lucide-react";
import { FeatureCard } from "./FeatureCard";

export default function Hero() {
  const navigate = useNavigate();

  return (
    <section className="min-h-[75vh] flex flex-col justify-center items-center px-4 text-center max-w-7xl mx-auto">
      <img
        src="./images/universal-client.png"
        className="hero-universal-client"
        alt="universal-client-logo"
      />
      <div className="flex mt-5">
        <Package className="w-16 h-16 text-indigo-600 dark:text-indigo-400 mb-4 mr-4" />
        <h1 className="text-5xl sm:text-6xl font-extrabold mb-3 text-gray-100 dark:text-gray-100">
          universal-client
        </h1>
      </div>

      <p className="text-xl sm:text-2xl text-gray-100 dark:text-gray-300 mb-6">
        Interactive, multi-language SDK documentation for all your client needs.
      </p>
      <p className="text-xl sm:text-2xl text-gray-100 dark:text-gray-300 mb-4">
        It supports server call for
      </p>
      <p className="text-xl sm:text-2xl text-gray-100 dark:text-gray-300 mb-6">
        <strong>
          HTTP, Socket.IO, gRPC, Web-gRPC, Kafka, NATS, MQTT and AMQP
        </strong>
      </p>

      <div className="grid sm:grid-cols-3 gap-6 mb-12 w-full max-w-5xl">
        <FeatureCard
          icon={<CheckCircle2 className="w-12 h-12" />}
          title="Multi-language"
          description="Currently we supports TypeScript"
        />
        <FeatureCard
          icon={<ArrowRight className="w-12 h-12" />}
          title="Versioned Docs"
          description="Easily switch across SDK versions without hassle."
        />
        <FeatureCard
          icon={<Package className="w-12 h-12" />}
          title="Easy Navigation"
          description="Searchable sidebar with detailed API views and examples."
        />
      </div>

      <button
        onClick={() => navigate("/docs")}
        className="px-6 py-3 bg-indigo-600 hover:bg-indigo-700 dark:bg-indigo-500 dark:hover:bg-indigo-600 rounded text-white font-semibold shadow-md transition"
        aria-label="Explore Documentation"
      >
        Explore Documentation
      </button>
    </section>
  );
}
