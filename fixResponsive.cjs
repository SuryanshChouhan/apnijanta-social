const fs = require('fs');
let code = fs.readFileSync('src/components/CollegesView.tsx', 'utf8');

const tableCode = `                    <div className="overflow-x-auto rounded-2xl border border-gray-200 shadow-sm">
                      <table className="w-full text-left text-sm whitespace-nowrap">
                        <thead className="bg-gray-50 border-b border-gray-200">
                          <tr>
                            <th className="px-6 py-4 font-black uppercase tracking-wider text-[10px] text-gray-500">Course Name</th>
                            <th className="px-6 py-4 font-black uppercase tracking-wider text-[10px] text-gray-500">Approved Tuition</th>
                            <th className="px-6 py-4 font-black uppercase tracking-wider text-[10px] text-gray-500">Reported Ask (Capitation)</th>
                            <th className="px-6 py-4 font-black uppercase tracking-wider text-[10px] text-gray-500">Placement %</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-100 bg-white">
                          {selectedCollege.courses.map((course) => {
                            const gap = course.reportedTotalAsk - course.approvedTuition;
                            const hasGap = gap > 0;
                            return (
                              <tr key={course.id} className="hover:bg-gray-50 transition-colors">
                                <td className="px-6 py-4 font-bold text-gray-900">{course.name}</td>
                                <td className="px-6 py-4 font-medium text-gray-600">{formatINR(course.approvedTuition)}</td>
                                <td className="px-6 py-4">
                                  <div className="flex items-center gap-2">
                                    <span className={\`font-bold \${hasGap ? 'text-red-600' : 'text-gray-900'}\`}>
                                      {formatINR(course.reportedTotalAsk)}
                                    </span>
                                    {hasGap && (
                                      <span className="bg-red-50 text-red-700 px-2 py-0.5 rounded-md text-[9px] font-black border border-red-100">
                                        +{formatINR(gap)}
                                      </span>
                                    )}
                                  </div>
                                </td>
                                <td className="px-6 py-4 font-bold text-indigo-600">
                                  {course.placementRate}%
                                </td>
                              </tr>
                            );
                          })}
                        </tbody>
                      </table>
                    </div>`;

const gridCode = `                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      {selectedCollege.courses.map((course) => {
                        const gap = course.reportedTotalAsk - course.approvedTuition;
                        const hasGap = gap > 0;
                        return (
                          <div key={course.id} className="bg-white border border-gray-200 rounded-2xl p-5 hover:border-indigo-300 transition-colors shadow-sm flex flex-col">
                            <h4 className="font-bold text-gray-900 text-base mb-3">{course.name}</h4>
                            <div className="space-y-3 mt-auto">
                              <div className="flex justify-between items-center pb-2 border-b border-gray-100">
                                <span className="text-[10px] font-black uppercase text-gray-400 tracking-wider">Approved Fee</span>
                                <span className="font-bold text-gray-700">{formatINR(course.approvedTuition)}</span>
                              </div>
                              <div className="flex justify-between items-center pb-2 border-b border-gray-100">
                                <span className="text-[10px] font-black uppercase text-gray-400 tracking-wider">Total Ask</span>
                                <div className="flex flex-col items-end">
                                  <span className={\`font-bold \${hasGap ? 'text-red-600' : 'text-gray-900'}\`}>{formatINR(course.reportedTotalAsk)}</span>
                                  {hasGap && <span className="bg-red-50 text-red-700 px-1.5 py-0.5 rounded text-[9px] font-black border border-red-100 mt-1">GAP: {formatINR(gap)}</span>}
                                </div>
                              </div>
                              <div className="flex justify-between items-center">
                                <span className="text-[10px] font-black uppercase text-gray-400 tracking-wider">Placement</span>
                                <span className="font-bold text-indigo-600 bg-indigo-50 px-2 py-0.5 rounded-lg">{course.placementRate}%</span>
                              </div>
                            </div>
                          </div>
                        );
                      })}
                    </div>`;

if (!code.includes(tableCode)) {
  console.log("Could not find tableCode exactly. Check formatting.");
} else {
  code = code.replace(tableCode, gridCode);
  fs.writeFileSync('src/components/CollegesView.tsx', code);
  console.log("Successfully replaced table with grid.");
}
