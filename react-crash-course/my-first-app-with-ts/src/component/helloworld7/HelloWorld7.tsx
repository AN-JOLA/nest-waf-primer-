/** Here we illustrate useEffect for fetching remote data at mount time and event driven occasion */
import React, {useState, useEffect, useRef} from 'react';
import ShowUser from '../helloworld6/ShowUser';
type Props = {
name?: string;
other?: string;
}
const HelloWorld7: React.FC<Props> = (props) => {
//const [state, setState] = useState(initialState);
const [user, setUser] = useState(null);
let userIdInput: any = useRef(); //any is used here to accommodate possible undefined.
//to be called when refetch is required. User id is read from input with ref attribute name userIdInput
const refetchData = async () =>{
try {
let response = await fetch(`https://jsonplaceholder.typicode.com/users/${userIdInput.current.value}`);
let data = await response.json()
setUser(data);
} catch (error) {
setUser(null);
}
};
const fetchData = async () =>{
try {
let response = await fetch(`https://jsonplaceholder.typicode.com/users/1`);
let data = await response.json()
setUser(data);
} catch (error) {
setUser(null);
}
};
useEffect(() => {
    fetchData();
    userIdInput.current.focus(); //focus on the referenced input field after fetching initial data
    }, []);
    //prepare conditional showing of user
    const showUser = () => {
    if (user!==null){
    return <ShowUser user={user} />
    }
    else {
    return 'No user to display';
    }
    }
    return (
    <div>
    <p>Hello {props.name}. Greetings from from React.</p>
    <p>
    <input ref={userIdInput} type="number"
    placeholder="UserId (1 to 10) here" />
    </p>
    <p>
    <button onClick={refetchData}>
    Fetch User
    </button>
    </p>
    <p>
    {showUser()}
    </p>
    </div>
    )
    }
    HelloWorld7.defaultProps = {
    name: "Ife"
    }
    export default HelloWorld7;