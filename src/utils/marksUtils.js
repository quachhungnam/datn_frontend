const sumMarks = (dataMarks) => {
    const listReg = dataMarks.marksregulary;
    const listReg1 = listReg.filter((itemReg) => itemReg.semester === 1);
    const listReg2 = listReg.filter((itemReg) => itemReg.semester === 2);
    let sumReg1 = 0;
    let sumReg2 = 0;
    for (let reg1 of listReg1) {
        sumReg1 = sumReg1 + parseFloat(reg1.point);
    }
    for (let reg2 of listReg2) {
        sumReg2 = sumReg2 + parseFloat(reg2.point);
    }
    const GK1 = parseFloat(dataMarks.mid_st_semester_point);
    const CK1 = parseFloat(dataMarks.end_st_semester_point);
    const GK2 = parseFloat(dataMarks.mid_nd_semester_point);
    const CK2 = parseFloat(dataMarks.end_nd_semester_point);

    const TB_HK1 = (sumReg1 + GK1 * 2 + CK1 * 3) / (5 + listReg1.length);
    const TB_HK2 = (sumReg2 + GK2 * 2 + CK2 * 3) / (5 + listReg2.length);

    const TB_HK_1 = TB_HK1.toFixed(1);
    const TB_HK_2 = TB_HK2.toFixed(1);

    const TB_NAM = (
        (parseFloat(TB_HK_1) + parseFloat(TB_HK_2) * 2) /
        3
    ).toFixed(1);

    return [isNaN(TB_HK_1) ? "-" : TB_HK_1, isNaN(TB_HK_2) ? "-" : TB_HK_2, isNaN(TB_NAM) ? "-" : TB_NAM];
};


const standardExport = (data, semester) => {
    // let dataStandard = [];
    const dataStandard = data.map((item, index) => {
        const [sum1, sum2, sum3] = sumMarks(item);
        let DGTX1 = "=";
        let DGTX2 = "=";

        const markRegular1 = item.marksregulary.filter(
            (item) => item.semester === 1
        );
        for (let i = 0; i < markRegular1.length; i++) {
            DGTX1 = DGTX1 + "+" + markRegular1[i].point;
        }

        const markRegular2 = item.marksregulary.filter(
            (item) => item.semester === 2
        );
        for (let i = 0; i < markRegular2.length; i++) {
            DGTX2 = DGTX2 + "+" + markRegular2[i].point;
        }
        let newItem = {
            STT: index + 1,
            MaHocSinh: item.student.user.username,
            HoTen: item.student.user.last_name + " " + item.student.user.first_name,
            Mon: item.lecture.subject.subject_name,
            DGTX_HK1: DGTX1,
            GK1: item.mid_st_semester_point,
            CK1: item.end_st_semester_point,
            TB_HK1: sum1,
            DGTX_HK2: DGTX2,
            GK2: item.mid_nd_semester_point,
            CK2: item.end_nd_semester_point,
            TB_HK2: sum2,
            TB_Nam: sum3,
        };
        if (semester === 1) {
            delete newItem.DGTX_HK2;
            delete newItem.GK2;
            delete newItem.CK2;
            delete newItem.TB_HK2;
            delete newItem.TB_Nam;
        }
        if (semester === 2) {
            delete newItem.DGTX_HK1;
            delete newItem.GK1;
            delete newItem.CK1;
            delete newItem.TB_HK1;
            delete newItem.TB_Nam;
        }
        return newItem;
        // dataStandard.push(newItem);
    });
    return dataStandard;
};

const standardExportLecture = (data, semester, lecture) => {
    // let dataStandard = [];
    const dataStandard = data.map((item, index) => {
        const [sum1, sum2, sum3] = sumMarks(item);
        let DGTX1 = "=";
        let DGTX2 = "=";

        const markRegular1 = item.marksregulary.filter(
            (item) => item.semester === 1
        );
        for (let i = 0; i < markRegular1.length; i++) {
            DGTX1 = DGTX1 + "+" + markRegular1[i].point;
        }

        const markRegular2 = item.marksregulary.filter(
            (item) => item.semester === 2
        );
        for (let i = 0; i < markRegular2.length; i++) {
            DGTX2 = DGTX2 + "+" + markRegular2[i].point;
        }
        let newItem = {
            STT: index + 1,
            MaHocSinh: item.student.user.username,
            HoTen: item.student.user.last_name + " " + item.student.user.first_name,
            Mon: lecture.subject.subject_name,
            DGTX_HK1: DGTX1,
            GK1: item.mid_st_semester_point,
            CK1: item.end_st_semester_point,
            TB_HK1: sum1,
            DGTX_HK2: DGTX2,
            GK2: item.mid_nd_semester_point,
            CK2: item.end_nd_semester_point,
            TB_HK2: sum2,
            TB_Nam: sum3,
        };
        if (semester === 1) {
            delete newItem.DGTX_HK2;
            delete newItem.GK2;
            delete newItem.CK2;
            delete newItem.TB_HK2;
            delete newItem.TB_Nam;
        }
        if (semester === 2) {
            delete newItem.DGTX_HK1;
            delete newItem.GK1;
            delete newItem.CK1;
            delete newItem.TB_HK1;
            delete newItem.TB_Nam;
        }
        return newItem;
        // dataStandard.push(newItem);
    });
    return dataStandard;
};

export { sumMarks, standardExport, standardExportLecture }


// const standardExport = (data, semester) => {
  //   // let dataStandard = [];
  //   const dataStandard = data.map((item, index) => {
  //     const [sum1, sum2, sum3] = sumMarks(item);
  //     let DGTX1 = "=";
  //     let DGTX2 = "=";

  //     const markRegular1 = item.marksregulary.filter(
  //       (item) => item.semester === 1
  //     );
  //     for (let i = 0; i < markRegular1.length; i++) {
  //       DGTX1 = DGTX1 + "+" + markRegular1[i].point;
  //     }

  //     const markRegular2 = item.marksregulary.filter(
  //       (item) => item.semester === 2
  //     );
  //     for (let i = 0; i < markRegular2.length; i++) {
  //       DGTX2 = DGTX2 + "+" + markRegular2[i].point;
  //     }
  //     let newItem = {
  //       STT: index + 1,
  //       TaiKhoan: item.student.user.username,
  //       Ho: item.student.user.last_name,
  //       Ten: item.student.user.first_name,
  //       Mon: lecture.subject.subject_name,
  //       DGTX_HK1: DGTX1,
  //       GK1: item.mid_st_semester_point,
  //       CK1: item.end_st_semester_point,
  //       TB_HK1: sum1,
  //       DGTX_HK2: DGTX2,
  //       GK2: item.mid_nd_semester_point,
  //       CK2: item.end_nd_semester_point,
  //       TB_HK2: sum2,
  //       TB_Nam: sum3,
  //     };
  //     if (semester === 1) {
  //       delete newItem.DGTX_HK2;
  //       delete newItem.GK2;
  //       delete newItem.CK2;
  //       delete newItem.TB_HK2;
  //       delete newItem.TB_Nam;
  //     }
  //     if (semester === 2) {
  //       delete newItem.DGTX_HK1;
  //       delete newItem.GK1;
  //       delete newItem.CK1;
  //       delete newItem.TB_HK1;
  //       delete newItem.TB_Nam;
  //     }
  //     return newItem;
  //     // dataStandard.push(newItem);
  //   });
  //   return dataStandard;
  // };