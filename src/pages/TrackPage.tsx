
import React, { useState } from 'react';
import NavBar from '../components/NavBar';
import Footer from '../components/Footer';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';
import { Search, MapPin, Clock, Package, CheckCircle2, Truck, Calendar } from 'lucide-react';

const TrackPage = () => {
  const [trackingNumber, setTrackingNumber] = useState('');
  const [isSearching, setIsSearching] = useState(false);
  const [trackingResult, setTrackingResult] = useState<null | {
    id: string;
    status: 'processing' | 'picked_up' | 'in_transit' | 'out_for_delivery' | 'delivered';
    origin: string;
    destination: string;
    estimatedDelivery: string;
    currentLocation: string;
    history: Array<{
      status: string;
      location: string;
      date: string;
      time: string;
    }>;
  }>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!trackingNumber) {
      toast.error("الرجاء إدخال رقم التتبع");
      return;
    }
    
    setIsSearching(true);
    
    // Simulate API call
    setTimeout(() => {
      // Demo tracking data
      if (trackingNumber === 'DEMO123' || Math.random() > 0.3) {
        setTrackingResult({
          id: trackingNumber,
          status: 'in_transit',
          origin: 'الرياض، السعودية',
          destination: 'جدة، السعودية',
          estimatedDelivery: '15 يونيو، 2023',
          currentLocation: 'الدمام، السعودية',
          history: [
            {
              status: 'تم تسليم الطرد',
              location: 'جدة، السعودية',
              date: '15 يونيو، 2023',
              time: '14:30',
            },
            {
              status: 'قيد التوصيل',
              location: 'مركز التوزيع بجدة',
              date: '15 يونيو، 2023',
              time: '08:15',
            },
            {
              status: 'وصل إلى مرفق الوجهة',
              location: 'جدة، السعودية',
              date: '14 يونيو، 2023',
              time: '23:45',
            },
            {
              status: 'قيد النقل',
              location: 'الدمام، السعودية',
              date: '13 يونيو، 2023',
              time: '16:20',
            },
            {
              status: 'تم استلامه من قبل موظف التوصيل',
              location: 'الرياض، السعودية',
              date: '12 يونيو، 2023',
              time: '09:10',
            },
            {
              status: 'تم إنشاء ملصق الشحن',
              location: 'الرياض، السعودية',
              date: '11 يونيو، 2023',
              time: '15:30',
            },
          ],
        });
        toast.success("تم العثور على معلومات التتبع!");
      } else {
        setTrackingResult(null);
        toast.error("لم يتم العثور على معلومات التتبع", {
          description: "يرجى التحقق من رقم التتبع والمحاولة مرة أخرى"
        });
      }
      
      setIsSearching(false);
    }, 1500);
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'تم تسليم الطرد':
        return <CheckCircle2 className="h-5 w-5 text-green-500" />;
      case 'قيد التوصيل':
        return <Truck className="h-5 w-5 text-blue-500" />;
      case 'قيد النقل':
        return <Truck className="h-5 w-5 text-blue-400" />;
      case 'تم استلامه من قبل موظف التوصيل':
        return <Package className="h-5 w-5 text-purple-500" />;
      default:
        return <Clock className="h-5 w-5 text-gray-500" />;
    }
  };

  const translateStatus = (status: string) => {
    const statusMap: Record<string, string> = {
      'processing': 'قيد المعالجة',
      'picked_up': 'تم الاستلام',
      'in_transit': 'قيد النقل',
      'out_for_delivery': 'قيد التوصيل',
      'delivered': 'تم التسليم'
    };
    
    return statusMap[status] || status;
  };

  return (
    <div className="min-h-screen flex flex-col">
      <NavBar />
      <main className="flex-grow container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-10">
            <h1 className="text-4xl font-bold mb-4 text-primary">تتبع شحنتك</h1>
            <p className="text-xl text-gray-600">أدخل رقم التتبع الخاص بك لمعرفة حالة وموقع طردك</p>
          </div>
          
          <div className="bg-white rounded-lg shadow-lg p-6 mb-10">
            <form onSubmit={handleSubmit} className="flex gap-3">
              <Button type="submit" disabled={isSearching}>
                {isSearching ? "جاري البحث..." : "تتبع"}
              </Button>
              <div className="relative flex-grow">
                <Search className="absolute right-3 top-3 h-4 w-4 text-gray-400" />
                <Input
                  type="text"
                  placeholder="أدخل رقم التتبع الخاص بك (جرب DEMO123)"
                  className="pr-9 text-right"
                  value={trackingNumber}
                  onChange={(e) => setTrackingNumber(e.target.value)}
                />
              </div>
            </form>
            
            {trackingResult && (
              <div className="mt-8">
                <div className="bg-gray-50 border border-gray-100 rounded-lg p-4 mb-6">
                  <div className="flex justify-between items-center mb-4 flex-row-reverse">
                    <h3 className="text-lg font-semibold">رقم التتبع: {trackingResult.id}</h3>
                    <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                      trackingResult.status === 'delivered' ? 'bg-green-100 text-green-800' :
                      trackingResult.status === 'out_for_delivery' ? 'bg-blue-100 text-blue-800' :
                      trackingResult.status === 'in_transit' ? 'bg-amber-100 text-amber-800' :
                      'bg-gray-100 text-gray-800'
                    }`}>
                      {translateStatus(trackingResult.status)}
                    </span>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="flex items-center flex-row-reverse">
                      <MapPin className="h-5 w-5 ml-2 text-gray-500" />
                      <div className="text-right">
                        <p className="text-xs text-gray-500">المصدر</p>
                        <p className="font-medium">{trackingResult.origin}</p>
                      </div>
                    </div>
                    <div className="flex items-center flex-row-reverse">
                      <MapPin className="h-5 w-5 ml-2 text-gray-500" />
                      <div className="text-right">
                        <p className="text-xs text-gray-500">الوجهة</p>
                        <p className="font-medium">{trackingResult.destination}</p>
                      </div>
                    </div>
                    <div className="flex items-center flex-row-reverse">
                      <Calendar className="h-5 w-5 ml-2 text-gray-500" />
                      <div className="text-right">
                        <p className="text-xs text-gray-500">تاريخ التوصيل المتوقع</p>
                        <p className="font-medium">{trackingResult.estimatedDelivery}</p>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="relative">
                  <div className="absolute right-4 top-0 bottom-0 w-0.5 bg-gray-200"></div>
                  
                  <div className="space-y-6 relative">
                    {trackingResult.history.map((event, index) => (
                      <div key={index} className="flex gap-4 flex-row-reverse">
                        <div className="relative z-10">
                          <div className="h-10 w-10 rounded-full bg-white border border-gray-200 flex items-center justify-center">
                            {getStatusIcon(event.status)}
                          </div>
                        </div>
                        <div className="flex-grow bg-white rounded-lg border border-gray-100 p-4 shadow-sm">
                          <p className="font-medium text-right">{event.status}</p>
                          <div className="mt-1 flex items-center text-sm text-gray-600 flex-row-reverse justify-end">
                            <span>{event.location}</span>
                            <MapPin className="h-4 w-4 ml-1" />
                          </div>
                          <div className="mt-1 text-sm text-gray-500 text-right">
                            {event.date} الساعة {event.time}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </div>
          
          <div className="bg-gray-50 border border-gray-100 rounded-lg p-6 text-center">
            <h2 className="text-xl font-semibold mb-2">هل تحتاج إلى مساعدة في تتبع طردك؟</h2>
            <p className="text-gray-600 mb-4">فريق دعم العملاء لدينا جاهز لمساعدتك.</p>
            <div className="flex justify-center gap-4">
              <Button>اتصل بالدعم</Button>
              <Button variant="outline">محادثة مباشرة</Button>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default TrackPage;
