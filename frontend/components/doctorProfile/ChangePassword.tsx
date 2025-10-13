"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import InputComponent from "@/components/auth/InputComponent";
import CircularProgress from "@mui/material/CircularProgress/CircularProgress";
import { useProfile } from "@/context/ProfileContext"; // Ensure correct import path
function ChangePassword() {
  const { profileData, loading } = useProfile();

  const [formData, setFormData] = useState({
    oldPassword: "",
    password: "",
    confirmPassword: "",
  });

  const [errorMessage, setErrorMessage] = useState({
    oldPassword: "",
    password: "",
    confirmPassword: "",
  });

  const [changedField, setChangedField] = useState("");

  const [formValid, setFormValid] = useState(false);

  const [oldPasswordError, setOldPasswordError] = useState(false);

  let token: string | null = "";

  const formFields = [
    { name: "oldPassword", type: "Старый пароль" },
    { name: "password", type: "Новый пароль" },
    { name: "confirmPassword", type: "Подтвердите новый пароль" },
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

  const validatePassword = () => {
    let passwordPattern =
      /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/;
    let changedValidation = false;
    if (
      !formData.password ||
      (formData.password && passwordPattern.test(formData.password))
    ) {
      if (errorMessage.password !== "") {
        changedValidation = true;
      }
      setErrorMessage((prevError) => ({ ...prevError, password: "" }));
    } else {
      if (errorMessage.password === "") {
        changedValidation = true;
      }
      setErrorMessage((prevError) => ({
        ...prevError,
        password:
          "Пароль должен содержать минимум 8 символов, включая хотя бы 1 цифру, 1 букву и 1 спецсимвол",
      }));
    }

    if (changedValidation && validateFieldsChosen()) {
      setFormData((prevForm) => ({ ...prevForm }));
    }
  };

  const validateConfirmPassword = () => {
    let changedValidation = false;

    if (
      formData.confirmPassword &&
      formData.confirmPassword !== formData.password
    ) {
      if (errorMessage.confirmPassword === "") {
        changedValidation = true;
      }
      setErrorMessage((prevError) => ({
        ...prevError,
        confirmPassword: "Пароли не совпадают",
      }));
    } else {
      if (errorMessage.confirmPassword !== "") {
        changedValidation = true;
      }
      setErrorMessage((prevError) => ({ ...prevError, confirmPassword: "" }));
    }

    if (changedValidation && validateFieldsChosen()) {
      setFormData((prevForm) => ({ ...prevForm }));
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevForm) => ({ ...prevForm, [name]: value }));
    setChangedField(() => name);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      token = localStorage.getItem("jwt");
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_SERVER_NAME}/doctor/edit/password`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + token,
          },
          body: JSON.stringify(formData),
          mode: "cors",
        },
      );

      if (!response.ok) {
        if (response.status === 400) {
          setOldPasswordError(true);
        }
        throw new Error("Failed To Edit Password");
      }

      window.location.href = "/doctorProfile/view";
    } catch (error) {
      console.error("Error While Editing Password:", error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="m-4">
        {formFields.map((field) => {
          return (
            <div key={field.name} className="mb-3 max-w-80">
              <p className="font-semibold">{field.type}</p>
              <InputComponent
                label=""
                type="password"
                name={field.name}
                placeholder={field.type}
                value={formData[field.name as keyof typeof formData]}
                onChange={handleChange}
                errorText={
                  errorMessage[field.name as keyof typeof errorMessage]
                }
              />
            </div>
          );
        })}
        <div className="mb-4">
          <button
            type="submit"
            className={submitButtonClass}
            disabled={!formValid}
          >
            Изменить пароль
          </button>
        </div>
        {oldPasswordError ? (
          <p className="font-semibold text-red-700">
            Неверный старый пароль, попробуйте снова!
          </p>
        ) : (
          <p className="font-semibold">
            {loading ? "Загрузка..." : "Нет ответа. Пожалуйста, попробуйте позже"}
          </p>
        )}
      </div>
    </form>
  );
}

export default ChangePassword;
