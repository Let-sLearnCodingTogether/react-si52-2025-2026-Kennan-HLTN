import { createBrowserRouter } from "react-router";

const router = createBrowserRouter([
    {
        path : "/", // Halaman dari sebuah page
        children : [
            {
                index : true,
                lazy : {
                    Component : async() => {
                        const component = await import("../pages/movies/Movies.tsx")
                        return component.default
                        }
                }
            },{
                path : "/", // Halaman dari sebuah page
                    children : [
                        {
                            path : "add-movie",
                            lazy : {
                                Component : async() => {
                                    const component = await import("../pages/movies/AddMovie.tsx")
                                    return component.default
                                    }
                            }
                        }

                    ]
             },
        ],

        
    }
])

export default router;