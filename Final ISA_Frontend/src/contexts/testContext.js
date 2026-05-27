import {createContext, useContext, useReducer} from "react";
import {Context} from "react";

const initialState = {
    firstName: "Bojan",
    email: "bpapaz@singidunum.ac.rs"
}

export const testAction = {
    CHANGE_EMAIL: "CHANGE_EMAIL",
    CHANGE_FIRST_NAME: "CHANGE_FIRST_NAME"
};

// 1. korak - Kreiranje konteksta -> globalnog stanja
const testContext = createContext();

//2. korak - kreiranje reducera -> funkcija koja ce promeniti stanje u contextu
const testReducer = (state, action) => {
    switch(action.type) {
        case testAction.CHANGE_EMAIL:
            return {...state, email: action.payload};
        case testAction.CHANGE_FIRST_NAME:
            return {...state, firstName: action.payload};
        default:
            return state;
    }
};

// 3. korak - kreiranje provajdera za nase parcijalne komponente
const TestProvider = ({ children }) => {
    const [state, dispatch] = useReducer(testReducer, initialState);

    const value = {state, dispatch};

    return (
        <testContext.Provider value={value}>
            {children}
        </testContext.Provider>
    );
};

//4. korak - kreiranje funkcije za koriscenje kontexta
const useTestActions = () => {
    const context = useContext(testContext);

    if (context === undefined) {
        throw new Error('testActions must be used within a TestProvider');
    }
    return context;
};

export { TestProvider, useTestActions };