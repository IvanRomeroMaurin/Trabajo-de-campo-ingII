import { Hero } from '@/features/home/components/Hero';
import { Stats } from '@/features/home/components/Stats';
import { FeaturedCommunities } from '@/features/home/components/FeaturedCommunities';
import { Features } from '@/features/home/components/Features';
import { FinalCTA } from '@/features/home/components/FinalCTA';

export default function HomePage() {
  return (
    <div className="home-wrapper">
      <Hero />
      <Stats />
      <FeaturedCommunities />
      <Features />
      <FinalCTA />
    </div>
  );
}
