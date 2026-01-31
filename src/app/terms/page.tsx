import Container from "@/components/dashboard/Container";
import "@/styles/safety.css"

export default function Home() {
  return (
    <Container active="Terms">
      <div className="top">

      
      <div className="policyContainer">
  <h5>Current as of 20 Jan 2026</h5>
  <h1>Terms and Conditions</h1>
  <p className="text-center">
    By accessing or using SEO-Safeharbour, you agree to be bound by these Terms
    and confirm that you are responsible for compliance with all applicable
    local, provincial, and federal laws in Canada.
  </p>

  <div className="mt-10 pt-6 pb-12">
    <p>
      SEO-Safeharbour operates as a neutral technology platform designed to
      connect independent service providers with individuals or families seeking
      care-related services. We do not provide care services directly and do not
      supervise, manage, or control the services delivered by Providers.
    </p>

    <p>
      These Terms govern your access to and use of the platform and form a
      legally binding agreement between you and SEO-Safeharbour. Please read
      them carefully before creating an account or engaging with other Users.
    </p>
  </div>

  <div className="item">
    <h2 className="mb-6">
      1. Nature of the Relationship (Crucial Compliance Clause)
    </h2>
    <p>
      <strong>Passive Intermediary:</strong> SEO-Safeharbour is a technology
      platform that facilitates connections between independent service
      providers (“Providers”) and families or individuals seeking services
      (“Clients”).
    </p>
    <p>
      <strong>No Employment Relationship:</strong> SEO-Safeharbour is not an
      employer, employment agency, or referral agency. Providers act solely as
      independent contractors. Nothing in these Terms creates a partnership,
      joint venture, agency, or employment relationship between
      SEO-Safeharbour and any User.
    </p>
    <p>
      <strong>No Control over Work:</strong> SEO-Safeharbour does not set
      Providers’ hours, provide tools or supplies, or supervise the performance
      of services. All service terms are negotiated directly between Clients and
      Providers.
    </p>
  </div>

  <div className="item">
    <h2 className="mb-6">2. Vetting & “Safeharbour” Verification</h2>
    <p>
      <strong>Background Checks:</strong> SEO-Safeharbour facilitates third-party
      background checks, including Criminal Record Checks and Vulnerable Sector
      Searches. We only represent that a Provider passed a check at the time of
      onboarding.
    </p>
    <p>
      <strong>Ongoing Due Diligence:</strong> Clients acknowledge that background
      checks are point-in-time assessments. SEO-Safeharbour is not liable for any
      conduct occurring after the date of verification. Clients remain solely
      responsible for interviews, reference checks, and ongoing assessments.
    </p>
    <p>
      <strong>Identity Verification:</strong> Users must provide accurate,
      government-issued identification to maintain a “Vetted” badge. Providing
      false or misleading information may result in immediate and permanent
      removal from the platform.
    </p>
  </div>

  <div className="item">
    <h2 className="mb-6">3. Financial Terms & Canadian Tax Compliance</h2>
    <p>
      <strong>Platform Fees:</strong> SEO-Safeharbour charges a service fee for
      access to the platform and its vetting infrastructure. The applicable fee
      percentage will be clearly disclosed prior to payment.
    </p>
    <p>
      <strong>Payment Processing:</strong> All payments must be processed through
      our PCI-compliant payment provider. Users are prohibited from bypassing the
      platform or engaging in off-platform payments to avoid service fees.
    </p>
    <p>
      <strong>Tax Obligations:</strong> Providers are solely responsible for
      complying with GST/HST registration requirements and reporting income to
      the Canada Revenue Agency (CRA). SEO-Safeharbour does not withhold income
      tax, CPP, or EI contributions.
    </p>
  </div>

  <div className="item">
    <h2 className="mb-6">4. Safety & Standards of Care</h2>
    <p>
      <strong>Safe Work Environment:</strong> Clients must ensure that the work
      environment complies with all applicable provincial Occupational Health
      and Safety (OHS) regulations.
    </p>
    <p>
      <strong>Prohibited Conduct:</strong> Harassment, discrimination, abuse, or
      unsafe practices of any kind will result in immediate termination of the
      offending account.
    </p>
    <p>
      <strong>Right to Refuse:</strong> Providers may refuse or discontinue work
      in any environment they reasonably consider unsafe or unsanitary without
      penalty from SEO-Safeharbour.
    </p>
  </div>

  <div className="item">
    <h2 className="mb-6">5. Limitation of Liability & Indemnification</h2>
    <p>
      <strong>General Disclaimer:</strong> THE PLATFORM AND SERVICES ARE PROVIDED
      “AS IS” WITHOUT WARRANTIES OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING THE
      SUITABILITY OF A PROVIDER FOR ANY SPECIFIC NEED.
    </p>
    <p>
      <strong>Liability Cap:</strong> To the maximum extent permitted by law,
      SEO-Safeharbour’s total liability shall not exceed the total platform fees
      paid by the User in the six (6) months preceding the claim.
    </p>
    <p>
      <strong>Personal Injury & Property Damage:</strong> SEO-Safeharbour is not
      responsible for personal injury, death, or property damage resulting from
      interactions between Users. Users are encouraged to maintain appropriate
      insurance coverage.
    </p>
  </div>

  <div className="item">
    <h2 className="mb-6">6. Dispute Resolution & Governing Law</h2>
    <p>
      <strong>Arbitration:</strong> Any dispute arising from these Terms shall be
      resolved through binding arbitration in the designated city, except where
      prohibited by applicable provincial consumer protection laws.
    </p>
    <p>
      <strong>Governing Law:</strong> These Terms are governed by the laws of the
      applicable Province and the federal laws of Canada.
    </p>
  </div>

  <div className="item">
    <h2 className="mb-6">7. Quebec-Specific Provisions</h2>
    <p>
      In accordance with the Civil Code of Québec, these Terms are available in
      French. The parties have expressly requested that these Terms be drafted in
      English.
    </p>
    <p>
      <em>
        Les parties ont expressément exigé que la présente convention soit
        rédigée en anglais.
      </em>
    </p>
  </div>
</div>
 
      </div>
    </Container>
  );
}
