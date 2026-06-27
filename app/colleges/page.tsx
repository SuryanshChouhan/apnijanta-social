import { Metadata } from 'next';
import CollegesView from '../../src/components/CollegesView';

export const metadata: Metadata = {
  title: 'Expose Scam Colleges: The 2026 Blacklist & Reviews',
  description: 'The real directory of Indian colleges. Verify accreditation, discover hidden capitation fees, read honest student reviews, and spot fake universities before taking admission.',
  alternates: {
    canonical: 'https://apnijanta.com/colleges',
  }
};

export default function Page() {
  return <CollegesView />;
}
