import { useHistory, useParams } from "react-router-dom";
import useFetch from "./useFetch";
import { useState, useEffect } from 'react';
import Routes from '../components/Routes';

const CalculateCost = () => {
    const history                               = useHistory();
    const { error, isPending, data: routes }    = useFetch('http://localhost:4000/routes');
    const [points, setPoints]                   = useState([]);
    const [point, setPoint]                     = useState('');
    const [flag, setFlag]                       = useState(true);
    const [cost, setCost]                       = useState(0);

    const [disabled, setDisabled]               = useState(true);
    const [addDisabled, setAddDisabled]         = useState(true);

    useEffect(() => {
        console.log("Point is "+points);
        if (points.length > 1) {
            setDisabled(false);
        }
    }, [points])

    useEffect(() => {
        console.log("Point is "+point);
        if (point != "") {
            setAddDisabled(false);
        } else {
            setAddDisabled(true);
        }
    }, [point])

    const handleSubmit = (e) => {
        e.preventDefault();

        if (points.length > 1) {
            CalculateCostByPoints(points);

            setPoints(points => []);
        } else {
            alert("Need one more points");
        }

        setDisabled(true);
    }

    const filterArray = (source, destination) => {
        return routes.filter(function (el) {
          return el.source == source && el.destination == destination;
        });
    }

    const CalculateCostByPoints = () => {
        if (points.length > 1) {
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

        }
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
        
        if (tempPoints.length < 2) {
            setDisabled(true);
        }
    }

    return (
        <div className="calculate-form">
            <div className="container">
                <div className="form">

                    <h2>Calculate Cost Form</h2>

                    <div className="form-control">
                        <input placeholder="A" type="text" name="point" id="point" maxLength="1" value={point} onChange={(e) => setPoint((e.target.value).toUpperCase())} />
                        <button className={(addDisabled) ? "disabled" : ""} type="button" onClick={addPoint}>Add</button>
                        <button className={(disabled) ? "disabled" : ""} type="button" onClick={handleSubmit}>Calculate Cost</button>
                    </div>

                    <div>
                        {(points && <Routes points={points} deletePoint={deletePoint} />)}
                    </div>

                    <div className="cost">
                        <p>Cost</p>
                        <p>{(flag) ? cost : "No Such Route"}</p>
                    </div>
                </div>
            </div>
        </div>
    );
}
 
export default CalculateCost;