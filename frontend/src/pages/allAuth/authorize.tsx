import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useAppDispatch } from "../../state/hooks";
import { updateUserStatus } from "../../state/reducers/authSlice";

const Authorize = () => {
  const dispatch = useAppDispatch();
  const { id, email } = useParams();
  const [sendOne, setSendOne] = useState(false);

  useEffect(() => {
    !sendOne &&
      dispatch(
        updateUserStatus({ _id: id, status: "authorized", email: email })
      );
    setTimeout(() => {
      window.close();
    }, 2000);
    return setSendOne(true);
  }, []);

  return (
    <div>
      Update was successfully made, this page will be closed automativally
    </div>
  );
};

export default Authorize;
