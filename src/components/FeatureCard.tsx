interface FeatureCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
}

export function FeatureCard({ icon, title, description }: FeatureCardProps) {
  return (
    <div className="bg-white dark:bg-gray-800 shadow rounded p-4 sm:p-6 flex flex-col items-center text-center transform transition-transform hover:scale-105 w-full h-full">
      <div className="text-indigo-600 dark:text-indigo-400 mb-3 sm:mb-4">{icon}</div>
      <h3 className="text-base sm:text-lg font-semibold mb-1 sm:mb-2 text-gray-900 dark:text-gray-100">
        {title}
      </h3>
      <p className="text-sm sm:text-base text-gray-600 dark:text-gray-300">
        {description}
      </p>
    </div>
  );
}
