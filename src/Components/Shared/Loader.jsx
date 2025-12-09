
import React from 'react';
import { motion } from 'framer-motion';

export default function Rotate() {
    const box = {
    width: 50,
    height: 50,
    backgroundColor: '#3B82F6',
    borderRadius: 5,
    margin: 12,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    color: 'white'
};

    return (
       <div className='container mx-auto flex justify-center items-center min-h-screen text-accent-content'>
         <span className='text-5xl font-bold '>L</span><motion.div
            style={box}
            animate={{ rotate: 360 }}
            transition={{ duration: 1, repeat: Infinity, ease: "linear" }} 
        /><span className='text-5xl font-bold'>ading</span>
       </div>
    );
}


