import * as React from 'react';
import ClearIcon from '@mui/icons-material/Clear';

export interface ICheckListCardProps {
    item:string,
    deleteCheckListItem(id: number): void,
    index:number
}

export default function CheckListCard ({item, deleteCheckListItem,index}: ICheckListCardProps) {
  return (
    <div className='w-full flex justify-between bg-white border border-gray-300 rounded-3xl h-[45px] my-1 items-center px-2'>
      <h1 className='pl-1'>{item}</h1>
      <ClearIcon className='bg-red-400 rounded-3xl flex justify-center h-[28px] w-[28px] text-white' onClick={()=>{
        deleteCheckListItem(index)
      }}/>
    </div>
  );
}
