import adminService from "@/src/services/admin/adminService";
import paymentService from "@/src/services/payment/paymentService";
import postService from "@/src/services/posts/postService";
import { Spinner } from "@nextui-org/spinner";
import {
  Bar,
  BarChart,
  CartesianGrid,
  Legend,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

const AdminDashboard = () => {
  const {
    data: PaymentData,
    isPending: PaymentDataPending,
    isLoading: PaymentLoading,
  } = paymentService.allPayment();

  const {
    data: userData,
    isPending: userDataPending,
    isLoading: userLoading,
  } = adminService.getAllUser();

  const {
    data: getAllAdmin,
    isPending: getAllAdminPending,
    isLoading: getAllAdminLoading,
  } = postService.getAllAdmin();

  if (
    PaymentLoading ||
    PaymentDataPending ||
    userDataPending ||
    userLoading ||
    getAllAdminPending ||
    getAllAdminLoading
  )
    return (
      <div className="flex justify-center items-center w-full min-h-screen inset-0">
        <Spinner />
      </div>
    );

  return (
    <div>
      <div className="grid grid-cols-2 gap-4">
        <div>
          <h4 className="text-xl font-bold text-sky-400 text-center">
            User Payment
          </h4>
          <ChartComponent data={PaymentData?.data} />
        </div>
        <div>
          <h4 className="text-xl font-bold text-sky-400 text-center">
            All User
          </h4>
          <ChartComponent data={userData?.data} />
        </div>
      </div>
      <div>
        <h4 className="text-xl font-bold text-sky-400 text-center">All Post</h4>
        <ChartComponent data={getAllAdmin?.data} />
      </div>
    </div>
  );
};

type TChartComponent<T> = {
  data: T[];
};

const ChartComponent = <T,>({ data }: TChartComponent<T>) => {
  const mapData = data?.map((_item, index: number) => {
    return {
      value: index + 1,
    };
  });
  const ChartData = [{ value: 0 }, ...mapData];
  const minValue = Math.min(...ChartData.map((d) => d.value));
  const maxValue = Math.max(...ChartData.map((d) => d.value));

  const ticks = Array.from(
    { length: maxValue - minValue + 1 },
    (_, i) => minValue + i
  );
  return (
    <ResponsiveContainer width="100%" height={300}>
      <LineChart data={ChartData}>
        <Line type="monotone" dataKey="value" stroke="#38bdf8" />
        <CartesianGrid stroke="#ccc" />
        <YAxis domain={[minValue, maxValue]} ticks={ticks} />
      </LineChart>
    </ResponsiveContainer>
  );
};

export default AdminDashboard;
