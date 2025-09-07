import { IoMoon } from "react-icons/io5";
import { IoMdSunny } from "react-icons/io";
import { LuMenu } from "react-icons/lu";

const TopBar = ({ theme, toggleTheme, isSidebar, setIsSidebar }) => {
  return (
    <div className="flex justify-between items-center w-full  rounded-b-2xl z-50 transition-colors">
      <h2 className="text-lg flex items-center justify-center gap-2 py-2 md:px-4 rounded-xl">
        <LuMenu
          onClick={() => setIsSidebar(!isSidebar)}
          className={`text-xl mt-[1px] rounded-sm block md:hidden bg-dark/10 px-[1px] py-1.5`}
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
