import { useState } from "react";
import { Button } from "@/components/ui/button";
import { useNotification } from "@/contexts/NotificationContext";
import { Loader2 } from "lucide-react";

/**
 * RegistrationForm - ฟอร์มลงทะเบียนสำหรับ W-ONE STUDIO
 *
 * เมื่อผู้ใช้ลงทะเบียนสำเร็จ จะแสดง Push Notification
 * "สมัครสมาชิกสำเร็จ ยินดีต้อนรับสู่เว็บไซต์ของเรา"
 */

export function RegistrationForm() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
  });
  const [isLoading, setIsLoading] = useState(false);
  const [hasSubmitted, setHasSubmitted] = useState(false);
  const { showNotification } = useNotification();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // ตรวจสอบว่าฟอร์มถูกกรอกครบถ้วน
    if (!formData.name || !formData.email || !formData.phone) {
      showNotification("กรุณากรอกข้อมูลให้ครบถ้วน", "warning");
      return;
    }

    setIsLoading(true);

    try {
      // จำลองการส่งข้อมูลไปยังเซิร์ฟเวอร์
      await new Promise(resolve => setTimeout(resolve, 1000));

      // แสดง notification สำเร็จ
      showNotification(
        "สมัครสมาชิกสำเร็จ ยินดีต้อนรับสู่เว็บไซต์ของเรา",
        "success",
        4000
      );

      // รีเซ็ตฟอร์ม
      setFormData({ name: "", email: "", phone: "" });
      setHasSubmitted(true);

      // ซ่อนข้อความสำเร็จหลังจาก 3 วินาที
      setTimeout(() => {
        setHasSubmitted(false);
      }, 3000);
    } catch (error) {
      showNotification("เกิดข้อผิดพลาด กรุณาลองใหม่อีกครั้ง", "error");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div>
        <label htmlFor="name" className="block text-sm font-medium mb-2">
          ชื่อ-นามสกุล
        </label>
        <input
          type="text"
          id="name"
          name="name"
          value={formData.name}
          onChange={handleChange}
          placeholder="กรุณากรอกชื่อของคุณ"
          className="w-full px-4 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary bg-background"
          disabled={isLoading}
        />
      </div>

      <div>
        <label htmlFor="email" className="block text-sm font-medium mb-2">
          อีเมล
        </label>
        <input
          type="email"
          id="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          placeholder="example@email.com"
          className="w-full px-4 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary bg-background"
          disabled={isLoading}
        />
      </div>

      <div>
        <label htmlFor="phone" className="block text-sm font-medium mb-2">
          เบอร์โทรศัพท์
        </label>
        <input
          type="tel"
          id="phone"
          name="phone"
          value={formData.phone}
          onChange={handleChange}
          placeholder="08X-XXX-XXXX"
          className="w-full px-4 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary bg-background"
          disabled={isLoading}
        />
      </div>

      {hasSubmitted && (
        <div className="p-4 bg-green-50 border border-green-200 rounded-lg">
          <p className="text-sm text-green-800">
            ✓ ลงทะเบียนสำเร็จ! เราจะติดต่อคุณในเร็วๆ นี้
          </p>
        </div>
      )}

      <Button
        type="submit"
        size="lg"
        className="w-full bg-primary hover:bg-primary/90"
        disabled={isLoading}
      >
        {isLoading ? (
          <>
            <Loader2 className="w-4 h-4 mr-2 animate-spin" />
            กำลังส่งข้อมูล...
          </>
        ) : (
          "ลงทะเบียน"
        )}
      </Button>
    </form>
  );
}
