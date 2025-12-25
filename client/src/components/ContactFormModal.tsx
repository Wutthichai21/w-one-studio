import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useNotification } from "@/contexts/NotificationContext";

interface ContactFormModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export default function ContactFormModal({
  open,
  onOpenChange,
}: ContactFormModalProps) {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  });
  const [isLoading, setIsLoading] = useState(false);
  const { showNotification } = useNotification();

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Validate form
    if (!formData.name || !formData.email || !formData.message) {
      showNotification(
        "กรุณากรอกข้อมูลที่จำเป็นให้ครบถ้วน",
        "error"
      );
      return;
    }

    setIsLoading(true);

    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000));

      showNotification(
        "ส่งข้อมูลสำเร็จ ขอบคุณที่ติดต่อเรา เราจะตอบกลับในเร็วๆ นี้",
        "success"
      );

      setFormData({
        name: "",
        email: "",
        phone: "",
        message: "",
      });
      onOpenChange(false);
    } catch (error) {
      showNotification(
        "ไม่สามารถส่งข้อมูลได้ กรุณาลองใหม่",
        "error"
      );
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>ติดต่อเรา</DialogTitle>
          <DialogDescription>
            กรอกข้อมูลของคุณและเราจะติดต่อกลับในเร็วๆ นี้
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="name" className="block text-sm font-medium mb-2">
              ชื่อ *
            </label>
            <Input
              id="name"
              name="name"
              placeholder="ชื่อของคุณ"
              value={formData.name}
              onChange={handleChange}
              required
            />
          </div>

          <div>
            <label htmlFor="email" className="block text-sm font-medium mb-2">
              อีเมล *
            </label>
            <Input
              id="email"
              name="email"
              type="email"
              placeholder="example@email.com"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>

          <div>
            <label htmlFor="phone" className="block text-sm font-medium mb-2">
              เบอร์โทรศัพท์
            </label>
            <Input
              id="phone"
              name="phone"
              placeholder="08X-XXX-XXXX"
              value={formData.phone}
              onChange={handleChange}
            />
          </div>

          <div>
            <label htmlFor="message" className="block text-sm font-medium mb-2">
              ข้อความ *
            </label>
            <Textarea
              id="message"
              name="message"
              placeholder="บอกเราว่าคุณต้องการอะไร..."
              value={formData.message}
              onChange={handleChange}
              rows={4}
              required
            />
          </div>

          <div className="flex gap-3 justify-end pt-4">
            <Button
              type="button"
              variant="outline"
              onClick={() => onOpenChange(false)}
              disabled={isLoading}
            >
              ยกเลิก
            </Button>
            <Button type="submit" disabled={isLoading}>
              {isLoading ? "กำลังส่ง..." : "ส่งข้อมูล"}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
