import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend,ResponsiveContainer } from 'recharts';
import {linearGradient, AreaChart, Area} from 'recharts';

const ExpenseTimeChart = ({ expensesList }) => {
    return (
        <div className='mt-7  '>
        <ResponsiveContainer className="w-[100%]" height={300} >
        {/* <LineChart
            data={expensesList}
            margin={{ top: 5, right: 20, left: 10, bottom: 5 }}
        >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="createdAt" />
            <YAxis dataKey="amount"/>
            <Tooltip />
            <Legend />
            <Line type="monotone" dataKey="amount" stroke="#8884d8" />
           
        </LineChart> */}


        <AreaChart data={expensesList}
            margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
            <defs>
                <linearGradient id="colorUv" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#8884d8" stopOpacity={0.8}/>
                <stop offset="95%" stopColor="#8884d8" stopOpacity={0}/>
                </linearGradient>
                <linearGradient id="colorPv" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#82ca9d" stopOpacity={0.8}/>
                <stop offset="95%" stopColor="#82ca9d" stopOpacity={0}/>
                </linearGradient>
            </defs>
            <XAxis dataKey="createdAt" />
            <YAxis dataKey="amount"/>
            <CartesianGrid strokeDasharray="3 3" />
            <Tooltip />
            <Area type="monotone" dataKey="amount" stroke="#8884d8" fillOpacity={1} fill="url(#colorUv)" />
            
        </AreaChart>
    </ResponsiveContainer>
        </div>
    );
};

export default ExpenseTimeChart;
