import { useState, useEffect } from "react";
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import { setCredentials } from "../slices/authSlice";
import { useUpdateUserMutation } from "../slices/usersApiSlice";
import Loader from "../components/Loader/Loader";

const ProfileScreen = () => {
  const { userInfo } = useSelector((state) => state.auth);

  const [formData, setFormData] = useState({
    name: userInfo?.name || "", // Initialize with user info if available
    email: userInfo?.email || "",
  });

  const { name, email } = formData;
  const [updateProfile, { isLoading }] = useUpdateUserMutation();

  const dispatch = useDispatch();

  useEffect(() => {
    if (userInfo) {
      setFormData(userInfo);
    }
  }, [userInfo]);

  const submitHandler = async (e) => {
    e.preventDefault();

    try {
      const res = await updateProfile({
        _id: userInfo._id,
        name,
        email,
      }).unwrap();
      dispatch(setCredentials({ ...res }));
      toast.success("Profile updated successfully");
    } catch (err) {
      toast.error(err?.data?.message || err.error);
    }
  };
  const onChange = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  return (
    <div
      style={{
        textAlign: "center",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
      }}
    >
      <div className="br3 ba b--black-10 mv4 w-100 w-50-m w-25-l mw6 shadow-5 center">
        <main className="pa4 black-80">
          <div className="measure">
            <div id="sign_up" className="ba b--transparent ph0 mh0">
              <h3 className="f1 fw6 ph0 mh0 white">Update Profile</h3>
              <div className="mt3">
                <label className="db fw6 lh-copy f6" htmlFor="name">
                  Name
                </label>
                <input
                  className="pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100"
                  type="text"
                  name="name"
                  id="name"
                  value={name}
                  onChange={onChange}
                />
              </div>
              <div className="mt3">
                <label className="db fw6 lh-copy f6" htmlFor="email-address">
                  Email
                </label>
                <input
                  disabled
                  className="pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100"
                  type="email"
                  name="email"
                  id="email-address"
                  value={email}
                  onChange={onChange}
                />
              </div>
            </div>

            {isLoading && <Loader />}

            <button
              type="submit"
              className="b ph3 pv2 input-reset ba b--black bg-transparent grow pointer f6 dib"
              onClick={submitHandler}
              style={{ marginTop: "1rem" }}
            >
              Update
            </button>
          </div>
        </main>
      </div>
    </div>
  );
};

export default ProfileScreen;
