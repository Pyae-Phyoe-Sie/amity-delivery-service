import { useHistory, useParams } from "react-router-dom";
import useFetch from "./useFetch";
import { useState, useEffect } from 'react';
import Routes from '../components/routes';

const CalculateCost = () => {
    const history                               = useHistory();
    const { error, isPending, data: routes }    = useFetch('http://localhost:4000/routes');
    const [points, setPoints]                   = useState([]);
    const [point, setPoint]                     = useState('');
    const [flag, setFlag]                       = useState(true);
    const [cost, setCost]                       = useState(0);

    useEffect(() => {
        console.log("Point is "+points);
    }, [points])

    const handleSubmit = (e) => {
        e.preventDefault();

        CalculateCostByPoints(points);

        setPoints(points => []);
    }

    const filterArray = (source, destination) => {
        return routes.filter(function (el) {
          return el.source == source && el.destination == destination;
        });
    }

    const CalculateCostByPoints = () => {
        let routesList = [];
        let cost = 0;
        points.map((point, index) => {
            if(index+1 < points.length) {
                let route = filterArray(point, points[index+1]);
                if (route.length == 0) {
                    setFlag(false)
                } else {
                    routesList.push(route[0]);
                }
            }
        });

        if (flag) {
            routesList.map(route => {
                console.log(route.cost);
                cost = cost + parseInt(route.cost);
            });
        }

        setCost(cost);

        // let sourceFilterArray = filterArray(source, "source");
        // console.log(sourceFilterArray);

        // let i = 0;
        // sourceFilterArray.map(route => {
        //     let nextRoute = filterArray(route.destination, "source");

        //     if (nextRoute.length > 1) {
        //         nextRoute.map(routee => {
        //             routesList[i] = [route, routee];
        //             i++
        //         });
        //     } else {
        //         routesList[i] = [route, nextRoute[0]];
        //     }
        //     i++;
        // });

        // console.log(routesList);
    }

    const addPoint = () => {
        setPoints(points => [...points, point]);
        setPoint('');
        // $("input[name=point]").foucs();
        document.getElementById("point").focus();
    }

    const deletePoint = (index) => {
        let tempPoints = points;
        console.log(tempPoints);
        tempPoints.splice(index, 1);
        console.log(tempPoints);
        setPoints(points => [...tempPoints]);
    }

    return (
        <div className="calculate-form">
            <div className="container">
                <div className="form">
                    {(points && <Routes points={points} deletePoint={deletePoint} />)}
                    <div className="form-control">
                        <input type="text" name="point" id="point" value={point} onChange={(e) => setPoint(e.target.value)} />
                        <button type="button" onClick={addPoint}>Add</button>
                        <button type="button" onClick={handleSubmit}>Calculate Cost</button>
                    </div>

                    <div className="cost">
                        <p>{(flag) ? cost : "No Such Route"}</p>
                    </div>
                </div>
            </div>
        </div>
    );
}
 
export default CalculateCost;