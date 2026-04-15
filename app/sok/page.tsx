import { StubPage } from "@/components/StubPage";

export default function SokStub() {
  return (
    <StubPage
      breadcrumb="Sök"
      title="Sökningen är på väg"
      body="Sök på passtyp, instruktör eller datum. Funktionen bygger vi nu."
      backHref="/boka"
      backLabel="Tillbaka till pass"
    />
  );
}
