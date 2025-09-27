import Container from "@/components/dashboard/Container";
import ReadyToStart from "@/components/general/ReadyToStart";
import SafetyPriority from "@/components/pages/SafetyPriority";
import Landing from "@/components/pages/trustAndSafety/Landing";

export default function Home() {
  return (
    <Container active="Trust & Safety">
      <div>
        <Landing />
        <SafetyPriority />
        <ReadyToStart />
      </div>
    </Container>
  );
}
