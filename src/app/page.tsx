import Container from "@/components/dashboard/Container";
import HowWorks from "@/components/general/HowWorks";
import ReadyToStart from "@/components/general/ReadyToStart";
import Landing from "@/components/pages/home/Landing";
import ProfessionCare from "@/components/pages/ProfessionCare";
import SafetyPriority from "@/components/pages/SafetyPriority";

export default function Home() {
  return (
    <Container active="Home">
      <div>
        <Landing />
        <HowWorks />
        <ProfessionCare />
        <ReadyToStart />
        <SafetyPriority />
      </div>
    </Container>
  );
}
