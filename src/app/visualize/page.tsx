import { Metadata } from 'next';
import VisualizeClient from '@/features/visualizer/VisualizeClient';

// Using Next.js 15+ signature where searchParams is a Promise
type Props = {
  searchParams: Promise<{ repo?: string }>;
};

export async function generateMetadata({ searchParams }: Props): Promise<Metadata> {
  const resolvedParams = await searchParams;
  const repo = resolvedParams?.repo;

  if (!repo) {
    return {
      title: 'Visualize | CodeCity',
      description: 'Transform GitHub repositories into interactive 3D cities.',
    };
  }

  const title = `${repo} | CodeCity`;
  const description = `Explore the 3D code architecture of ${repo} on CodeCity.`;
  // Fallback to static logo for Vercel Edge limit safety
  const ogUrl = '/logo.png';

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      images: [
        {
          url: ogUrl,
          width: 1200,
          height: 630,
          alt: `3D visualization of ${repo}`,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [ogUrl],
    },
  };
}

export default async function VisualizePage(props: Props) {
  // We can pass resolved searchParams if needed, but VisualizeClient reads from window.location anyway.
  return <VisualizeClient />;
}
