"use client";

import { useState } from "react";
import { ChevronDown, Check } from "lucide-react";

const languages = [
  {
    code: "UZ",
    name: "O'zbekcha",
    flag: "🇺🇿",
  },
  {
    code: "EN",
    name: "English",
    flag: "🇬🇧",
  },
  {
    code: "RU",
    name: "Русский",
    flag: "🇷🇺",
  },
];

export default function LanguageSelect() {
  const [open, setOpen] = useState(false);
  const [selected, setSelected] = useState(languages[1]);

  const handleLanguage = (language: (typeof languages)[number]) => {
    setSelected(language);
    setOpen(false);
  };

  return (
    <div className="relative z-[9999] inline-block">
      {/* BUTTON */}
      <button
        type="button"
        onClick={() => {
          console.log("Language button clicked");
          setOpen((value) => !value);
        }}
        className="flex items-center gap-1.5 rounded-md px-2 py-1.5"
      >
        <span className="text-lg">{selected.flag}</span>

        <span className="text-sm font-medium text-gray-700 dark:text-gray-200">
          {selected.code}
        </span>

        <ChevronDown
          size={15}
          className={`text-gray-500 transition-transform ${
            open ? "rotate-180" : ""
          }`}
        />
      </button>

      {/* DROPDOWN */}
      {open && (
        <div
          className="
            absolute
            right-0
            top-[calc(100%+8px)]
            z-[99999]
            w-44
            rounded-xl
            border
            border-gray-200
            bg-white
            p-1.5
            shadow-2xl
            dark:border-gray-700
            dark:bg-gray-900
          "
        >
          {languages.map((language) => {
            const active = selected.code === language.code;

            return (
              <button
                key={language.code}
                type="button"
                onClick={() => handleLanguage(language)}
                className="
                  flex
                  w-full
                  items-center
                  gap-3
                  rounded-lg
                  px-3
                  py-2.5
                  text-left
                  transition
                  hover:bg-gray-100
                  dark:hover:bg-gray-800
                "
              >
                <span className="text-lg">{language.flag}</span>

                <div className="flex flex-1 flex-col">
                  <span className="text-sm font-medium text-gray-800 dark:text-gray-100">
                    {language.code}
                  </span>

                  <span className="text-xs text-gray-500 dark:text-gray-400">
                    {language.name}
                  </span>
                </div>

                {active && <Check size={16} className="text-green-500" />}
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
}
