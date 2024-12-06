import { getBookings } from "@/lib/db/bookingCrud";
import OverviewPageData from "./Overview";
import { BookingStatus, RoomStatus } from "@/lib/types/type";
import { getRooms } from "@/lib/db/roomCrud";
import { getExpenses, getExpensesByMonth } from "@/lib/db/expenseCrud";
import { getPayments, getPaymentsByMonth } from "@/lib/db/paymentCrud";
import { ChartData } from "@/components/Chart";

const OverviewPage = async () => {
  const earlyToday = new Date(new Date().setUTCHours(0, 0, 0, 0)).toString();
  const laterToday = new Date(
    new Date().setUTCHours(23, 59, 59, 999)
  ).toString();

  try {
    const [
      checkedInBookings,
      availableRooms,
      todayExpenses,
      todayPayments,
      expensesByMonth,
      paymentsByMonth,
    ] = await Promise.all([
      getBookings(BookingStatus.CHECKED_IN),
      getRooms(RoomStatus.AVAILABLE),
      getExpenses(earlyToday, laterToday),
      getPayments(earlyToday, laterToday),
      getExpensesByMonth(),
      getPaymentsByMonth(),
    ]);

    const todayExpenseTotalAmount = Math.ceil(
      todayExpenses.reduce(
        (total, expense) => total + parseFloat(expense.amount),
        0
      )
    );

    const todayPaymentTotalAmount = Math.ceil(
      todayPayments.reduce(
        (total, payment) => total + parseFloat(payment.amount),
        0
      )
    );

    const allMonths = new Set([
      ...paymentsByMonth.map((item) => item.month.trim()),
      ...expensesByMonth.map((item) => item.month.trim()),
    ]);

    const chartData: ChartData[] = Array.from(allMonths).map((month) => {
      const payment = paymentsByMonth.find(
        (item) => item.month.trim() === month
      );
      const expense = expensesByMonth.find(
        (item) => item.month.trim() === month
      );

      return {
        month: month,
        payments: payment ? parseFloat(payment.total) : 0,
        expenses: expense ? parseFloat(expense.total) : 0,
      };
    });

    return (
      <div>
        <OverviewPageData
          totalCheckins={checkedInBookings.length}
          totalAvailableRooms={availableRooms.length}
          todayExpenseTotalAmount={todayExpenseTotalAmount}
          todayPaymentTotalAmount={todayPaymentTotalAmount}
          chartData={chartData}
          checkins={checkedInBookings}
        />
      </div>
    );
  } catch (error) {
    console.error("Error fetching data:", error);
    return (
      <div>
        <h1>error</h1>
      </div>
    );
  }
};

export default OverviewPage;
