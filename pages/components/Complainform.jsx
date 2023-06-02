import React, { useEffect, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useRouter } from 'next/router';

const Complainform = () => {
  const router = useRouter();
  const [studentName, setStudentName] = useState("")
  const [studentEmail, setStudentEmail] = useState("")
  const [dpt,setDpt] = useState("");
  const [loading, setLoading] = useState(false);
  const [dpt2,setDpt2] = useState(""); 
  const [date,setDate] = useState("");
  const [cmpln,setCmpln] = useState("");

  const toastoptions = {
    position: "top-right",
    autoClose: 1000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: "dark",
  }

  
  useEffect(() => {
    const getStudent = async () => {
      const studentToken = await JSON.parse(
        localStorage.getItem("student-token")
      );
      const studentInformation = await fetch("/api/studentTokenData", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          token: studentToken,
        }),
      });
      const studentData = await studentInformation.json();
      if (studentData.status === true) {
        setStudentName(studentData.studentData.name)
        setStudentEmail(studentData.studentData.email)
      } else {
        toast.error(" Token Expired, Please Login Again", toastConfig);
      }
    };
    getStudent();
  }, [router.query]);

  const handleclick = async(event) => {
    event.preventDefault();

    
    setLoading(true);


    if (!dpt || !dpt2 || !date || !cmpln)  {
      toast.warning("Please fill all the field !!", toastoptions );
      setTimeout(() => {
          setLoading(false);
      }, 2000);
      return;
    }
    
    try {
      const data = await fetch("/api/hello", {
        method: 'POST', 
        headers: { 'Content-type': 'application/json' },
        body : JSON.stringify({
                name:studentName,
                email:studentEmail,
                dpt, 
                dpt2,
                date,
                cmpln

        })
      }) 
      let response = await data.json();

      if (response.success === true )
      {
        toast.success("Complain Regsitered !!", toastoptions );
      setTimeout(() => {
          setLoading(false);
      }, 1000);
      setDpt("")
      setDpt2("")
      setCmpln("")
      setDate("")
      router.reload()
      }
      else if (response.success === "already")
      {
        toast.error("Complain Already Existed !!", toastoptions );
        setTimeout(() => {
            setLoading(false);
        }, 1000);
      setCmpln("")
      setDate("")
      }
      else {
        toast.error("Complain not Regsitered !!", toastoptions );
      setTimeout(() => {
          setLoading(false);
      }, 1000);
      setCmpln("")
      setDate("")
      console.log(data);
      }
    } catch (error) {
      toast.error("Error Occured !!", toastoptions );
      setTimeout(() => {
          setLoading(false);
      }, 1000);
      setCmpln("")
      setDate("")
    }
  }
  
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
        <li className="list-none text-3xl text-green-900 font-semibold -mt-1">
          Register Complain
        </li>
      </div>
      <div className="bg-white/30 w-[68rem] mt-4 p-5 rounded-lg border-4 border-white">
        <div className="flex">
          <select
            name="Dpt"
            id="Dpt"
            onChange={(e) => setDpt(e.target.value)}
            className="w-[30rem] p-3 bg-white/50 outline-none ring-2 ml-5
              focus:ring-4 ring-gray-500 focus:ring-green-900 rounded transition-all duration-500 text-lg"
          >
            <option
              className="w-[30rem] p-3 outline-none"
              value="Dpt"
              disabled
              selected
            >
              Your Department
            </option>
            <option className="w-[30rem] p-3 outline-none" value="CS">
              Computer Science
            </option>
            <option className="w-[30rem] p-3 outline-none" value="IT">
              Information Technology
            </option>
            <option className="w-[30rem] p-3 outline-none" value="EE">
              Electrical
            </option>
            <option className="w-[30rem] p-3 outline-none" value="EL">
              Electronics
            </option>
            <option className="w-[30rem] p-3 outline-none" value="CE">
              Civil
            </option>
          </select>
          <input
            name="Name"
            type="text"
            disabled
            className="ml-16 w-[30rem] p-3 text-lg cursor-not-allowed bg-white/50 outline-none ring-2 ring-gray-500 focus:ring-green-900 focus:ring-4 rounded transition-all duration-500"
            placeholder="Your Name"
            value={studentName}
            autoComplete="off"
          />
        </div>
        <div className="flex">
          <input
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            className="w-[30rem] p-3 ml-5  bg-white/50 outline-none ring-2 ring-gray-500 focus:ring-4 focus:ring-green-900 rounded transition-all duration-500 mt-5"
          />
          <input
            name="email"
            type="email"
            value={studentEmail}
            disabled
            placeholder="Your Email"
            className=" ml-16 mt-5 text-lg w-[30rem] p-3 cursor-not-allowed bg-white/50 outline-none ring-2 ring-gray-500 focus:ring-green-900 focus:ring-4 rounded  transition-all duration-500"
            autoComplete="off"
          />
        </div>
        <div className="flex">
          <div>
            <textarea
              name="cmpln"
              id="cmpln"
              cols="55"
              rows="16"
              onChange={(e) => setCmpln(e.target.value)}
              value={cmpln}
              placeholder="Write Your Complain"
              className="mt-5  outline-none ring-2 ring-gray-500 focus:ring-green-900  focus:ring-4 rounded transition-all duration-500 p-3 ml-5  bg-white/50"
            />
          </div>
          <div className="flex flex-col">
            <select
              name="Dpt2"
              id="Dpt2"
              onChange={(e) => setDpt2(e.target.value)}
              className="w-[30rem] p-4 outline-none ring-2 text-lg ring-gray-500 focus:ring-4 focus:ring-green-900 rounded transition-all duration-500 ml-16 mt-6  bg-white/50"
            >
              <option
                className="w-[30rem] p-3 outline-none"
                value="Dpt"
                disabled
                selected
              >
                Complain To
              </option>
              <option className="w-[30rem] p-3 outline-none" value="CS">
                Computer Science
              </option>
              <option className="w-[30rem] p-3 outline-none" value="IT">
                Information Technology
              </option>
              <option className="w-[30rem] p-3 outline-none" value="EE">
                Electrical
              </option>
              <option className="w-[30rem] p-3 outline-none" value="EL">
                Electronics
              </option>
              <option className="w-[30rem] p-3 outline-none" value="CE">
                Civil
              </option>
              <option className="w-[30rem] p-3 outline-none" value="CLG">
                College
              </option>
            </select>
            <button
              type="submit"
              className="bg-green-900 w-[10rem] hover:bg-green-800 shadow-4xl  transition-all duration-300 text-white h-[3rem] ml-16 mt-5 cursor-pointer rounded text-3xl  flex items-center justify-center"
              onClick={handleclick}
            >
            {loading ? <img className="w-[3rem] h-[3rem]" src="/loader/loaderstudent.gif"/>  : "submit"}
            </button>
            <div className="text-xl mt-5 ml-16 text-red-700">
              Please Be Fast, Your Session Expire In 30minutes !!
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Complainform;
