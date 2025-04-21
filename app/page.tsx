'use client';

import React, { useRef, useState } from 'react';
import { useReactToPrint } from 'react-to-print';

const teachers = ['Safiye', 'A. G\u00fcnaydin', 'S. Metin'];
const students = ['Selma Ang\u0131n', 'Fatma \u00c7elik'];
const lessons = ['Arap\u00e7a', 'Menak\u0131b', 'F\u0131k\u0131h'];
const hours = ['\u2014', ...Array.from({ length: 17 }, (_, i) => `${(7 + i).toString().padStart(2, '0')}:00`)];

const Timetable = () => {
  const tableRef = useRef<HTMLDivElement>(null);

  const handlePrint = useReactToPrint({
    contentRef: tableRef,
    documentTitle: 'Timetable',
  });

  const [rows, setRows] = useState([
    {
      student: '',
      lessons: '',
      teacher: '',
      mon: '',
      tue: '',
      wed: '',
      thu: '',
      fri: '',
      sat: '',
      sun: '',
    },
  ]);

  const [groupTitle, setGroupTitle] = useState('1. Grup Hz. Fatima Dershanesi');
  const [pageTitle, setPageTitle] = useState('Ders Programı');

  const updateRow = (index: number, field: string, value: string) => {
    const newRows = [...rows];
    newRows[index][field as keyof typeof newRows[0]] = value;
    setRows(newRows);
  };

  return (
    <div className="p-4">
      <div ref={tableRef} className="bg-white p-4 rounded shadow max-w-6xl mx-auto">
        <input
          type="text"
          value={pageTitle}
          onChange={(e) => setPageTitle(e.target.value)}
          className="text-2xl font-bold mb-2 w-full text-center border-b border-gray-300"
          data-testid="page-title"
        />
        <input
          type="text"
          value={groupTitle}
          onChange={(e) => setGroupTitle(e.target.value)}
          className="mb-4 font-semibold w-full text-center border-b border-gray-300"
          data-testid="group-title"
        />
        <table className="w-full border border-collapse text-sm">
          <thead className="bg-gray-200">
            <tr>
              <th className="border p-2">#</th>
              <th className="border p-2">Öğrenci</th>
              <th className="border p-2">Ders</th>
              <th className="border p-2">Hoca</th>
              <th className="border p-2">Pzt</th>
              <th className="border p-2">Salı</th>
              <th className="border p-2">Çarşamba</th>
              <th className="border p-2">Perşembe</th>
              <th className="border p-2">Cuma</th>
              <th className="border p-2">Cumartesi</th>
              <th className="border p-2">Pazar</th>
            </tr>
          </thead>
          <tbody>
            {rows.map((row, i) => (
              <tr key={i} data-testid="row">
                <td className="border p-2">{i + 1}</td>
                <td className="border p-2 w-20">
                  <input
                    list="student-list"
                    value={row.student}
                    onChange={(e) => updateRow(i, 'student', e.target.value)}
                    className="w-full border p-1 min-w-[10rem]"
                    data-testid="student-input"
                  />
                </td>
                <td className="border p-2">
                  <input
                    list="lesson-list"
                    value={row.lessons}
                    onChange={(e) => updateRow(i, 'lessons', e.target.value)}
                    className="w-full border p-1 min-w-[10rem]"
                  />
                </td>
                <td className="border p-2">
                  <input
                    list="teacher-list"
                    value={row.teacher}
                    onChange={(e) => updateRow(i, 'teacher', e.target.value)}
                    className="w-full border p-1"
                  />
                </td>
                {['mon', 'tue', 'wed', 'thu', 'fri', 'sat', 'sun'].map((day) => (
                  <td key={day} className="border p-2">
                    <select
                      value={row[day as keyof typeof row]}
                      onChange={(e) => updateRow(i, day, e.target.value)}
                      className="w-full border p-1 min-w-[4rem]"
                      data-testid={`select-${day}-${i}`}
                    >
                      {hours.map((h) => (
                        <option key={h} value={h}>{h}</option>
                      ))}
                    </select>
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>

        <datalist id="student-list">
          {students.map((s, idx) => <option key={idx} value={s} />)}
        </datalist>
        <datalist id="lesson-list">
          {lessons.map((l, idx) => <option key={idx} value={l} />)}
        </datalist>
        <datalist id="teacher-list">
          {teachers.map((t, idx) => <option key={idx} value={t} />)}
        </datalist>
      </div>

      <div className="flex justify-between mt-4 max-w-6xl mx-auto">
        <button
          onClick={() =>
            setRows([
              ...rows,
              { student: '', lessons: '', teacher: '', mon: '', tue: '', wed: '', thu: '', fri: '', sat: '', sun: '' },
            ])
          }
          className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
          data-testid="add-row-btn"
        >
          Satır Ekle
        </button>

        <button
  onClick={() => handlePrint()}
  className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
>
  PDF olarak indir
</button>

      </div>
    </div>
  );
};

export default Timetable;