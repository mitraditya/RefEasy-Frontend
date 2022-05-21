import React from "react";
import { Navigate, useParams } from "react-router";

export default function Refer() {
  // const navigate = useNavigate();
  const params = useParams();

  return (
    <Navigate
      to={`/job/${params.id}`}
      state={{ refEmp: params.refEmp }}
      replace
    />
  );
}
