import AppPromoSection from "@/components/contact/appPromoSection";
import ContactBanner from "@/components/contact/contactBanner";
import ContactInfo from "@/components/contact/contactInfo";
import ContactSection from "@/components/contact/contactSection";
import React from "react";

export default function ContactPage() {
  return (
    <div>
      <ContactBanner></ContactBanner>
      <div className="mt-10">
        {" "}
        <ContactInfo></ContactInfo>
      </div>
      <div className="mt-10">
        {" "}
        <ContactSection></ContactSection>
      </div>
      <div className="mt-10">
        {" "}
        <AppPromoSection></AppPromoSection>
      </div>
    </div>
  );
}
