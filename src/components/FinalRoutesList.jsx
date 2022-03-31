const RoutesList = ({finalRoutes}) => {
    let cost = 0;
    return (
        <div className="cost-list">
            {/* <p>Routes -> </p> */}
            { (finalRoutes.length) ?
                finalRoutes.map((routes, index) => (
                    <table key={index}>
                        <tbody className="card">
                        {routes.data.map((value, key) => (
                            <tr key={key}>
                                {/* {((key > 0) ? <label>to</label> : "")} */}
                                <td>Route - {value.source}</td>
                                <td>Route - {value.destination}</td>
                                <td>Cost - {value.cost}</td>
                            </tr>
                        ))}
                            <tr>
                                <td colSpan={3}>TotalCost - {routes.totalCost}</td>
                            </tr>
                        </tbody>
                    </table>
                ))
            :
                <p className="no-record">There is no routes.</p>
            }
        </div>
    )
}

export default RoutesList;