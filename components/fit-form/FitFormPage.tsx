"use client";

import React from "react";
import FitForm from "./FitForm";

export default function FitFormPage() {
  return (
    <div className="min-h-screen bg-white text-neutral-900">
      <div className="mx-auto max-w-6xl px-6 py-14">
        <div className="rounded-3xl border border-neutral-200 bg-white p-8 shadow-sm">
          <FitForm />
        </div>
      </div>
    </div>
  );
}
