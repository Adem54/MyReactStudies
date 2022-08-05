import { axiosPrivate } from "../api/axios";
import { useEffect } from "react";
import useRefreshToken from "./useRefreshToken";
import useAuth from "./useAuth";

const useAxiosPrivate = () => {
    const refresh = useRefreshToken();
    const { auth } = useAuth();

    useEffect(() => {

        const requestIntercept = axiosPrivate.interceptors.request.use(
            config => {
                if (!config.headers['Authorization']) {
                    config.headers['Authorization'] = `Bearer ${auth?.accessToken}`;
                }
                return config;
            }, (error) => Promise.reject(error)
        );
        //Burasi

        const responseIntercept = axiosPrivate.interceptors.response.use(
            response => response,
            async (error) => {
                const prevRequest = error?.config;
                if (error?.response?.status === 403 && !prevRequest?.sent) {
                    prevRequest.sent = true;
                    const newAccessToken = await refresh();
                    prevRequest.headers['Authorization'] = `Bearer ${newAccessToken}`;
                    return axiosPrivate(prevRequest);
                }
                return Promise.reject(error);
            }
        );

        return () => {
            axiosPrivate.interceptors.request.eject(requestIntercept);
            axiosPrivate.interceptors.response.eject(responseIntercept);
        }
    }, [auth, refresh])

    return axiosPrivate;
}

export default useAxiosPrivate;

/*
On the server, there are many scenarios where I returned a 401 Unauthorized error so it doesn’t
 make sense to use that for the if condition in the response interceptor.
However, the server will return a 401 status code along with a message indicating
 that the access token wasn’t included in the request.
So, if the message contains “not logged in” then it means the server did not find 
the access token in the cookies or the authorization header.

After the Axios response interceptor checks the error message and 
discovers that it contains “not logged in“, it will immediately 
evoke the refreshAccessTokenFn() service to refresh the access token.
For security reasons, the access and refresh tokens are stored in HTTPOnly 
cookies in the browser to prevent hackers from using Javascript to access them.
Note: You need to set withCredentials: true in the Axios config for the browser 
to include the cookies along with the requests.

Now, let’s add the services to perform the JWT authentication against the API server:
refreshAccessTokenFn : Makes a GET request to retrieve a new access token.
*/