import Header from "./components/Header";
import Footer from "./components/Footer";
import Router from "./router";
import { ErrorBoundary } from "./components/ErrorBoundary";

export default function App() {
  return (
    <ErrorBoundary>
      <div className="flex flex-col min-h-screen dark:bg-gray-900 dark:text-gray-100 transition-colors duration-500">
        <Header />
        <div className="flex-grow">
          <Router />
        </div>
        <Footer />
      </div>
    </ErrorBoundary>
  );
}
