import Header from "../components/Header";
import NavBar from "../components/NavBar";
import ProfileBar from "../components/ProfileBar";
import StatusBar from "../components/StatusBar";
import MypageTab from "../components/MypageTab";
import AlarmTab from "../components/AlarmTab";
import TimelineArea from "../components/TimelineArea";
import { useLocation } from "react-router";
import MannerArea from "../components/MannerArea";
import { useDispatch, useSelector } from "react-redux";
import { changeNicknameActions } from "../store/changeNickname";
import { ToolkitStore } from "../store";
import { useEffect } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Cookies } from "react-cookie";
import SubTitle1 from "../components/SubTitle1";
import KaKaoLoginBtn from "../components/KakaoLoginBtn";
import { useNavigate } from "react-router-dom";

export default function My() {
  const location = useLocation();
  const dispatch = useDispatch();
  const isChangedNickname = useSelector(
    (state: ToolkitStore) => state.changeNickname.isChangedNickname
  );

  useEffect(() => {
    if (isChangedNickname) {
      notify();
      dispatch(changeNicknameActions.setInitial());
    }
  }, [isChangedNickname, dispatch]);

  const notify = () => toast.success("닉네임이 수정됐어요");

  const cookies = new Cookies();

  const navigate = useNavigate();
  return (
    <>
      <div className="w-[375px] h-screen min-h-screen bg-white flex flex-col items-center ">
        <StatusBar />
        <Header />
        <NavBar />
        {cookies.get("id") ? (
          <>
            <ProfileBar />
            <MypageTab />
            {location.pathname === "/my/timeline" && (
              <div className="w-full h-full bg-[#F2F2F6]  overflow-y-auto scrollbar-hide pb-24">
                <AlarmTab />
                <TimelineArea />
              </div>
            )}
            {location.pathname === "/my/manner" && <MannerArea />}
          </>
        ) : (
          <>
            <div className="w-full px-5 pt-10 pb-[58px] flex flex-col gap-[14px]">
              <SubTitle1 text="프로필" />
              <span className="text-base font-normal">
                로그인하고 더 많은 기능을 사용해보세요!
              </span>
            </div>
            <KaKaoLoginBtn
              text="카카오로 로그인하기"
              onClick={() => navigate("/login")}
            />
          </>
        )}
      </div>
      <ToastContainer
        position="bottom-center"
        limit={1}
        closeButton={false}
        autoClose={3000}
        hideProgressBar
      />
    </>
  );
}