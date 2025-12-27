import { Button, Result } from "antd";
import { useNavigate } from "react-router-dom";

function ErrorPage() {
  const navigate = useNavigate();
  return (
    <div
      style={{
        height: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Result
        status="403"
        title="403"
        subTitle="Bạn không có quyền truy cập vào trang này."
        extra={
          <Button type="primary" onClick={() => navigate("/admin/login")}>
            Quay về trang chủ
          </Button>
        }
      />
    </div>
  );
}

export default ErrorPage;
