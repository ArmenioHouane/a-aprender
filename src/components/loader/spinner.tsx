import React from "react";

const Spinner: React.FC = () => {
  return (
    <div className="flex flex-col items-center gap-2">
      <div className="h-8 w-8 animate-spin rounded-full border-4 border-blue-500 dark:border-[#eeeeee] border-t-transparent dark:border-t-transparent" />
      <span className="text-sm font-semibold">Loading</span>
    </div>
  );
};

const SpinnerPage: React.FC = () => {
  return (
    <div className="space-y-4 flex justify-center items-center min-h-screen">
     
        {/* Single Spinner with Blue in light mode and White in dark mode */}
        <Spinner />
      
    </div>
  );
};

export default SpinnerPage;
