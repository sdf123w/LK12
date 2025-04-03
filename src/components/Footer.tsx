
import React from 'react';
import { Link } from 'react-router-dom';
import { MapPin, Mail, Phone, Facebook, Twitter, Instagram, Linkedin } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-gray-50 border-t border-gray-200">
      <div className="container mx-auto px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <div>
            <div className="font-bold text-xl flex items-center mb-4">
              <MapPin className="h-5 w-5 ml-2 text-primary" />
              <span>بوصلة التوصيل</span>
            </div>
            <p className="text-gray-600 mb-4 text-right">
              شريكك الموثوق لخدمات توصيل الطرود السريعة والآمنة وبأسعار معقولة.
            </p>
            <div className="flex space-x-4 justify-end">
              <a href="#" className="text-gray-500 hover:text-primary">
                <Linkedin size={20} />
              </a>
              <a href="#" className="text-gray-500 hover:text-primary">
                <Instagram size={20} />
              </a>
              <a href="#" className="text-gray-500 hover:text-primary">
                <Twitter size={20} />
              </a>
              <a href="#" className="text-gray-500 hover:text-primary">
                <Facebook size={20} />
              </a>
            </div>
          </div>
          
          <div className="text-right">
            <h3 className="text-lg font-semibold mb-4">روابط سريعة</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/" className="text-gray-600 hover:text-primary">الرئيسية</Link>
              </li>
              <li>
                <Link to="/track" className="text-gray-600 hover:text-primary">تتبع الشحنة</Link>
              </li>
              <li>
                <Link to="/services" className="text-gray-600 hover:text-primary">خدماتنا</Link>
              </li>
              <li>
                <Link to="/about" className="text-gray-600 hover:text-primary">من نحن</Link>
              </li>
              <li>
                <Link to="/contact" className="text-gray-600 hover:text-primary">اتصل بنا</Link>
              </li>
            </ul>
          </div>
          
          <div className="text-right">
            <h3 className="text-lg font-semibold mb-4">خدماتنا</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/services" className="text-gray-600 hover:text-primary">التوصيل السريع</Link>
              </li>
              <li>
                <Link to="/services" className="text-gray-600 hover:text-primary">التوصيل في نفس اليوم</Link>
              </li>
              <li>
                <Link to="/services" className="text-gray-600 hover:text-primary">الشحن الدولي</Link>
              </li>
              <li>
                <Link to="/services" className="text-gray-600 hover:text-primary">البضائع القابلة للكسر</Link>
              </li>
              <li>
                <Link to="/services" className="text-gray-600 hover:text-primary">الطلبات بالجملة</Link>
              </li>
            </ul>
          </div>
          
          <div className="text-right">
            <h3 className="text-lg font-semibold mb-4">اتصل بنا</h3>
            <ul className="space-y-3">
              <li className="flex items-start flex-row-reverse">
                <MapPin className="h-5 w-5 mr-2 text-gray-500 mt-0.5" />
                <span className="text-gray-600">123 شارع التوصيل، مدينة الشحن، 12345</span>
              </li>
              <li className="flex items-center flex-row-reverse">
                <Mail className="h-5 w-5 mr-2 text-gray-500" />
                <a href="mailto:info@deliverycompass.com" className="text-gray-600 hover:text-primary">
                  info@deliverycompass.com
                </a>
              </li>
              <li className="flex items-center flex-row-reverse">
                <Phone className="h-5 w-5 mr-2 text-gray-500" />
                <a href="tel:+15551234567" className="text-gray-600 hover:text-primary">
                  +966 55 123 4567
                </a>
              </li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-gray-200 mt-10 pt-6 text-center text-gray-500 text-sm">
          <p>© {new Date().getFullYear()} بوصلة التوصيل. جميع الحقوق محفوظة.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
