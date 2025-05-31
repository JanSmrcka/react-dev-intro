
export const Header = () => {
  return (
    <>
      <div className="relative gap-y-5 flex flex-col">
        <div className="flex flex-row justify-start items-center leading-none gap-5 text-white">
          <div className="bg-slate-100 h-[2px] w-[20px]"></div>
          <h2
            className="text-[20px] md:text-[30px] jb-mono leading-none font-bold text-slate-100"
          >
            <span className="text-purple-400">type</span>
            <span className="text-blue-400"> Todos </span>
            <span className="text-slate-400">=</span>
            <span className="text-slate-500"> {'{ ... }'} </span>
          </h2>
        </div>
      </div>
      <p className="text-[15px] text-slate-100">
        A simple ToDo application built with React.js, TypeScript, and Tailwind CSS.
      </p>
    </>
  );
}
