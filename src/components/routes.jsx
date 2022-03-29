const RouteAdder = ({points, deletePoint}) => {
    return (
        <div className="route-list">
            {/* <p>Routes -> </p> */}
            { (points.length) ?
                points.map((point, index) => (
                    <div key={index}>
                        {(index > 0) ? <label >to</label> : ""}
                        <p>Route - {point} <span className="remove" onClick={() => deletePoint(index)}>x</span></p>
                    </div>
                ))
            :
                <p>There is no points.</p>
            }
        </div>
    )
}

export default RouteAdder;