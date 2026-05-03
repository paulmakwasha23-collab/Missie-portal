import React, { useState } from 'react';
import { Save, CheckCircle } from 'lucide-react';

const mockStudents = [
  { id: '1', name: 'John Doe', studentId: 'MCC-2024-001', mark: '' },
  { id: '2', name: 'Jane Smith', studentId: 'MCC-2024-002', mark: '' },
  { id: '3', name: 'Michael Johnson', studentId: 'MCC-2024-003', mark: '' },
  { id: '4', name: 'Sarah Williams', studentId: 'MCC-2024-004', mark: '' },
  { id: '5', name: 'David Brown', studentId: 'MCC-2024-005', mark: '' },
];

const classes = ['Form 4A', 'Form 4B', 'Lower 6 Arts', 'Lower 6 Sciences', 'Upper 6 Commercials'];

export const StaffDashboard: React.FC = () => {
  const [selectedClass, setSelectedClass] = useState(classes[0]);
  const [students, setStudents] = useState(mockStudents);
  const [showToast, setShowToast] = useState(false);

  const handleMarkChange = (id: string, value: string) => {
    setStudents(students.map(student =>
      student.id === id ? { ...student, mark: value } : student
    ));
  };

  const handleSave = () => {
    // In a real app, send data to backend here
    setShowToast(true);
    setTimeout(() => setShowToast(false), 3000);
  };

  return (
    <div className="space-y-6 relative">
      {/* Toast Notification */}
      {showToast && (
        <div className="fixed top-4 right-4 bg-green-50 border border-green-200 text-green-800 px-4 py-3 rounded-lg shadow-lg flex items-center space-x-3 transition-opacity animate-fade-in z-50">
          <CheckCircle className="h-5 w-5 text-green-500" />
          <span className="font-medium">Grades saved successfully!</span>
        </div>
      )}

      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Mark Entry</h1>
          <p className="text-sm text-gray-500">Enter mid-term exam marks for your students.</p>
        </div>

        <button
          onClick={handleSave}
          className="flex items-center px-4 py-2 bg-navy text-white rounded-lg hover:bg-navyDark transition-colors shadow-sm"
        >
          <Save className="h-4 w-4 mr-2" />
          Save Grades
        </button>
      </div>

      <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
        <div className="mb-6 w-64">
          <label htmlFor="class-select" className="block text-sm font-medium text-gray-700 mb-2">
            Select Class
          </label>
          <select
            id="class-select"
            value={selectedClass}
            onChange={(e) => setSelectedClass(e.target.value)}
            className="block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-navy focus:border-navy sm:text-sm rounded-lg border"
          >
            {classes.map((c) => (
              <option key={c} value={c}>{c}</option>
            ))}
          </select>
        </div>

        <div className="overflow-x-auto border rounded-lg">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider w-1/4">
                  Student ID
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider w-1/2">
                  Name
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider w-1/4">
                  Mark (%)
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {students.map((student) => (
                <tr key={student.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 font-mono">
                    {student.studentId}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                    {student.name}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    <input
                      type="number"
                      min="0"
                      max="100"
                      value={student.mark}
                      onChange={(e) => handleMarkChange(student.id, e.target.value)}
                      className="block w-24 pl-3 pr-3 py-2 border border-gray-300 rounded-md focus:ring-navy focus:border-navy sm:text-sm"
                      placeholder="0-100"
                    />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
