import Container from "@/components/dashboard/Container";
import HowWorks from "@/components/general/HowWorks";
import ReadyToStart from "@/components/general/ReadyToStart";
import SafeGuarantee from "@/components/general/SafeGuarantee";
import Landing from "@/components/pages/howItWorks/Landing";

export default function Home() {
  return (
    <Container active="How it works">
      <div>
        <Landing />
        <HowWorks />
        <SafeGuarantee />
        <ReadyToStart />
      </div>
    </Container>
  );
}
