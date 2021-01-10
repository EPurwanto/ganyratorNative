import {ISession} from "../utils/SessionStorage";
import {createAction} from "@reduxjs/toolkit";

export const loadSession = createAction<ISession>("loadSession");

export const clearSession =  createAction("clearSession");
