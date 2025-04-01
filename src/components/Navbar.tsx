
import { Link, useLocation } from "react-router-dom";
import { Home, ChartLine, Leaf } from "lucide-react";

const Navbar = () => {
  const location = useLocation();
  
  // Navigation items with their paths and icons
  const navItems = [
    { 
      name: "Dashboard", 
      path: "/", 
      icon: <Home className="w-5 h-5" /> 
    },
    { 
      name: "Historical Data", 
      path: "/historical", 
      icon: <ChartLine className="w-5 h-5" /> 
    },
    { 
      name: "Crop Recommendations", 
      path: "/recommendations", 
      icon: <Leaf className="w-5 h-5" /> 
    },
  ];

  return (
    <nav className="bg-white shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex">
            <div className="flex-shrink-0 flex items-center">
              <h1 className="text-xl font-bold text-ecofarm-green-dark">EcoFarm</h1>
            </div>
            <div className="hidden sm:ml-6 sm:flex sm:space-x-8">
              {navItems.map((item) => (
                <Link
                  key={item.path}
                  to={item.path}
                  className={`${
                    location.pathname === item.path
                      ? "border-ecofarm-green-dark text-ecofarm-green-dark"
                      : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
                  } inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium`}
                >
                  <span className="mr-2">{item.icon}</span>
                  {item.name}
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
      
      {/* Mobile bottom navigation */}
      <div className="sm:hidden fixed bottom-0 left-0 right-0 bg-white shadow-md border-t border-gray-200 z-10">
        <div className="flex justify-around">
          {navItems.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              className={`${
                location.pathname === item.path
                  ? "text-ecofarm-green-dark"
                  : "text-gray-500"
              } flex flex-col items-center py-2 px-3`}
            >
              <span className="inline-block">{item.icon}</span>
              <span className="text-xs mt-1">{item.name}</span>
            </Link>
          ))}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
