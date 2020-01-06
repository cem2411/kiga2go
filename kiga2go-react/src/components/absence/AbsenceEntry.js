import React, { useState } from "react";
import moment from "moment";
import DatePicker from "./DatePicker";

const DATE_FORMAT = "DD.MM.YYYY";

export default function AbsenceEntry({
  absence,
  absences,
  onUpdate,
  onDelete
}) {
  const [isEditMode, setEditMode] = useState(false);
  const [start, setStart] = useState(moment(absence.dateStart));
  const [end, setEnd] = useState(moment(absence.dateEnd));

  const save = () => {
    absence.dateStart = start;
    absence.dateEnd = end;
    onUpdate(absence);
    setEditMode(false);
  };

  const onDatesChange = ({ startDate, endDate }) => {
    setStart(startDate);
    setEnd(endDate);
  };

  return isEditMode ? (
    <tr>
      <td>
        <DatePicker
          absences={absences}
          startDate={start}
          endDate={end}
          onDatesChange={onDatesChange}
          editAbsence={absence}
        />
      </td>
      <td>
        <button className="register__footer__button" onClick={save}>
          Speichern
        </button>
      </td>
    </tr>
  ) : (
    <tr key={absence}>
      <td>{start.format(DATE_FORMAT)}</td>
      <td>{end.format(DATE_FORMAT)}</td>
      <td>
        <button
          value={absence._id}
          className="btn btn-warning"
          onClick={() => setEditMode(true)}
        >
          Editieren
        </button>
        <button className="btn btn-danger" onClick={() => onDelete(absence)}>
          Löschen
        </button>
      </td>
    </tr>
  );
}
