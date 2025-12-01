import React from 'react';

const StatCard = ({ title, value, icon: Icon, gradient }) => (
    <div className={`bg-gradient-to-br ${gradient} rounded-xl p-6 text-white shadow-xl transform hover:scale-105 transition-transform`}>
        <div className="flex items-center justify-between mb-2">
            <p className="text-white/80 text-sm font-medium">{title}</p>
            <Icon className="text-white/60" size={24} />
        </div>
        <p className="text-3xl font-bold">{value}</p>
    </div>
);

export default StatCard;