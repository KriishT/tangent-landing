import { Nav } from "./components/Nav";
import { Hero } from "./components/Hero";
import { InteractiveDemo } from "./components/InteractiveDemo";
import { LearnMore } from "./components/LearnMore";
import { Problem } from "./components/Problem";
import { HowItWorks } from "./components/HowItWorks";
import { WhoItsFor } from "./components/WhoItsFor";
import { WhyNot } from "./components/WhyNot";
import { Privacy } from "./components/Privacy";
import { FAQ } from "./components/FAQ";
import { FinalCTA } from "./components/FinalCTA";
import { Footer } from "./components/Footer";
import { SectionGroup, SectionBlock } from "./components/SectionGroup";
import { DownloadGuideProvider } from "./components/DownloadGuide";

export default function App() {
  return (
    <DownloadGuideProvider>
      <Nav />
      <main>
        <Hero />
        <InteractiveDemo />
        <LearnMore />

        <SectionGroup>
          <SectionBlock id="problem">
            <Problem />
          </SectionBlock>
          <SectionBlock id="features" divider>
            <HowItWorks />
          </SectionBlock>
        </SectionGroup>

        <SectionGroup className="bg-surface">
          <SectionBlock id="who">
            <WhoItsFor />
          </SectionBlock>
          <SectionBlock id="why-not" divider>
            <WhyNot />
          </SectionBlock>
        </SectionGroup>

        <SectionGroup>
          <SectionBlock id="privacy">
            <Privacy />
          </SectionBlock>
          <SectionBlock id="faq" divider>
            <FAQ />
          </SectionBlock>
        </SectionGroup>

        <FinalCTA />
      </main>
      <Footer />
    </DownloadGuideProvider>
  );
}
