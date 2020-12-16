import React, { useState } from "react";
import { Form, Button, Badge } from "react-bootstrap";
import {
  validateListMarksReg,
} from "../../utils/validateMarksReg";
export default function MarksItem(props) {
  const [isEdit, setIsEdit] = useState(false);
  const [isEdit2, setIsEdit2] = useState(false);
  const listMarksReg1 = props.listMarksReg1.filter(
    (item) => item.semester === 1
  );
  const listMarksReg2 = props.listMarksReg2.filter(
    (item) => item.semester === 2
  );

  const setEditMarksReg = (semester) => {
    if (semester === 1) {
      setIsEdit(true);
    }
    if (semester === 2) {
      setIsEdit2(true);
    }
  };
  const cancelUpdate = (semester) => {
    if (semester === 1) {
      setIsEdit(false);
    }
    if (semester === 2) {
      setIsEdit2(false);
    }
  };

  //XOA DIEM DANH GIA THUONG XUYEN 1
  const onDelMarksReg = async (markReg, semester) => {
    // if (semester === 1) {
    //   const newList = listMarksReg1.filter((item) => item.id !== markReg.id);
    //   // setListMarksReg1(newList);
    // }
    // if (semester === 2) {
    //   const newList = listMarksReg2.filter((item) => item.id !== markReg.id);
    //   // setListMarksReg2(newList);
    // }
    props.delMarksReg(markReg.id);
    // const rs = await deleteMarksReg(markReg.id);
  };

  const onUpdateMarksReg = async () => {
    try {
      const valid = validateListMarksReg(listMarksReg1);
      if (valid === false) {
        props.setMessage("Nhập điểm không hợp lệ!");
        return;
      }

      const standardList = listMarksReg1.map((item) => {
        if (item.is_public === "Fasle") {
          item.is_public = 0;
        } else {
          item.is_public = 1;
        }
        return item;
      });
      // const rs = await updateManyMarksReg(standartList);

      await props.updateReg(standardList);
    } catch (ex) {
    } finally {
      setIsEdit(false);
    }
  };
  const onChangeNewMarksReg = (event) => {
    const { value } = event.target;
    let obj = {
      marks_ref: props.idx,
      point: value,
    };
    props.updateMarksRegState(obj);
  };

  const onChangeNewMarksReg2 = (event) => {
    const { value } = event.target;
    let obj = {
      marks_ref: props.idx,
      point: value,
    };
    props.updateMarksRegState2(obj);
  };

  const showInputMarksReg = () => {
    if (props.marksState.isAddDGTX1) {
      return (
        <Form.Control
          type="number"
          step="0.1"
          min="0"
          max="10"
          style={{ width: 60 }}
          size="sm"
          placeholder="DGTX"
          defaultValue={""}
          disabled={false}
          onChange={onChangeNewMarksReg}
        />
      );
    }
    return "";
  };
  const showInputMarksReg2 = () => {
    if (props.marksState.isAddDGTX2) {
      return (
        <Form.Control
          type="number"
          step="0.1"
          min="0"
          max="10"
          style={{ width: 60 }}
          size="sm"
          // type="text"
          placeholder="DGTX"
          disabled={false}
          onChange={onChangeNewMarksReg2}
        />
      );
    }
    return "";
  };

  const onUpdateMarksReg2 = async () => {
    try {
      const standartList = listMarksReg2.map((item) => {
        if (item.is_public === "Fasle") {
          item.is_public = 0;
        } else {
          item.is_public = 1;
        }
        return item;
      });
      // const rs = await updateManyMarksReg(standartList);
      props.updateReg(standartList);
    } catch (ex) {
    } finally {
      setIsEdit2(false);
    }
  };
  //lay gia tri diem gk,ck
  const handleInput = (event) => {
    const { name, value } = event.target;
    let obj = { id: props.idx };
    obj[`${name}`] = value;
    props.updateFieldChanged(obj);
  };

  ///lay gia tri sua diem danh gia thuong xuyen
  const handleInputMarksReg1 = (data, event) => {
    //lay dong nao, lay id nao
    const { value } = event.target;
    // const marks_ref = { id: props.idx };
    let obj = { marks_ref: props.idx, id: data.id, point: value };
    // let newList = listMarksReg1.map((item) => {
    //   if (item.id === data.id) {
    //     return { ...item, point: value };
    //   } else {
    //     return item;
    //   }
    // });
    // setListMarksReg1(newList);
    props.onChangeMarksReg(obj);
  };

  const showListMarksReg1 = () => {
    const list = listMarksReg1.map((item, idx) => {
      return (
        <div
          onDoubleClick={() => {
            if (props.limitDateInput(1) === true) {
              setEditMarksReg(1);
            }
          }}
        >
          <Form.Control
            type="number"
            style={{ width: 60 }}
            size="sm"
            placeholder="DGTX"
            value={item.point != null ? item.point : ""}
            disabled={!isEdit}
            onChange={(e) => handleInputMarksReg1(item, e)}
          />
          {props.marksState.isDeleteDGTX1 === true ? (
            <>
              <Badge
                pill
                variant="danger"
                onClick={() => onDelMarksReg(item, 1)}
              >
                X
              </Badge>
            </>
          ) : (
            ""
          )}
        </div>
      );
    });

    return list;
  };

  const showListMarksReg2 = () => {
    const list = listMarksReg2.map((item, idx) => {
      return (
        <div
          onDoubleClick={() => {
            if (props.limitDateInput(2) === true) {
              setEditMarksReg(2);
            }
          }}
        >
          <Form.Control
            type="number"
            style={{ width: 60 }}
            size="sm"
            placeholder="DGTX"
            value={item.point != null ? item.point : ""}
            disabled={!isEdit2}
            onChange={(e) => handleInputMarksReg1(item, e)}
          />
          {props.marksState.isDeleteDGTX2 === true ? (
            <>
              <Badge
                pill
                variant="danger"
                onClick={() => onDelMarksReg(item, 1)}
              >
                X
              </Badge>
            </>
          ) : (
            ""
          )}
        </div>
      );
    });

    return list;
  };

  return (
    <tr>
      <td>{props.stt}</td>
      <td>{props.student.username}</td>
      <td>{props.student.last_name + " " + props.student.first_name}</td>
      <td>
        <Form.Row>
          {showListMarksReg1()}
          {isEdit ? (
            <>
              {" "}
              <Button
                variant="success"
                size="sm"
                onClick={() => {
                  onUpdateMarksReg();
                }}
              >
                Lưu
              </Button>{" "}
              <Button
                variant="danger"
                size="sm"
                onClick={() => {
                  cancelUpdate(1);
                }}
              >
                Hủy
              </Button>
            </>
          ) : (
            ""
          )}{" "}
          {showInputMarksReg()}
        </Form.Row>
      </td>
      <td>
        <Form.Control
          type="number"
          name="mid_st_semester_point"
          style={{ width: 65 }}
          size="sm"
          placeholder="GK 1"
          value={props.mid_st_semester_point}
          disabled={!props.marksState.isAddGK1}
          onChange={handleInput}
        />
      </td>
      <td>
        <Form.Control
          type="number"
          step="0.1"
          min="0"
          max="10"
          name="end_st_semester_point"
          style={{ width: 65 }}
          size="sm"
          placeholder="CK 1"
          value={props.end_st_semester_point}
          onChange={handleInput}
          disabled={!props.marksState.isAddCK1}
        />
      </td>
      <td>{props.gpa_st_semester_point}</td>
      <td>
        <Form.Row>
          {showListMarksReg2()}
          {isEdit2 ? (
            <>
              {" "}
              <Button
                variant="success"
                size="sm"
                onClick={() => {
                  onUpdateMarksReg2();
                }}
              >
                Lưu
              </Button>{" "}
              <Button
                variant="danger"
                size="sm"
                onClick={() => {
                  cancelUpdate(2);
                }}
              >
                Hủy
              </Button>
            </>
          ) : (
            ""
          )}{" "}
          {showInputMarksReg2()}
        </Form.Row>
      </td>
      <td>
        <Form.Control
          type="number"
          step="0.1"
          min="0"
          max="10"
          name="mid_nd_semester_point"
          style={{ width: 65 }}
          mb-2
          size="sm"
          placeholder="GK 2"
          value={
            props.mid_nd_semester_point != null
              ? props.mid_nd_semester_point
              : ""
          }
          onChange={handleInput}
          disabled={!props.marksState.isAddGK2}
        />
      </td>
      <td>
        <Form.Control
          type="number"
          step="0.1"
          min="0"
          max="10"
          name="end_nd_semester_point"
          style={{ width: 65 }}
          size="sm"
          // type="text"
          placeholder="CK 2"
          value={
            props.end_nd_semester_point != null
              ? props.end_nd_semester_point
              : ""
          }
          onChange={handleInput}
          disabled={!props.marksState.isAddCK2}
        />
      </td>
      <td>{props.gpa_nd_semester_point}</td>
      <td>{props.gpa_year_point}</td>
    </tr>
  );
}
