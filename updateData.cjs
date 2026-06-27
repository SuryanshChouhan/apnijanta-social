const fs = require('fs');

// 1. Fix collegeData.ts
let data = fs.readFileSync('src/data/collegeData.ts', 'utf8');
data = data.replace(/approvedTuition: (\d+),\s*reportedTotalAsk: (\d+),\s*tuition: (.*?),\s*placementRate: (\d+),/g, (match, a, r, t, p) => {
  return `courses: [{
      id: Math.random().toString(36).substring(7),
      name: 'General Program',
      approvedTuition: ${a},
      reportedTotalAsk: ${r},
      placementRate: ${p}
    }],`;
});
fs.writeFileSync('src/data/collegeData.ts', data);

// 2. Fix CollegesView.tsx Compare Modal
let cv = fs.readFileSync('src/components/CollegesView.tsx', 'utf8');

cv = cv.replace(/<td className="p-4 font-bold text-gray-600 text-xs uppercase tracking-wider">Approved Annual Fee<\/td>/g, '<td className="p-4 font-bold text-gray-600 text-xs uppercase tracking-wider">Programs Offered</td>');
cv = cv.replace(/\{comparisonList\.map\(col => <td key=\{col\.id\} className="p-4 border-x border-gray-200 bg-white font-bold text-center">\{formatINR\(col\.approvedTuition\)\}<\/td>\)\}/g, '{comparisonList.map(col => <td key={col.id} className="p-4 border-x border-gray-200 bg-white font-bold text-center">{(col.courses || []).length} Courses</td>)}');

cv = cv.replace(/<td className="p-4 font-bold text-gray-600 text-xs uppercase tracking-wider">Reported Total Ask<\/td>/g, '<td className="p-4 font-bold text-gray-600 text-xs uppercase tracking-wider">Max Capitation Gap</td>');

cv = cv.replace(/\{comparisonList\.map\(col => <td key=\{col\.id\} className="p-4 border-x border-gray-200 bg-white font-extrabold text-red-600 text-center">\{formatINR\(col\.reportedTotalAsk\)\}<\/td>\)\}/g, 
`{comparisonList.map(col => {
  const maxGap = Math.max(0, ...(col.courses || []).map(c => c.reportedTotalAsk - c.approvedTuition));
  return <td key={col.id} className="p-4 border-x border-gray-200 bg-white font-extrabold text-red-600 text-center">{maxGap > 0 ? formatINR(maxGap) : 'None'}</td>
})}`);

cv = cv.replace(/const gap = col\.reportedTotalAsk - col\.approvedTuition;/g, 'const gap = Math.max(0, ...(col.courses || []).map(c => c.reportedTotalAsk - c.approvedTuition));');

fs.writeFileSync('src/components/CollegesView.tsx', cv);

console.log("Updated data and compare modal successfully");
