"use client"
import { useParams } from 'next/navigation';
import React from 'react';
import { AllTilesData } from '../../_components/AllTilesData';

const EditNewTile = () => {
    const {id} = useParams();
    const filterData = AllTilesData.filter((data)=> data.id === Number(id))
    console.log({filterData})
    return (
        <div>
            {id}
        </div>
    );
};

export default EditNewTile;