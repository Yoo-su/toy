import React from "react";

interface tableProps {
  thead: any,
  tbody: any,
  elementMap:Object,
}


const Table = ({ thead, tbody, elementMap }: tableProps) => {
  return (
    <table className="table-auto shadow-lg text-gray-600 rounded-lg">
      <thead className="bg-gray-50 text-gray-700">
        <tr>
          {thead.map((head:any) => (
            <th key={head} scope="col" className="border py-3 px-6">{head}</th>
          ))}
        </tr>
      </thead>

      <tbody>
        <tr>
          {tbody.map((body:Object)=>{
            Object.keys(elementMap).map((key:string)=>(
                <td key={key} className="border px-4 py-2">{}</td>
            ))    
        })}
        </tr>  
      </tbody>
    </table>
  );
};

export default Table;