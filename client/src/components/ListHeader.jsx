import { useState } from "react";
import Modal from "./Modal";
import { useCookies } from "react-cookie";

const ListHeader = ({ listName, userEmail, fetchData }) => {
  const [cookies, setCookie, removeCookie] = useCookies(null);
  const [showModal, setShowModal] = useState(false);
  const signOut = () => {
    console.log("sign out");
    removeCookie("email");
    removeCookie("authToken");
    window.location.reload();
  };

  return (
    <div className="w-full font-caladea">
      <div className="flex flex-row max-md:flex-col justify-between max-md:justify-center items-center gap-4 py-8 mb-8 rounded-lg bg-[#008DDA]">
        <h1 className="text-4xl max-lg:text-2xl font-bold lg:ml-4 text-[#F7EEDD]">
          {listName}
        </h1>
        <div className="flex flex-row max-md:flex-col justify-center items-center lg:gap-10 gap-4">
          <p className="text-[#F7EEDD]">
            Hello, <span className="text-[#F7EEDD] font-bold">{userEmail}</span>
          </p>
          <button
            className="text-[#F7EEDD] font-bold lg:mr-8 hover:text-orange-500"
            onClick={signOut}
          >
            Sign Out
          </button>
        </div>
      </div>
      <div className="text-end max-md:text-center my-6">
        <button
          className="text-bold bg-[#008DDA] rounded-lg text-[#F7EEDD] px-4 py-2 leading-6 font-semibold hover:bg-blue-800"
          onClick={() => setShowModal(true)}
        >
          Add Task
        </button>
      </div>
      {showModal && (
        <Modal
          mode="create"
          setShowModal={setShowModal}
          fetchData={fetchData}
        />
      )}
    </div>
  );
};

export default ListHeader;
