import React, { useRef, useEffect, useState } from "react";

const BoxGeometry = (props) => {
    const mesh = useRef();
    const [color, setColor] = useState(props.color);
    useEffect(() => {
        console.log(props)
    }, [mesh])
    return (
        <>
            <mesh ref={mesh} onClick={props.handleClick}>
                <boxGeometry />
                <meshStandardMaterial color={color} />
            </mesh>
        </>
    );
};

export default BoxGeometry;