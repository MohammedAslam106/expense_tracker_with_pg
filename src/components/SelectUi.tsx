import React from "react";
import {Select, SelectItem} from "@nextui-org/react";
import { twMerge } from 'tailwind-merge'
import { Categories } from "@/app/(after-login)/create-expense/page";

interface SelectUi{
    className:string,
    onChanging:(ary:any)=>void,
    values:Array<Categories>,
    filteringValues:Array<string>,
    placeholder:string,
    label:string
}

export default function SelectUi({className,onChanging,values,filteringValues,placeholder,label}:SelectUi) {
  return (
    <div className="w-full flex flex-col gap-4">
        <div  className="flex w-full flex-wrap md:flex-nowrap mb-6 md:mb-0 gap-4">
          <Select
            onChange={(e)=>{onChanging(e.target.value)}}
            variant='underlined'
            label={label}
            placeholder={placeholder}
            className={twMerge(" w-xs  ",className)}
          >
            {values.filter((item)=>{
                return !filteringValues.includes(item.id)
            }).map((value) => {
              return(
              <SelectItem className=" font-semibold"  value={JSON.stringify(value)} key={value.id} >
                {value.title}
              </SelectItem>)
            }
            )}
          </Select>
        </div>
    </div>  
  );
}