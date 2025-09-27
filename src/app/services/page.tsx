import Container from "@/components/dashboard/Container";
import ReadyToStart from "@/components/general/ReadyToStart";
import ProfessionCare from "@/components/pages/ProfessionCare";
import Landing from "@/components/pages/services/Landing";

export default function Home() {
  return (
    <Container active="Services">
      <div>
        <Landing />
        <ProfessionCare />
        <ReadyToStart />
      </div>
    </Container>
  );
}
