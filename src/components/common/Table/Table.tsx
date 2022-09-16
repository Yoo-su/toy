import React from "react";

interface TableProps<T> {
  headData: Array<string>;
  bodyData: T[];
  elementMap: Record<
    keyof T,
    (value: T[keyof T]) => string | number | React.ReactNode
  >;
}

// eslint-disable-next-line @typescript-eslint/ban-types
function objectKeys<T extends {}>(obj: T) {
  return Object.keys(obj).map((objKey) => objKey as keyof T);
}

const Table = <T,>({ headData, bodyData, elementMap }: TableProps<T>) => (
  <table className="table-auto shadow-lg text-gray-600 rounded-lg">
    <thead className="bg-gray-50 text-gray-700">
      <tr>
        {headData.map((head: string) => (
          <th key={head} scope="col" className="border py-3">
            {head}
          </th>
        ))}
      </tr>
    </thead>

    <tbody>
      {bodyData.map((body, index: number) => (
        <tr key={index}>
          {objectKeys(elementMap).map((attr, index) => (
            <td key={index} className="border text-center px-4 py-2">
              {elementMap?.[attr](body[attr])}
            </td>
          ))}
        </tr>
      ))}
    </tbody>
  </table>
);

export default Table;
