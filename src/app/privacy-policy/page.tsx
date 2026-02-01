import Container from "@/components/dashboard/Container";
import "@/styles/safety.css"

export default function Home() {
  return (
    <Container active="Privacy">
      <div className="top">

      
     <div className="policyContainer">
  <h5>Current as of 1 Jan 2026</h5>
  <h1>Privacy Policy</h1>
  <p className="text-center">
    SEO-Safeharbour is committed to strong data governance, privacy by design,
    and compliance with Canadian privacy laws, including PIPEDA and Quebec Law 25.
  </p>

  <div className="mt-10 pt-6 pb-12">
    <p>
      SEO-Safeharbour operates under a “Privacy by Design” framework. Because we
      facilitate care for children, seniors, and vulnerable persons, we apply
      security standards typically reserved for financial or medical institutions.
    </p>
    <p>
      This Master Privacy & Data Governance Policy (Document ID:
      GRC-PP-2025-003, Version 1.0) explains how we collect, use, protect, and
      retain personal information in a lawful, transparent, and secure manner.
    </p>
  </div>

  <div className="item">
    <h2 className="mb-6">
      1. Our Commitment to Data Stewardship
    </h2>
    <p>
      We are committed to minimizing data collection, protecting personal
      information throughout its lifecycle, and ensuring accountability across
      all privacy-related processes. Privacy considerations are embedded into
      system design, vendor selection, and operational decision-making.
    </p>
  </div>

  <div className="item">
    <h2 className="mb-6">
      2. Taxonomy of Personal Information (PI) Collected
    </h2>
    <p>
      We collect only what is strictly necessary to fulfill the
      SEO-Safeharbour “TrustedCare” promise and to meet legal and regulatory
      obligations.
    </p>

    <div className="overflow-x-auto mt-6">
      <table className="w-full border border-gray-200 text-left text-sm">
        <thead className="bg-gray-100">
          <tr>
            <th className="border px-4 py-3 font-semibold">User Type</th>
            <th className="border px-4 py-3 font-semibold">
              Data Categories Collected
            </th>
            <th className="border px-4 py-3 font-semibold">
              Legal Basis (Canada)
            </th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td className="border px-4 py-3 font-medium">
              Clients (Families)
            </td>
            <td className="border px-4 py-3">
              Name, physical address, care requirements (health or age-related),
              emergency contacts, and payment tokens.
            </td>
            <td className="border px-4 py-3">
              Contractual necessity and consent.
            </td>
          </tr>

          <tr className="bg-gray-50">
            <td className="border px-4 py-3 font-medium">
              Providers (Workers)
            </td>
            <td className="border px-4 py-3">
              Government-issued identification, Social Insurance Number (for tax
              purposes), criminal record results, vulnerable sector screening,
              professional certifications, and optional geo-location data.
            </td>
            <td className="border px-4 py-3">
              Legal obligation and explicit consent.
            </td>
          </tr>

          <tr>
            <td className="border px-4 py-3 font-medium">
              All Users
            </td>
            <td className="border px-4 py-3">
              IP address, device identifiers, and in-platform communication logs.
            </td>
            <td className="border px-4 py-3">
              Legitimate interest (fraud prevention and platform security).
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>

  <div className="item">
    <h2 className="mb-6">
      3. The “Vetted” Process: Background Check Protocols
    </h2>
    <p>
      Background checks are conducted in compliance with Office of the Privacy
      Commissioner (OPC) guidelines.
    </p>
    <p>
      <strong>Explicit Consent:</strong> Separate written or digital consent is
      obtained before initiating any background check via approved third-party
      partners (e.g., Sterling or Checkr).
    </p>
    <p>
      <strong>Minimal Disclosure:</strong> Clients are shown only a “Verified”
      or “Cleared” status. Full criminal records are never disclosed.
    </p>
    <p>
      <strong>Accuracy:</strong> Providers have the right to challenge and
      correct inaccuracies directly with the reporting agency.
    </p>
  </div>

  <div className="item">
    <h2 className="mb-6">
      4. Data Residency & International Transfers
    </h2>
    <p>
      We prioritize Canadian data residency wherever possible.
    </p>
    <p>
      Where third-party services (such as AWS or Stripe) process data outside
      Canada, including in the United States, we ensure substantially similar
      protection through Standard Contractual Clauses (SCCs) and documented
      Privacy Impact Assessments (PIAs), in accordance with Quebec Law 25.
    </p>
  </div>

  <div className="item">
    <h2 className="mb-6">
      5. Retention & Destruction (The “Right to be Forgotten”)
    </h2>
    <p>
      We do not retain personal information indefinitely.
    </p>
    <p>
      <strong>Active Accounts:</strong> Data is retained for as long as the
      account remains active.
    </p>
    <p>
      <strong>Inactive Accounts:</strong> Profiles are anonymized after 24 months
      of inactivity.
    </p>
    <p>
      <strong>Deletion Requests:</strong> Upon verified request, personal
      information is deleted within 30 days unless retention is required by law,
      such as CRA financial record obligations (up to 7 years).
    </p>
  </div>

  <div className="item">
    <h2 className="mb-6">
      6. Safeguards & Breach Protocol
    </h2>
    <p>
      <strong>Technical Safeguards:</strong> AES-256 encryption at rest and TLS
      1.3 encryption in transit.
    </p>
    <p>
      <strong>Organizational Safeguards:</strong> Access is strictly limited to
      personnel with a legitimate need to know. Staff cannot access sensitive
      health notes unless required for a safety investigation.
    </p>
    <p>
      <strong>Breach Notification:</strong> In the event of a Real Risk of
      Significant Harm (RROSH), affected individuals and the Privacy
      Commissioner will be notified within 72 hours, as required by PIPEDA and
      Quebec Law 25.
    </p>
  </div>

  <div className="item">
    <h2 className="mb-6">
      7. Your Rights Under Canadian Law
    </h2>
    <p>
      You have the right to access your personal information in a
      machine-readable format, request corrections, and withdraw consent at any
      time.
    </p>
    <p>
      Quebec residents may also request de-indexing, which removes profiles from
      internal search results.
    </p>
  </div>

  <div className="item">
    <h2 className="mb-6">
      8. Privacy Officer (DPO) Contact
    </h2>
    <p>
      Our designated Privacy Officer oversees compliance with this policy.
    </p>
    <p>
      <strong>Attn:</strong> Privacy Officer<br />
      {/* <strong>Email:</strong> dpo@seosafeharbour.com<br />
      <strong>Address:</strong> [Insert Registered Canadian Office] */}
    </p>
  </div>
</div>

      </div>
    </Container>
  );
}
