import Navbar from '@/components/shared/Navbar';
import React from 'react';

const CommonLayout = ({ children }: { children: React.ReactNode }) => {
    return (
        <div>
            <Navbar />
            <div className='container mx-auto mt-12 px-5 md:px-0'>
                {children}
            </div>

        </div>
    );
};

export default CommonLayout;