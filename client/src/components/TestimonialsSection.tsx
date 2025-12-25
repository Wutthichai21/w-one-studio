import { useScrollAnimation } from "@/hooks/useScrollAnimation";

interface Testimonial {
  id: number;
  name: string;
  role: string;
  content: string;
  avatar: string;
}

const testimonials: Testimonial[] = [
  {
    id: 1,
    name: "สมชาย ประสิทธิ์",
    role: "Freelance Designer",
    content:
      "W-ONE STUDIO ช่วยให้ผมเข้าใจตัวเองและธุรกิจของผมได้ลึกขึ้น ตอนนี้ผมมีกลยุทธ์ที่ชัดเจนและรู้ว่าต้องไปทางไหน",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=1",
  },
  {
    id: 2,
    name: "นิดา วงศ์สวัสดิ์",
    role: "Entrepreneur",
    content:
      "การปรึกษากับ W-ONE STUDIO ทำให้ธุรกิจของผมเติบโตขึ้น 3 เท่าในปีแรก ทีมของพวกเขาเข้าใจตลาดจริงๆ",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=2",
  },
  {
    id: 3,
    name: "ธีรพล ชัยวัฒน์",
    role: "Digital Marketer",
    content:
      "ไม่ใช่แค่ให้คำแนะนำ แต่พวกเขาช่วยให้ผมออกแบบชีวิตในแบบที่ผมต้องการจริงๆ ขอบคุณ W-ONE STUDIO",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=3",
  },
];

export default function TestimonialsSection() {
  const { ref, isVisible } = useScrollAnimation();

  return (
    <section
      ref={ref}
      className={`py-20 px-4 transition-all duration-1000 ${
        isVisible
          ? "opacity-100 translate-y-0"
          : "opacity-0 translate-y-10"
      }`}
    >
      <div className="container">
        <div
          className={`mb-12 transition-all duration-1000 delay-100 ${
            isVisible
              ? "opacity-100 translate-y-0"
              : "opacity-0 translate-y-10"
          }`}
        >
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            ลูกค้าพูดถึงเรา
          </h2>
          <p className="text-lg text-muted-foreground">
            ประสบการณ์จากผู้ที่เปลี่ยนแปลงชีวิตและธุรกิจของตนเอง
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {testimonials.map((testimonial, index) => (
            <div
              key={testimonial.id}
              className={`bg-card rounded-lg p-6 shadow-sm border border-border transition-all duration-1000 hover:shadow-lg hover:-translate-y-1 ${
                isVisible
                  ? "opacity-100 translate-y-0"
                  : "opacity-0 translate-y-10"
              }`}
              style={{
                transitionDelay: isVisible ? `${(index + 2) * 100}ms` : "0ms",
              }}
            >
              <div className="flex items-center gap-4 mb-4">
                <img
                  src={testimonial.avatar}
                  alt={testimonial.name}
                  className="w-12 h-12 rounded-full"
                />
                <div>
                  <h3 className="font-semibold text-foreground">
                    {testimonial.name}
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    {testimonial.role}
                  </p>
                </div>
              </div>
              <p className="text-foreground leading-relaxed">
                "{testimonial.content}"
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
