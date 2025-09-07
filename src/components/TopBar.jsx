import { IoMoon } from "react-icons/io5";
import { IoMdSunny } from "react-icons/io";
import { LuMenu } from "react-icons/lu";

const TopBar = ({ theme, toggleTheme, isSidebar, setIsSidebar }) => {
  return (
    <div className="flex justify-between items-center w-full  rounded-b-2xl z-50 transition-colors">
      <h2 className="text-lg flex items-center justify-center gap-1 py-1 md:px-2 md:mx-2 rounded-lg md:hover:bg-dark/5">
        <LuMenu
          onClick={() => setIsSidebar(!isSidebar)}
          className={`text-xl mt-[1px] rounded-sm block md:hidden`}
        />
        ChatGPT
      </h2>
      <button
        className="rounded-full text-xl transition-colors hover:bg-dark/5 p-2 m-2"
        onClick={toggleTheme}
      >
        {theme === "light" ? <IoMdSunny /> : <IoMoon />}
      </button>
    </div>
  );
};

export default TopBar;
