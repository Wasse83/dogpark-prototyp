import { StubPage } from "@/components/StubPage";

export default function InstallningarStub() {
  return (
    <StubPage
      breadcrumb="Inställningar"
      title="Inställningar bygger vi nu"
      body="Notiser, språk, appikoner och integritet. Välkommen tillbaka om en vecka."
      backHref="/min-hund"
      backLabel="Tillbaka till Min hund"
    />
  );
}
