
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import { format } from "date-fns";
import { CalendarIcon, MapPin, Clock, Truck, DollarSign, Package } from 'lucide-react';
import { cn } from "@/lib/utils";
import { toast } from "sonner";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';

const DeliveryForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    pickupAddress: '',
    deliveryAddress: '',
    packageSize: 'medium',
    packageWeight: 'under5kg',
    date: undefined as Date | undefined,
    notes: '',
  });
  
  const [step, setStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [deliveryEstimate, setDeliveryEstimate] = useState({
    price: 0,
    duration: '0',
    distance: '0',
  });

  const handleChange = (field: string, value: string | Date) => {
    setFormData({
      ...formData,
      [field]: value
    });
  };

  const calculateDelivery = () => {
    // This would normally call an API to calculate based on addresses
    // For demo purposes, we'll use placeholder values
    const basePrice = 9.99;
    const weightMultiplier = formData.packageWeight === 'under5kg' ? 1 : 
                          formData.packageWeight === '5to10kg' ? 1.5 : 2;
    const sizeMultiplier = formData.packageSize === 'small' ? 0.8 : 
                        formData.packageSize === 'medium' ? 1 : 1.3;
    
    const price = basePrice * weightMultiplier * sizeMultiplier;
    
    setDeliveryEstimate({
      price: parseFloat(price.toFixed(2)),
      duration: '30-45',
      distance: '12.4',
    });
    
    toast.success("تم حساب تقدير التوصيل", {
      description: "لقد حسبنا التوصيل الخاص بك بناءً على المعلومات المقدمة."
    });
    
    setStep(2);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (step === 1) {
      calculateDelivery();
      return;
    }
    
    // Validation
    if (!formData.name || !formData.email || !formData.phone || !formData.date) {
      toast.error("يرجى ملء جميع الحقول المطلوبة");
      return;
    }
    
    setIsSubmitting(true);
    
    // Simulate form submission
    setTimeout(() => {
      toast.success("تم تقديم طلب التوصيل!", {
        description: "تمت جدولة التسليم الخاص بك. تحقق من بريدك الإلكتروني للتأكيد."
      });
      setIsSubmitting(false);
      
      // Reset form
      setFormData({
        name: '',
        email: '',
        phone: '',
        pickupAddress: '',
        deliveryAddress: '',
        packageSize: 'medium',
        packageWeight: 'under5kg',
        date: undefined,
        notes: '',
      });
      setStep(1);
    }, 1500);
  };

  return (
    <form onSubmit={handleSubmit} className="p-6">
      <h2 className="text-2xl font-semibold mb-6">جدولة التوصيل</h2>
      
      {step === 1 ? (
        <div className="space-y-5">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="pickupAddress" className="mb-1.5 block">عنوان الاستلام *</Label>
              <div className="relative">
                <MapPin className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                <Input
                  id="pickupAddress"
                  value={formData.pickupAddress}
                  onChange={(e) => handleChange('pickupAddress', e.target.value)}
                  placeholder="أدخل موقع الاستلام"
                  className="pl-9 text-right"
                  required
                />
              </div>
            </div>
            <div>
              <Label htmlFor="deliveryAddress" className="mb-1.5 block">عنوان التسليم *</Label>
              <div className="relative">
                <MapPin className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                <Input
                  id="deliveryAddress"
                  value={formData.deliveryAddress}
                  onChange={(e) => handleChange('deliveryAddress', e.target.value)}
                  placeholder="أدخل موقع التسليم"
                  className="pl-9 text-right"
                  required
                />
              </div>
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="packageSize" className="mb-1.5 block">حجم الطرد *</Label>
              <div className="relative">
                <Package className="absolute left-3 top-2.5 h-4 w-4 text-gray-400" />
                <Select 
                  value={formData.packageSize}
                  onValueChange={(value) => handleChange('packageSize', value)}
                >
                  <SelectTrigger className="pl-9 text-right">
                    <SelectValue placeholder="حدد الحجم" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="small">صغير (حتى 30 سم)</SelectItem>
                    <SelectItem value="medium">متوسط (30-60 سم)</SelectItem>
                    <SelectItem value="large">كبير (أكثر من 60 سم)</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            <div>
              <Label htmlFor="packageWeight" className="mb-1.5 block">وزن الطرد *</Label>
              <div className="relative">
                <Truck className="absolute left-3 top-2.5 h-4 w-4 text-gray-400" />
                <Select 
                  value={formData.packageWeight}
                  onValueChange={(value) => handleChange('packageWeight', value)}
                >
                  <SelectTrigger className="pl-9 text-right">
                    <SelectValue placeholder="حدد الوزن" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="under5kg">أقل من 5 كجم</SelectItem>
                    <SelectItem value="5to10kg">5 كجم - 10 كجم</SelectItem>
                    <SelectItem value="over10kg">أكثر من 10 كجم</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>
          
          <div>
            <Label htmlFor="deliveryDate" className="mb-1.5 block">تاريخ التسليم *</Label>
            <div className="relative">
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant={"outline"}
                    className={cn(
                      "w-full pl-9 text-right font-normal",
                      !formData.date && "text-muted-foreground"
                    )}
                  >
                    <CalendarIcon className="absolute left-3 top-2.5 h-4 w-4 text-gray-400" />
                    {formData.date ? format(formData.date, "PPP") : <span>حدد التاريخ</span>}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                  <Calendar
                    mode="single"
                    selected={formData.date}
                    onSelect={(date) => date && handleChange('date', date)}
                    disabled={(date) => date < new Date()}
                    initialFocus
                    className="pointer-events-auto"
                  />
                </PopoverContent>
              </Popover>
            </div>
          </div>
          
          <div>
            <Label htmlFor="notes" className="mb-1.5 block">ملاحظات إضافية (اختياري)</Label>
            <Textarea 
              id="notes"
              placeholder="تعليمات أو متطلبات خاصة بالتوصيل"
              value={formData.notes}
              onChange={(e) => handleChange('notes', e.target.value)}
              className="resize-none text-right"
              rows={3}
            />
          </div>
          
          <Button type="submit" className="w-full">
            حساب التوصيل
          </Button>
        </div>
      ) : (
        <div className="space-y-5">
          <Card className="mb-6">
            <CardHeader className="pb-3">
              <CardTitle>ملخص التوصيل</CardTitle>
              <CardDescription>بناءً على تفاصيل الطرد الخاص بك</CardDescription>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex justify-between items-center">
                <span className="font-semibold">${deliveryEstimate.price.toFixed(2)}</span>
                <div className="flex items-center gap-2 text-sm text-gray-600">
                  <span>التكلفة المقدرة</span>
                  <DollarSign className="h-4 w-4" />
                </div>
              </div>
              <div className="flex justify-between items-center">
                <span className="font-semibold">{deliveryEstimate.duration} دقيقة</span>
                <div className="flex items-center gap-2 text-sm text-gray-600">
                  <span>المدة المقدرة</span>
                  <Clock className="h-4 w-4" />
                </div>
              </div>
              <div className="flex justify-between items-center">
                <span className="font-semibold">{deliveryEstimate.distance} كم</span>
                <div className="flex items-center gap-2 text-sm text-gray-600">
                  <span>المسافة المقدرة</span>
                  <Truck className="h-4 w-4" />
                </div>
              </div>
            </CardContent>
            <CardFooter className="pt-0">
              <Button variant="outline" size="sm" onClick={() => setStep(1)} className="w-full">
                تعديل التفاصيل
              </Button>
            </CardFooter>
          </Card>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="name" className="mb-1.5 block">الاسم الكامل *</Label>
              <Input
                id="name"
                value={formData.name}
                onChange={(e) => handleChange('name', e.target.value)}
                placeholder="الاسم الكامل"
                className="text-right"
                required
              />
            </div>
            <div>
              <Label htmlFor="phone" className="mb-1.5 block">رقم الهاتف *</Label>
              <Input
                id="phone"
                value={formData.phone}
                onChange={(e) => handleChange('phone', e.target.value)}
                placeholder="رقم الاتصال الخاص بك"
                className="text-right"
                type="tel"
                required
              />
            </div>
          </div>
          
          <div>
            <Label htmlFor="email" className="mb-1.5 block">البريد الإلكتروني *</Label>
            <Input
              id="email"
              value={formData.email}
              onChange={(e) => handleChange('email', e.target.value)}
              placeholder="عنوان بريدك الإلكتروني"
              className="text-right"
              type="email"
              required
            />
          </div>
          
          <Separator className="my-4" />
          
          <div className="flex justify-between items-center font-semibold">
            <span className="text-xl">${deliveryEstimate.price.toFixed(2)}</span>
            <span>التكلفة الإجمالية:</span>
          </div>
          
          <Button type="submit" className="w-full" disabled={isSubmitting}>
            {isSubmitting ? "جاري المعالجة..." : "تأكيد التوصيل"}
          </Button>
        </div>
      )}
    </form>
  );
};

export default DeliveryForm;
