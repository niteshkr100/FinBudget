import { PieChart } from '@mui/x-charts/PieChart';
import { useEffect, useState } from "react";

const PieChartDashboard = ({budgetList}) => {

    const [totalBudget, setTotalBudget] = useState(0);
    const [totalSpend, setTotalSpend] = useState(0);

    useEffect(()=>{
        let totalBudget_ = 0;
        let totalSpend_ = 0;
          budgetList.forEach(element => {
            totalBudget_ = totalBudget_ + Number(element.amount);
            totalSpend_ =  totalSpend_ + element.totalSpend;
          });
          console.log(totalBudget_, totalSpend_);
          setTotalBudget(totalBudget_);
          setTotalSpend(totalSpend_);
    }, [budgetList])
   
  return (
    <div className="border rounded-lg p-5">
     <h2 className='font-bold text-lg'>Budgets Chart</h2>
    <div className="flex justify-center items-center">
    <PieChart
    series={[
        {
        data: [
            { id: 1, value: totalSpend, label: 'Total Spend' ,color:'orange'},
            { id: 2, value: (totalBudget - totalSpend), label: 'Remaining', color:'#4CCD99'},
        ],
        },
    ]}
    width={400}
    height={200}
    />
   </div>
    </div>
  )
}

export default PieChartDashboard
