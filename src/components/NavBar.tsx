
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { Menu, X, MapPin, Package, User } from 'lucide-react';

const NavBar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="bg-white border-b border-gray-200 sticky top-0 z-30 shadow-sm">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          <Link to="/" className="font-bold text-xl flex items-center">
            <MapPin className="h-5 w-5 mr-2 text-primary" />
            <span>بوصلة التوصيل</span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-6 flex-row-reverse">
            <Link to="/" className="text-gray-700 hover:text-primary transition-colors">الرئيسية</Link>
            <Link to="/track" className="text-gray-700 hover:text-primary transition-colors">تتبع</Link>
            <Link to="/services" className="text-gray-700 hover:text-primary transition-colors">خدمات</Link>
            <Link to="/about" className="text-gray-700 hover:text-primary transition-colors">من نحن</Link>
            <Link to="/contact" className="text-gray-700 hover:text-primary transition-colors">اتصل بنا</Link>
          </nav>

          <div className="hidden md:flex items-center space-x-3 flex-row-reverse">
            <Button size="sm" className="flex items-center mr-3">
              <User className="h-4 w-4 ml-1" />
              تسجيل الدخول
            </Button>
            <Button variant="outline" size="sm" className="flex items-center">
              <Package className="h-4 w-4 ml-1" />
              تتبع الشحنة
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <button 
            className="md:hidden p-2" 
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label="Toggle menu"
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Navigation Menu */}
      {isMenuOpen && (
        <div className="md:hidden bg-white border-b border-gray-200 py-4">
          <nav className="container mx-auto px-4 space-y-3">
            <Link 
              to="/" 
              className="block py-2 px-4 text-gray-700 hover:bg-gray-50 rounded-md text-right"
              onClick={() => setIsMenuOpen(false)}
            >
              الرئيسية
            </Link>
            <Link 
              to="/track" 
              className="block py-2 px-4 text-gray-700 hover:bg-gray-50 rounded-md text-right"
              onClick={() => setIsMenuOpen(false)}
            >
              تتبع
            </Link>
            <Link 
              to="/services" 
              className="block py-2 px-4 text-gray-700 hover:bg-gray-50 rounded-md text-right"
              onClick={() => setIsMenuOpen(false)}
            >
              خدمات
            </Link>
            <Link 
              to="/about" 
              className="block py-2 px-4 text-gray-700 hover:bg-gray-50 rounded-md text-right"
              onClick={() => setIsMenuOpen(false)}
            >
              من نحن
            </Link>
            <Link 
              to="/contact" 
              className="block py-2 px-4 text-gray-700 hover:bg-gray-50 rounded-md text-right"
              onClick={() => setIsMenuOpen(false)}
            >
              اتصل بنا
            </Link>
            <div className="pt-2 space-y-2">
              <Button size="sm" className="w-full justify-center">
                <User className="h-4 w-4 ml-1" />
                تسجيل الدخول
              </Button>
              <Button variant="outline" size="sm" className="w-full justify-center">
                <Package className="h-4 w-4 ml-1" />
                تتبع الشحنة
              </Button>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
};

export default NavBar;
