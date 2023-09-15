import { ReactComponent as GoogleIcon } from "../../icons/Google.svg";
import { ReactComponent as GoogleLogo } from "../../icons/Google-Logo.svg";

const Login = () => {
  //   const { data: signInUrl } = useGetSocialSignInUrlQuery(
  //     `${window.location.origin}/projects`
  //   );
  const signInUrl = `${window.location.origin}/workspace`;
  console.log("url", signInUrl);
  const setLocalStorageItem = (key: string, value: unknown) => {
    localStorage.setItem(
      key,
      typeof value === "object" ? JSON.stringify(value) : `${value}`
    );
  };

  const onClickSignin = () => {
    if (signInUrl) {
      setLocalStorageItem("isLoggedIn", "true");
      window.location.replace(signInUrl);
    }
  };

  return (
    <div className="flex justify-center items-center w-screen h-screen bg-repeat bg-[#f5f5f5]">
      <div className="flex flex-col relative items-center w-[560px] h-[300px] bg-white rounded-lg shadow-[0_2px_10px_rgba(0,0,0,0.1)]">
        <GoogleLogo height={100} className="absolute " />
        <div className="mt-20 w-full text-[35px] font-medium text-center">
          Sign In
        </div>
        <button
          className="flex items-center pl-[8px] mt-[64px] w-[245px] h-[56px] align-middle bg-[#6216fd] rounded-[54px]"
          onClick={onClickSignin}
          type="button"
        >
          <div>
            <GoogleIcon />
          </div>
          <div className="pl-[22px] text-base font-medium text-white">
            Sign in with Google
          </div>
        </button>
      </div>
    </div>
  );
};
export default Login;
