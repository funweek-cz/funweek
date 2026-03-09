"use client";

import React, { useState, useRef } from "react";
import {
  LuArrowLeft,
  LuArrowRight,
  LuLoaderCircle,
  LuMail,
} from "react-icons/lu";
import { sendOtpEmail, verifyOtpCode } from "./actions";

export default function LoginPageClient() {
  const [email, setEmail] = useState("");
  const [code, setCode] = useState(["", "", "", "", "", ""]);
  const [step, setStep] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const inputRefs = useRef([]);

  const handleEmailSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");

    const result = await sendOtpEmail(email);

    setIsLoading(false);

    if (result.error) {
      setError(`Chyba při odesílání: ${result.error}`);
    } else {
      setStep(2);
      setCode(["", "", "", "", "", ""]);
    }
  };

  const handleCodeChange = (index, value) => {
    if (!/^\d*$/.test(value)) return;

    const newCode = [...code];
    newCode[index] = value;
    setCode(newCode);

    if (value && index < 5) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handleCodeKeyDown = (index, e) => {
    if (e.key === "Backspace" && !code[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  const handlePaste = (e) => {
    e.preventDefault();
    const pastedData = e.clipboardData.getData("text");
    if (pastedData.length === 6 && /^\d+$/.test(pastedData)) {
      const newCode = pastedData.split("");
      setCode(newCode);
      inputRefs.current[5]?.focus();
    }
  };

  const handleCodeSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");

    const fullToken = code.join("");

    if (fullToken.length !== 6) {
      setError("Prosím, zadejte kompletní šestimístný kód.");
      setIsLoading(false);
      return;
    }

    const result = await verifyOtpCode(email, fullToken);

    setIsLoading(false);

    if (result?.error) {
      setError(`Chyba ověření: ${result.error}`);
    }
  };

  const handleResendCode = async () => {
    setIsLoading(true);
    setError("");

    const result = await sendOtpEmail(email);

    setIsLoading(false);

    if (result.error) {
      setError(`Chyba při odesílání: ${result.error}`);
    } else {
      setCode(["", "", "", "", "", ""]);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <main className="w-full max-w-md bg-white rounded-2xl border overflow-hidden">
        <div className="p-6 sm:p-8">
          {step === 1 && (
            <div className="space-y-6">
              <div className="text-center">
                <h1 className="text-3xl font-extrabold text-funweek">
                  Vítej zpátky!
                </h1>
                <p className="text-funweek/80 mt-2 text-md">
                  Zadej prosím svůj email, pošleme ti jednorázový kód pro
                  přihlášení.
                </p>
              </div>
              <form onSubmit={handleEmailSubmit} className="space-y-6">
                <div>
                  <label className="block text-sm font-semibold text-funweek mb-2">
                    Email
                  </label>
                  <div className="relative">
                    <LuMail
                      className="absolute left-3 top-1/2 -translate-y-1/2 text-funweek/50"
                      size={20}
                    />
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full pl-10 pr-4 py-3 border-2 border-funweek/30 focus:border-funweek focus:ring-1 focus:ring-funweek rounded-xl transition-all shadow-sm"
                      placeholder="jmeno@domena.cz"
                      disabled={isLoading}
                    />
                  </div>
                  {error && (
                    <p className="text-red-500 text-sm mt-2 font-medium">
                      {error}
                    </p>
                  )}
                </div>
                <button
                  type="submit"
                  disabled={isLoading || !email}
                  className="w-full font-bold bg-funweek text-white py-3 rounded-xl transition-all duration-300 flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed hover:shadow-lg hover:shadow-funweek/40"
                >
                  {isLoading ? (
                    <LuLoaderCircle className="animate-spin" size={20} />
                  ) : (
                    <>
                      Pokračovat <LuArrowRight size={20} />
                    </>
                  )}
                </button>
              </form>
            </div>
          )}

          {step === 2 && (
            <div className="space-y-6">
              <div className="text-center">
                <h1 className="text-3xl font-extrabold text-funweek">
                  Poslali jsme ti kód!
                </h1>
                <p className="text-funweek/80 mt-2 text-md">
                  Zadej jednorázový kód, který jsme poslali na{" "}
                  <span className="font-semibold text-funweek underline">
                    {email}
                  </span>
                </p>
              </div>
              <form onSubmit={handleCodeSubmit} className="space-y-6">
                <div>
                  <div
                    className="flex gap-2 justify-center"
                    onPaste={handlePaste}
                  >
                    {code.map((c, i) => (
                      <input
                        key={i}
                        id={`code-${i}`}
                        ref={(el) => (inputRefs.current[i] = el)}
                        type="text"
                        inputMode="numeric"
                        maxLength={1}
                        value={c}
                        onChange={(e) => handleCodeChange(i, e.target.value)}
                        onKeyDown={(e) => handleCodeKeyDown(i, e)}
                        className="w-10 h-14 text-center text-xl font-bold border-2 border-gray-300 rounded-lg outline-none transition-all duration-200 focus:border-funweek"
                        disabled={isLoading}
                        autoComplete={i === 0 ? "one-time-code" : "off"}
                      />
                    ))}
                  </div>
                  {error && (
                    <p className="text-red-500 text-sm mt-3 font-medium text-center">
                      {error}
                    </p>
                  )}
                </div>
                <div className="flex gap-3 pt-4">
                  <button
                    type="button"
                    onClick={() => {
                      setStep(1);
                      setCode(["", "", "", "", "", ""]);
                      setError("");
                    }}
                    className="flex-1 bg-gray-100 text-gray-700 font-bold py-3 rounded-xl transition-all duration-300 hover:bg-gray-200 flex items-center justify-center gap-2"
                    disabled={isLoading}
                  >
                    <LuArrowLeft size={20} /> Zpět
                  </button>
                  <button
                    type="submit"
                    disabled={isLoading || code.some((c) => !c)}
                    className="flex-1 bg-funweek text-white py-3 rounded-xl font-bold transition-all duration-300 flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed hover:shadow-lg hover:shadow-funweek/40"
                  >
                    {isLoading ? (
                      <LuLoaderCircle className="animate-spin" size={20} />
                    ) : (
                      <>
                        Pokračovat <LuArrowRight size={20} />
                      </>
                    )}
                  </button>
                </div>
                <p className="text-center text-sm text-gray-500 mt-4">
                  Kód nedorazil?{" "}
                  <button
                    type="button"
                    onClick={handleResendCode}
                    className="text-funweek font-medium hover:underline transition-colors cursor-pointer"
                    disabled={isLoading}
                  >
                    Odeslat znovu
                  </button>
                </p>
              </form>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
