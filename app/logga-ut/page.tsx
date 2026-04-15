import { StubPage } from "@/components/StubPage";

export default function LoggaUtStub() {
  return (
    <StubPage
      breadcrumb="Logga ut"
      title="Logga ut"
      body="Riktigt auth-flöde hamnar här när Supabase är inkopplat. Tills dess: vi hörs."
      backHref="/min-hund"
      backLabel="Tillbaka till Min hund"
    />
  );
}
