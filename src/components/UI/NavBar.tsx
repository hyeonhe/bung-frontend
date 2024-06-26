import homeSelected from "icons/home_selected.svg";
import home from "icons/home.svg";
import my from "icons/my.svg";
import mySelected from "icons/my_selected.svg";
import write from "icons/write.svg";
import writeSelected from "icons/write_selected.svg";
import NavButton from "./NavButton";
import { useLocation } from "react-router";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { checkDraftArticle } from "utils/checkDraftArticle";

export default function NabBar() {
  const location = useLocation();
  useEffect(() => {
    console.log(location.pathname);
  }, [location.pathname]);

  const navigate = useNavigate();

  const handleDraftArticleCheck = () => {
    checkDraftArticle(navigate);
  };

  return (
    <div className="bg-white w-[375px] flex h-20 justify-center items-center fixed bottom-0 border-t-[0.5px] border-solid border-[#DDDDDD]">
      <NavButton
        title="홈"
        img={location.pathname === "/home" ? homeSelected : home}
        href={"/home"}
      />
      <div onClick={handleDraftArticleCheck}>
        <NavButton
          title="글작성"
          img={location.pathname === "/write" ? writeSelected : write}
          href={"/write"}
        />
      </div>
      <NavButton
        title="마이"
        img={
          location.pathname === ("/my/timeline" || "/my/manner")
            ? mySelected
            : my
        }
        href="/my/timeline"
      />
    </div>
  );
}
