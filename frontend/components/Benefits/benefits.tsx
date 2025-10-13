import React from "react";

const Benefits = () => {
  return (
    <section>
      <div className="max-w-full md:max-w-[90%] lg:max-w-[75%] mx-auto flex flex-col space-y-20">
        <div className="text-[#343a40] font-bold text-3xl mx-auto">
          Преимущества для наших пользователей
        </div>
        <div className="flex flex-col space-y-20 md:space-y-0 md:flex-row md:space-x-6 justify-between">
          <div className="bg-white rounded-2xl p-4 flex flex-col space-y-4 shadow-2xl md:max-w-[33%]">
            <div className="flex justify-between relative">
              <h3 className="text-[#035fe9] font-bold">Экономия времени и усилий</h3>
              <img
                className="absolute top-[-64px] right-0"
                src="assets/b1.svg"
                alt=""
              />
            </div>
            <p>
              Проводите консультации онлайн. Никаких очередей и проблем с транспортом
            </p>
          </div>
          <div className="bg-white rounded-2xl p-4 flex flex-col space-y-4 shadow-2xl md:max-w-[33%]">
            <div className="flex justify-between relative">
              <h3 className="text-[#035fe9] font-bold">Отзывчивая команда</h3>
              <img
                className="absolute top-[-64px] right-0"
                src="assets/b2.svg"
                alt=""
              />
            </div>
            <p>
              Наша служба поддержки поможет вам сделать первый шаг и ответит на организационные вопросы
            </p>
          </div>
          <div className="bg-white rounded-2xl p-4 flex flex-col space-y-4 shadow-2xl md:max-w-[33%]">
            <div className="flex justify-between relative">
              <h3 className="text-[#035fe9] font-bold">Широкий выбор</h3>
              <img
                className="absolute top-[-64px] right-0"
                src="assets/b3.svg"
                alt=""
              />
            </div>
            <p>
              Большое количество врачей различных специальностей готовы помочь вам с любой проблемой
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Benefits;
