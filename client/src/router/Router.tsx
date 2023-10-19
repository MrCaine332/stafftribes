import React from 'react'
import {Navigate, Route, Routes, useLocation} from "react-router-dom"
import {Auth} from "@pages/auth/Page";
import {Home} from "@pages/home";
import {Created} from "@pages/created";
import {AnimatePresence} from "framer-motion";

const Router = () => {
	const location = useLocation()

	/** Additional features are currently WIP */
	return (
		<AnimatePresence mode={"wait"}>
			<Routes location={location} key={location.pathname}>

				{/*<Route path={"/auth"} element={<Auth />} />*/}
				{/*<Route path={"/created"} element={<Created />} />*/}
				<Route path={"/home"} element={<Home />}/>

				<Route path={"*"} element={<Navigate to={"/home"} />}/>
			</Routes>
		</AnimatePresence>
	);
};

export default Router;