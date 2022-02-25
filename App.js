import React, { PureComponent } from "react";
import * as THREE from 'three';
import ReactDOM from "react-dom";
import { Canvas } from "@react-three/fiber";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { nanoid } from "nanoid";
import uuid from "react-uuid";
import {
    getBoxes,
    addBox,
    editBox,
    deleteBox
} from "./actions/boxActions";
import BoxGeometry from "./component/Geometry/Box/BoxesGeometry";

class App extends PureComponent {
    constructor(props) {
        super(props);
        this.state = {
            id: '',
            colorName: "",
            displayBox: 'on'
        }
    }

    static propTypes = {
        boxes: PropTypes.array.isRequired,
        getBoxes: PropTypes.func.isRequired,
        addBox: PropTypes.func.isRequired,
        editBox: PropTypes.func.isRequired,
        deleteBox: PropTypes.func.isRequired
    };

    componentDidMount() {
        this.state.getBoxes();
    }

    boxClick = e => {
        if ( this.state.displayBox === 'on') {
            this.setState({
                displayBox: 'off'
            },() => console.log(this.state.displaybox))
        } else {
            this.setState({
                displayBox: 'on'
            }, () => {console.log(this.state.displayBox)})
        }
    }

    submitData = () => {
        if (this.state.colorName && !this.state.id) {
            const newBox = {
                id: uuid(),
                colorName: this.state.colorName
            };
            this.props.addBox(newBox)
        } else if (this.state.colorName && this.state.id) {
            const updateDetails = {
                id: this.state.id,
                colorName: this.state.colorName,
            };
            this.props.editBox(updateDetails);
            this.boxClick();
        }
        this.clearData();
    };

    handleChange = e => {
        this.setState(
            { [e.target.name]: e.target.value }
        )
    }
    clearData = () => {
        this.setState(
            { id: '', colorName: '' }
        )
    }
    editDetails = data => {
        this.setState({
            id: data.id,
            colorName: data.colorName,
        })
    }
    deleteBox = e => {
        this.clearData();
        this.props.deleteBox(this.state.id);
    }

    render() {
        return (
            <div className="App">
                <div>
                    <input type="text"
                        onChange={this.handleChange}
                        name="colorName"
                        value={this.state.colorName}
                        placeholder="Color Name" />{" "}
                    {this.state.id ? (
                        <>
                            <button onClick={this.submitData}>UPDATE</button>
                            <button onClick={this.deleteBox}>DELETE</button>
                        </>
                    ) : (
                        <button onClick={this.submitData}>ADD</button>
                    )}{" "}
                    <button onClick={this.clearData}>CLEAR</button>
                </div>
                <Canvas>
                    <ambientLight intensity={0.1} />
                    <directionalLight color="red" position={[0, 0, 5]} />
                    { this.props.boxes &&
                        this.props.boxes.map((data) => {
                            return (
                                <>
                                    <BoxGeometry 
                                        color={data.colorName}
                                        handleClick={() => {this.editDetails(data)}} />
                                </>
                            );
                        })
                    }
                    {console.log(this.props.boxes)}
                </Canvas>
            </div>
        );
    }
}

const mapStateToProps = (state) => ({
    boxes: state.boxes
});

export default connect(mapStateToProps, {
    getBoxes, addBox, editBox, deleteBox
})(App);