"use client";
const RegisterButtons: React.FC = () => {
  return (
    <div>
      <button className="bg-[#F4991A] py-3 me-10 ms-10 text-white font-bold rounded-3xl ">
        Register
      </button>
      <div className="flex items-center  max-w-full ps-10 pe-10">
        <hr className="flex-grow border-t border-gray-300" />
        <span className="mx-4 text-gray-500">Atau</span>
        <hr className="flex-grow border-t border-gray-300" />
      </div>
      <button className="bg-white py-3 me-10 ms-10 border font-bold rounded-3xl  ">
        Register dengan Google
      </button>
    </div>
  );
};

export default RegisterButtons;
