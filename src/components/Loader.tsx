import React from "react";

export default function Loader() {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-[#0c0908] z-50">
      <div className="animate-spin rounded-full border-4 border-t-gold-300 border-b-gold-500 h-12 w-12" />
    </div>
  );
}
