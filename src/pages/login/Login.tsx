import { ReactComponent as GoogleIcon } from "../../icons/Google.svg";
import { useLazyLoginQuery } from "../../store/api";
import logo from "../../icons/logo-with-name.png";

const Login = () => {
  const [login, { data }] = useLazyLoginQuery();

  const signInUrl = `${window.location.origin}/workspace`;
  console.log("url", signInUrl);
  const setLocalStorageItem = (key: string, value: unknown) => {
    localStorage.setItem(
      key,
      typeof value === "object" ? JSON.stringify(value) : `${value}`
    );
  };

  const onClickSignin = async () => {
    const signInUrl = await login({});
    if (signInUrl?.data) {
      setLocalStorageItem("isLoggedIn", "true");
      window.location.replace(signInUrl.data);
    }
  };

  return (
    <div className="flex justify-center items-center w-screen h-screen bg-repeat bg-[#f5f5f5]">
      <div className="flex flex-col relative items-center p-8 min-w-[500px] bg-white rounded-lg shadow-[0_2px_10px_rgba(0,0,0,0.1)]">
        <img
          src={logo}
          alt="logo"
          className="object-contain h-[200px] w-[150px]"
        />
        <button
          className="flex items-center pl-[8px] mt-8 w-[245px] h-[56px] align-middle bg-[#3A9FD8] rounded-[54px]"
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
