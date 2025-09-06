import { IoMoon } from "react-icons/io5";
import { IoMdSunny } from "react-icons/io";
import { LuMenu } from "react-icons/lu";

const TopBar = ({ theme, toggleTheme, isSidebar, setIsSidebar }) => {
  return (
    <div className="flex justify-between items-center w-full bg-light rounded-b-2xl z-50 md:px-3 py-2 transition-colors">
      <h2 className="font-medium text-xl flex items-center justify-center gap-1 hover:bg-dark/10 py-2 md:px-4 rounded-xl">
        <LuMenu
          onClick={() => setIsSidebar(!isSidebar)}
          className={`text-2xl mt-[1px] hover:bg-accent rounded-sm block md:hidden`}
        />
        ChatGPT
      </h2>
      <button
        className="bg-light rounded-full text-xl transition-colors hover:bg-dark/10 py-2.5 md:px-3"
        onClick={toggleTheme}
      >
        {theme === "light" ? <IoMdSunny /> : <IoMoon />}
      </button>
    </div>
  );
};

export default TopBar;
