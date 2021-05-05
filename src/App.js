import { auth, provider } from "./firebase";
import { Button } from "@chakra-ui/button";
import { Flex, Text } from "@chakra-ui/layout";
import { useEffect, useState } from "react";
import { connect } from "react-redux";
import { LOGIN, LOGOUT } from "./Redux/actions";
require("dotenv").config();

function App({ name, email, login, logout }) {
	const [user, setUser] = useState(null);
	const [loading, setLoading] = useState(false);

	useEffect(() => {
		setLoading(true);

		const unsubscribe = auth.onAuthStateChanged((authUser) => {
			if (authUser) {
				setUser(authUser);

				login({ userName: authUser.displayName, userEmail: authUser.email });
				setLoading(false);
			} else {
				setUser(null);

				setLoading(false);
			}
		});

		return () => {
			unsubscribe();
		};
	}, []);

	const handelSignIn = () => {
		auth
			.signInWithPopup(provider)
			.then((user) => {
				login({
					userName: user.user.displayName,
					userEmail: user.user.email,
				});
			})
			.catch((error) => {
				console.log(error);
			});
	};

	const handelSignOut = () => {
		auth
			.signOut()
			.then(() => {
				logout();
			})
			.catch((error) => {
				console.log(error);
			});
	};

	return (
		<div className="App">
			<Flex
				direction="column"
				height="100vh"
				alignItems="center"
				justifyContent="center"
			>
				{user ? (
					<>
						<Text
							bgGradient="linear(to-l, #7928CA,#FF0080)"
							bgClip="text"
							fontSize="6xl"
							fontWeight="extrabold"
						>
							Welcome {name}
							<br />
							Email: {email}
						</Text>
						<Button isLoading={loading} onClick={handelSignOut} margin="5px">
							Signout
						</Button>
					</>
				) : (
					<Button isLoading={loading} onClick={handelSignIn} margin="5px">
						Signin
					</Button>
				)}
			</Flex>
		</div>
	);
}

const mapStateToProps = (state) => {
	return { name: state.userName, email: state.userEmail };
};

const mapDispatchToProps = (dispatch) => {
	return {
		login: (user) => dispatch({ type: LOGIN, payload: user }),
		logout: () => dispatch({ type: LOGOUT }),
	};
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
