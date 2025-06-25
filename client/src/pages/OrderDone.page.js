import { DONE_TITLE } from "../constants";
import { Link } from "react-router-dom";

const OrderDone = () => {
  return (
    <div className="full-page">
      <div
        className="form-add-item card text-center"
        style={{ width: "70%", margin: "auto", marginTop: "5%" }}
      >
        <h2 className="text-center p-b m-1  login-welcome">{DONE_TITLE}</h2>
        <Link to={`/`} >
        <a style={{color:'black'}}>{"בצע הזמנה חדשה"}</a>
      </Link>
      </div>
  
    </div>
  );
};

export default OrderDone;
