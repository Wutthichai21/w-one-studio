import { useScrollAnimation } from "@/hooks/useScrollAnimation";

interface Certification {
  id: number;
  organization: string;
  skill: string;
  icon: string;
}

const certifications: Certification[] = [
  {
    id: 1,
    organization: "IBM",
    skill: "Data & Technology",
    icon: "🔷",
  },
  {
    id: 2,
    organization: "University of London",
    skill: "Business Strategy",
    icon: "🎓",
  },
  {
    id: 3,
    organization: "Google",
    skill: "Digital Marketing",
    icon: "🔍",
  },
  {
    id: 4,
    organization: "CalArts",
    skill: "Creative Branding & Visual Communications",
    icon: "🎨",
  },
];

export default function TrustSection() {
  const { ref, isVisible } = useScrollAnimation();

  return (
    <section
      ref={ref}
      className={`py-16 px-4 bg-background border-y border-border transition-all duration-1000 ${
        isVisible
          ? "opacity-100 translate-y-0"
          : "opacity-0 translate-y-10"
      }`}
    >
      <div className="container">
        <div
          className={`text-center mb-12 transition-all duration-1000 delay-100 ${
            isVisible
              ? "opacity-100 translate-y-0"
              : "opacity-0 translate-y-10"
          }`}
        >
          <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-2">
            Certified by World-Class Institutions
          </h2>
          <p className="text-muted-foreground">
            Knowledge and expertise from leading global organizations
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {certifications.map((cert, index) => (
            <div
              key={cert.id}
              className={`flex flex-col items-center text-center p-6 rounded-lg border border-border/50 bg-card/50 backdrop-blur-sm hover:border-border transition-all duration-300 hover:shadow-md ${
                isVisible
                  ? "opacity-100 translate-y-0"
                  : "opacity-0 translate-y-10"
              }`}
              style={{
                transitionDelay: isVisible ? `${(index + 1) * 100}ms` : "0ms",
              }}
            >
              <div className="text-4xl mb-4 grayscale hover:grayscale-0 transition-all">
                {cert.icon}
              </div>
              <h3 className="font-semibold text-foreground text-sm mb-1">
                {cert.organization}
              </h3>
              <p className="text-xs text-muted-foreground">
                {cert.skill}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
