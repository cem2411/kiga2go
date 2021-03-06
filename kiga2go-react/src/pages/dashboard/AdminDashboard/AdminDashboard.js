import React, { useState, useEffect } from "react";
import moment from "moment";
import { Spinner } from "react-bootstrap";
import axios from "../../../services/GlobalAxiosSettings";
import "./style.scss";

const AdminDashboard = ({ user, absences }) => {
  const DATE_FORMAT = "DD.MM.YYYY";
  const [isLoading, setIsLoading] = useState(true);

  const [ongoingAbsences, setOngoingAbsences] = useState([]);

  useEffect(() => {
    const fetchAbsences = async () => {
      const result = await axios.get("/absence");
      setOngoingAbsences(
        result.data.filter(
          absence => moment(absence.dateStart).diff(moment(), "days") === 0
        )
      );
      setIsLoading(false);
    };
    fetchAbsences();
  }, []);

  return (
    <div className="adminDashboard">
      <h1>
        <span>Willkommen {user.secondNameKid} !</span>
      </h1>
      <h2 style={{ textAlign: "left" }}>
        <span>Heutige Krankmeldungen:</span>
      </h2>

      {!isLoading ? (
        ongoingAbsences ? (
          ongoingAbsences.length > 0 ? (
            <table className="table table-bordered table-hover">
              <thead>
                <tr>
                  <th>Vorname</th>
                  <th>Nachname</th>
                  <th>Gruppe</th>
                  <th>Von</th>
                  <th>Bis</th>
                </tr>
              </thead>
              <tbody>
                {ongoingAbsences.map(absence => {
                  return (
                    <tr key={absence._id}>
                      <td>{absence.child[0].firstNameKid}</td>
                      <td>{absence.child[0].secondNameKid}</td>
                      <td>{absence.child[0].group}</td>
                      <td>{moment(absence.dateStart).format(DATE_FORMAT)}</td>
                      <td>{moment(absence.dateEnd).format(DATE_FORMAT)}</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          ) : (
            <h2>
              <span style={{ fontSize: "2rem" }}>
                Hurrah! Heute gibt es keine neuen Krankmeldungen.
              </span>
            </h2>
          )
        ) : (
          <Spinner animation="grow" variant="primary" />
        )
      ) : (
        <Spinner animation="grow" variant="primary" />
      )}
    </div>
  );
};
export default AdminDashboard;
