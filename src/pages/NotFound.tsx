
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Home } from "lucide-react";

const NotFound = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-50 via-white to-secondary-50 flex items-center justify-center px-4">
      <div className="text-center max-w-md">
        <div className="mb-8">
          <div className="w-32 h-32 mx-auto mb-6 bg-gradient-to-r from-primary-500 to-secondary-500 rounded-full flex items-center justify-center animate-brain-pulse">
            <div className="text-6xl font-bold text-white">404</div>
          </div>
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Page Not Found</h1>
          <p className="text-xl text-gray-600 mb-8">
            Oops! The page you're looking for seems to have wandered off. 
            Let's get you back to safety.
          </p>
        </div>

        <div className="space-y-4">
          <Link to="/">
            <Button 
              size="lg" 
              className="bg-primary-500 hover:bg-primary-600 text-white px-8 py-4 rounded-xl medical-shadow w-full"
            >
              <Home className="w-5 h-5 mr-2" />
              Return to Home
            </Button>
          </Link>
          
          <Link to="/community">
            <Button 
              size="lg" 
              variant="outline" 
              className="border-2 border-secondary-500 text-secondary-600 hover:bg-secondary-50 px-8 py-4 rounded-xl w-full"
            >
              <ArrowLeft className="w-5 h-5 mr-2" />
              Visit Community
            </Button>
          </Link>
        </div>

        <div className="mt-12 p-6 bg-white rounded-lg medical-shadow">
          <h3 className="font-semibold text-gray-900 mb-2">Need Help?</h3>
          <p className="text-gray-600 text-sm mb-4">
            If you were looking for something specific, our support team is here to help.
          </p>
          <div className="flex flex-col space-y-2 text-sm text-gray-600">
            <span>📧 support@braintech.ai</span>
            <span>📞 1-800-BRAIN-AI</span>
            <span>🕒 Available 24/7</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NotFound;
