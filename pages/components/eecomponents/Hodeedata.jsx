import React, { useEffect, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useRouter } from "next/router";
import { format } from "date-fns";
import styles from "../../../styles/Home.module.css";
import Link from "next/link";

const Hodeedata = () => {
  const [deleteId, setDeleteId] = useState("");
  const [openComplaintId, setOpenComplaintId] = useState(null);

  const [deleteModel, setDeleteModel] = useState(false);
  const [allComplaint, setAllComplaint] = useState([]);
  const router = useRouter();
  const toastConfig = {
    position: "top-right",
    autoClose: 2000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: "dark",
  };
  const getData = async () => {
    const dpt2 = "EE" 
    const data = await fetch("/api/hodallComplain?dpt2=" + dpt2);
    setAllComplaint(await data.json());
  };
  useEffect(() => {
    getData();
  }, [router.query]);

  const handleclose = (e) => {
    if (e.target.id === "Button") {
      setDeleteModel(false);
    }
  };

  const handledeletesubmit = async (id) => {
    try {
      const responce = await fetch(`/api/complainDelete/${id}`, {
        method: "DELETE",
      });
      const data = await responce.json();
      if (data.success === true) {
        toast.success("complain deleted successfully", toastConfig);
        setTimeout(() => {
          setDeleteModel(false);
        }, 500);
        getData();
      }
    } catch (error) {
      setDeleteModel(false);
      toast.error("Complain not deleted", toastConfig);
      console.log(error);
    }
  };

  return (
    <div>
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        pauseOnHover
        theme="light"
      />
      <div className="relative flex">
        <li className="list-none">
          <i className="fa-solid fa-chevron-right text-2xl text-green-900 mr-2"></i>
        </li>
        <li className="list-none text-2xl text-green-900 font-semibold -mt-1">
          HEAD OF DEPARTMENT
        </li>
      </div>
      <div className="bg-white/30 w-[75rem] mt-4 p-5 rounded-lg border-4 border-white">
        <div className="flex flex-col overflow-x-auto">
          <div className="sm:-mx-6 lg:-mx-8">
            <div className="inline-block min-w-full py-2 sm:px-6 lg:px-8">
              <div className="overflow-x-auto overflow-y-auto">
                <table className="min-w-full text-left text-sm font-light">
                  <thead className="border-b font-medium dark:border-neutral-500">
                    <tr>
                      <th scope="col" className="px-6 py-4">
                        S.No
                      </th>
                      <th scope="col" className="px-6 py-4">
                        Name
                      </th>
                      <th scope="col" className="px-6 py-4">
                        From Department
                      </th>
                      <th scope="col" className="px-6 py-4">
                        Email
                      </th>
                      <th scope="col" className="px-6 py-4">
                        To Department
                      </th>
                      <th scope="col" className="px-6 py-4">
                        Date
                      </th>
                      <th scope="col" className="px-6 py-4">
                        User Complain
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {allComplaint.map((val, index) => {
                      format(new Date(val.date), "dd MMMM yyyy");
                      const cmplnId = val._id; // get the complaint ID for this iteration

                      const handleRowClick = (complaintId) => {
                        if (openComplaintId === complaintId) {
                          setOpenComplaintId(null); // close the currently opened complaint
                        } else {
                          setOpenComplaintId(complaintId); // open the new complaint
                        }
                      };

                      return (
                        <React.Fragment key={index}>
                          <tr
                            className="border-b dark:border-neutral-500 cursor-pointer"
                            onClick={() => handleRowClick(val._id)}
                          >
                            <td className="whitespace-nowrap px-6 py-4 font-medium">
                              {index + 1}
                            </td>
                            <td className="whitespace-nowrap px-6 py-4">
                              {val.name}
                            </td>
                            <td className="whitespace-nowrap px-6 py-4">
                              {val.dpt}
                            </td>
                            <td className="whitespace-nowrap px-6 py-4">
                              {val.email}
                            </td>
                            <td className="whitespace-nowrap px-6 py-4">
                              {val.dpt2}
                            </td>
                            <td className="whitespace-nowrap px-6 py-4">
                              {format(new Date(val.date), "dd MMMM yyyy")}
                            </td>
                            <td>
                              <div className={styles.truncated}>
                                {val.cmpln}
                              </div>
                            </td>
                            <td
                              className="whitespace-nowrap px-6 py-4 hover:text-red-500 cursor-pointer"
                              onClick={() => {
                                setDeleteId(val._id);
                                setDeleteModel(true);
                              }}
                            >
                              <i className="fa-solid fa-trash"></i>
                            </td>
                          </tr>
                          {openComplaintId === val._id && (
                            <tr>
                              <td colSpan="8">{val.cmpln}</td>
                            </tr>
                          )}
                        </React.Fragment>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
      {deleteModel && (
        <div
          id="Container"
          data-aos="zoom-in"
          className="fixed inset-0 bg-black bg-opacity-30 backdrop-blur-sm flex justify-center items-center"
        >
          <div className="bg-green-900 p-5 rounded flex flex-col items-center justify-center text-black dark:text-white ">
            <h1 className="text-3xl text-white uppercase select-none">
              Are You Sure to Delete this complain ?
            </h1>
            <div className="gap-20 flex ml-10 mt-6">
              <button
                className="flex items-center justify-center bg-red-400 text-lg text-white hover:bg-red-300 hover:shadow-3xl rounded-lg transition-all duration-500 w-20 p-2"
                onClick={() => {
                  handledeletesubmit(deleteId);
                }}
              >
                Delete
              </button>
              <button
                className="bg-green-400 text-lg text-white hover:bg-green-800 hover:shadow-3xl rounded-lg transition-all duration-500 w-20 p-2"
                id="Button"
                onClick={handleclose}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Hodeedata;
