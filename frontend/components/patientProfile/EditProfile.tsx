"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import InputComponent from "@/components/auth/InputComponent";
import CircularProgress from "@mui/material/CircularProgress/CircularProgress";
import { FaUserCircle } from "react-icons/fa";
import { Calendar } from "primereact/calendar";
import { useProfile } from "@/context/ProfileContext"; // Ensure correct import path

function EditProfile() {
  const { profileData, loading } = useProfile();
  if (loading) {
    return <div>Загрузка данных профиля...</div>;
  }

  if (!profileData) {
    return <div>Данные профиля недоступны.</div>;
  }

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    phone: "",
    languages: "",
    gender: "",
    birthDate: "",
  });

  const [errorMessage, setErrorMessage] = useState({
    firstName: "",
    lastName: "",
    phone: "",
    languages: "",
    birthDate: "",
  });

  const [changedField, setChangedField] = useState("");

  const [formValid, setFormValid] = useState(false);

  const [error, setError] = useState(false);

  let token: string | null = "";

  useEffect(() => {
    let languagesString = profileData?.languages;
    const tempObj = { ...profileData, languages: languagesString };
    setFormData(() => tempObj);
  }, [profileData]);

  useEffect(() => {
    validateForm();
  }, [formData]);

  const formFields = [
    { name: "firstName", title: "Имя", type: "text" },
    { name: "lastName", title: "Фамилия", type: "text" },
    { name: "phone", title: "Номер телефона", type: "number" },
    {
      name: "languages",
      title: "Языки (через пробел)",
      type: "text",
    },
    { name: "birthDate", title: "Дата рождения", type: "number" },
  ];

  const submitButtonClass = [
    "bg-sky-500 text-neutral-50 font-medium	p-3.5 border border-solid rounded-full cursor-pointer",
    "transition-[background-color] disabled:bg-neutral-300 disabled:text-neutral-700 disabled:cursor-not-allowed",
    "enabled:bg-sky-500",
  ].join(" ");

  const validateFieldsChosen = () => {
    for (let key in formData) {
      if (!formData[key as keyof typeof formData]) {
        return false;
      }
    }
    return true;
  };

  const validateFirstName = () => {
    let regex = /^[a-zA-Z]+$/;
    let changedValidation = false;

    if (formData.firstName && !regex.test(formData.firstName)) {
      if (errorMessage.firstName === "") {
        changedValidation = true;
      }
      setErrorMessage((prevError) => ({
        ...prevError,
        firstName: "Имя должно содержать только буквы",
      }));
    } else {
      if (errorMessage.firstName !== "") {
        changedValidation = true;
      }
      setErrorMessage((prevError) => ({ ...prevError, firstName: "" }));
    }

    if (changedValidation && validateFieldsChosen()) {
      setFormData((prevForm) => ({ ...prevForm })); // Extra rerender needed to correct the current input error status
    }
  };

  const validateLastName = () => {
    let regex = /^[a-zA-Z]+$/;
    let changedValidation = false;
    if (formData.lastName && !regex.test(formData.lastName)) {
      if (errorMessage.lastName === "") {
        changedValidation = true;
      }
      setErrorMessage((prevError) => ({
        ...prevError,
        lastName: "Фамилия должна содержать только буквы",
      }));
    } else {
      if (errorMessage.lastName !== "") {
        changedValidation = true;
      }
      setErrorMessage((prevError) => ({ ...prevError, lastName: "" }));
    }

    if (changedValidation && validateFieldsChosen()) {
      setFormData((prevForm) => ({ ...prevForm }));
    }
  };

  const validatePhone = () => {
    const phonePattern = /^-?\d+$/;
    let changedValidation = false;
    if (formData.phone && !phonePattern.test(formData.phone)) {
      if (errorMessage.phone === "") {
        changedValidation = true;
      }
      setErrorMessage((prevError) => ({
        ...prevError,
        phone: "Некорректный номер телефона!",
      }));
    } else {
      if (errorMessage.phone !== "") {
        changedValidation = true;
      }
      setErrorMessage((prevError) => ({ ...prevError, phone: "" }));
    }

    if (changedValidation && validateFieldsChosen()) {
      setFormData((prevForm) => ({ ...prevForm }));
    }
  };

  const validateLanguages = () => {
    let regex = /^[a-zA-Z\s]*$/;
    let changedValidation = false;

    if (formData.languages && !regex.test(formData.languages)) {
      if (errorMessage.languages === "") {
        changedValidation = true;
      }
      setErrorMessage((prevError) => ({
        ...prevError,
        languages: "Языки должны содержать только буквы",
      }));
    } else {
      if (errorMessage.languages !== "") {
        changedValidation = true;
      }
      setErrorMessage((prevError) => ({ ...prevError, languages: "" }));
    }

    if (changedValidation && validateFieldsChosen()) {
      setFormData((prevForm) => ({ ...prevForm })); // Extra rerender needed to correct the current input error status
    }
  };

  const handleDateChange = (e: any) => {
    const { value } = e.target;
    setFormData((prevForm) => ({
      ...prevForm,
      birthDate: value,
    }));
    setChangedField(() => "birthDate");
  };
  const validateBirthDate = () => {
    let changedValidation = false;

    if (formData.birthDate) {
      const selectedDate = new Date(formData.birthDate);
      const today = new Date();
      let age = today.getFullYear() - selectedDate.getFullYear();
      const m = today.getMonth() - selectedDate.getMonth();
      if (m < 0 || (m === 0 && today.getDate() < selectedDate.getDate())) {
        age--;
      }

      if (age < 13) {
        // Example: User must be at least 13 years old
        if (errorMessage.birthDate === "") {
          changedValidation = true;
        }
        setErrorMessage((prevError) => ({
          ...prevError,
          birthDate: "Вам должно быть не менее 13 лет.",
        }));
      } else {
        if (errorMessage.birthDate !== "") {
          changedValidation = true;
        }
        setErrorMessage((prevError) => ({ ...prevError, birthDate: "" }));
      }
    } else {
      if (errorMessage.birthDate === "") {
        changedValidation = true;
      }
      setErrorMessage((prevError) => ({
        ...prevError,
        birthDate: "Дата рождения обязательна.",
      }));
    }

    if (changedValidation && validateFieldsChosen()) {
      setFormData((prevForm) => ({ ...prevForm }));
    }
  };
  const validateForm = () => {
    switch (changedField) {
      case "firstName":
        validateFirstName();
        break;

      case "lastName":
        validateLastName();
        break;

      case "phone":
        validatePhone();
        break;

      case "languages":
        validateLanguages();
        break;

      case "birthDate":
        validateBirthDate();
        break;

      default:
        break;
    }

    setChangedField(() => "");

    if (validateFieldsChosen()) {
      for (let key in errorMessage) {
        if (errorMessage[key as keyof typeof errorMessage] !== "") {
          setFormValid(() => false);
          return;
        }
      }
      setFormValid(() => true);
    } else {
      setFormValid(() => false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevForm) => ({ ...prevForm, [name]: value }));
    setChangedField(() => name);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const languagesArr = formData.languages.split(" ");
    const sentObj = { ...formData, languages: languagesArr };

    for (const [key, value] of Object.entries(profileData)) {
      if (value === sentObj[key as keyof typeof sentObj]) {
        delete sentObj[key as keyof typeof sentObj];
      }
    }

    try {
      token = localStorage.getItem("jwt");
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_SERVER_NAME}/patient/edit/info`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + token,
          },
          body: JSON.stringify(sentObj),
          mode: "cors",
        },
      );

      if (!response.ok) {
        setError(true);
        throw new Error("Не удалось отредактировать данные профиля");
      }

      window.location.href = "/patientProfile/view";
    } catch (error) {
      console.error("Ошибка при редактировании данных профиля:", error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="m-4">
        {formFields.map((field) => {
          return (
            <div key={field.title} className="mb-3 max-w-80">
              <p className="font-semibold">{field.title}</p>
              {field.name === "birthDate" ? (
                <div className="calendar-container relative ">
                  <Calendar
                    value={
                      formData.birthDate ? new Date(formData.birthDate) : null
                    }
                    onChange={handleDateChange}
                    showIcon
                    dateFormat="yy-mm-dd"
                    placeholder="yyyy-mm-dd"
                    maxDate={new Date()}
                    yearRange="1900:2023"
                    className={`bg-neutral-100 w-full py-4 px-6 text-base rounded-lg border border-solid border-neutral-300 outline-none transition-[border-color] focus:border-sky-500 focus:bg-neutral-50 ${
                      errorMessage.birthDate ? "p-invalid" : ""
                    }`}
                    panelClassName="bg-white" // Custom class to set the background of the calendar popup
                  />
                  {errorMessage.birthDate && (
                    <small className="text-xs mt-1 text-red-700 font-semibold">
                      {errorMessage.birthDate}
                    </small>
                  )}
                </div>
              ) : (
                <InputComponent
                  label=""
                  type={field.type}
                  name={field.name}
                  placeholder={`Введите ${field.title.toLowerCase()}`}
                  value={formData[field.name as keyof typeof formData] ?? ""}
                  onChange={handleChange}
                  errorText={
                    errorMessage[field.name as keyof typeof errorMessage]
                  }
                />
              )}
            </div>
          );
        })}
        <div className="mb-3">
          <p className="font-semibold">Пол</p>
          <div className="flex gap-8">
            <label>
              <input
                type="radio"
                name="gender"
                value="Male"
                onChange={handleChange}
                className="radio align-middle mb-[3px] mr-1"
                checked={formData.gender === "Male"}
              />
              Мужской
            </label>
            <label>
              <input
                type="radio"
                name="gender"
                value="Female"
                onChange={handleChange}
                className="radio align-middle mb-[3px] mr-1"
                checked={formData.gender === "Female"}
              />
              Женский
            </label>
          </div>
        </div>
        <div className="mb-4">
          <button
            type="submit"
            className={submitButtonClass}
            disabled={!formValid}
          >
            Сохранить изменения
          </button>
          {error && (
            <p className="font-semibold text-red-700 mt-4">
              Не удалось отредактировать данные профиля!
            </p>
          )}
        </div>
      </div>
    </form>
  );
}

export default EditProfile;
