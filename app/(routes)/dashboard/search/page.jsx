import React from 'react'
import BudgetProduct from '../budgets/_components/BudgetProduct'

const Displayterm = ({ budgetSearchList }) => {
  return (
    <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5'>
      {budgetSearchList?.length > 0 ? (
        budgetSearchList.map((budget, index) => (
          <BudgetProduct key={index} budget={budget} />
        ))
      ) : (
        <p>Not found</p>
      )}
    </div>
  )
}

export default Displayterm;
