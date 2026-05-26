'use client'
import {useForm} from "react-hook-form";
import {Button, Col, Row} from "reactstrap";
import {post} from "@/core/httpClient";
import {useTestActions} from "@/contexts/testContext";
import { testAction } from "@/contexts/testContext";


export default function UserCreate() {
    const {
        register,
        watch,
        handleSubmit,
        formState: {errors}
    }    = useForm({
        mode: "onSubmit"
    });

    const { state, dispatch } = useTestActions();
    console.log(state);


    return(
    <>
        <Row className="mb-3">
            <h5>Email: {state.email} </h5>
            <h5>First Name: {state.firstName} </h5>
            <Button className="btn btn-success mb-3" type="button" onClick={() => {
                dispatch({
                    type: testAction.CHANGE_EMAIL,
                    payload: "ppetrovic@singidunum.ac.rs"
                });
            }}>
                Change Email
            </Button>
            <Button className="btn btn-success" type="button" onClick={() => {
                dispatch({
                    type: testAction.CHANGE_FIRST_NAME,
                    payload: "Petar"
                });
            }}>
                Change First Name
            </Button>
        </Row>

        <Row className="mb-3">
            <Col md={6}>
                <input type="text" className="form-control" placeholder="First Name" {...register("firstName", {
                    required: "First Name is required!",
                    maxLength: 50,
                    minLength: 3,
                })} />
                {errors && errors.firstName && (
                    <span className="text-danger">{errors.firstName.message}</span>
                )}
            </Col>

            <Col md={6}>
                <input type="text" className="form-control" placeholder="Last Name" {...register("lastName", {
                    required: "Last Name is required!",
                    maxLength: 50,
                    minLength: 3,
                })} />
                {errors && errors.lastName && (
                    <span className="text-danger">{errors.lastName.message}</span>
                )}
            </Col>
        </Row>

        <Row className="mb-3">
            <Col md={6}>
                <input type="email" className="form-control" placeholder="Email" {...register("email", {
                    required: "Email is required!",
                })}/>
                {errors && errors.email && (
                    <span className="text-danger">{errors.email.message}</span>
                )}
            </Col>

            <Col md={6}>
                <input type="text" className="form-control" placeholder="Contact number" {...register("contactNumber", {
                    required: "Contact number is required!",
                    maxLength: 14,
                    minLength: 8,
                    validate: (value) => {
                        if(!/^[0-9]+$/.test(value))
                        {
                            return "You can only enter valid numbers";
                        }
                    }
                })}/>
                {errors && errors.contactNumber && (
                    <span className="text-danger">{errors.contactNumber.message}</span>
                )}
            </Col>
        </Row>
        <Row>
            <Col md="12">
                <Button className="btn btn-primary" type="button" onClick={() => {
                    handleSubmit(async (data) => {
                        await post("/user/create", data)
                    })();
                }}>
                    Submit
                </Button>
            </Col>
        </Row>
    </>
);
}