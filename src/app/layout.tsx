import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'TripMate — Plan Smarter, Travel Better with AI',
  description: 'AI-powered, budget-optimized travel planner with day-wise itineraries, verified INR budget breakdowns, and curated destinations.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="antialiased selection:bg-[#FF6B35] selection:text-white bg-[#FAF8F5]">
        {children}
      </body>
    </html>
  );
}
