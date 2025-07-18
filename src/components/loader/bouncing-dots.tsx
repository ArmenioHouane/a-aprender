export function BouncingDots() {
    return (
        <div className="flex pointer-events-none flex-col items-center gap-2">
        <div className="flex gap-4">
          <span className="inline-block size-4 animate-[bounce_1s_infinite_0ms] rounded-full bg-blue-500 dark:bg-white"></span>
          <span className="inline-block size-4 animate-[bounce_1s_infinite_200ms] rounded-full bg-blue-500 dark:bg-white"></span>
          <span className="inline-block size-4 animate-[bounce_1s_infinite_400ms] rounded-full bg-blue-500 dark:bg-white"></span>
        </div>
        <p className=" font-semibold text-2xl">Loading</p>
      </div>
    )
  }
  
  