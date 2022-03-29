import { useHistory, useParams } from "react-router-dom";
import useFetch from "./useFetch";
import { useState, useEffect } from 'react';
import Routes from '../components/routes';

const PossibleRoute = () => {
    const history                               = useHistory();
    const { error, isPending, data: routes }    = useFetch('http://localhost:4000/routes');
    
    return (
        <div className="possible-form">
            
        </div>
    );
}
 
export default PossibleRoute;