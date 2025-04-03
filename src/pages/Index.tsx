
import React from 'react';
import { Link } from 'react-router-dom';
import DeliveryForm from '../components/DeliveryForm';
import NavBar from '../components/NavBar';
import Footer from '../components/Footer';

const Index = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <NavBar />
      <main className="flex-grow container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-10">
            <h1 className="text-4xl font-bold mb-4 text-primary">بوصلة التوصيل</h1>
            <p className="text-xl text-gray-600 mb-8">الحل الموثوق به لتتبع وإدارة عمليات التوصيل الخاصة بك</p>
            <div className="flex justify-center gap-4">
              <Link to="/track" className="px-6 py-3 bg-white text-primary font-medium rounded-md shadow-md border border-primary hover:bg-gray-50 transition-all">
                تتبع الشحنة
              </Link>
              <Link to="/" className="px-6 py-3 bg-primary text-white font-medium rounded-md shadow-md hover:bg-primary/90 transition-all">
                طلب توصيل
              </Link>
            </div>
          </div>
          
          <section className="mb-16">
            <div className="grid md:grid-cols-2 gap-8 items-center">
              <div className="bg-white rounded-lg shadow-xl overflow-hidden border border-gray-100 order-1 md:order-2">
                <DeliveryForm />
              </div>
              <div className="order-2 md:order-1">
                <h2 className="text-2xl font-semibold mb-4 text-right">خطط للتوصيل الخاص بك</h2>
                <p className="text-gray-600 mb-6 text-right">
                  املأ نموذجنا البسيط لحساب وقت التسليم والتكلفة، وترتيب توصيل طردك بأمان وفي الوقت المحدد.
                </p>
                <ul className="space-y-3">
                  {[
                    'تتبع التوصيل في الوقت الفعلي',
                    'تقدير دقيق للتكلفة',
                    'جدولة توصيل مرنة',
                    'خيارات دفع آمنة',
                    'إشعارات عبر الرسائل القصيرة والبريد الإلكتروني'
                  ].map((feature, index) => (
                    <li key={index} className="flex items-center flex-row-reverse">
                      <span className="inline-block ml-2 h-5 w-5 rounded-full bg-green-100 text-green-600 flex items-center justify-center text-sm">✓</span>
                      {feature}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </section>
          
          <section className="mb-16">
            <h2 className="text-2xl font-semibold mb-6 text-center">كيف يعمل</h2>
            <div className="grid md:grid-cols-3 gap-8">
              {[
                {
                  title: 'املأ النموذج',
                  description: 'أدخل تفاصيل التوصيل الخاصة بك بما في ذلك مواقع الاستلام والتسليم ومعلومات الطرد والوقت المفضل.',
                  icon: '📝'
                },
                {
                  title: 'التأكيد والدفع',
                  description: 'راجع تكلفة التوصيل والوقت المقدر، ثم أكمل عملية الدفع بشكل آمن.',
                  icon: '💳'
                },
                {
                  title: 'تتبع شحنتك',
                  description: 'استخدم رقم التتبع المقدم لمتابعة طردك في الوقت الفعلي حتى التسليم.',
                  icon: '🚚'
                }
              ].map((step, index) => (
                <div key={index} className="bg-white p-6 rounded-lg shadow-md border border-gray-100 text-center">
                  <div className="text-4xl mb-4">{step.icon}</div>
                  <h3 className="text-xl font-medium mb-2">{step.title}</h3>
                  <p className="text-gray-600">{step.description}</p>
                </div>
              ))}
            </div>
          </section>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Index;
