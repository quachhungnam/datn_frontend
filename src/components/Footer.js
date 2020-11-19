import React from "react";
export default function Footer() {
  return (
    <footer className="page-footer font-small teal pt-4 navbar-color">
      <div className="container-fluid text-center text-md-left">
        <div className="row">
          <div className="col-md-3 mt-md-0 mt-3">
            <h5 className="text-uppercase font-weight-bold">About US</h5>
            <p>
              Hệ thống quản lý điểm học sinh bậc Trung học phổ thông theo thông
              tư 26/2020/TT-BGDĐT của bộ giáo dục và Đào tạo
            </p>
            <p>V/v sửa đổi quy chế đánh giá, xếp loại học sinh bậc THPT</p>
          </div>

          <hr className="clearfix w-100 d-md-none pb-3"></hr>
          <div className="col-md-3 mb-md-0 mb-3">
            <h5 className="text-uppercase font-weight-bold">Hợp tác</h5>
            <div>
              <a href="#" className="color-link">
                Trường đại học Bách Khoa
              </a>
            </div>
            <div>
              <a href="#" className="color-link">
                Trường đại học Kinh tế
              </a>
            </div>
            <div>
              <a href="#" className="color-link">
                Trường đại học Sư phạm
              </a>
            </div>
            <div>
              <a href="#" className="color-link">
                Trường đại học Ngoại ngữ
              </a>
            </div>
          </div>

          <div className="col-md-3 mb-md-0 mb-3">
            <h5 className="text-uppercase font-weight-bold">Chỉ dẫn</h5>
            <div>Địa chỉ: 54 Nguyễn Lương Bằng, TP Đà Nẵng</div>
            <div>SĐT: 0974 436 947</div>
            <div>Email: tranquangdieu@gmail.com</div>
          </div>

          <div className="col-md-3 mb-md-0 mb-3">
            <h5 className="text-uppercase font-weight-bold">Liên hệ</h5>
            <div>Địa chỉ: 54 Nguyễn Lương Bằng, TP Đà Nẵng</div>
            <div>Telephone: (+84) 0974 436 947</div>
            <div>Mobile: 0974 436 947</div>
            <div>Email: tranquangdieu@gmail.com</div>
          </div>
        </div>
      </div>

      <div className="footer-copyright text-center py-3">
        Copyright © 2020 Trường THPT Trần Quang Diệu
      </div>
    </footer>
  );
}
