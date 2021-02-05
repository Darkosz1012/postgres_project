import {useState, useEffect} from 'react';
import { Table} from 'react-bootstrap';
import { useAlert } from 'react-alert'
import * as query from "./../../util/baseQuery";
export function JsonTable(params) {
    const alert = useAlert();
    const [state, setState] = useState([])

    useEffect(() => {
        query.getData(params.url,alert).then(res=>{
            setState(res)
        });
    },[params])

    if(!Array.isArray(state)){
        return (<></>)
    }

    var help = [];
    for (var i in state[0]) {
        help.push(<th>{i}</th>)
    }

    return (
        <>

            <Table responsive striped bordered hover size="md">
                <thead>
                    <tr>
                        {help}
                    </tr>
                </thead>
                <tbody>
                    {state.map((row, i) => {
                        var tmp = [];
                        for (var item in row)
                            tmp.push(<td>{row[item] ? row[item].toString() : ""}</td>)
                        return (<tr key={i}>{tmp}</tr>)
                    })}
                </tbody>
            </Table>


        </>
    )
}
