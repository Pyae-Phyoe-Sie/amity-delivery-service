import { useHistory, useParams } from "react-router-dom";
import useFetch from "./useFetch";
import { useState, useEffect } from 'react';
import FinalRoutesList from '../components/FinalRoutesList'

const PossibleRoute = () => {
    const history                               = useHistory();
    const { error, isPending, data: routes }    = useFetch('http://localhost:4000/routes');
    const [source, setSource]                   = useState('');
    const [destination, setDestination]         = useState('');

    const [errorSource, setErrorSource]             = useState('');
    const [errorDestination, setErrorDestination]   = useState('');

    const [disabled, setDisabled]               = useState(true);

    let routesList = routes;

    const [finalRoutes, setFinalRoutes]         = useState([]);
    let finalRouteList = [];

    useEffect(() => {
        if (source != "" && destination != "") {
            setDisabled(false);
        } else {
            setDisabled(true);
        }
    }, [source, destination])

    const showPossibleRoute = () => {
        if (source != "" && destination != "") {
            setDisabled(false);
            routesList = routes;
            let fullRoute = [];
            let route = filterArray([source]);
            // routesList = removeArray(route);
            fullRoute.push(route);

            let routeDestinationList = [];
            let oldRouteDestinationList = [];
            route.map(value => {
                if (!routeDestinationList.includes(value.destination) && value.destination != destination) {
                    routeDestinationList.push(value.destination);
                }
            });

            while(routeDestinationList.length > 0 && !arrayEquals(oldRouteDestinationList, routeDestinationList) ) {
                oldRouteDestinationList = routeDestinationList;
                route = filterArray(routeDestinationList);
                // routesList = removeArray(route);
                fullRoute.push(route);
                routeDestinationList = [];            

                route.map(routeValue => {
                    if (!routeDestinationList.includes(routeValue.destination) && routeValue.destination != destination) {
                        routeDestinationList.push(routeValue.destination);
                    }
                });
            }

            let result = executeRoute(fullRoute);
            setFinalRoutes(finalRouteList);
        } else {
            setDisabled(true);
            if (source == "") {
                setErrorSource("Source is required!");
            }
            if (destination == "") {
                setErrorDestination("Destination is required!");
            }
        }

        // let routeDestination = '';
        // let routeSource = '';
        // let loop = true;
        // let fullRoute = [];

        // let route = filterArray(source);
        // let index = 0;
        // if (route.length > 1) {
        //     route.map(value => {
        //         fullRoute[index] = (typeof fullRoute[index] != "undefined") ? [fullRoute[index], value] : [value];
        //         index++;
        //     });
        // } else {
        //     fullRoute[index] = (typeof fullRoute[index] != "undefined") ? [fullRoute[index], route[0]] : [route[0]];
        // }

        // console.log(fullRoute);

        // fullRoute.map(value => {
        //     if (value.destination == destination) {
        //         fullRoute = [];
        //         fullRoute.push(value);
        //     } else {
        //         route = filterArray(value.source);
        //         console.log(route);
        //     }
        // });

        // console.log(fullRoute);

        // while(routeDestination !== destination && loop) {
        //     let route = filterArray(source);
        //     console.log(route);
        //     if (route.length > 0) {
        //         if (route.length > 1) {
        //             route.map(value => {
        //                 routeDestination = value.destination;
        //                 routeSource = value.source;
        //                 fullRoute.push(value);
        //             });
        //         } else {
        //             routeDestination = route[0].destination;
        //             routeSource = route[0].source;
        //             fullRoute.push(route[0]);
        //         }
        //     } else {
        //         loop = false;
        //     }
        // }

        // console.log(fullRoute);
    }

    const filterArray = (source) => {
        return routesList.filter((el, index) => {
            return source.includes((el.source).trim());
        });
    }

    const removeArray = (array) => {
        var difference = routesList.filter(x => array.indexOf(x) === -1);
        return difference;
    }

    const executeRoute = (routesList) => {
        let result = [];
        let i = 0;

        while(i < routesList.length) {
            if (i == 0) {
                routesList[i].map(value => {
                    if (value.destination == destination) {
                        pushComplete({
                            status: "complete",
                            data: [value],
                            destination: [value.destination],
                            lastAdd: i,
                            totalCost: value.cost
                        });
                        // result.push({
                        //     status: "complete",
                        //     data: [value],
                        //     destination: [value.destination],
                        //     lastAdd: i
                        // })
                    } else {
                        result.push({
                            status: "incomplete",
                            data: [value],
                            destination: [value.destination],
                            lastAdd: i,
                            totalCost: value.cost
                        })
                    }
                })
            } else {
                let routesListList = [];
                routesList[i].map(value => {
                    result.map((innerValue, index) => {
                        if (innerValue.destination.includes(value.source)) {
                            let tempArray = [...innerValue.data];
                            tempArray.push(value);
                            let tempCost = innerValue.totalCost + value.cost;

                            if (innerValue.lastAdd != i) {
                                if (value.destination == destination) {
                                    // routesListList.push({
                                    //     status: "complete",
                                    //     data: tempArray,
                                    //     destination: [value.destination],
                                    //     lastAdd: i
                                    // });
                                    pushComplete({
                                        status: "complete",
                                        data: tempArray,
                                        destination: [value.destination],
                                        lastAdd: i,
                                        totalCost: tempCost
                                    });
                                } else {
                                    routesListList.push({
                                        status: "incomplete",
                                        data: tempArray,
                                        destination: [value.destination],
                                        lastAdd: i,
                                        totalCost: tempCost
                                    });
                                }
                            } else {
                                routesListList.push({
                                    status: "incomplete",
                                    data: tempArray,
                                    destination: [value.destination],
                                    lastAdd: i,
                                    totalCost: tempCost
                                });
                            }
                        }
                    });
                });

                // result = result.filter(value => {
                //     return value.status == "complete";
                // });

                result = routesListList;
                console.log(routesListList);
                // result.map((innerValue, index) => {
                //     let newDestinationList = [];
                //     routesList[i].map(value => {
                //         if (innerValue.destination.includes(value.source)) {
                //             result[index].data.push(value);
                //             newDestinationList.push(value.destination);
                //             if (value.destination == destination) {
                //                 result[index].status = 'complete';
                //             }
                //         }
                //     });
                //     result[index].destination = [];
                //     result[index].destination = newDestinationList;
                // })
            }
            i++;
        }

        return result;
    }

    const pushComplete = (obj) => {
        if (!duplicateRoute(obj.data)) {
            finalRouteList.push(obj);
        }
    }

    const arrayEquals = (a, b) => {
        return Array.isArray(a) &&
            Array.isArray(b) &&
            a.length === b.length &&
            a.every((val, index) => val === b[index]);
    }

    const duplicateRoute = (array) => {
        let valueArr = array.map(function(item){ return item.id });
        return valueArr.some(function(item, idx){
            return valueArr.indexOf(item) != idx 
        });
    }

    return (
        <div className="possible-form">
            <div className="container">
                <div className="form">

                    <h2>Possible Route Form</h2>

                    <div className="error-div">
                        {(errorSource != "") ? <p>{errorSource}</p> : "" }
                        {(errorDestination != "") ? <p>{errorDestination}</p> : "" }
                    </div>
                    <div className="form-control">
                        <input placeholder="A" type="text" name="source" id="source" maxLength="1" value={source} onChange={(e) => setSource((e.target.value).toUpperCase())} />
                        <input placeholder="B" type="text" name="destination" id="destination" maxLength="1" value={destination} onChange={(e) => setDestination((e.target.value).toUpperCase())} />
                        <button className={(disabled) ? "disabled" : ""} type="button" onClick={showPossibleRoute}>Add</button>
                    </div>

                    <div className="cost">
                        {/* route list */}
                        <FinalRoutesList finalRoutes={finalRoutes}/>
                    </div>
                </div>
            </div>
        </div>
    );
}
 
export default PossibleRoute;