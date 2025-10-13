import React from "react";
import { formatDateString } from "@/utils/date";

const MedicationTable = ({ medicationList }: { medicationList: any[] }) => {
  return (
    <table className="border w-full text-xs md:text-base lg:text-lg">
      <thead>
        <tr>
          <th className="p-2">Название</th>
          <th className="p-2">Дозировка</th>
          <th className="p-2">Дата начала</th>
          <th className="p-2">Дата окончания</th>
          <th className="p-2">Примечания врача</th>
        </tr>
      </thead>
      <tbody className="border">
        {medicationList.map((medication) => (
          <tr className="border text-center" key={medication.medication_id}>
            <td className="border p-2">{medication.medication_name}</td>
            <td className="border p-2">{medication.medication_dosage}</td>
            <td className="border p-2">
              {formatDateString(medication.medication_start_date)}
            </td>
            <td className="border p-2">
              {formatDateString(medication.medication_end_date)}
            </td>
            <td className="border p-2">{medication.medication_note}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default MedicationTable;
