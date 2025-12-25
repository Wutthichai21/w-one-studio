import { Button } from "@/components/ui/button";
import { ChevronDown, ArrowRight, X } from "lucide-react";
import { useState } from "react";
import { RegistrationForm } from "@/components/RegistrationForm";
import ContactFormModal from "@/components/ContactFormModal";
import TestimonialsSection from "@/components/TestimonialsSection";
import TrustSection from "@/components/TrustSection";

/**
 * W-ONE STUDIO - Minimalist Intellectual Design
 *
 * Design Philosophy:
 * - Swiss Modernism meets Contemporary Minimalism
 * - Clarity through constraint: Generous whitespace and deliberate typography
 * - Asymmetric layouts that feel intentional, not random
 * - Warm accent colors (burnt orange) with deep charcoal for professionalism
 * - Typography-forward approach with Playfair Display for headers
 */

export default function Home() {
  const [expandedService, setExpandedService] = useState<string | null>(null);
  const [showRegistrationModal, setShowRegistrationModal] = useState(false);
  const [showContactModal, setShowContactModal] = useState(false);

  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Navigation */}
      <nav className="sticky top-0 z-50 bg-background/95 backdrop-blur-sm border-b border-border">
        <div className="container flex items-center justify-between py-6">
          <div className="text-2xl font-bold text-primary">W-ONE</div>
          <div className="hidden md:flex gap-8 items-center">
            <a
              href="#about"
              className="text-sm hover:text-primary transition-colors"
            >
              About
            </a>
            <a
              href="#services"
              className="text-sm hover:text-primary transition-colors"
            >
              Services
            </a>
            <a
              href="#founder"
              className="text-sm hover:text-primary transition-colors"
            >
              Founder
            </a>
            <Button
              variant="outline"
              size="sm"
              onClick={() => setShowContactModal(true)}
            >
              Contact
            </Button>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative overflow-hidden pt-20 pb-32">
        <div className="container">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Left: Text Content */}
            <div className="space-y-8">
              <div className="space-y-4">
                <div className="section-divider"></div>
                <h1 className="text-5xl lg:text-6xl font-bold text-foreground leading-tight">
                  Design the Game,
                  <br />
                  Don't Just Play It
                </h1>
              </div>

              <p className="text-lg text-foreground/80 leading-relaxed max-w-md">
                W-ONE STUDIO
                คือสตูดิโอที่ปรึกษาและออกแบบกลยุทธ์ธุรกิจสำหรับฟรีแลนซ์และผู้ประกอบการยุคใหม่ที่ไม่อยากใช้ชีวิตไปกับเส้นทางเดิม
                ๆ
              </p>

              <p className="text-base text-foreground/70">
                เราช่วยให้คุณออกแบบชีวิตในแบบของตัวเอง
                และเลือกสนามที่เหมาะกับตัวเองที่สุด
              </p>

              <div className="flex gap-4 pt-4">
                <Button
                  size="lg"
                  className="bg-primary hover:bg-primary/90"
                  onClick={() => setShowRegistrationModal(true)}
                >
                  เริ่มต้นวันนี้
                </Button>
                <Button variant="outline" size="lg">
                  เรียนรู้เพิ่มเติม
                </Button>
              </div>
            </div>

            {/* Right: Visual */}
            <div className="hidden lg:flex justify-center">
              <img
                src="/images/hero-abstract-path.png"
                alt="Design your own path"
                className="w-full max-w-md"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Philosophy Section */}
      <section id="about" className="py-24 bg-secondary/5">
        <div className="container">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            {/* Left: Visual */}
            <div className="flex justify-center lg:order-2">
              <img
                src="/images/philosophy-visual.png"
                alt="Design the game philosophy"
                className="w-full max-w-sm"
              />
            </div>

            {/* Right: Content */}
            <div className="space-y-8 lg:order-1">
              <div>
                <div className="section-divider mb-6"></div>
                <h2 className="text-4xl font-bold mb-6">ปรัชญาของเรา</h2>
              </div>

              <blockquote className="text-xl text-foreground/90 italic border-l-4 border-primary pl-6 py-4">
                "ผมไม่ชอบแข่งขันในเกมของใคร ถ้าโลกนี้คือกระดานหมากรุก
                ผมจะเลือกเป็นคนออกแบบเกม ไม่ใช่แค่หมากในกระดาน"
              </blockquote>

              <div className="space-y-4">
                <p className="text-foreground/80 leading-relaxed">
                  เราเชื่อในพลังของความแตกต่าง เอกลักษณ์ที่ไม่ต้องเหมือนใคร
                  และการเติบโตที่เริ่มจากการเข้าใจตัวเองอย่างลึกซึ้ง
                </p>
                <p className="text-foreground/80 leading-relaxed">
                  เพราะเส้นทางที่คุณสร้างเอง
                  จะเป็นเส้นทางที่พาคุณไปได้ไกลกว่าที่คิด
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Who We Work With */}
      <section className="py-24">
        <div className="container">
          <div className="max-w-3xl mx-auto text-center mb-16">
            <div className="flex justify-center mb-6">
              <div className="section-divider"></div>
            </div>
            <h2 className="text-4xl font-bold mb-6">
              W-ONE STUDIO เหมาะกับใคร
            </h2>
            <p className="text-lg text-foreground/80">
              เราทำงานกับคนที่พร้อมจะเปลี่ยนแปลงชีวิตของตัวเอง
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                title: "ฟรีแลนซ์",
                description: "ที่อยากมีอิสระมากกว่าแค่รายได้",
              },
              {
                title: "คนทำงานประจำ",
                description: "ที่อยากเปลี่ยนความสามารถเป็นธุรกิจ",
              },
              {
                title: "ผู้ประกอบการเดี่ยว",
                description: "ที่ต้องการความชัด ระบบ และการเติบโตอย่างยั่งยืน",
              },
            ].map((item, index) => (
              <div
                key={index}
                className="p-8 border border-border rounded-lg hover:border-primary/50 transition-colors"
              >
                <h3 className="text-xl font-bold mb-3">{item.title}</h3>
                <p className="text-foreground/70">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section id="services" className="py-24 bg-secondary/5">
        <div className="container">
          <div className="max-w-3xl mx-auto text-center mb-16">
            <div className="flex justify-center mb-6">
              <div className="section-divider"></div>
            </div>
            <h2 className="text-4xl font-bold mb-6">สิ่งที่เราออกแบบให้คุณ</h2>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-16">
            <div className="hidden lg:flex justify-center">
              <img
                src="/images/services-visual.png"
                alt="Our services"
                className="w-full max-w-md"
              />
            </div>

            <div className="space-y-6">
              {[
                {
                  id: "academy",
                  title: "W-ONE Academy",
                  description:
                    "คอร์สออนไลน์ หนังสือ และ E-book ที่ช่วยจัดระเบียบความคิด วางโครงสร้างธุรกิจ และสร้างแบรนด์ที่สะท้อนตัวตนจริง",
                },
                {
                  id: "coaching",
                  title: "Personal Coaching",
                  description:
                    "การให้คำปรึกษาแบบตัวต่อตัว เพื่อช่วยคุณมองเห็นศักยภาพที่ซ่อนอยู่ และออกแบบทิศทางชีวิต-ธุรกิจที่ใช่สำหรับคุณ",
                },
                {
                  id: "branding",
                  title: "Brand Design Studio",
                  description:
                    "บริการออกแบบอัตลักษณ์แบรนด์ และวางกลยุทธ์การตลาดแบบครบวงจร ตั้งแต่แก่นความคิด ไปจนถึงการสื่อสารที่ทรงพลัง",
                },
              ].map(service => (
                <div
                  key={service.id}
                  className="p-6 border border-border rounded-lg cursor-pointer hover:border-primary/50 transition-all"
                  onClick={() =>
                    setExpandedService(
                      expandedService === service.id ? null : service.id
                    )
                  }
                >
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <h3 className="text-xl font-bold mb-2">
                        {service.title}
                      </h3>
                      {expandedService === service.id && (
                        <p className="text-foreground/70 text-sm leading-relaxed">
                          {service.description}
                        </p>
                      )}
                    </div>
                    <ChevronDown
                      className={`w-5 h-5 text-primary transition-transform flex-shrink-0 ml-4 ${
                        expandedService === service.id ? "rotate-180" : ""
                      }`}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Promise Section */}
      <section className="py-24">
        <div className="container">
          <div className="max-w-3xl mx-auto">
            <div className="space-y-8">
              <div>
                <div className="section-divider mb-6"></div>
                <h2 className="text-4xl font-bold mb-6">สิ่งที่เราสัญญา</h2>
              </div>

              <p className="text-lg text-foreground/80 leading-relaxed">
                ที่ W-ONE STUDIO เราไม่ได้ให้แค่ความรู้หรือเครื่องมือ แต่เรามอบ{" "}
                <span className="font-semibold">
                  ความชัด ความมั่นใจ และอำนาจในการตัดสินใจ
                </span>
              </p>

              <div className="space-y-6 mt-8">
                {[
                  "มองเห็นโครงสร้างที่อยู่เบื้องหลังความสำเร็จ",
                  "สร้างระบบที่รองรับการเติบโต",
                  "ภูมิใจกับธุรกิจที่คุณสร้างขึ้นด้วยตัวเอง",
                ].map((promise, index) => (
                  <div key={index} className="flex gap-4 items-start">
                    <div className="w-2 h-2 bg-primary rounded-full mt-3 flex-shrink-0"></div>
                    <p className="text-foreground/80">{promise}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Founder Section */}
      <section id="founder" className="py-24 bg-secondary/5">
        <div className="container">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div className="flex justify-center">
              <img
                src="/images/founder-story-visual.png"
                alt="Founder journey"
                className="w-full max-w-sm"
              />
            </div>

            <div className="space-y-8">
              <div>
                <div className="section-divider mb-6"></div>
                <h2 className="text-4xl font-bold mb-6">Founder</h2>
              </div>

              <div>
                <h3 className="text-2xl font-bold mb-2">วุฒิชัย เทพังเทียม</h3>
                <p className="text-foreground/70 mb-6">
                  ผู้ก่อตั้ง W-ONE STUDIO
                </p>

                <div className="space-y-4">
                  <p className="text-foreground/80 leading-relaxed">
                    W-ONE STUDIO ก่อตั้งโดยความเชื่อเรียบง่ายแต่ทรงพลังว่า:
                  </p>

                  <blockquote className="text-lg text-foreground/90 italic border-l-4 border-primary pl-6 py-4">
                    "คนเราไม่จำเป็นต้องเดินตามเส้นทางที่โลกขีดไว้
                    ถ้าเรากล้าสร้างเส้นทางของตัวเอง"
                  </blockquote>

                  <p className="text-foreground/80 leading-relaxed">
                    จากประสบการณ์และองค์ความรู้ระดับโลก เรานำศาสตร์จาก IBM,
                    University of London, Google และ CalArts
                    มาหลอมรวมเป็นระบบคิดที่ช่วยให้ฟรีแลนซ์ก้าวข้ามคำว่า
                    "รับจ้าง" และเติบโตเป็น ผู้ประกอบการเดี่ยว (Solopreneur)
                    อย่างแท้จริง
                  </p>
                </div>
              </div>

                <div className="border-t border-border pt-6">
                <p className="text-sm font-semibold text-primary mb-4">
                  Certified by
                </p>
                <div className="space-y-2 text-sm text-foreground/70">
                  <div>IBM — Data & Technology</div>
                  <div>University of London — Business Strategy</div>
                  <div>Google — Digital Marketing</div>
                  <div>CalArts — Creative Branding & Visual Communications</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 bg-primary text-primary-foreground">
        <div className="container text-center">
          <h2 className="text-4xl font-bold mb-6">
            พื้นที่สำหรับคนที่เชื่อในศักยภาพของตัวเอง
          </h2>
          <p className="text-lg mb-8 max-w-2xl mx-auto opacity-90">
            และพร้อมจะออกแบบเส้นทางชีวิตในแบบที่ใช่
          </p>
          <Button
            size="lg"
            variant="outline"
            className="border-primary-foreground text-primary-foreground hover:bg-primary-foreground hover:text-primary"
            onClick={() => setShowRegistrationModal(true)}
          >
            เริ่มต้นการเปลี่ยนแปลง <ArrowRight className="ml-2 w-4 h-4" />
          </Button>
        </div>
      </section>

      {/* Registration Modal */}
      {showRegistrationModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
          <div className="bg-background rounded-lg shadow-xl max-w-md w-full max-h-[90vh] overflow-y-auto">
            <div className="sticky top-0 bg-background border-b border-border p-6 flex items-center justify-between">
              <h2 className="text-2xl font-bold">ลงทะเบียน</h2>
              <button
                onClick={() => setShowRegistrationModal(false)}
                className="text-foreground/50 hover:text-foreground transition-colors"
                aria-label="Close modal"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            <div className="p-6">
              <p className="text-foreground/70 mb-6">
                เข้าร่วม W-ONE STUDIO แล้วเริ่มต้นการออกแบบเส้นทางชีวิตของคุณ
              </p>
              <RegistrationForm />
            </div>
          </div>
        </div>
      )}

      {/* Footer */}
      <footer className="border-t border-border py-12 bg-secondary/5">
        <div className="container">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
            <div>
              <h4 className="font-bold text-primary mb-4">W-ONE STUDIO</h4>
              <p className="text-sm text-foreground/70">
                Design the Game, Don't Just Play It
              </p>
            </div>
            <div>
              <h5 className="font-semibold mb-4">Services</h5>
              <ul className="space-y-2 text-sm text-foreground/70">
                <li>
                  <a href="#" className="hover:text-primary transition-colors">
                    Academy
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-primary transition-colors">
                    Coaching
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-primary transition-colors">
                    Brand Design
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h5 className="font-semibold mb-4">About</h5>
              <ul className="space-y-2 text-sm text-foreground/70">
                <li>
                  <a href="#" className="hover:text-primary transition-colors">
                    Our Story
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-primary transition-colors">
                    Founder
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-primary transition-colors">
                    Philosophy
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h5 className="font-semibold mb-4">Contact</h5>
              <ul className="space-y-2 text-sm text-foreground/70">
                <li>
                  <a
                    href="mailto:hello@w-one.studio"
                    className="hover:text-primary transition-colors"
                  >
                    Email
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-primary transition-colors">
                    Instagram
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-primary transition-colors">
                    LinkedIn
                  </a>
                </li>
              </ul>
            </div>
          </div>

          <div className="border-t border-border pt-8">
            <p className="text-sm text-foreground/70 text-center">
              © 2024 W-ONE STUDIO. All rights reserved.
            </p>
          </div>
        </div>
      </footer>

      {/* Trust Section */}
      <TrustSection />

      {/* Testimonials Section */}
      <TestimonialsSection />

      {/* Contact Form Modal */}
      <ContactFormModal
        open={showContactModal}
        onOpenChange={setShowContactModal}
      />
    </div>
  );
}
