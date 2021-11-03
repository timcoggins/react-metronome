/**
 * Notes.js
 * Displays simple usage notes to the user
 */

// Imports

import { useState, useEffect } from 'react'
import {nanoid} from "nanoid";
import axios from "axios";
import { Container, Expand, Heading, Controls } from './atoms/SideBar'

/**
 * Patterns Component
 * @returns {JSX.Element}
 */

const Patterns = (props) => {

    const [patternList, setPatternList] = useState([])
    const [display, setDisplay] = useState(false)
    const [selected, setSelect] = useState(0)
    const userToken = localStorage.getItem('usertoken');
    const [status, setStatus] = useState()

    useEffect(() => {
        if(userToken === null) {
            setStatus('Not Logged In')
        } else {
            setStatus('Ready')
        }
    }, [])



    /**
     * Axios request to get the patterns
     */
    const getPatternList = () => {
        // Make a request for a user with a given ID
        axios.get('http://localhost/patterns')
            .then(response => setPatternList([...response.data]))
            .catch(error => console.log(error));
    }

    useEffect(() => getPatternList(), [])


    /**
     * Axios post to save a pattern
     */
    const saveHandler = () => {

        if(userToken === null) {
            console.log('You are not logged in')
            return
        }
        const name = prompt('Name of the pattern')
        if(name === '') return;
        const author = prompt('Author')
        if(name === '') return;

        axios.post('http://localhost/patterns', {
            name: name,
            author: author,
            data: props.stepData
        }, {
            headers: {
                Authorization:
                    `Bearer ${userToken}`,
            }
        })
            .then(response => {
                console.log(response)
                setStatus('Saved')
            })
            .catch(error => {
                console.log(error)
                setStatus('Error')
            });
        getPatternList();
    }

    // JSX

    return(
        <Container>
            <Heading onClick={() => setDisplay(!display)}>
                <h3>Patterns</h3>
                <Expand><span className="material-icons">
                    {display === true ? 'expand_less' : 'expand_more'}
                </span></Expand>
            </Heading>
            {display === true && <div>
                <Controls>
                    <select value={selected} onChange={(e) => setSelect(e.target.value)}>
                        {patternList.length !== 0 && patternList.map((item, index) =>
                            <option key={nanoid} value={index}>{item.name}</option>
                        )}
                    </select>
                    <button onClick={() => props.setStepData(patternList[selected].data)}>Load</button>
                    {userToken !== null && <button onClick={saveHandler}>Save</button>}

                </Controls>
                <p>{status}</p>
             </div>}
        </Container>
    );
}

export default Patterns