import UI_IMG from "../../assets/images/UI_IMAGE.jpg";

const AuthLayout = ({ children }) => {
  return (
    <div className=" flex ">
      <div className="w-screen h-screen md:w-[60vw] px-12 pt-8 pb-12 ">
        <h2 className="text-lg font-medium text-black">Task Manager</h2>
        {children}
      </div>
      <div
        className="relative hidden md:flex w-[40vw] h-screen items-center justify-center bg-cover   bg-cover bg-no-repeat bg-center overflow-hidden p-8"
        style={{ backgroundImage: `url(${UI_IMG})` }}
      >
        {/* <img src={UI_IMG} className="w-64 lg:w-[90%] bg-cover" /> */}
        <div className="absolute inset-0 flex flex-col items-center justify-center text-white px-6 text-center">
          <p className="text-2xl md:text-xl font-bold">
            Manage your tasks efficiently <br /> and stay organized.
          </p>
        </div>
      </div>
    </div>
  );
};

export default AuthLayout;
