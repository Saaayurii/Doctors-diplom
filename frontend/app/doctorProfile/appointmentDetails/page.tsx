"use client";

import { useEffect, useState } from "react";
import { formatDateString } from "@/utils/date";
import { FaRegImage } from "react-icons/fa";
import MedicationTable from "@/components/patientProfile/medicationTable";
import ReadMore from "@/components/common/ReadMore";

const AppointmentDetailsPage = () => {
  const [appointment, setAppointment] = useState<any>();
  const [appId, setAppId] = useState<any>();
  const [tab, setTab] = useState("visit");

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const appointmentParam = params.get("appointment");
    if (appointmentParam) {
      setAppId(JSON.parse(decodeURIComponent(appointmentParam)));
    }
  }, []);

  useEffect(() => {
    const headers = {
      "Content-Type": "application/json",
      Authorization: `Bearer ${localStorage.getItem("jwt")}`,
    };
    const fetchAppointmentDetails = async () => {
      try {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_SERVER_NAME}/doctor/appointmentDetails/${appId}`,
          { headers, mode: "cors" },
        );
        if (!response.ok) {
          throw new Error("Failed to fetch appointment details");
        }
        const data = await response.json();
        setAppointment(data.appointment);
      } catch (error) {
        console.error(error);
      }
    };
    if (appId) {
      fetchAppointmentDetails();
    }
  }, [appId]);

  const handleTabClick = (tabName: string) => {
    setTab(tabName);
  };

  if (!appointment) {
    return (
      <div className="text-4xl h-screen flex items-center justify-center text-[#035fe9]">
        Loading details...
      </div>
    );
  }

  return (
    <main className="flex-col space-y-6 h-svh">
      <div className="text-2xl md:text-4xl p-6 font-bold text-center text-[#035fe9]">
        Appointment Details
      </div>
      <section className="h-fit bg-gray-100 max-w-[90%] lg:max-w-[75%] mx-auto grid grid-cols-1 md:grid-cols-3 gap-4 border border-[#919395] rounded-lg">
        <div className="h-full col-span-1 overflow-y-auto flex font-bold border-[#919395] md:flex-col md:border-r-[1px]">
          <div
            onClick={() => handleTabClick("visit")}
            className={`p-4 cursor-pointer ${
              tab === "visit"
                ? "bg-[#035fe9] text-white"
                : "hover:bg-[#035fe9] hover:text-white"
            } rounded-tl-lg`}
          >
            Детали приема
          </div>
          <div
            onClick={() => handleTabClick("medications")}
            className={`p-4 cursor-pointer ${
              tab === "medications"
                ? "bg-[#035fe9] text-white"
                : "hover:bg-[#035fe9] hover:text-white"
            }`}
          >
            Препараты
          </div>
        </div>
        <div className="col-span-2 flex flex-col overflow-y-auto space-y-4 p-4">
          <hr className="absolute top-[25.1%] min-[376px]:top-[22.6%] left-[5%] right-[5%] bg-[#919395] border-none h-[1px] md:invisible"></hr>
          {tab === "visit" && (
            <>
              <p className="font-bold text-lg">
                Dr. {appointment.doctor_first_name}{" "}
                {appointment.doctor_last_name}
              </p>
              <p>
                <strong>Специализация:</strong>{" "}
                {appointment.doctor_specialization}
              </p>
              <p>
                <strong>Дата:</strong>{" "}
                {formatDateString(appointment.doctor_availability_day_hour)}
              </p>
              <div>
                <strong>Жалоба:</strong>{" "}
                {appointment.appointment_complaint ? (
                  <ReadMore text={appointment.appointment_complaint} />
                ) : (
                  "Н/Д"
                )}
              </div>
              <>
                {appointment.appointmentResults &&
                appointment.appointmentResults.length > 0 ? (
                  appointment.appointmentResults.map(
                    (result: any, index: number) => (
                      <div key={index} className="space-y-4">
                        <div>
                          <p>
                            <strong>Диагноз:</strong>{" "}
                            {result.appointment_diagnosis ||
                              "Диагноз недоступен"}
                          </p>
                        </div>
                        <div>
                          <p>
                            <strong>Отчет:</strong>{" "}
                            {result.appointment_report || "Отчет недоступен"}
                          </p>
                        </div>
                      </div>
                    ),
                  )
                ) : (
                  <div className="flex flex-col space-y-4">
                    <p>
                      <strong>Диагноз:</strong> Диагноз недоступен
                    </p>
                    <p>
                      <strong>Отчет:</strong> Отчет недоступен
                    </p>
                  </div>
                )}
              </>
              <>
                {appointment.treatmentPlan ? (
                  <div className="flex flex-col space-y-4">
                    <p>
                      <strong>Операции:</strong>{" "}
                      {appointment.treatmentPlan.treatment_plan_operations ||
                        "Операции недоступны"}
                    </p>
                    <p>
                      <strong>Направление к специалисту:</strong>{" "}
                      {appointment.treatmentPlan.speciality_referral ||
                        "Направление отсутствует"}
                    </p>
                    <p>
                      <strong>Примечания к направлению:</strong>{" "}
                      {appointment.treatmentPlan.referral_notes ||
                        "Примечания отсутствуют"}
                    </p>
                  </div>
                ) : (
                  <div className="flex flex-col space-y-4">
                    <p>
                      <strong>Операции:</strong> Операции недоступны
                    </p>
                    <p>
                      <strong>Направление к специалисту:</strong> Направление отсутствует
                    </p>
                    <p>
                      <strong>Примечания к направлению:</strong> Примечания отсутствуют
                    </p>
                  </div>
                )}
              </>
            </>
          )}

          {tab === "medications" && (
            <>
              <div className="flex flex-col space-y-6">
                <p className="text-sm md:text-lg font-bold">
                  Назначенные препараты:
                </p>
                {appointment.medications &&
                appointment.medications.length > 0 ? (
                  <MedicationTable medicationList={appointment.medications} />
                ) : (
                  <p className="italic text-sm md:text-lg">
                    Препараты не назначены
                  </p>
                )}
              </div>
            </>
          )}
        </div>
      </section>
    </main>
  );
};

export default AppointmentDetailsPage;
