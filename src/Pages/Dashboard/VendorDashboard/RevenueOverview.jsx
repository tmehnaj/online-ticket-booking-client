import React, { useEffect, useState } from 'react';
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer, Legend } from 'recharts';
import useAxiosSecure from '../../../Hooks/useAxiosSecure';


const VendorRevenueOverview = () => {
    const axiosSecure = useAxiosSecure();
    const [stats, setStats] = useState(null);
    const [loading, setLoading] = useState(true);

    const COLORS = ['#0088FE', '#00C49F']; 

    useEffect(() => {
        let isMounted = true;
        axiosSecure.get('/vendor-revenue-stats')
            .then(res => {
                if(isMounted) setStats(res.data);
            })
            .catch(err => console.error(err))
            .finally(() => {
                if(isMounted) setLoading(false);
            });
        return () => { isMounted = false };
    }, [axiosSecure]);

    if (loading) return <div className="p-10 text-center">Loading Charts...</div>;

    return (
        <div className='p-10 md:p-15 lg:p-20'>
            <title>Revenue Overview</title>
            <h2 className=" mb-10 text-left drop-shadow-sm py-2 text-dark-blue">Revenue Overview</h2>

            {/* Stat Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
                <div className="bg-white p-6 rounded-xl shadow-sm border-t-4 border-blue-500">
                    <p className="text-gray-500 text-sm font-semibold uppercase">Total Revenue</p>
                    <p className="text-3xl font-bold text-gray-800">৳{stats.summary.totalRevenue}</p>
                </div>
                <div className="bg-white p-6 rounded-xl shadow-sm border-t-4 border-green-500">
                    <p className="text-gray-500 text-sm font-semibold uppercase">Tickets Sold</p>
                    <p className="text-3xl font-bold text-gray-800">{stats.summary.totalTicketsSold}</p>
                </div>
                <div className="bg-white p-6 rounded-xl shadow-sm border-t-4 border-purple-500">
                    <p className="text-gray-500 text-sm font-semibold uppercase">Total Added</p>
                    <p className="text-3xl font-bold text-gray-800">{stats.summary.totalTicketsAdded}</p>
                </div>
            </div>

            {/* Pie Chart Section */}
            <div className="bg-white p-8 rounded-2xl shadow-md max-w-2xl mx-auto">
                <h3 className="text-center text-lg font-bold mb-4 text-gray-700">Sales vs. Inventory Ratio</h3>
                <div className="h-80">
                    <ResponsiveContainer width="100%" height="100%">
                        <PieChart>
                            <Pie
                                data={stats.pieData}
                                cx="50%"
                                cy="50%"
                                innerRadius={60} 
                                outerRadius={100}
                                paddingAngle={5}
                                dataKey="value"
                            >
                                {stats.pieData.map((entry, index) => (
                                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                                ))}
                            </Pie>
                            <Tooltip />
                            <Legend verticalAlign="bottom" height={36}/>
                        </PieChart>
                    </ResponsiveContainer>
                </div>
                <p className="text-center text-sm text-gray-500 mt-4">
                    Visual representation of sold tickets versus remaining stock.
                </p>
            </div>
        </div>
    );
};

export default VendorRevenueOverview;