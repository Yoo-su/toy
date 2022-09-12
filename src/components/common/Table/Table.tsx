interface tableProps {
  headData: Array<any>;
  bodyData: Array<any>;
  elementMap: any;
}

const Table = ({ headData, bodyData, elementMap }: tableProps) => {
  return (
    <table className="table-auto shadow-lg text-gray-600 rounded-lg">
      <thead className="bg-gray-50 text-gray-700">
        <tr>
          {headData.map((head: any) => (
            <th key={head} scope="col" className="border py-3">
              {head}
            </th>
          ))}
        </tr>
      </thead>

      <tbody>
        {bodyData.map((body: any) => {
          return (
            <tr key={body.productId}>
              {Object.keys(elementMap).map((attr: string, index) => (
                <td key={index} className="border text-center px-4 py-2">
                  {elementMap[attr](body[attr])}
                </td>
              ))}
            </tr>
          );
        })}
      </tbody>
    </table>
  );
};

export default Table;