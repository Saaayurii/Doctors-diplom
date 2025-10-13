import React, { useEffect, useState } from "react";
import { FaUserCircle } from "react-icons/fa";
import { formatDate } from "../../../utils/date";
import ReadMore from "../../common/ReadMore";
import VideoCallButton from "@/components/common/VideoCallButton";

const AppointmentCard = ({
  appointment,
  profileData,
}: {
  appointment: any;
  profileData: any;
}) => {
  const userImage = <FaUserCircle className="h-20 w-20 text-[#035fe9]" />;

  const [userRole, setUserRole] = useState<any>();

  useEffect(() => {
    setUserRole(localStorage.getItem("userRole"));
  }, [userRole]);

  // Buffer to Base64 conversion for the doctor's image
  const bufferToBase64 = (buffer: number[]) => {
    const binary = String.fromCharCode.apply(null, buffer);
    return window.btoa(binary);
  };

  const base64Image = appointment.image
    ? `data:image/jpeg;base64,${bufferToBase64(appointment.image.data)}`
    : ""; // Placeholder for missing image

  return (
    <div className="bg-white rounded-3xl p-6 shadow-lg flex flex-col space-y-3">
      {/* Doctor Information */}
      <div className="flex items-center space-x-4">
        {base64Image ? (
          <img
            className="w-20 h-20 rounded-full object-cover"
            src={base64Image}
            alt="Врач"
          />
        ) : (
          userImage
        )}
        <div className="flex flex-col">
          <h2 className="text-lg font-semibold">{`Dr. ${appointment.doctor_first_name} ${appointment.doctor_last_name}`}</h2>
          <p className="text-sm text-[#035fe9]">
            {appointment.doctor_specialization || "Специалист"}
          </p>
        </div>
      </div>

      {/* Patient Information */}
      <div className="flex flex-col space-y-2">
        <div className="text-sm text-gray-600">
          <strong>Пациент:</strong>{" "}
          {`${appointment.patient_first_name} ${appointment.patient_last_name}`}
        </div>
      </div>

      {/* Appointment Details */}
      <div className="flex flex-col space-y-2">
        <div className="text-sm text-gray-600">
          <p>
            <strong>Тип записи:</strong>{" "}
            {appointment.appointment_type || "Н/Д"}
          </p>
          <div>
            <strong>Жалоба:</strong>{" "}
            {appointment.appointment_complaint ? (
              <ReadMore text={appointment.appointment_complaint} />
            ) : (
              "Н/Д"
            )}
          </div>
          <p>
            <strong>Тип приёма:</strong>{" "}
            {appointment.appointment_settings_type || "Н/Д"}
          </p>
          <p>
            <strong>Дата и время:</strong>{" "}
            {appointment.doctor_availability_day_hour &&
              formatDate(appointment.doctor_availability_day_hour)}
          </p>
          <p>
            <strong>Длительность:</strong> {appointment.appointment_duration} мин
          </p>
        </div>
        {/* Join Video Call Button */}
        <VideoCallButton label="Присоединиться к видеозвонку" />
      </div>
    </div>
  );
};

export default AppointmentCard;
