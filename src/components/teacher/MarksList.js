import React from "react";
import {
  Table,
  Button,
  Dropdown,
  DropdownButton,
  Form,
} from "react-bootstrap";
import MarksItem from "./MarksItem";
import { sumMarks } from "../../utils/marksUtils";
import { standardDate } from "../../utils/standardDate";

export default function MarksList(props) {
  const initMarksState = {
    isAddDGTX1: false,
    isEditDGTX1: false,
    isDeleteDGTX1: false,
    isAddGK1: false,
    isAddCK1: false,
    isAddDGTX2: false,
    isEditDGTX2: false,
    isDeleteDGTX2: false,
    isAddGK2: false,
    isAddCK2: false,
  };

  // const handleShow = () => setShow(true);
  const [marksState, dispatch] = React.useReducer((prevState, action) => {
    switch (action.type) {
      case "ADD_DGTX1":
        return {
          ...initMarksState,
          isAddDGTX1: true,
        };
      case "EDIT_DGTX1":
        return {
          ...initMarksState,
          isEditDGTX1: true,
        };
      case "DELETE_DGTX1":
        return {
          ...initMarksState,
          isDeleteDGTX1: true,
        };
      case "ADD_GK1":
        return {
          ...initMarksState,
          isAddGK1: true,
        };

      case "ADD_CK1":
        return {
          ...initMarksState,
          isAddCK1: true,
        };
      case "ADD_DGTX2":
        return {
          ...initMarksState,
          isAddDGTX2: true,
        };
      case "EDIT_DGTX2":
        return {
          ...initMarksState,
          isEditDGTX2: true,
        };
      case "DELETE_DGTX2":
        return {
          ...initMarksState,
          isDeleteDGTX2: true,
        };
      case "ADD_GK2":
        return {
          ...initMarksState,
          isAddGK2: true,
        };
      case "ADD_CK2":
        return {
          ...initMarksState,
          isAddCK2: true,
        };
      case "default":
        return {
          ...initMarksState,
        };
      default:
        return {
          ...initMarksState,
        };
    }
  }, initMarksState);
  const showListMarks = () => {
    return props.listMarks;
  };

  const AddMarksReg1 = () => {
    dispatch({ type: "ADD_DGTX1" });
    props.onAddMarksReg();
  };

  const onAddMarksGK1 = () => {
    dispatch({ type: "ADD_GK1" });
  };
  const onAddMarksCK1 = () => {
    dispatch({ type: "ADD_CK1" });
  };
  const onAddMarksReg2 = () => {
    dispatch({ type: "ADD_DGTX2" });
    // THEM TAT CA DIEM DGTX LAN 1 VAO DB
    props.onAddMarksReg2();
  };
  const onAddMarksGK2 = () => {
    dispatch({ type: "ADD_GK2" });
  };
  const onAddMarksCK2 = () => {
    dispatch({ type: "ADD_CK2" });
  };

  const showDropDGTX1 = () => {
    return props.limitDateInput(1) === true ? (
      <Form.Row>
        <DropdownButton
          id="dropdown-basic-button"
          variant="success"
          size="sm"
          title="..."
        >
          <Dropdown.Item
            onClick={() => {
              AddMarksReg1();
            }}
          >
            Thêm điểm ĐGTX{" "}
          </Dropdown.Item>
          <Dropdown.Item
            onClick={() => {
              dispatch({ type: "EDIT_DGTX1" });
            }}
          >
            Sửa điểm ĐGTX
          </Dropdown.Item>
          <Dropdown.Item
            onClick={() => {
              dispatch({ type: "DELETE_DGTX1" });
            }}
          >
            Xóa điểm ĐGTX
          </Dropdown.Item>
        </DropdownButton>{" "}
        {marksState.isAddDGTX1 ? (
          <>
            &nbsp;
            <Button
              variant="success"
              size="sm"
              onClick={() => {
                props.addNewMarksReg();
              }}
            >
              Lưu
            </Button>
            <Button
              variant="danger"
              size="sm"
              onClick={() => {
                dispatch({ type: "EDIT_DGTX1" });
              }}
            >
              Hủy
            </Button>
          </>
        ) : (
          ""
        )}
      </Form.Row>
    ) : (
      ""
    );
  };
  const showDropGK1 = () => {
    return props.limitDateInput(1) === true ? (
      <Form.Row>
        <DropdownButton
          id="dropdown-basic-button"
          variant="success"
          size="sm"
          title="..."
        >
          <Dropdown.Item
            onClick={() => {
              onAddMarksGK1();
            }}
          >
            Nhập điểm giữa kỳ 1
          </Dropdown.Item>
        </DropdownButton>
        {marksState.isAddGK1 ? (
          <>
            <Button
              variant="success"
              size="sm"
              onClick={() => {
                props.onUpdateMarksGK1();
              }}
            >
              Lưu
            </Button>
            <Button
              variant="danger"
              size="sm"
              onClick={() => {
                dispatch({ type: "EDIT_DGTX1" });
              }}
            >
              Hủy
            </Button>
          </>
        ) : (
          ""
        )}
      </Form.Row>
    ) : (
      ""
    );
  };

  const showDropCK1 = () => {
    return props.limitDateInput(1) === true ? (
      <Form.Row>
        <DropdownButton
          id="dropdown-basic-button"
          variant="success"
          size="sm"
          title="..."
        >
          <Dropdown.Item
            onClick={() => {
              onAddMarksCK1();
            }}
          >
            Nhập điểm cuối kỳ 1
          </Dropdown.Item>
        </DropdownButton>
        {marksState.isAddCK1 ? (
          <>
            <Button
              variant="success"
              size="sm"
              onClick={() => {
                props.onUpdateMarksCK1();
              }}
            >
              Lưu
            </Button>
            <Button
              variant="danger"
              size="sm"
              onClick={() => {
                dispatch({ type: "EDIT_DGTX1" });
              }}
            >
              Hủy
            </Button>
          </>
        ) : (
          ""
        )}
      </Form.Row>
    ) : (
      ""
    );
  };

  const showDropDGTX2 = () => {
    return props.limitDateInput(2) === true ? (
      <Form.Row>
        {" "}
        <DropdownButton
          id="dropdown-basic-button"
          variant="success"
          size="sm"
          title="..."
        >
          <Dropdown.Item
            onClick={() => {
              onAddMarksReg2();
            }}
          >
            Thêm điểm ĐGTX{" "}
          </Dropdown.Item>
          <Dropdown.Item>Sửa điểm ĐGTX </Dropdown.Item>
          <Dropdown.Item
            onClick={() => {
              dispatch({ type: "DELETE_DGTX2" });
            }}
          >
            Xóa điểm ĐGTX{" "}
          </Dropdown.Item>
        </DropdownButton>{" "}
        {marksState.isAddDGTX2 ? (
          <>
            <Button
              variant="success"
              size="sm"
              onClick={() => {
                props.addNewMarksReg2();
              }}
            >
              Lưu
            </Button>
            <Button
              variant="danger"
              size="sm"
              onClick={() => {
                dispatch({ type: "EDIT_DGTX1" });
              }}
            >
              Hủy
            </Button>
          </>
        ) : (
          ""
        )}
      </Form.Row>
    ) : (
      ""
    );
  };
  const showDropGK2 = () => {
    return props.limitDateInput(2) === true ? (
      <Form.Row>
        <DropdownButton
          id="dropdown-basic-button"
          variant="success"
          size="sm"
          title="..."
        >
          <Dropdown.Item
            onClick={() => {
              onAddMarksGK2();
            }}
          >
            Nhập điểm giữa kỳ 2
          </Dropdown.Item>
        </DropdownButton>
        {marksState.isAddGK2 ? (
          <>
            <Button
              variant="success"
              size="sm"
              onClick={() => {
                props.onUpdateMarksGK2();
              }}
            >
              Lưu
            </Button>
            <Button
              variant="danger"
              size="sm"
              onClick={() => {
                dispatch({ type: "EDIT_DGTX1" });
              }}
            >
              Hủy
            </Button>
          </>
        ) : (
          ""
        )}
      </Form.Row>
    ) : (
      ""
    );
  };
  const showDropCK2 = () => {
    return props.limitDateInput(2) ? (
      <Form.Row>
        <DropdownButton
          id="dropdown-basic-button"
          variant="success"
          size="sm"
          title="..."
        >
          <Dropdown.Item
            onClick={() => {
              onAddMarksCK2();
            }}
          >
            Nhập điểm cuối kỳ 2
          </Dropdown.Item>
        </DropdownButton>
        {marksState.isAddCK2 ? (
          <>
            <Button
              variant="success"
              size="sm"
              onClick={() => {
                props.onUpdateMarksCK2();
              }}
            >
              Lưu
            </Button>
            <Button
              variant="danger"
              size="sm"
              onClick={() => {
                dispatch({ type: "EDIT_DGTX1" });
              }}
            >
              Hủy
            </Button>
          </>
        ) : (
          ""
        )}
      </Form.Row>
    ) : (
      ""
    );
  };

  //showXep list mark
  const xep = (columnName) => {
    props.xep(columnName);
  };

  const eleMarks = showListMarks().map((item, idx) => {
    const listMarksReg1 = item.marksregulary.filter(
      (item) => item.semester === 1
    );
    const listMarksReg2 = item.marksregulary.filter(
      (item) => item.semester === 2
    );
    const [sum1, sum2, sum3] = sumMarks(item);

    return (
      <MarksItem
        key={idx}
        stt={idx + 1}
        idx={item.id}
        student={item.student.user}
        listMarksReg1={listMarksReg1}
        mid_st_semester_point={item.mid_st_semester_point}
        end_st_semester_point={item.end_st_semester_point}
        gpa_st_semester_point={sum1}
        listMarksReg2={listMarksReg2}
        mid_nd_semester_point={item.mid_nd_semester_point}
        end_nd_semester_point={item.end_nd_semester_point}
        gpa_nd_semester_point={sum2}
        gpa_year_point={sum3}
        is_public={item.is_public}
        is_locked={item.is_locked}
        updateFieldChanged={props.updateFieldChanged}
        onChangeMarksReg={props.onChangeMarksReg}
        marksState={marksState}
        limitDateInput={props.limitDateInput}
        delMarksReg={props.delMarksReg}
        updateMarksRegState={props.updateMarksRegState}
        updateMarksRegState2={props.updateMarksRegState2}
        // updateFieldChanged={updateFieldChanged}
        // updateMarksRegState={updateMarksRegState}d
        // updateMarksRegState2={updateMarksRegState2}
        // delMarksReg={delMarksReg}
        updateReg={props.updateReg}
        // setMessage={setMessage}
      />
    );
  });
  //   React.useEffect(() => {
  //     showListMarks();
  //   }, [props.listMarks]);
  return (
    <Table striped bordered hover size="sm">
      <thead>
        <tr>
          <th rowSpan="3">STT</th>
          <th rowSpan="3">
            <span
              className="sort-desc"
              onClick={() => {
                xep("username");
              }}
            >
              Mã HS
            </span>
          </th>
          <th rowSpan="3">
            <span
              className="sort-desc"
              onClick={() => {
                xep("name");
              }}
            >
              Họ Tên
            </span>
          </th>
          <th colSpan={4}>
            Học kỳ 1 (Hạn nhập điểm: {standardDate(props.limitInput1)})
          </th>
          <th colSpan={4}>
            Học kỳ 2 (Hạn nhập điểm: {standardDate(props.limitInput2)})
          </th>
          <th rowSpan="3">Cả năm</th>
        </tr>

        <tr>
          <th colSpan={1}>Điểm ĐGTX </th>
          <th>
            <span
              className="sort-desc"
              onClick={() => {
                xep("gk1");
              }}
            >
              Giữa kỳ
            </span>
          </th>
          <th>
            <span
              className="sort-desc"
              onClick={() => {
                xep("ck1");
              }}
            >
              Cuối kỳ
            </span>
          </th>
          <th>TB Kỳ </th>
          <th colSpan={1}>Điểm ĐGTX</th>
          <th>
            <span
              className="sort-desc"
              onClick={() => {
                xep("gk2");
              }}
            >
              Giữa kỳ
            </span>
          </th>
          <th>
            <span
              className="sort-desc"
              onClick={() => {
                xep("ck2");
              }}
            >
              Cuối kỳ
            </span>
          </th>
          <th>TB Kỳ</th>
        </tr>
        <tr>
          <th colSpan={1}>{showDropDGTX1()}</th>
          <th>{showDropGK1()}</th>
          <th>{showDropCK1()}</th>
          <th>TB Kỳ</th>
          <th colSpan={1}>{showDropDGTX2()}</th>
          <th>{showDropGK2()}</th>
          <th>{showDropCK2()}</th>
          <th>TB Kỳ</th>
        </tr>
      </thead>
      <tbody>{eleMarks}</tbody>
    </Table>
  );
}
