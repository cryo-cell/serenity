const PricingTable = () => {
  const monthlyRevenue = 5000;
  const plans = [
    {
      name: "Pickup Site",
      monthly: 100,
      features: "Online ordering with pickup option",
      firstMonthTotal: 500,
      uberDashFeePercent: 0.12,
    },
    {
      name: "Delivery/S&H",
      monthly: 150,
      features: "Full ordering + delivery/shipping features",
      firstMonthTotal: 550,
      uberDashFeePercent: 0.25,
    },
    {
      name: "Everything",
      monthly: 200,
      features: "Pickup, delivery, display, CMS tools",
      firstMonthTotal: 600,
      uberDashFeePercent: 0.25,
    },
  ];

  // Helper to format currency
  const formatCurrency = (value) =>
    value.toLocaleString("en-US", { style: "currency", currency: "USD" });

  return (
    <div className="overflow-x-auto p-4 bg-white rounded shadow-md  mx-auto">
      <table className="w-full border-collapse border border-gray-300 text-left">
        <thead className="bg-gray-100">
          <tr>
            <th className="border border-gray-300 px-4 py-2">Monthly Revenue</th>
            <th className="border border-gray-300 px-4 py-2">Plan Name</th>
            <th className="border border-gray-300 px-4 py-2">Monthly Fee</th>
            <th className="border border-gray-300 px-4 py-2">Features Included</th>
            <th className="border border-gray-300 px-4 py-2">Uber/DoorDash Fees</th>
            <th className="border border-gray-300 px-4 py-2">Your Fees</th>
            <th className="border border-gray-300 px-4 py-2">Monthly Savings</th>
            <th className="border border-gray-300 px-4 py-2">Total First Month</th>
          </tr>
        </thead>
        <tbody>
          {plans.map(
            ({
              name,
              monthly,
              features,
              firstMonthTotal,
              uberDashFeePercent,
            }) => {
              const uberDoorDashFees = monthlyRevenue * uberDashFeePercent;
              const monthlySavings = uberDoorDashFees - monthly;

              return (
                <tr key={name} className="hover:bg-gray-50">
                  <td className="border border-gray-300 px-4 py-2 font-semibold">
                    {formatCurrency(monthlyRevenue)}
                  </td>
                  <td className="border border-gray-300 px-4 py-2 font-semibold">
                    {name}
                  </td>
                  <td className="border border-gray-300 px-4 py-2">
                    {formatCurrency(monthly)}
                  </td>
                  <td className="border border-gray-300 px-4 py-2">{features}</td>
                  <td className="border border-gray-300 px-4 py-2">
                    {`${formatCurrency(uberDoorDashFees)} (${(
                      uberDashFeePercent * 100
                    ).toFixed(0)}%)`}
                  </td>
                  <td className="border border-gray-300 px-4 py-2">
                    {formatCurrency(monthly)}
                  </td>
                  <td
                    className={`border border-gray-300 px-4 py-2 font-semibold ${
                      monthlySavings > 0 ? "text-green-600" : "text-gray-400"
                    }`}
                  >
                    {monthlySavings > 0 ? formatCurrency(monthlySavings) : "-"}
                  </td>
                  <td className="border border-gray-300 px-4 py-2 font-semibold">
                    {`${formatCurrency(firstMonthTotal)} (setup + 1 mo)`}
                  </td>
                </tr>
              );
            }
          )}
        </tbody>
      </table>
    </div>
  );
};

export default PricingTable;
