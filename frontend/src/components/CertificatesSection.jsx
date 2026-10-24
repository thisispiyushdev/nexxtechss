import React, { memo } from "react";

// Featured NexxTechs Certificate
const NEXXTECHS_CERTIFICATE = {
  id: "nexxtechs",
  title: "Official NexxTechs Certificate of Completion",
  subtitle: "Full Stack Web Development & Industry Project Mastery",
  image: "/certificate/nexxtech-certificate.png",
  alt: "Official NexxTechs Certificate of Completion"
};

// 4 Global Partner Certifications for the 4-card grid
const GLOBAL_CERTIFICATES = [
  {
    id: "google",
    brand: "Google Cloud",
    title: "Google Cloud Skill Badge",
    certName: "Secure BigLake Data & Smart Analytics",
    image: "/certificate/google-cloud-certificate.jpeg",
    alt: "Google Cloud Certificate"
  },
  {
    id: "microsoft",
    brand: "Microsoft",
    title: "Microsoft Azure AI",
    certName: "Artificial Intelligence on Microsoft Azure",
    image: "/certificate/microsoft-certificate.jpeg",
    alt: "Microsoft Azure AI Certificate"
  },
  {
    id: "aws",
    brand: "AWS",
    title: "AWS Certified",
    certName: "Solutions Architect – Associate",
    image: "/certificate/aws-certificate.jpg",
    alt: "AWS Certified Solutions Architect"
  },
  {
    id: "redhat",
    brand: "Red Hat",
    title: "Red Hat (RHCSA)",
    certName: "Certified System Administrator",
    image: "/certificate/redhat-certificate.jpg",
    alt: "Red Hat Certified System Administrator (RHCSA)"
  }
];

const CertificatesSection = () => {
  return (
    <section 
      id="certifications"
      aria-label="Certifications"
      className="py-16 md:py-24 bg-transparent transition-colors duration-300 relative overflow-hidden"
    >
      {/* Schema.org Structured Data for SEO */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "ItemList",
            "name": "Certifications at NexxTechs",
            "itemListElement": [
              {
                "@type": "EducationalOccupationalCredential",
                "position": 1,
                "name": NEXXTECHS_CERTIFICATE.title,
                "image": NEXXTECHS_CERTIFICATE.image
              },
              ...GLOBAL_CERTIFICATES.map((cert, index) => ({
                "@type": "EducationalOccupationalCredential",
                "position": index + 2,
                "name": cert.certName,
                "image": cert.image
              }))
            ]
          })
        }}
      />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Simple Centered Heading */}
        <div className="text-center mb-10 md:mb-14">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-gray-900 dark:text-white tracking-tight">
            Certifications
          </h2>
        </div>

        {/* ============================================================== */}
        {/* 1. TOP: NEXXTECHS OFFICIAL CERTIFICATE                         */}
        {/* ============================================================== */}
        <div className="max-w-3xl mx-auto mb-12 sm:mb-14">
          <div className="group relative rounded-2xl overflow-hidden border border-gray-200 dark:border-white/10 bg-white dark:bg-[#13151f] shadow-lg hover:shadow-xl hover:border-[#84CC16]/50 transition-all duration-300">
            <img
              src={NEXXTECHS_CERTIFICATE.image}
              alt={NEXXTECHS_CERTIFICATE.alt}
              className="w-full h-auto object-contain transition-transform duration-300 group-hover:scale-[1.01]"
              loading="lazy"
            />
          </div>
        </div>

        {/* ============================================================== */}
        {/* 2. 4-GRID: 4 GLOBAL PARTNER CERTIFICATIONS                     */}
        {/* ============================================================== */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 md:gap-6">
          {GLOBAL_CERTIFICATES.map((cert) => (
            <div
              key={cert.id}
              className="group relative rounded-xl overflow-hidden border border-gray-200 dark:border-white/10 bg-white dark:bg-[#13151f] shadow-sm hover:shadow-lg hover:border-[#84CC16]/50 transition-all duration-300 flex items-center justify-center aspect-[16/11]"
            >
              <img
                src={cert.image}
                alt={cert.alt}
                className="w-full h-full object-contain p-2 transition-transform duration-300 group-hover:scale-105"
                loading="lazy"
              />
            </div>
          ))}
        </div>

      </div>

    </section>
  );
};

export default memo(CertificatesSection);
